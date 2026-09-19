const RAZORPAY_CONFIG = {
  KEY_ID: "rzp_test_TNH4Qz4Gy9rHPd",
  API_BASE: "http://localhost:4242"
  // API_BASE: "https://laven-herbs.onrender.com"
};

function loadRazorpayScript(){
  return new Promise((resolve, reject) => {
    if(window.Razorpay){ resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout script."));
    document.body.appendChild(script);
  });
}

// const LavenCheckout = {
//   async pay({ amountInRupees, customer, orderData, onSuccess, onFailure }){
//     try{
//       await loadRazorpayScript();
//     }catch(err){
//       onFailure("Could not load the payment gateway. Check your connection and try again.");
//       return;
//     }

//     let order;
//     try{
//       const res = await fetch(`${RAZORPAY_CONFIG.API_BASE}/api/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
//         body: JSON.stringify({
//           amount: Math.round(amountInRupees * 100),
//           currency: "INR",
//           receipt: "laven_" + Date.now()
//         })
//       });
//       if(!res.ok) throw new Error("Order creation failed");
//       order = await res.json();
//     }catch(err){
//       onFailure("Payment server isn't reachable. Start the /backend server (see README) or try Cash on Delivery.");
//       return;
//     }

//     const options = {
//       key: RAZORPAY_CONFIG.KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Laven Herbs",
//       description: "Herbal Skincare Order",
//       order_id: order.id,
//       prefill: {
//         name: customer.name || "",
//         email: customer.email || "",
//         contact: customer.phone || ""
//       },
//       notes: {
//         address: `${customer.address || ""}, ${customer.city || ""}, ${customer.state || ""} ${customer.pincode || ""}`
//       },
//       theme: { color: "#8257B3" },
//       handler: async function(response){
//         try{
//           const verifyRes = await fetch(`${RAZORPAY_CONFIG.API_BASE}/api/orders/verify-and-save`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
//             body: JSON.stringify({ ...response, orderData, customOrderId: orderData.orderId })
//           });
//           const verifyData = await verifyRes.json();
//           if(verifyData.verified){
//             onSuccess(verifyData.orderId || orderData.orderId);
//           }else{
//             onFailure("Payment verification failed. If money was deducted, it will be auto-refunded.");
//           }
//         }catch(err){
//           onFailure("Could not verify payment with the server.");
//         }
//       },
//       modal: {
//         ondismiss: function(){
//           onFailure("Payment cancelled.");
//         }
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.on("payment.failed", function(resp){
//       onFailure(resp.error && resp.error.description ? resp.error.description : "Payment failed.");
//     });
//     rzp.open();
//   }
// };

// window.LavenCheckout = LavenCheckout;

const LavenCheckout = {
  async pay({ amountInRupees, customer, orderData, onSuccess, onFailure }){
    try{
      await loadRazorpayScript();
    }catch(err){
      onFailure("Could not load the payment gateway. Check your connection and try again.");
      return;
    }

    let order;
    const customOrderId = "LH-" + Date.now().toString().slice(-8);
    try{
      const res = await fetch(`${RAZORPAY_CONFIG.API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
        body: JSON.stringify({
          amount: Math.round(amountInRupees * 100),
          currency: "INR",
          receipt: customOrderId
        })
      });
      if(!res.ok) throw new Error("Order creation failed");
      order = await res.json();
    }catch(err){
      onFailure("Payment server isn't reachable. Start the /backend server (see README) or try Cash on Delivery.");
      return;
    }

    const options = {
      key: RAZORPAY_CONFIG.KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Laven Herbs",
      description: "Herbal Skincare Order",
      order_id: order.id,
      prefill: {
        name: customer.name || "",
        email: customer.email || "",
        contact: customer.phone || ""
      },
      notes: {
        address: customer.address + ", " + customer.city + ", " + customer.state + " " + customer.pincode
      },
      theme: { color: "#8257B3" },
      handler: async function(response){
        try{
          const verifyRes = await fetch(`${RAZORPAY_CONFIG.API_BASE}/api/orders/verify-and-save`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
            body: JSON.stringify({ ...response, orderData: { ...orderData, orderId: customOrderId } })
          });
          const verifyData = await verifyRes.json();
          if(verifyData.verified){
            onSuccess(verifyData.orderId || customOrderId);
          }else{
            onFailure("Payment verification failed. If money was deducted, it will be auto-refunded.");
          }
        }catch(err){
          onFailure("Could not verify payment with the server.");
        }
      },
      modal: {
        ondismiss: function(){
          onFailure("Payment cancelled.");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function(resp){
      onFailure(resp.error && resp.error.description ? resp.error.description : "Payment failed.");
    });
    rzp.open();
  }
};

window.LavenCheckout = LavenCheckout;