/* =========================================================
   LAVEN HERBS — Product, Ingredient & Founder Data
   Edit this file to add/remove products or change pricing.

   PRODUCT PHOTOS: each product renders a bespoke illustrated
   graphic by default (see PRODUCT_ART in app.js). To use a real
   photo instead, drop an image into frontend/assets/products/
   and add a "photo" field to that product below, e.g.:
     photo: "assets/products/vit-c-scrub.jpg"
   If the file is missing or fails to load, it automatically
   falls back to the illustrated version — nothing breaks.
   ========================================================= */


const PRODUCTS = [
  // {
  //   id: "facial-kit",
  //   name: "Facial Kit",
  //   photo: "assets/product_images/Facial-kit.jpeg",
  //   size: "100g (4×25g)",
  //   price: 249,
  //   mrp: 499,
  //   category: "Face Kit",
  //   badge: "Face Kit",
  //   tint: "lavender",
  //   short: "Your complete 4-step ritual — scrub, massage cream, gel, and face pack in one kit.",
  //   description: "A complete skincare ritual in four 25g jars: Face Scrub to exfoliate, Massage Cream to nourish, Aloe Vera Gel to soothe, and our Calming Glow Face Pack to finish. Everything you need for radiant, cared-for skin in one beautifully packaged kit.",
  //   ingredients: ["Lavender", "Shea Butter", "Tea Tree Oil", "Kaolin Clay"],
  //   inStock: true
  // },
  // {
  //   id: "lavender-scrub",
  //   name: "Lavender Face Scrub",
  //   photo: "assets/product_images/Lavender face scrub.jpeg",
  //   size: "400g",
  //   price: 349,
  //   category: "Face Care",
  //   badge: "Coming Soon",
  //   tint: "lavender",
  //   short: "A gentle lavender-infused scrub that exfoliates without stripping skin.",
  //   description: "Our Lavender Scrub gently buffs away dullness and impurities while calming lavender extract soothes skin as it exfoliates. Regular use reveals a smoother, more even-toned complexion — without any harsh, stripping feeling.",
  //   ingredients: ["Lavender", "Walnut Shell Powder", "Aloe Vera"],
  //   inStock: false
  // },
  // {
  //   id: "shea-almond-cream",
  //   name: "Shea Butter with Almond Oil Massage Cream",
  //   photo: "assets/product_images/Massagecream.jpeg",
  //   size: "400g",
  //   price: 399,
  //   category: "Face Care",
  //   badge: "Coming Soon",
  //   tint: "cream",
  //   short: "Rich, nourishing massage cream blending shea butter and almond oil.",
  //   description: "This deeply nourishing massage cream combines shea butter's intense moisture with almond oil's lightweight, fast-absorbing softness. Massage into skin for a calming ritual that leaves it supple, hydrated, and visibly healthier.",
  //   ingredients: ["Shea Butter", "Almond Oil", "Lavender"],
  //   inStock: false
  // },
  // {
  //   id: "tea-tree-aloe-gel",
  //   name: "Tea Tree Aloe Vera Gel",
  //   photo: "assets/product_images/Teatree-aloegel.jpeg",
  //   size: "400g",
  //   price: 299,
  //   category: "Face Care",
  //   badge: "Coming Soon",
  //   tint: "sage",
  //   short: "Cooling aloe vera gel with clarifying tea tree oil.",
  //   description: "A lightweight, fast-absorbing gel that combines soothing aloe vera with clarifying tea tree oil. Perfect for calming irritation, hydrating without heaviness, and keeping breakouts in check.",
  //   ingredients: ["Tea Tree Oil", "Aloe Vera", "Vitamin E"],
  //   inStock: false
  // },
  // {
  //   id: "kaolin-clay-pack",
  //   name: "Kaolin Clay Calm & Glow Face Pack",
  //   photo: "assets/product_images/Kaolin clay facepack.jpeg",
  //   size: "250g",
  //   price: 349,
  //   category: "Face Care",
  //   badge: "Coming Soon",
  //   tint: "cream",
  //   short: "Mineral-rich kaolin clay pack for a calm, radiant glow.",
  //   description: "Our Calm & Glow Face Pack uses gentle kaolin clay to draw out impurities and excess oil without over-drying. Skin is left feeling clean, balanced, and visibly more radiant after every use.",
  //   ingredients: ["Kaolin Clay", "Lavender", "Aloe Vera"],
  //   inStock: false
  // }
  {
  id: "facial-kit",
  name: "The Complete Facial Kit",
  category: "Face Kit",
  size: "100g (4 × 25g jars)",
  price: 249,
  mrp: 499,
  inStock: true,
  badge: "Bestseller",
  tint: "lavender",
  photo: "assets/product_images/Facial-kit.jpeg",
  
  short: "A salon-quality facial at home in 4 easy steps.",
  
  description: "Everything you need for a complete at-home facial — carefully curated in 4 numbered jars. From deep cleansing to a final glow pack, this is the full salon ritual in a box.",
  
  benefits: [
    "Salon-quality facial in 30 minutes",
    "4 numbered steps — no guesswork",
    "3 complete facials per kit",
    "Comes with step-by-step guide"
  ],
  
  perfectFor: "All skin types · Great for gifting & glow prep",
  howToUse: "Follow the numbered jars in order: 1. Cleanse → 2. Massage → 3. Hydrate → 4. Reveal. Full instructions inside.",
  keyIngredients: ["Lavender", "Vitamin C", "Aloe Vera", "Shea Butter"],
  
  ingredients: ["Lavender", "Vitamin C", "Aloe Vera", "Shea Butter"]
},
{
  id: "lavender-scrub",
  name: "Lavender Face Scrub",
  photo: "assets/product_images/Lavender face scrub.jpeg",
  size: "400g",
  price: 349,
  category: "Face Care",
  badge: "Coming Soon",
  tint: "lavender",
  short: "Calming lavender exfoliator for sensitive, tired skin.",
  description: "A soothing lavender-infused scrub that gently exfoliates while calming redness and irritation. Perfect for sensitive skin that needs a weekly reset without harshness.",
  benefits: [
    "Calms redness & irritation",
    "Gentle exfoliation for sensitive skin",
    "Lavender aroma relaxes the senses",
    "Leaves skin soft, not stripped"
  ],
  perfectFor: "Sensitive, dry, or reactive skin",
  howToUse: "Massage onto damp skin in circular motions for 45 seconds. Rinse. Use 2x a week.",
  keyIngredients: ["Lavender Oil", "Oatmeal", "Chamomile", "Shea Butter"],
  ingredients: ["Lavender", "Walnut Shell Powder", "Aloe Vera"],
  inStock: false
},
{
  id: "shea-almond-cream",
  name: "Shea Butter + Almond Oil Massage Cream",
  photo: "assets/product_images/Massagecream.jpeg",
  size: "400g",
  price: 399,
  category: "Face Care",
  badge: "Coming Soon",
  tint: "cream",
  short: "Deep-nourishing massage cream for dry, dull skin.",
  description: "A rich, buttery massage cream that melts into skin — delivering intense hydration and a natural glow. Ideal for facial massage, dry patches, and winter care.",
  benefits: [
    "Deep hydration without greasiness",
    "Boosts circulation & natural glow",
    "Soothes dry patches & flakiness",
    "Perfect base for facial massage"
  ],
  perfectFor: "Dry, mature, or dull skin",
  howToUse: "Warm a small amount between palms. Massage onto clean face in upward strokes for 10–15 minutes. Wipe off or leave on overnight.",
  keyIngredients: ["Shea Butter", "Almond Oil", "Vitamin E", "Lavender"],
  ingredients: ["Shea Butter", "Almond Oil", "Vitamin E", "Lavender"],
  inStock: false
},
{
  id: "tea-tree-aloe-gel",
  name: "Tea Tree Aloe Vera Gel",
  photo: "assets/product_images/Teatree-aloegel.jpeg",
  size: "400g",
  price: 299,
  category: "Face Care",
  badge: "Coming Soon",
  tint: "sage",
  short: "Cooling aloe gel with clarifying tea tree for acne-prone skin.",
  description: "A lightweight, cooling gel that calms breakouts and soothes irritation. Aloe hydrates while tea tree clarifies — perfect as a daily moisturizer or post-facial mask.",
  benefits: [
    "Calms active breakouts & redness",
    "Lightweight — absorbs in seconds",
    "Soothes after sun or shaving",
    "Non-comedogenic — won't clog pores"
  ],
  perfectFor: "Oily, acne-prone, or combination skin",
  howToUse: "Apply a thin layer to clean face. Leave for 10–15 minutes, then wipe off OR leave on overnight. Use daily.",
  keyIngredients: ["Aloe Vera", "Tea Tree Oil", "Witch Hazel", "Cucumber"],
  ingredients: ["Tea Tree Oil", "Aloe Vera", "Vitamin E"],
  inStock: false
},
{
  id: "kaolin-clay-pack",
  name: "Kaolin Clay Face Pack",
  category: "Face Care",
  size: "100g",
  price: 249,
  mrp: 499,
  inStock: true,
  badge: "Bestseller",
  tint: "cream",
  photo: "assets/product_images/Kaolin clay facepack.jpeg",

  short: "Deep-cleansing kaolin clay mask for clear, matte skin.",

  description: "A purifying clay mask that draws out impurities, absorbs excess oil, and refines pores — leaving skin clean, calm, and matte. Formulated with gentle kaolin clay, soothing botanicals, and a hint of lavender to prevent over-drying.",

  benefits: [
    "Draws out dirt, oil & impurities",
    "Minimizes the look of pores",
    "Controls excess oil & shine",
    "Calms active breakouts",
    "Leaves skin matte, not tight"
  ],

  perfectFor: "Oily, combination, and acne-prone skin",
  howToUse: "Apply an even layer to clean, dry face (avoid eyes). Leave on for 10–15 minutes until dry. Rinse with lukewarm water in circular motions. Use 1–2 times a week.",
  keyIngredients: ["Kaolin Clay", "Lavender", "Aloe Vera", "Witch Hazel"],

  ingredients: ["Kaolin Clay", "Lavender", "Aloe Vera"]
}
];

// const CATEGORIES = ["All", "Face Care", "Body Care", "Hair Care", "Face Kit"];
const CATEGORIES = ["All", "Face Care", "Face Kit"];

// const INGREDIENTS = [
//   {
//     id: "vitamin-c",
//     name: "Vitamin C",
//     photo: "assets/product_images/vitaminC.png",
//     latin: "Ascorbic Acid",
//     tag: "Brightening",
//     tagline: "Nature's brightening antioxidant",
//     body: "A potent antioxidant that neutralizes free-radical damage, evens skin tone, and boosts natural collagen production. We source ours from citrus botanicals for a gentler, more stable formula than synthetic alternatives.",
//     foundIn: ["vit-c-scrub", "lavender-cream", "vit-c-serum", "bridal-facial-kit"]
//   },
//   {
//     id: "aloe-vera",
//     name: "Aloe Vera",
//     photo: "assets/product_images/aloevera.png",
//     latin: "Aloe barbadensis",
//     tag: "Hydrating",
//     tagline: "The desert's answer to hydration",
//     body: "Aloe's polysaccharide-rich gel delivers lightweight, non-greasy hydration while calming irritation. It's been used across cultures for millennia to cool, soothe, and support the skin's natural healing.",
//     foundIn: ["aloe-tea-tree", "bridal-facial-kit"]
//   },
//   {
//     id: "lavender",
//     name: "Lavender",
//     photo: "assets/product_images/lavender.jpg",
//     latin: "Lavandula angustifolia",
//     tag: "Calming",
//     tagline: "The original skin soother",
//     body: "Lavender has been used in skincare for over 2,500 years — and for good reason. Its natural linalool and linalyl acetate compounds calm inflammation, reduce redness, and promote skin cell regeneration. It's the heart of everything we make.",
//     foundIn: ["lavender-cream", "bridal-facial-kit"]
//   },
//   {
//     id: "tea-tree",
//     name: "Tea Tree Oil",
//     photo: "assets/product_images/teatree.png",
//     latin: "Melaleuca alternifolia",
//     tag: "Clarifying",
//     tagline: "Nature's blemish fighter",
//     body: "A powerful natural antiseptic that targets breakouts at the source without stripping the skin barrier. Its antimicrobial terpenes make it one of the most effective botanical alternatives to harsh spot treatments.",
//     foundIn: ["aloe-tea-tree"]
//   },
//   {
//     id: "shea-butter",
//     name: "Shea Butter",
//     photo: "assets/product_images/sheabutter.png",
//     latin: "Vitellaria paradoxa",
//     tag: "Nourishing",
//     tagline: "Deep-repair for thirsty skin",
//     body: "Rich in fatty acids and vitamins A & E, shea butter melts into skin on contact, repairing the moisture barrier and locking in hydration for up to 24 hours without ever feeling greasy.",
//     foundIn: ["shea-moisturizer"]
//   },
//   {
//     id: "almond-oil",
//     name: "Almond Oil",
//     photo: "assets/product_images/almond oil.png",
//     latin: "Prunus dulcis",
//     tag: "Nourishing",
//     tagline: "Lightweight nourishment for every skin type",
//     body: "Rich in vitamin E and fatty acids, almond oil absorbs quickly without clogging pores. It softens, moisturizes, and helps even out skin tone — a gentle, time-tested botanical for daily nourishment.",
//     foundIn: []
//   },
//   {
//     id: "kaolin-clay",
//     name: "Kaolin Clay",
//     photo: "assets/product_images/Kaolin Clay.jpeg",
//     latin: "Kaolinite",
//     tag: "Cleansing",
//     tagline: "Soft cleansing and excess oil absorption",
//     body: "A naturally occurring, fine mineral clay renowned for its gentle cleansing and oil-absorbing properties. It effectively draws out surface impurities and excess oil without over-stripping the skin, leaving behind a fresh, clean, and balanced complexion.",
//     foundIn: []
//   },
//   {
//     id: "french-clay",
//     name: "French Clay",
//     photo: "assets/product_images/french-green-clay-powder.jpg",
//     latin: "Illite",
//     tag: "Detoxifying",
//     tagline: "Deep mineral detox for congested skin",
//     body: "French Clay is prized for its high mineral content and powerful absorptive properties. It draws out impurities, excess oil, and toxins from deep within pores, leaving skin feeling clarified and refreshed.",
//     foundIn: []
//   },
//   {
//     id: "multani-mitti",
//     name: "Multani Mitti",
//     photo: "assets/product_images/Multani mitti.png",
//     latin: "Fuller's Earth",
//     tag: "Purifying",
//     tagline: "The traditional Indian clay for radiant skin",
//     body: "Used for centuries in Ayurvedic skincare, Multani Mitti gently absorbs excess oil and impurities while cooling and soothing skin. It leaves complexion feeling fresh, purified, and naturally radiant.",
//     foundIn: ["de-tan-pack"]
//   }
// ];


const INGREDIENTS = [
  {
    id: "vitamin-c",
    name: "Vitamin C",
    photo: "assets/product_images/vitaminC.png",
    latin: "Ascorbic Acid",
    tag: "Brightening",
    tagline: "Nature's brightening antioxidant",
    body: "A potent antioxidant that neutralizes free-radical damage, evens skin tone, and boosts natural collagen production. We source ours from citrus botanicals for a gentler, more stable formula than synthetic alternatives.",
    foundIn: []
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    photo: "assets/product_images/aloevera.png",
    latin: "Aloe barbadensis",
    tag: "Hydrating",
    tagline: "The desert's answer to hydration",
    body: "Aloe's polysaccharide-rich gel delivers lightweight, non-greasy hydration while calming irritation. It's been used across cultures for millennia to cool, soothe, and support the skin's natural healing.",
    foundIn: ["tea-tree-aloe-gel", "facial-kit", "kaolin-clay-pack", "lavender-scrub"]
  },
  {
    id: "lavender",
    name: "Lavender",
    photo: "assets/product_images/lavender.jpg",
    latin: "Lavandula angustifolia",
    tag: "Calming",
    tagline: "The original skin soother",
    body: "Lavender has been used in skincare for over 2,500 years — and for good reason. Its natural linalool and linalyl acetate compounds calm inflammation, reduce redness, and promote skin cell regeneration. It's the heart of everything we make.",
    foundIn: ["lavender-scrub", "shea-almond-cream", "facial-kit", "kaolin-clay-pack"]
  },
  {
    id: "tea-tree",
    name: "Tea Tree Oil",
    photo: "assets/product_images/teatree.png",
    latin: "Melaleuca alternifolia",
    tag: "Clarifying",
    tagline: "Nature's blemish fighter",
    body: "A powerful natural antiseptic that targets breakouts at the source without stripping the skin barrier. Its antimicrobial terpenes make it one of the most effective botanical alternatives to harsh spot treatments.",
    foundIn: ["tea-tree-aloe-gel", "facial-kit"]
  },
  {
    id: "shea-butter",
    name: "Shea Butter",
    photo: "assets/product_images/sheabutter.png",
    latin: "Vitellaria paradoxa",
    tag: "Nourishing",
    tagline: "Deep-repair for thirsty skin",
    body: "Rich in fatty acids and vitamins A & E, shea butter melts into skin on contact, repairing the moisture barrier and locking in hydration for up to 24 hours without ever feeling greasy.",
    foundIn: ["shea-almond-cream", "facial-kit"]
  },
  {
    id: "almond-oil",
    name: "Almond Oil",
    photo: "assets/product_images/almond oil.png",
    latin: "Prunus dulcis",
    tag: "Nourishing",
    tagline: "Lightweight nourishment for every skin type",
    body: "Rich in vitamin E and fatty acids, almond oil absorbs quickly without clogging pores. It softens, moisturizes, and helps even out skin tone — a gentle, time-tested botanical for daily nourishment.",
    foundIn: ["shea-almond-cream"]
  },
  {
    id: "kaolin-clay",
    name: "Kaolin Clay",
    photo: "assets/product_images/Kaolin Clay.jpeg",
    latin: "Kaolinite",
    tag: "Cleansing",
    tagline: "Soft cleansing and excess oil absorption",
    body: "A naturally occurring, fine mineral clay renowned for its gentle cleansing and oil-absorbing properties. It effectively draws out surface impurities and excess oil without over-stripping the skin, leaving behind a fresh, clean, and balanced complexion.",
    foundIn: ["kaolin-clay-pack", "facial-kit"]
  },
  {
    id: "french-clay",
    name: "French Clay",
    photo: "assets/product_images/french-green-clay-powder.jpg",
    latin: "Illite",
    tag: "Detoxifying",
    tagline: "Deep mineral detox for congested skin",
    body: "French Clay is prized for its high mineral content and powerful absorptive properties. It draws out impurities, excess oil, and toxins from deep within pores, leaving skin feeling clarified and refreshed.",
    foundIn: []
  },
  {
    id: "multani-mitti",
    name: "Multani Mitti",
    photo: "assets/product_images/Multani mitti.png",
    latin: "Fuller's Earth",
    tag: "Purifying",
    tagline: "The traditional Indian clay for radiant skin",
    body: "Used for centuries in Ayurvedic skincare, Multani Mitti gently absorbs excess oil and impurities while cooling and soothing skin. It leaves complexion feeling fresh, purified, and naturally radiant.",
    foundIn: []
  }
];

const FOUNDERS = [
  {
    id: "suchi",
    name: "Suchi Agrawal",
    photo: "assets/product_images/Suchi_Crop.jpeg",
    role: "Founder & Formulator",
    quote: "I started Laven Herbs because I wanted skincare I could trust — ingredients I could pronounce, sourced from places I could visit.",
    bio: [
      "Suchi, the visionary behind Laven Herbs, seamlessly blends her profound knowledge of botanical science with a lifelong devotion to herbalism. Her journey began with extensive studies in traditional plant medicine, a foundation that now underpins her innovative approach to modern skincare.",
      "From the humble beginnings of her kitchen, Suchi founded Laven Herbs. Armed with a select array of botanicals and an unshakeable conviction in nature's power, she has cultivated a brand that embodies the belief: that when honoured and understood, nature provides all the essentials for healthy skin and hair."
    ]
  },
  {
    id: "aman",
    name: "Aman Duwe",
    photo: "assets/product_images/Aman_crop.jpeg",
    role: "Founder & Head of Operations",
    quote: "Great formulas deserve to actually reach people — that's the part I obsess over, every single day.",
    bio: [
      "Aman leads the business behind Laven Herbs — operations, sourcing partnerships, and the systems that let our formulas go from a small kitchen batch to a bottle at your door. His focus is building the brand with the same care that goes into every jar.",
      "With a background in building and scaling early-stage ventures, Aman brought structure and discipline to Laven Herbs' growth, all while holding firm to the founding promise: no shortcuts on ingredients, no shortcuts on trust."
    ]
  }
];

const CHATBOT_FAQS = [
  { q: "sensitive skin allergy patch test", a: "Most of our formulas are gentle enough for sensitive skin, but we recommend a patch test 24 hours before first use — apply a little to your inner forearm and wait a day." },
  { q: "how long last bottle duration use", a: "A 500ml product typically lasts 2–3 months with daily use, and a 30–50ml serum lasts about 6–8 weeks." },
  { q: "vegan cruelty free animal testing", a: "Yes! Every Laven Herbs formula is 100% vegan and we never test on animals, at any stage." },
  { q: "shipping delivery time how long take", a: "Orders are processed within 24 hours and typically arrive in 4–7 business days across India." },
  { q: "return refund exchange policy", a: "Unopened products can be returned within 7 days of delivery. Check our Shipping & Returns page for full details." },
  { q: "international ship outside india", a: "We currently ship across India only — international shipping is on our roadmap!" },
  { q: "price cost how much rupees", a: "Our products range from ₹199 to ₹699. Exact pricing for each item is on the Shop page." },
  { q: "ingredients what inside natural botanical", a: "Every formula is built on real botanicals — lavender, vitamin C, aloe vera, tea tree, shea butter, rosemary. Check our Ingredients page for details." },
  { q: "track order status where is my order", a: "You can track your order any time on our Track Order page using your order number and email." },
  { q: "payment method pay razorpay upi cod cash", a: "We accept UPI, cards, and netbanking via Razorpay, plus Cash on Delivery." },
  { q: "contact human support help talk to someone", a: "Reach our small team directly at info@lavenherbs.in, or use the Contact page — we read every message ourselves." }
];
