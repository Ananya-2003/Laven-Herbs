require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const { cert, initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const app = express();
app.use(cors());
app.use(express.json());

const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if(!KEY_ID || !KEY_SECRET){
  console.warn(
    "\n⚠️  RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set.\n" +
    "   Copy backend/.env.example to backend/.env and add your keys\n" +
    "   from https://dashboard.razorpay.com/app/keys before accepting real payments.\n"
  );
}

const razorpay = new Razorpay({
  key_id: KEY_ID || "rzp_test_placeholder",
  key_secret: KEY_SECRET || "placeholder_secret"
});

// ---------------- Firebase Admin (trusted — bypasses client security rules) ----------------
let db = null;
try{
  // On Render (or any host), set FIREBASE_SERVICE_ACCOUNT_JSON to the full
  // contents of your service account file. Locally, it just uses the file.
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
    : require("./serviceAccountKey.json");

  const adminApp = initializeApp({
    credential: cert(serviceAccount)
  });
  db = getFirestore(adminApp);
  console.log("✅ Firebase Admin connected — orders will be saved server-side.");
}catch(err){
  console.warn(
    "\n⚠️  Firebase service account not found or invalid.\n" +
    "   Locally: put serviceAccountKey.json in the backend folder.\n" +
    "   On Render: set the FIREBASE_SERVICE_ACCOUNT_JSON environment variable.\n" +
    "   Actual error: " + err.message + "\n"
  );
}

const razorpayOrders = [];

app.post("/api/orders", async (req, res) => {
  try{
    const { amount, currency = "INR", receipt } = req.body;

    if(!amount || amount <= 0){
      return res.status(400).json({ error: "A valid amount (in paise) is required." });
    }

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: receipt || `receipt_${Date.now()}`
    });

    razorpayOrders.push({ ...order, status: "created", createdAt: new Date().toISOString() });
    res.json(order);
  }catch(err){
    console.error("Order creation failed:", err.message);
    res.status(500).json({ error: "Could not create order.", details: err.message });
  }
});

app.post("/api/orders/cod", async (req, res) => {
  if(!db){
    return res.status(503).json({ success:false, error: "Order database isn't configured on the server yet." });
  }
  try{
    const { orderId, customer, items, subtotal, shipping, total, userId } = req.body;
    if(!orderId || !customer || !items){
      return res.status(400).json({ success:false, error: "Missing required order fields." });
    }

    await db.collection("orders").doc(orderId).set({
      orderId, customer, items, subtotal, shipping, total,
      userId: userId || null,
      method: "cod",
      status: "placed",
      placedAt: FieldValue.serverTimestamp()
    });

    res.json({ success:true, orderId });
  }catch(err){
    console.error("COD order save failed:", err.message);
    res.status(500).json({ success:false, error: "Could not save order." });
  }
});

// app.post("/api/orders/verify-and-save", async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;

//   if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
//     return res.status(400).json({ verified: false, error: "Missing payment fields." });
//   }

//   const expectedSignature = crypto
//     .createHmac("sha256", KEY_SECRET || "placeholder_secret")
//     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     .digest("hex");

//   const verified = expectedSignature === razorpay_signature;

//   const rOrder = razorpayOrders.find(o => o.id === razorpay_order_id);
//   if(rOrder) rOrder.status = verified ? "paid" : "verification_failed";

//   if(!verified){
//     return res.json({ verified: false });
//   }

//   if(!db){
//     return res.json({ verified: true, orderId: razorpay_payment_id, warning: "Payment verified but order database isn't configured on the server yet." });
//   }

//   try{
//     const { customer, items, subtotal, shipping, total, userId } = orderData || {};
//     await db.collection("orders").doc(razorpay_payment_id).set({
//       orderId: razorpay_payment_id, customer, items, subtotal, shipping, total,
//       userId: userId || null,
//       method: "razorpay",
//       status: "placed",
//       placedAt: FieldValue.serverTimestamp()
//     });
//     res.json({ verified: true, orderId: razorpay_payment_id });
//   }catch(err){
//     console.error("Order save after verified payment failed:", err.message);
//     res.json({ verified: true, orderId: razorpay_payment_id, warning: "Payment succeeded but saving order details failed — contact support with your payment ID." });
//   }
// });

app.post("/api/orders/verify-and-save", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;

  if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
    return res.status(400).json({ verified: false, error: "Missing payment fields." });
  }

  const expectedSignature = crypto
    .createHmac("sha256", KEY_SECRET || "placeholder_secret")
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  const verified = expectedSignature === razorpay_signature;

  const rOrder = razorpayOrders.find(o => o.id === razorpay_order_id);
  if(rOrder) rOrder.status = verified ? "paid" : "verification_failed";

  if(!verified){
    return res.json({ verified: false });
  }

  // Always generate a clean LH- order ID for online payments
  const finalOrderId = "LH-" + Date.now().toString().slice(-8);

  if(!db){
    return res.json({ verified: true, orderId: finalOrderId, warning: "Payment verified but order database isn't configured on the server yet." });
  }

  try{
    const { customer, items, subtotal, shipping, total, userId } = orderData || {};
    await db.collection("orders").doc(finalOrderId).set({
      orderId: finalOrderId,
      paymentId: razorpay_payment_id,
      customer, items, subtotal, shipping, total,
      userId: userId || null,
      method: "razorpay",
      status: "placed",
      placedAt: FieldValue.serverTimestamp()
    });
    res.json({ verified: true, orderId: finalOrderId });
  }catch(err){
    console.error("Order save after verified payment failed:", err.message);
    res.json({ verified: true, orderId: finalOrderId, warning: "Payment succeeded but saving order details failed." });
  }
});

app.get("/api/health", (req, res) => res.json({ ok: true, firestoreConnected: !!db }));

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Laven Herbs backend running → http://localhost:${PORT}`));