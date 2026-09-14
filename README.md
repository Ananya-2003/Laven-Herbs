# Laven Herbs — Herbal Skincare & Beauty

A full redesign of the Laven Herbs site: same purple/lavender brand identity and product catalog, rebuilt with a more polished UI, a working cart + checkout, and a real Razorpay payment integration.

## What's inside

```
laven-herbs/
├── frontend/              Static site — open directly or host anywhere
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── data.js        Product / ingredient / founder content — edit here
│       ├── app.js          Router, rendering, cart logic
│       └── razorpay.js     Talks to the backend to open Razorpay Checkout
└── backend/                Small Node/Express server (required for payments)
    ├── server.js
    ├── package.json
    └── .env.example
```

## Why there's a backend at all

Razorpay (like every payment gateway) requires an **order** to be created with your secret key before checkout can open, and the secret key can never live in frontend code — anyone could read it and create fake orders. So:

1. Frontend asks the backend to create an order (`POST /api/orders`)
2. Backend creates it using the Razorpay SDK + your secret key, returns an `order_id`
3. Frontend opens the Razorpay Checkout popup with that `order_id`
4. After payment, the backend verifies the payment signature (`POST /api/verify`) before the order is treated as paid

This is the standard, secure way to integrate Razorpay — there's no safe way to skip the backend.

## Running it locally

### 1. Backend (payments)

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and add your Razorpay **test** keys (free, from [dashboard.razorpay.com/app/keys](https://dashboard.razorpay.com/app/keys)):

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
```

Then:

```bash
npm start
```

You should see `Laven Herbs backend running → http://localhost:4242`.

### 2. Frontend

Also update the public key in `frontend/js/razorpay.js`:

```js
KEY_ID: "rzp_test_xxxxxxxxxxxx",   // same Key ID as above (this one IS safe to expose)
```

Then just open `frontend/index.html` in a browser, or serve it:

```bash
cd frontend
python3 -m http.server 5500
# visit http://localhost:5500
```

### 3. Test a payment

Add products to your bag → Checkout → fill in the shipping form → **Pay**. With Razorpay test keys, use their [test card/UPI details](https://razorpay.com/docs/payments/payments/test-card-details/) — no real money moves.

## Going live

1. Complete Razorpay KYC and switch to **live** keys in `.env` and `razorpay.js`
2. Deploy `/backend` somewhere it can stay running (Render, Railway, Fly.io, a VPS, etc.) and point `API_BASE` in `razorpay.js` to that URL
3. Deploy `/frontend` as a static site (Netlify, Vercel, GitHub Pages, S3, etc.)
4. Swap the in-memory `orders` array in `server.js` for a real database if you want order history/persistence

## Editing content

Everything a non-developer would want to change — products, prices, ingredients, founder bios — lives in one place: **`frontend/js/data.js`**. No other file needs to change to add a product or edit copy.

## What was added in this pass

- **Aman Dubey** added as Co-Founder & Head of Operations alongside Suchi Agrawal on the About page (edit his bio in `data.js` → `FOUNDERS`)
- Full Razorpay checkout flow (UPI/cards/netbanking/wallets) plus a Cash-on-Delivery option
- Cart drawer, product quick-view modal, live category filtering, on-site search, contact form, newsletter signup
- Redesigned UI: refined type system (Anton display + Jost body + Fraunces italic for editorial quotes), botanical line-art icons in place of stock photography, scroll reveals, and a consistent purple/lavender/cream palette throughout
