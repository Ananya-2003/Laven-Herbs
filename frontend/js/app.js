/* =========================================================
   LAVEN HERBS — App logic (router, rendering, cart)
   ========================================================= */

/* ---------------- Icon library (inline line-art SVGs) ---------------- */
const ICONS = {
  sprig: `<svg viewBox="0 0 40 90" fill="none"><path d="M20 88V20" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M20 20C20 20 6 26 4 12C4 12 16 8 20 20Z" fill="currentColor"/><path d="M20 30C20 30 6 36 4 22C4 22 16 18 20 30Z" fill="currentColor"/><path d="M20 20C20 20 34 26 36 12C36 12 24 8 20 20Z" fill="currentColor"/><path d="M20 30C20 30 34 36 36 22C36 22 24 18 20 30Z" fill="currentColor"/><circle cx="20" cy="8" r="4" fill="currentColor"/></svg>`,
  bottle: `<svg viewBox="0 0 60 80" fill="none"><rect x="20" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M22 18h16l4 8v42a4 4 0 01-4 4H22a4 4 0 01-4-4V26l4-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><line x1="18" y1="40" x2="42" y2="40" stroke="currentColor" stroke-width="1.4"/><line x1="22" y1="50" x2="38" y2="50" stroke="currentColor" stroke-width="1.2" opacity=".5"/><line x1="22" y1="56" x2="38" y2="56" stroke="currentColor" stroke-width="1.2" opacity=".5"/></svg>`,
  dropper: `<svg viewBox="0 0 60 80" fill="none"><rect x="18" y="4" width="24" height="20" rx="3" stroke="currentColor" stroke-width="2"/><path d="M26 24l-4 6v38a8 8 0 0016 0V30l-4-6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><line x1="18" y1="46" x2="42" y2="46" stroke="currentColor" stroke-width="1.4"/><path d="M30 24v14" stroke="currentColor" stroke-width="1.4"/></svg>`,
  jar: `<svg viewBox="0 0 64 76" fill="none"><rect x="16" y="4" width="32" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M14 16h36l2 6v42a8 8 0 01-8 8H20a8 8 0 01-8-8V22l2-6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><line x1="12" y1="34" x2="52" y2="34" stroke="currentColor" stroke-width="1.4"/></svg>`,
  kit: `<svg viewBox="0 0 76 68" fill="none"><rect x="4" y="18" width="68" height="46" rx="4" stroke="currentColor" stroke-width="2"/><path d="M4 30h68" stroke="currentColor" stroke-width="1.6"/><path d="M26 18V12a6 6 0 016-6h12a6 6 0 016 6v6" stroke="currentColor" stroke-width="2"/><rect x="30" y="26" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/></svg>`,
  leaf: `<svg viewBox="0 0 60 60" fill="none"><path d="M52 8C24 8 8 24 8 52c28 0 44-16 44-44z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 48C28 32 40 20 50 10" stroke="currentColor" stroke-width="1.4"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none"><rect x="1" y="6" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.6"/><path d="M15 10h4l3 3v3h-7v-6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="6" cy="18" r="2" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="18" r="2" stroke="currentColor" stroke-width="1.6"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.4-9.5-8.8C1 8 2.5 4.5 6 4c2-.3 4 .8 6 3.2C14 4.8 16 3.7 18 4c3.5.5 5 4 3.5 7.2C19 15.6 12 20 12 20z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 8h12l-1.2 11.2a2 2 0 01-2 1.8H9.2a2 2 0 01-2-1.8L6 8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.6"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" stroke-width="1.6"/></svg>`,
  flask: `<svg viewBox="0 0 24 24" fill="none"><path d="M10 3h4M9 3v6l-6 10a2 2 0 001.8 3h14.4a2 2 0 001.8-3L15 9V3" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`
};

function iconFor(category){
  if(category === "Face Kit") return ICONS.kit;
  if(category === "Body Care") return ICONS.jar;
  if(category === "Hair Care") return ICONS.dropper;
  return ICONS.bottle;
}
function tintFor(p){ return "tint-" + p.tint; }

/* ---------------- Rich per-product illustrated art ----------------
   Each product gets a bespoke composition (not a generic category icon),
   with a small built-in SMIL loop (falling droplet / swaying sprig /
   rising bubbles / gloss shimmer) so it reads as "alive" without needing
   video or gif assets. Swap in a real photo any time by dropping a file
   at PRODUCTS[i].photo and the <img> will be used automatically instead. */

function orangeSlice(cx,cy,r){
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#F4A94C"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.82}" fill="#F7B95F"/>
    ${[0,1,2,3,4,5,6,7].map(i=>{
      const a = (i/8)*Math.PI*2;
      const x1=cx+Math.cos(a)*r*0.12, y1=cy+Math.sin(a)*r*0.12;
      const x2=cx+Math.cos(a)*r*0.75, y2=cy+Math.sin(a)*r*0.75;
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fff" stroke-width="1.4" opacity=".65"/>`;
    }).join("")}
    <circle cx="${cx}" cy="${cy}" r="${r*0.16}" fill="#fff" opacity=".7"/>
  </g>`;
}
function lavenderSprig(cx,cy,scale,rot){
  return `<g transform="translate(${cx},${cy}) rotate(${rot}) scale(${scale})">
    <animateTransform attributeName="transform" type="rotate" additive="sum" values="${rot-3} 0 0;${rot+3} 0 0;${rot-3} 0 0" dur="4.5s" repeatCount="indefinite" attributeType="XML"/>
    <line x1="0" y1="0" x2="0" y2="46" stroke="#7C9163" stroke-width="2" stroke-linecap="round"/>
    ${[6,14,22,30,38].map((y,i)=>`<ellipse cx="${i%2?4:-4}" cy="${y}" rx="4.5" ry="3" fill="#9B7EC4" transform="rotate(${i%2?20:-20} ${i%2?4:-4} ${y})"/>`).join("")}
    <circle cx="0" cy="-2" r="3" fill="#B79FD9"/>
  </g>`;
}
function dropletFall(cx,topY,bottomY,delay){
  return `<circle cx="${cx}" cy="${topY}" r="3" fill="#E8C468" opacity="0">
    <animate attributeName="cy" values="${topY};${bottomY}" dur="2.6s" begin="${delay}s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;1;0" dur="2.6s" begin="${delay}s" repeatCount="indefinite"/>
  </circle>`;
}
function riseBubbles(cx,cy,color,delay){
  return [0,1,2].map(i=>`<circle cx="${cx+i*7-7}" cy="${cy}" r="${2.4-i*0.4}" fill="${color}" opacity="0">
    <animate attributeName="cy" values="${cy};${cy-34}" dur="3.4s" begin="${delay+i*0.5}s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;.7;0" dur="3.4s" begin="${delay+i*0.5}s" repeatCount="indefinite"/>
  </circle>`).join("");
}
function glossSweep(x,y,w,h){
  return `<g clip-path="url(#clip-${x}-${y})">
    <rect x="${x-w}" y="${y}" width="${w*0.4}" height="${h}" fill="#fff" opacity=".22" transform="skewX(-18)">
      <animate attributeName="x" values="${x-w};${x+w}" dur="3.6s" repeatCount="indefinite"/>
    </rect>
  </g>`;
}
function jarBase(cx,cy,w,h,fill){
  return `<g>
    <rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="10" fill="${fill}"/>
    <rect x="${cx-w/2}" y="${cy-h/2-8}" width="${w}" height="14" rx="5" fill="${fill}" opacity=".9"/>
    <ellipse cx="${cx}" cy="${cy-h/2}" rx="${w/2}" ry="6" fill="#fff" opacity=".35"/>
  </g>`;
}
function dropperBottle(cx,cy,h,glassColor,liquidColor){
  const bw=26;
  return `<g>
    <rect x="${cx-14}" y="${cy-h/2-16}" width="28" height="14" rx="3" fill="#8A6D4F"/>
    <rect x="${cx-bw/2}" y="${cy-h/2}" width="${bw}" height="${h}" rx="8" fill="${glassColor}" opacity=".55"/>
    <rect x="${cx-bw/2+3}" y="${cy-h/2+h*0.32}" width="${bw-6}" height="${h*0.62}" rx="6" fill="${liquidColor}" opacity=".85"/>
    <ellipse cx="${cx}" cy="${cy-h/2+2}" rx="${bw/2-2}" ry="4" fill="#fff" opacity=".3"/>
    <line x1="${cx}" y1="${cy-h/2-16}" x2="${cx}" y2="${cy-h/2+18}" stroke="#8A6D4F" stroke-width="2.5"/>
  </g>`;
}
function leafPair(cx,cy,scale,color){
  return `<g transform="translate(${cx},${cy}) scale(${scale})" opacity=".9">
    <path d="M0 0C-14 -4 -22 -16 -18 -30C-4 -26 4 -14 0 0Z" fill="${color}"/>
    <path d="M0 0C14 -4 22 -16 18 -30C4 -26 -4 -14 0 0Z" fill="${color}" opacity=".85"/>
  </g>`;
}

const PRODUCT_ART = {
  "vit-c-scrub": (uid) => `
    <defs><radialGradient id="g${uid}" cx="35%" cy="30%" r="75%"><stop offset="0%" stop-color="#FCEFDD"/><stop offset="100%" stop-color="#F2D3E8"/></radialGradient></defs>
    <rect width="200" height="200" fill="url(#g${uid})"/>
    ${orangeSlice(70,150,34)}
    ${orangeSlice(150,55,22)}
    ${jarBase(128,120,58,46,"#EFE2C9")}
    <circle cx="128" cy="97" r="27" fill="#F7B95F" opacity=".9"/>
    ${riseBubbles(128,105,"#fff",0)}
    ${leafPair(45,55,0.7,"#8FAE6B")}
  `,
  "lavender-cream": (uid) => `
    <defs><radialGradient id="g${uid}" cx="35%" cy="25%" r="80%"><stop offset="0%" stop-color="#F1E3FA"/><stop offset="100%" stop-color="#D9BDEF"/></radialGradient></defs>
    <rect width="200" height="200" fill="url(#g${uid})"/>
    ${jarBase(70,135,46,50,"#E9D6F5")}
    ${jarBase(128,145,54,58,"#F3E9FB")}
    <ellipse cx="128" cy="108" rx="24" ry="10" fill="#EADCF6"/>
    ${jarBase(178,140,36,42,"#E3CDF2")}
    ${lavenderSprig(150,55,1.15,10)}
    ${lavenderSprig(50,60,0.9,-14)}
    ${glossSweep(90,90,60,70)}
  `,
  "aloe-tea-tree": (uid) => `
    <defs><radialGradient id="g${uid}" cx="40%" cy="25%" r="80%"><stop offset="0%" stop-color="#FCEFDD"/><stop offset="100%" stop-color="#F2D3E8"/></radialGradient></defs>
    <rect width="200" height="200" fill="url(#g${uid})"/>
    <g>
      <path d="M96 60C86 60 80 70 80 82V150C80 158 88 164 100 164C112 164 120 158 120 150V82C120 70 114 60 104 60Z" fill="#CDE9C8" opacity=".55"/>
      <path d="M100 78V148" stroke="#5C8A56" stroke-width="2"/>
    </g>
    ${riseBubbles(100,120,"#8FD19E",0.4)}
    ${leafPair(150,60,1.1,"#6E9C5C")}
    ${leafPair(48,145,0.8,"#6E9C5C")}
    ${dropletFall(100,50,150,0.2)}
  `,
  "de-tan-pack": (uid) => `
    <defs><radialGradient id="g${uid}" cx="35%" cy="30%" r="78%"><stop offset="0%" stop-color="#F1E3FA"/><stop offset="100%" stop-color="#D9BDEF"/></radialGradient></defs>
    <rect width="200" height="200" fill="url(#g${uid})"/>
    <g transform="translate(70,90)">
      <path d="M0 0C-32 4 -34 46 0 56C34 46 32 4 0 0Z" fill="#F0A34E"/>
      <path d="M0 0C-32 4 -34 46 0 56C34 46 32 4 0 0Z" fill="none" stroke="#D98A34" stroke-width="1.5" opacity=".5"/>
      <path d="M-26 8C-10 2 10 2 26 8" stroke="#D98A34" stroke-width="1.3" fill="none" opacity=".6"/>
    </g>
    ${jarBase(148,130,50,44,"#EFE2C9")}
    <ellipse cx="148" cy="112" rx="20" ry="8" fill="#E4B25A"/>
    ${leafPair(150,55,0.9,"#8FAE6B")}
  `,
  "vit-c-serum": (uid) => `
    <defs><radialGradient id="g${uid}" cx="35%" cy="25%" r="80%"><stop offset="0%" stop-color="#FCEFDD"/><stop offset="100%" stop-color="#F2D3E8"/></radialGradient></defs>
    <rect width="200" height="200" fill="url(#g${uid})"/>
    ${dropperBottle(100,130,78,"#F4C97A","#E8A23A")}
    ${dropletFall(100,150,180,0)}
    ${orangeSlice(155,60,26)}
    ${orangeSlice(45,150,20)}
    ${leafPair(48,60,0.8,"#8FAE6B")}
  `,
  "shea-moisturizer": (uid) => `
    <defs><radialGradient id="g${uid}" cx="35%" cy="25%" r="80%"><stop offset="0%" stop-color="#FBF3E6"/><stop offset="100%" stop-color="#EAD9C3"/></radialGradient></defs>
    <rect width="200" height="200" fill="url(#g${uid})"/>
    ${jarBase(105,130,66,58,"#F5E6CC")}
    <ellipse cx="105" cy="98" rx="28" ry="11" fill="#F0DDB8"/>
    <g transform="translate(150,60)">
      <ellipse cx="0" cy="0" rx="22" ry="17" fill="#C99A5B"/>
      <ellipse cx="0" cy="0" rx="22" ry="17" fill="#B8874A" opacity=".3"/>
    </g>
    ${leafPair(45,155,0.9,"#7C9163")}
    ${glossSweep(75,100,50,60)}
  `,
  "rosemary-serum": (uid) => `
    <defs><radialGradient id="g${uid}" cx="35%" cy="25%" r="80%"><stop offset="0%" stop-color="#EDF2E3"/><stop offset="100%" stop-color="#D2E2D6"/></radialGradient></defs>
    <rect width="200" height="200" fill="url(#g${uid})"/>
    ${dropperBottle(100,130,80,"#CFE0BE","#8FA860")}
    ${dropletFall(100,148,180,0.6)}
    <g transform="translate(148,55) rotate(18)">
      <line x1="0" y1="0" x2="0" y2="50" stroke="#6E8B54" stroke-width="2"/>
      ${[6,16,26,36,44].map((y,i)=>`<line x1="0" y1="${y}" x2="${i%2?11:-11}" y2="${y-4}" stroke="#7FA35F" stroke-width="1.6"/>`).join("")}
      <animateTransform attributeName="transform" type="rotate" values="14 0 0;22 0 0;14 0 0" dur="5s" repeatCount="indefinite" additive="sum"/>
    </g>
    ${leafPair(45,150,0.8,"#6E8B54")}
  `,
  "bridal-facial-kit": (uid) => `
    <defs><radialGradient id="g${uid}" cx="35%" cy="25%" r="80%"><stop offset="0%" stop-color="#E7D6F5"/><stop offset="100%" stop-color="#C9A8E8"/></radialGradient></defs>
    <rect width="200" height="200" fill="url(#g${uid})"/>
    <g transform="translate(100,140)">
      <rect x="-58" y="-14" width="116" height="54" rx="6" fill="#F4ECFB"/>
      <rect x="-58" y="-14" width="116" height="16" rx="6" fill="#E3CDF2"/>
      <path d="M-58 -14L-40 -40H40L58 -14Z" fill="#F8F2FC" opacity=".9"/>
    </g>
    ${jarBase(78,110,20,30,"#E9D6F5")}
    ${jarBase(102,104,20,36,"#F3E9FB")}
    ${jarBase(126,112,20,28,"#E3CDF2")}
    ${lavenderSprig(155,55,0.9,14)}
    ${riseBubbles(102,90,"#fff",0.3)}
  `
};

let _artUid = 0;
function productArtSVG(p){
  _artUid++;
  const uid = "pa" + _artUid + "-" + p.id;
  const gen = PRODUCT_ART[p.id];
  const inner = gen ? gen(uid) : `<rect width="200" height="200" fill="#F1E7FA"/>`;
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
}
function productArt(p){
  if(p.photo){
    return `<img src="${p.photo}" alt="${p.name}" class="product-photo" loading="lazy" data-art-fallback="${p.id}">`;
  }
  return `<div class="art-fallback">${productArtSVG(p)}</div>`;
}
// Image load errors don't bubble, so this listener is attached with capture=true.
// If a photo referenced in data.js is missing or fails to load, swap in the
// illustrated fallback automatically instead of leaving a broken image icon.
document.addEventListener("error", e => {
  const img = e.target;
  if(img && img.tagName === "IMG" && img.dataset && img.dataset.artFallback){
    const p = findProduct(img.dataset.artFallback);
    if(!p) return;
    const wrapper = document.createElement("div");
    wrapper.className = "art-fallback";
    wrapper.innerHTML = productArtSVG(p);
    img.replaceWith(wrapper);
  }
}, true);

/* ---------------- Utilities ---------------- */
const fmt = n => "₹" + n.toLocaleString("en-IN");
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
function findProduct(id){ return PRODUCTS.find(p => p.id === id); }
function findIngredient(id){ return INGREDIENTS.find(i => i.id === id); }

function showToast(msg, ok=true){
  const t = $("#toast");
  t.innerHTML = (ok ? ICONS.check : "") + `<span>${msg}</span>`;
  t.classList.add("show");
  clearTimeout(showToast._tm);
  showToast._tm = setTimeout(()=> t.classList.remove("show"), 2600);
}

// async function saveOrderBestEffort(orderData){
//   try{
//     if(window.LavenAuth && typeof window.LavenAuth.saveOrder === 'function'){
//       await window.LavenAuth.saveOrder(orderData);
//     }
//   }catch(e){
//     console.warn('Order save to database failed (non-critical for the customer):', e);
//   }
// }

async function saveOrderBestEffort(orderData, userId){
  try{
    if(window.LavenAuth && typeof window.LavenAuth.saveOrder === 'function'){
      await window.LavenAuth.saveOrder(orderData, userId);
    }
  }catch(e){
    console.warn('Order save to database failed:', e);
  }
}

/* ---------------- Cart state ---------------- */
const Cart = {
  key: "laven_herbs_cart",
  items: [],
  load(){
    try{ this.items = JSON.parse(localStorage.getItem(this.key)) || []; }
    catch(e){ this.items = []; }
  },
  save(){ localStorage.setItem(this.key, JSON.stringify(this.items)); this.render(); },
  add(id, qty=1){
    const p = findProduct(id);
    if(!p || !p.inStock) return;
    const existing = this.items.find(i => i.id === id);
    if(existing) existing.qty += qty;
    else this.items.push({ id, qty });
    this.save();
    showToast(`${p.name.split(" ").slice(0,4).join(" ")}… is in your bag. Excellent choice.`);
    flyToCart();
    openCart();
  },
  updateQty(id, qty){
    const it = this.items.find(i => i.id === id);
    if(!it) return;
    it.qty = qty;
    if(it.qty <= 0) this.items = this.items.filter(i => i.id !== id);
    this.save();
  },
  remove(id){ this.items = this.items.filter(i => i.id !== id); this.save(); },
  clear(){ this.items = []; this.save(); },
  count(){ return this.items.reduce((s,i)=> s+i.qty, 0); },
  subtotal(){ return this.items.reduce((s,i)=>{ const p = findProduct(i.id); return p ? s + p.price*i.qty : s; }, 0); },
  mrpTotal(){ return this.items.reduce((s,i)=>{ const p = findProduct(i.id); return p ? s + p.mrp*i.qty : s; }, 0); },

  render(){
    $("#cartCount").textContent = this.count();
    $("#cartDrawerCount").textContent = `(${this.count()})`;
    const wrap = $("#cartItems");
    if(this.items.length === 0){
      wrap.innerHTML = `<div class="cart-empty">${ICONS.bag}<p>Your bag is as empty as a desert. Let's hydrate it.</p></div>`;
      $("#cartDrawerFoot").style.display = "none";
      return;
    }
    $("#cartDrawerFoot").style.display = "block";
    wrap.innerHTML = this.items.map(it => {
      const p = findProduct(it.id);
      if(!p) return "";
      return `
      <div class="cart-item" data-id="${p.id}">
        <div class="cart-item-thumb ${tintFor(p)}">${iconFor(p.category)}</div>
        <div class="cart-item-body">
          <h4>${p.name}</h4>
          <div class="cart-item-meta">${p.size}</div>
          <div class="cart-item-row">
            <div class="qty-stepper">
              <button data-act="dec">−</button>
              <span>${it.qty}</span>
              <button data-act="inc">+</button>
            </div>
            <div class="cart-item-price">${fmt(p.price * it.qty)}</div>
          </div>
          <button class="cart-item-remove" data-act="remove">Remove</button>
        </div>
      </div>`;
    }).join("");
    $("#cartSubtotal").textContent = fmt(this.subtotal());
  }
};

/* cart item interactions (event delegation) */
$("#cartItems").addEventListener("click", e => {
  const btn = e.target.closest("button[data-act]");
  if(!btn) return;
  const id = btn.closest(".cart-item").dataset.id;
  const it = Cart.items.find(i => i.id === id);
  if(!it) return;
  if(btn.dataset.act === "inc") Cart.updateQty(id, it.qty+1);
  if(btn.dataset.act === "dec") Cart.updateQty(id, it.qty-1);
  if(btn.dataset.act === "remove") Cart.remove(id);
});

/* ---------------- Drawer / menu / search open-close ---------------- */
let lastClickPos = { x: window.innerWidth/2, y: window.innerHeight/2 };
document.addEventListener("click", e => { lastClickPos = { x: e.clientX, y: e.clientY }; }, true);

function flyToCart(){
  const cartBtn = $("#cartToggle");
  if(!cartBtn) return;
  const target = cartBtn.getBoundingClientRect();
  const dot = document.createElement("div");
  dot.className = "fly-dot";
  dot.style.left = lastClickPos.x + "px";
  dot.style.top = lastClickPos.y + "px";
  document.body.appendChild(dot);
  requestAnimationFrame(() => {
    dot.style.transform = `translate(${target.left + target.width/2 - lastClickPos.x}px, ${target.top + target.height/2 - lastClickPos.y}px) scale(.2)`;
    dot.style.opacity = "0";
  });
  setTimeout(() => {
    dot.remove();
    cartBtn.classList.add("bump");
    setTimeout(() => cartBtn.classList.remove("bump"), 350);
  }, 500);
}

function openCart(){ $("#cartDrawer").classList.add("open"); $("#scrim").classList.add("show"); }
function closeCart(){ $("#cartDrawer").classList.remove("open"); $("#scrim").classList.remove("show"); }
$("#cartToggle").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);

function openMobileMenu(){
  $("#mobileMenu").classList.add("open"); $("#scrim").classList.add("show");
  const authLink = document.getElementById('mobileMenuAuthLink');
  const authLabel = document.getElementById('mobileMenuAuthLabel');
  if(authLink && typeof firebase !== 'undefined' && firebase.auth().currentUser){
    authLink.setAttribute('href', '#/account');
    if(authLabel) authLabel.textContent = 'Account';
  }else if(authLink){
    authLink.setAttribute('href', '#/login');
    if(authLabel) authLabel.textContent = 'Login';
  }
}
function closeMobileMenu(){ $("#mobileMenu").classList.remove("open"); $("#scrim").classList.remove("show"); }
$("#hamburgerBtn").addEventListener("click", openMobileMenu);
const mobileMenuSearchBtn = document.getElementById('mobileMenuSearchBtn');
if(mobileMenuSearchBtn){
  mobileMenuSearchBtn.addEventListener('click', () => {
    closeMobileMenu();
    openSearch();
  });
}
$("#mobileMenuClose").addEventListener("click", closeMobileMenu);

$("#scrim").addEventListener("click", () => { closeCart(); closeMobileMenu(); closeSearch(); });

function openSearch(){
  $("#searchPanel").classList.add("open");
  setTimeout(()=> $("#searchInput").focus(), 300);
}
function closeSearch(){ $("#searchPanel").classList.remove("open"); $("#searchInput").value=""; $("#searchResults").innerHTML=""; }
$("#searchBtn").addEventListener("click", openSearch);
$("#searchClose").addEventListener("click", closeSearch);
$("#searchInput").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  const box = $("#searchResults");
  if(!q){ box.innerHTML = ""; return; }
  const hits = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  box.innerHTML = hits.length ? hits.map(p => `
    <a href="#" class="search-hit" data-open-pdp="${p.id}"><b>${p.name}</b><span>${fmt(p.price)}</span></a>
  `).join("") : `<div class="search-empty">Nothing here but empty jars. Try a different word?</div>`;
});
$("#searchResults").addEventListener("click", e => {
  const hit = e.target.closest("[data-open-pdp]");
  if(!hit) return;
  e.preventDefault();
  closeSearch();
  openPDP(hit.dataset.openPdp);
});

document.addEventListener("keydown", e => {
  if(e.key === "Escape"){ closeCart(); closeMobileMenu(); closeSearch(); closePDP(); }
});

/* close mobile menu / cart automatically when a nav link is clicked */
document.addEventListener("click", e => {
  if(e.target.closest("[data-link]")){ closeMobileMenu(); closeCart(); }
});

/* header shadow on scroll */
window.addEventListener("scroll", () => {
  $("#siteHeader").classList.toggle("scrolled", window.scrollY > 10);
}, { passive:true });

/* ---------------- Product card + PDP ---------------- */
function productCard(p){
  const isComingSoon = p.badge === "Coming Soon";
  return `
  <article class="product-card reveal" data-id="${p.id}">
    <div class="product-media ${tintFor(p)}" data-open-pdp="${p.id}">
      ${productArt(p)}
      ${p.badge ? `<span class="product-badge ${isComingSoon?'soon':''}">${p.badge}</span>` : ""}
      ${p.inStock ? `<button class="product-quickadd" data-quickadd="${p.id}">Add to Bag</button>` : ""}
    </div>
    <div data-open-pdp="${p.id}">
      <div class="product-info">
        <span class="product-name">${p.name}</span>
        ${isComingSoon ? "" : `<span class="product-price">${p.mrp ? `<span class="product-mrp">${fmt(p.mrp)}</span>` : ""}${fmt(p.price)}</span>`}
      </div>
      <p class="product-desc">${p.short}</p>
      <span class="product-view">${isComingSoon ? "Notify Me" : "View Product"} →</span>
    </div>
  </article>`;
}

document.addEventListener("click", e => {
  const openBtn = e.target.closest("[data-open-pdp]");
  const quickAdd = e.target.closest("[data-quickadd]");
  if(quickAdd){ e.stopPropagation(); Cart.add(quickAdd.dataset.quickadd); return; }
  if(openBtn){ openPDP(openBtn.dataset.openPdp); }
});

let pdpQty = 1;
function openPDP(id){
  const p = findProduct(id);
  if(!p) return;
  const isComingSoon = p.badge === "Coming Soon";
  pdpQty = 1;
  let overlay = $("#pdpOverlay");
  if(!overlay){
    overlay = document.createElement("div");
    overlay.className = "pdp-overlay";
    overlay.id = "pdpOverlay";
    document.body.appendChild(overlay);
    overlay.addEventListener("click", e => { if(e.target === overlay) closePDP(); });
  }
  overlay.innerHTML = `
    <div class="pdp-modal">
      <button class="pdp-close" id="pdpClose">&times;</button>
      <div class="pdp-media ${tintFor(p)}">${productArt(p)}</div>
      <div class="pdp-body">
        ${p.badge ? `<span class="pdp-badge ${isComingSoon?'soon':''}">${p.badge}</span>` : ""}
        <h2>${p.name}</h2>
        <span class="pdp-size">${p.size}</span>
        ${isComingSoon ? `<div class="pdp-price pdp-price-soon">Price revealed at launch</div>` : `<div class="pdp-price">${p.mrp ? `<span class="pdp-mrp">${fmt(p.mrp)}</span>` : ""}${fmt(p.price)}</div>`}
        <p class="pdp-desc">${p.description}</p>
        <div class="pdp-ingredients">${p.ingredients.map(i=>`<span>${i}</span>`).join("")}</div>
        <div class="pdp-qty-row">
          ${p.inStock ? `
          <div class="qty-stepper" id="pdpStepper">
            <button data-pdp-act="dec">−</button>
            <span id="pdpQtyVal">1</span>
            <button data-pdp-act="inc">+</button>
          </div>` : ""}
          <button class="btn btn-primary" id="pdpAddBtn">
            ${p.inStock ? "Add to Bag" : "Notify Me"}
          </button>
        </div>
        <div class="pdp-stock ${p.inStock ? 'in' : ''}">${p.inStock ? "✓ In stock, ready to ship" : "Launching soon — check back shortly"}</div>
      </div>
    </div>`;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  $("#pdpClose").addEventListener("click", closePDP);
  const stepperEl = $("#pdpStepper");
  if(stepperEl) stepperEl.addEventListener("click", e => {
    const btn = e.target.closest("button"); if(!btn) return;
    pdpQty = btn.dataset.pdpAct === "inc" ? pdpQty+1 : Math.max(1, pdpQty-1);
    $("#pdpQtyVal").textContent = pdpQty;
  });
  $("#pdpAddBtn").addEventListener("click", () => {
    if(!p.inStock){ showToast("Noted! We'll email you the second it's back."); return; }
    Cart.add(p.id, pdpQty);
    closePDP();
  });
}
function closePDP(){
  const overlay = $("#pdpOverlay");
  if(overlay) overlay.classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------------- Scroll reveal ---------------- */
function initReveal(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold:.12 });
  $$(".reveal").forEach(el => io.observe(el));
}

/* =========================================================
   PAGE TEMPLATES
   ========================================================= */
// function heroSprigs(){
//   let out = "";
//   const positions = [
//     {t:"8%",l:"6%",s:60,r:-10}, {t:"58%",l:"88%",s:90,r:18}, {t:"14%",l:"78%",s:50,r:8}, {t:"78%",l:"14%",s:70,r:-16}
//   ];
//   positions.forEach(p => {
//     out += `<img src="assets/logo-icon.png" alt="" style="top:${p.t};left:${p.l};width:${p.s}px;--r:${p.r}deg">`;
//   });
//   return out;
// }
function heroSprigs(){
  let out = "";
  const positions = [
    {t:"8%",  l:"4%",  s:55, r:-10},
    {t:"72%", l:"48%", s:70, r:12},
    {t:"18%", l:"36%", s:42, r:8},
    {t:"80%", l:"8%",  s:60, r:-16}
  ];
  positions.forEach(p => {
    out += `<img src="assets/logo-icon.png" alt="" style="top:${p.t};left:${p.l};width:${p.s}px;--r:${p.r}deg">`;
  });
  return out;
}

function ritualScene(){
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%">
    <defs><radialGradient id="ritualBg" cx="30%" cy="20%" r="85%"><stop offset="0%" stop-color="#F1E3FA"/><stop offset="100%" stop-color="#B79FD9"/></radialGradient></defs>
    <rect width="400" height="400" fill="url(#ritualBg)"/>
    ${jarBase(150,270,86,72,"#F3E9FB")}
    <ellipse cx="150" cy="234" rx="38" ry="15" fill="#EADCF6"/>
    ${riseBubbles(150,220,"#fff",0.2)}
    ${glossSweep(115,205,70,95)}
    ${dropperBottle(268,260,120,"#E9D6F5","#8257B3")}
    ${dropletFall(268,208,320,0.5)}
    ${lavenderSprig(90,150,1.5,-12)}
    ${lavenderSprig(320,120,1.3,16)}
    ${lavenderSprig(230,90,1.1,-6)}
    ${leafPair(60,300,1.3,"#7C9163")}
    ${leafPair(340,320,1.1,"#8FAE6B")}
  </svg>`;
}

function renderHome(){
  const featured = PRODUCTS.slice(0,4);
  return `
  <section class="hero">
    <div class="hero-sprigs">${heroSprigs()}</div>
    <div class="hero-inner">
      <div class="hero-copy">
        <span class="hero-eyebrow">Herbal Skincare &amp; Beauty</span>
        <h1>Nature's Wisdom,<span class="line2">Botanically Refined</span></h1>
        <p class="hero-sub">Herbal skincare rooted in ancient botanicals, crafted for modern rituals — by two founders who believe skin deserves the truth.</p>
        <div class="hero-ctas">
          <a href="#/shop" data-link class="btn btn-primary">Explore the Collection</a>
          <a href="#/about" data-link class="btn btn-outline-light">Our Story</a>
        </div>
      </div>

      <div class="hero-product-card" id="heroProductCard" data-open-pdp="facial-kit">
        <div class="product-card-inner">
          <span class="product-ribbon">Bestseller</span>
          <span class="hover-hint">Tap to view →</span>
          <div class="product-image-wrapper">
            <img src="assets/product_images/Facial-kit.jpeg" alt="Laven Herbs Facial Kit">
          </div>
          <div class="product-card-eyebrow">Signature Ritual</div>
          <h3 class="product-card-title">The Complete Facial Kit</h3>
          <p class="product-card-sub">Scrub · Massage Cream · Aloe Gel · Face Pack</p>
          <div class="product-card-bottom">
            <div class="product-card-price">
              <span class="mrp">₹499</span>
              <span class="price">₹249</span>
            </div>
            <span class="product-card-cta">
              View Product
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-scroll">Scroll</div>
  </section>

  <section class="trust-strip">
    <div class="container trust-strip-inner">
      <div class="trust-strip-item reveal">${ICONS.heart}<span>Loved by Skincare Enthusiasts</span></div>
      <div class="trust-strip-item reveal">${ICONS.leaf}<span>100% Vegan &amp; Cruelty-Free</span></div>
      <div class="trust-strip-item reveal">${ICONS.flask}<span>Small-Batch, Always Fresh</span></div>
      <div class="trust-strip-item reveal">${ICONS.truck}<span>Free Shipping Over ₹499</span></div>
    </div>
  </section>

  <div class="marquee-strip"><div class="announce-track">
    <span>VITAMIN C</span><span>•</span><span>LAVENDER</span><span>•</span><span>ALOE VERA</span><span>•</span>
    <span>TEA TREE</span><span>•</span><span>SHEA BUTTER</span><span>•</span><span>ROSEMARY</span><span>•</span>
    <span>VITAMIN C</span><span>•</span><span>LAVENDER</span><span>•</span><span>ALOE VERA</span><span>•</span>
    <span>TEA TREE</span><span>•</span><span>SHEA BUTTER</span><span>•</span><span>ROSEMARY</span><span>•</span>
  </div></div>

  <section class="section container">
    <div class="section-head reveal">
      <div>
        <span class="eyebrow">Featured Products</span>
        <h2>Crafted with purpose.</h2>
      </div>
      <p>Four botanicals, chosen by our community — the formulas people reach for again and again.</p>
    </div>
    <div class="product-grid">${featured.map(productCard).join("")}</div>
    <div class="section-cta-center reveal">
      <a href="#/shop" data-link class="btn btn-outline">Shop All Products</a>
    </div>
  </section>



  <section class="section container">
  <div class="split reveal">
    <div class="split-media split-media-scene">
      <video 
        src="assets/ritual-video.mp4" 
        class="premium-ritual-video"
        autoplay 
        loop 
        muted 
        playsinline
      ></video>
    </div>
    <div class="split-copy">
      <span class="eyebrow">Begin Your Ritual</span>
      <h2>Discover Your Ritual</h2>
      <p class="split-lede">Every skin is unique. Every ritual should be too.</p>
      <p>Explore our full collection and find the botanicals that speak to yours.</p>
      <div><a href="#/shop" data-link class="btn btn-primary">Shop All Products</a></div>
    </div>
  </div>
</section>

  <section class="values-strip section-tight">
    <div class="values-grid">
      <div class="value-item reveal">${ICONS.leaf}<h4>100% Botanical</h4><p>Every formula built on real, traceable plant ingredients.</p></div>
      <div class="value-item reveal">${ICONS.heart}<h4>Cruelty-Free</h4><p>Never tested on animals — Leaping Bunny aligned.</p></div>
      <div class="value-item reveal">${ICONS.flask}<h4>Small-Batch</h4><p>Formulated in limited runs for maximum potency.</p></div>
      <div class="value-item reveal">${ICONS.truck}<h4>Free Shipping</h4><p>On every order above ₹499, pan-India.</p></div>
    </div>
  </section>

  <section class="section container">
    <div class="section-head reveal">
      <div>
        <span class="eyebrow">Ingredient Spotlight</span>
        <h2>What's actually inside.</h2>
      </div>
      <p>Swipe through the botanicals doing the real work in every formula.</p>
    </div>
    <div class="ing-carousel-wrap reveal">
      <button class="ing-nav prev" id="ingPrev" aria-label="Previous">‹</button>
      <div class="ing-carousel" id="ingCarousel">
        ${INGREDIENTS.map((ing,i)=>`
          <div class="ing-card tint-${['lavender','citrus','sage','cream'][i%4]}" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; position: relative;">
            
            <!-- Floating tag with slightly tighter spacing -->
            <span class="ing-card-tag" style="position: absolute; top: 12px; right: 12px; z-index: 10;">${ing.tag}</span>
            
            <!-- Image with a smaller height so the card isn't massive -->
            ${ing.photo 
              ? `<img src="${ing.photo}" alt="${ing.name}" style="width: 100%; height: 220px; object-fit: cover; display: block;" />`
              : `<div style="height: 220px; display: flex; align-items: center; justify-content: center;">${ICONS.leaf}</div>`
            }
            
            <!-- Text squeezed closely together -->
            <div style="padding: 12px 16px 16px 16px; display: flex; flex-direction: column; gap: 4px;">
              <h4 style="margin: 0;">${ing.name}</h4>
              <p style="margin: 0; line-height: 1.2;">${ing.tagline}</p>
              <a href="#/ingredients" data-link style="margin: 0;">Learn more →</a>
            </div>

          </div>
        `).join("")}
      </div>
      <button class="ing-nav next" id="ingNext" aria-label="Next">›</button>
    </div>
  </section>

  <section class="section testimonial-section">
    <div class="container">
      <div class="testimonial reveal">
        <div class="stars">★★★★★</div>
        <blockquote>"The Lavender Face Massage Cream changed my nightly routine completely — my skin has never looked this calm and even."</blockquote>
        <cite>— Riya M., Verified Buyer</cite>
      </div>
    </div>
  </section>

  <section class="section social-feed-section">
    <div class="container">
      <div class="section-head reveal" style="margin-bottom:36px">
        <div>
          <span class="eyebrow">@lavenherbs</span>
          <h2>Follow the Ritual</h2>
        </div>
        
        <div class="social-cta-row">
          <a href="https://www.instagram.com/lavenherbs?stkn=bGJmMGtwZjJzYTQ5" target="_blank" rel="noopener" class="social-cta-btn instagram">
            <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>
            Instagram
          </a>
          <a href="https://youtube.com/@lavenherbs?si=Nra68UlILvrCoQy7" target="_blank" rel="noopener" class="social-cta-btn youtube">
            <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" stroke-width="1.8"/><path d="M10 9l6 3-6 3V9z" fill="currentColor"/></svg>
            YouTube
          </a>
        </div>
      </div>
      <div class="social-grid">
                ${[
          {tint:"citrus", img:"assets/product_images/Facescrub.jpeg", label:"1. Scrub"},
          {tint:"sage", img:"assets/product_images/Massagecream.jpeg", label:"2. Massage Cream"},
          {tint:"lavender", img:"assets/product_images/AloeveraGel.jpeg", label:"3. Aloe Vera Gel"},
          {tint:"cream", img:"assets/product_images/Facepack.jpeg", label:"4. Face Pack"}
        ].map(t=>`
          <div class="social-tile tint-${t.tint} reveal" style="padding: 0; overflow: hidden; position: relative;">
            
            <!-- The Image -->
            <img src="${t.img}" alt="${t.label}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            
            <!-- The sleek floating label at the bottom -->
            <div style="position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); background: rgba(255, 255, 255, 0.95); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; color: var(--purple-950); box-shadow: 0 4px 10px rgba(0,0,0,0.1); z-index: 5; white-space: nowrap;">
              ${t.label}
            </div>

            <!-- The heart overlay on hover -->
            <div class="social-tile-overlay">${ICONS.heart}</div>
            
          </div>
        `).join("")}
      </div>
    </div>
  </section>

 <!-- ELEVATED CTA SECTION -->
  <section class="container" style="padding: 60px 20px; margin-bottom: 40px;">
    
    <!-- Image Wrapper -->
    <div class="reveal" style="position: relative; border-radius: 24px; overflow: hidden; background-image: url('assets/product_images/Background.png'); background-size: cover; background-position: center center; min-height: 450px; display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 32px rgba(0,0,0,0.08);">
      
      <!-- Elegant Gradient Overlay for Readability -->
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(35, 20, 50, 0.85) 0%, rgba(65, 40, 90, 0.5) 100%); z-index: 1;"></div>
      
      <!-- Text Content -->
      <div style="position: relative; z-index: 2; text-align: center; color: white; padding: 40px; max-width: 700px; margin: 0 auto;">
        
        <h2 style="font-size: clamp(2.5rem, 4vw, 3.8rem); margin: 0 0 16px 0; letter-spacing: -1px; text-transform: uppercase; line-height: 1.1; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
          Experience the Difference.
        </h2>
        
        <p style="font-size: 1.15rem; margin: 0 auto 32px auto; opacity: 0.95; line-height: 1.6; max-width: 550px;">
          Explore our full collection of botanical skincare, crafted with intention for every skin type.
        </p>
        
        <!-- Premium Solid Button -->
        <a href="#/shop" data-link style="display: inline-block; background: #ffffff; color: var(--purple-950); padding: 16px 36px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 30px; font-size: 0.95rem; box-shadow: 0 8px 20px rgba(0,0,0,0.15); transition: all 0.3s ease;">
          Shop the Collection
        </a>
        
      </div>
    </div>
  </section>
  `;
}

function wireHomePage(){
  const carousel = $("#ingCarousel");
  if(!carousel) return;
  const cardWidth = () => carousel.querySelector(".ing-card")?.offsetWidth + 20 || 280;
  $("#ingNext")?.addEventListener("click", () => carousel.scrollBy({ left: cardWidth(), behavior:"smooth" }));
  $("#ingPrev")?.addEventListener("click", () => carousel.scrollBy({ left: -cardWidth(), behavior:"smooth" }));
}

function renderShop(params){
  const activeCat = params.get("cat") || "All";
  const q = params.get("q") || "";
  return `
  <section class="page-hero botanical-hero" style="padding: 40px 20px !important; min-height: 200px !important; height: auto !important; display: flex; align-items: center; justify-content: center;">
    <div class="container" style="display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: center; margin: 0 auto; width: 100%;">
      <span class="eyebrow" style="font-size: 0.85rem; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px;">The Collection</span>
      
      <h1 style="font-size: clamp(2rem, 3.5vw, 3rem); line-height: 1.1; margin: 0 0 16px 0; letter-spacing: -0.5px; text-transform: uppercase;">
        Shop All Products
      </h1>
      
      <p style="margin: 0 auto; opacity: 0.9; font-size: 1.05rem; max-width: 500px; text-align: center;">
        Every formula crafted with intention. Every ingredient chosen with care.
      </p>
    </div>
  </section>
  <section class="section container" style="padding-top:0">
    <div class="filter-bar" id="filterBar">
      ${CATEGORIES.map(c => `<button class="filter-chip ${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`).join("")}
    </div>
    <div class="results-count" id="resultsCount"></div>
    <div class="product-grid" id="shopGrid"></div>
  </section>
  `;
}

function wireShopPage(params){
  let activeCat = params.get("cat") || "All";
  const grid = $("#shopGrid");
  const countEl = $("#resultsCount");
  function draw(){
    const list = activeCat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);
    grid.innerHTML = list.map(productCard).join("") || `<p style="grid-column:1/-1;color:var(--ink-faint)">Nothing here yet — this shelf is still being stocked.</p>`;
    countEl.textContent = `${list.length} product${list.length===1?"":"s"}`;
    initReveal();
  }
  $("#filterBar").addEventListener("click", e => {
    const btn = e.target.closest(".filter-chip");
    if(!btn) return;
    activeCat = btn.dataset.cat;
    $$(".filter-chip").forEach(c => c.classList.toggle("active", c === btn));
    const url = activeCat === "All" ? "#/shop" : `#/shop?cat=${encodeURIComponent(activeCat)}`;
    history.replaceState(null, "", url);
    draw();
  });
  draw();
}

// function founderBlock(f, idx){
//   return `
//   <div class="founder-block reveal">
//     <div class="founder-photo tint-${idx % 2 === 0 ? 'lavender' : 'citrus'}">
//       <svg viewBox="0 0 100 130" fill="none"><path d="M50 10c-18 0-30 14-30 32 0 22 14 40 30 40s30-18 30-40c0-18-12-32-30-32z" stroke="currentColor" stroke-width="1.6" opacity=".55"/><path d="M20 128c0-22 13-38 30-38s30 16 30 38" stroke="currentColor" stroke-width="1.6" opacity=".55"/></svg>
//     </div>
//     <div>
//       <span class="founder-eyebrow">${idx === 0 ? "The Founder" : "The Co-Founder"}</span>
//       <h3>${f.name}</h3>
//       <span class="founder-role">${f.role}</span>
//       <p class="founder-quote">"${f.quote}"</p>
//       <div class="founder-bio">${f.bio.map(p=>`<p>${p}</p>`).join("")}</div>
//     </div>
//   </div>`;
// }

function founderBlock(f, idx){
  return `
  <div class="founder-block reveal">
    <div class="founder-photo tint-${idx % 2 === 0 ? 'lavender' : 'citrus'}" style="${f.photo ? 'padding: 0; overflow: hidden;' : ''}">
      ${f.photo 
        ? `<img src="${f.photo}" alt="${f.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;" />`
        : `<svg viewBox="0 0 100 130" fill="none"><path d="M50 10c-18 0-30 14-30 32 0 22 14 40 30 40s30-18 30-40c0-18-12-32-30-32z" stroke="currentColor" stroke-width="1.6" opacity=".55"/><path d="M20 128c0-22 13-38 30-38s30 16 30 38" stroke="currentColor" stroke-width="1.6" opacity=".55"/></svg>`
      }
    </div>
    <div>
      <span class="founder-eyebrow">${idx === 0 ? "The Founder" : "The Co-Founder"}</span>
      <h3>${f.name}</h3>
      <span class="founder-role">${f.role}</span>
      <p class="founder-quote">"${f.quote}"</p>
      <div class="founder-bio">${f.bio.map(p=>`<p>${p}</p>`).join("")}</div>
    </div>
  </div>`;
}

function renderAbout(){
  return `
  <!-- HERO SECTION (Kept exact same) -->
  <!-- HERO SECTION -->
  <section class="story-hero botanical-hero" style="padding: 60px 20px; min-height: auto;">
    <div class="container" style="text-align: center;">
      <span class="eyebrow" style="font-size: 0.85rem; margin-bottom: 12px; display: inline-block;">Our Story</span>
      <h1 style="font-size: clamp(2rem, 3.5vw, 3rem); line-height: 1.1; margin: 0; letter-spacing: -0.5px;">Rooted in Nature.<br>Refined by Purpose.</h1>
    </div>
  </section>

  <!-- MISSION SECTION (Kept exact same) -->
  <section class="section container">
    <div class="mission-block reveal">
      <div>
        <span class="eyebrow">Our Mission</span>
        <h2>Skincare that honours both skin and earth.</h2>
      </div>
      <div class="body-copy">
        <p>Laven Herbs was born from a deep respect for the natural world and a frustration with skincare that promised everything but delivered little. We set out to create something different — formulations that are honest, effective, and rooted in botanical science.</p>
        <p>Every product starts with a single question: does this ingredient earn its place? If a botanical doesn't visibly improve the formula, it doesn't make the cut. That discipline is why our ingredient lists are short, our sourcing is traceable, and our results speak for themselves.</p>
        <p>Today, Laven Herbs is run by two people who still read every customer message personally — because a brand this close to the skin should never feel far from the people behind it.</p>
      </div>
    </div>
  </section>

  <!-- NEW FOUNDERS EDITORIAL SECTION -->
  <section class="container" style="padding-bottom: 100px;">
    
    <div style="text-align: center; margin-bottom: 60px;">
      <h2 style="font-size: 2.2rem; color: #111;">Meet the Founders</h2>
      <div style="width: 40px; height: 2px; background: var(--purple-700); margin: 20px auto 0 auto;"></div>
    </div>

    <!-- Clean, borderless editorial grid with plenty of breathing room -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 80px;">
      
      <!-- Reordered Array: Aman [1] is first, Suchi [0] is second -->
      ${[FOUNDERS[1], FOUNDERS[0]].map(founder => `
        <div class="reveal" style="display: flex; flex-direction: column;">
          
          <!-- High-end Portrait Image -->
          <!-- Using aspect-ratio keeps the photo a perfect, controlled size without stretching -->
          <div style="width: 100%; aspect-ratio: 4/5; max-height: 560px; border-radius: 12px; overflow: hidden; margin-bottom: 32px; background: #fdfaf6;">
            <img src="${founder.photo}" alt="${founder.name}" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" />
          </div>
          
          <!-- Text Content (No borders, just clean typography) -->
          <div>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--purple-700); text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 8px;">The Founder</span>
            <h3 style="font-size: 2.5rem; margin: 0 0 4px 0; color: #111; letter-spacing: -0.5px;">${founder.name}</h3>
            <p style="font-size: 1rem; color: #888; font-family: monospace; margin: 0 0 32px 0;">${founder.role}</p>
            
            <!-- Editorial Quote -->
            <blockquote style="font-size: 1.35rem; font-style: italic; color: #111; margin: 0 0 32px 0; line-height: 1.5; padding-left: 24px; border-left: 2px solid var(--purple-300);">
              "${founder.quote}"
            </blockquote>
            
            <!-- Bio Paragraphs -->
            <div style="color: #555; line-height: 1.8; font-size: 1.05rem;">
              <p style="margin-bottom: 16px;">${founder.bio[0]}</p>
              <p style="margin-bottom: 0;">${founder.bio[1]}</p>
            </div>
          </div>
          
        </div>
      `).join('')}

    </div>
  </section>

  <!-- SUSTAINABILITY SECTION (Kept exact same) -->
  <section class="section" style="background:linear-gradient(150deg,#F3E8FB,#FCEFDD)">
    <div class="container" style="text-align:center">
      <span class="eyebrow">Sustainability</span>
      <h2 class="reveal" style="font-size:clamp(28px,4vw,44px); max-width:640px; margin:0 auto 18px">Good for skin. Better for the planet.</h2>
      <p class="reveal" style="max-width:520px;margin:0 auto;color:var(--ink-soft);font-size:15.5px;line-height:1.7">Recyclable glass packaging, ethically sourced botanicals from certified organic farms, and formulas that are always vegan, cruelty-free, and free from sulfates, parabens, and PEGs.</p>
    </div>
  </section>
  `;
}

function ingredientRow(ing, idx){
  const tint = ["lavender","citrus","sage","cream"][idx % 4];
  return `
  <div class="ingredient-row reveal">
    <div class="ingredient-media tint-${tint}">
      <span class="ingredient-tag">${ing.tag}</span>
      ${ICONS.leaf}
    </div>
    <div class="ingredient-copy">
      <span class="ingredient-latin">${ing.latin}</span>
      <h3>${ing.name}</h3>
      <span class="ingredient-tagline">${ing.tagline}</span>
      <p>${ing.body}</p>
      <div class="ingredient-foundin">Found in: ${ing.foundIn.map(id => {
        const p = findProduct(id); return p ? `<a href="#" data-open-pdp="${id}">${p.name.split(" ").slice(0,3).join(" ")}</a>` : "";
      }).join(", ")}</div>
    </div>
  </div>`;
}

function renderIngredients(){
  return `
  <section class="page-hero botanical-hero" style="padding: 40px 20px !important; min-height: 200px !important; height: auto !important; display: flex; align-items: center; justify-content: center;">
    <div class="container" style="display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: center; margin: 0 auto; width: 100%;">
      <span class="eyebrow" style="font-size: 0.85rem; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px;">The Library</span>
      
      <h1 style="font-size: clamp(2rem, 3.5vw, 3rem); line-height: 1.1; margin: 0 0 16px 0; letter-spacing: -0.5px;">
        Ingredients &amp; Benefits
      </h1>
      
      <p style="margin: 0 auto; opacity: 0.9; font-size: 1.05rem; max-width: 500px; text-align: center;">
        Every botanical we use, explained plainly — what it does and why it's in the bottle.
      </p>
    </div>
  </section>

  <!-- THE NEW VERTICAL GRID SECTION -->
  <section class="container" style="padding: 40px 0 80px;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 40px;">
      
      ${INGREDIENTS.map((ing) => `
        <div class="ing-page-card" style="display: flex; flex-direction: column; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.04);">
          
          <!-- Natural Image Header -->
          <div style="position: relative; width: 100%; height: 240px; background: #fdfaf6;">
            ${ing.photo 
              ? `<img src="${ing.photo}" alt="${ing.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />`
              : `<div style="height: 100%; display: flex; align-items: center; justify-content: center; opacity: 0.3;">${ICONS.leaf}</div>`
            }
            <!-- Floating Tag -->
            <span style="position: absolute; top: 16px; right: 16px; background: rgba(255, 255, 255, 0.95); padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; color: var(--purple-900); letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              ${ing.tag}
            </span>
          </div>

          <!-- Clean, Compact Text Area -->
          <div style="padding: 32px; display: flex; flex-direction: column; flex-grow: 1;">
            <div style="font-family: monospace; color: #999; font-size: 0.85rem; margin-bottom: 8px;">${ing.latin}</div>
            <h3 style="margin: 0 0 6px 0; font-size: 1.8rem; color: #111;">${ing.name}</h3>
            <h5 style="margin: 0 0 20px 0; font-size: 1rem; color: var(--purple-700); font-weight: 500;">${ing.tagline}</h5>
            
            <p style="color: #555; line-height: 1.6; margin: 0 0 32px 0; font-size: 0.95rem;">
              ${ing.body}
            </p>
            
            <!-- Automatically grabs matching products from data.js -->
            <div style="margin-top: auto; border-top: 1px solid #eee; padding-top: 20px;">
              <span style="font-size: 0.75rem; font-weight: 700; color: #888; text-transform: uppercase; display: block; margin-bottom: 8px;">Found in:</span>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${ing.foundIn.map(productId => {
                  const prod = PRODUCTS.find(p => p.id === productId);
                  return prod ? `<a href="#/shop" data-link style="font-size: 0.9rem; color: var(--purple-700); text-decoration: none; font-weight: 500;">↳ ${prod.name}</a>` : '';
                }).join('')}
              </div>
            </div>
          </div>

        </div>
      `).join('')}
      
    </div>
  </section>

  <!-- EXISTING CTA SECTION -->
  <section class="section container" style="text-align:center">
    <h2 class="reveal" style="font-size:clamp(26px,4vw,40px); margin-bottom:16px">See the ingredients in action</h2>
    <p class="reveal" style="color:var(--ink-soft);max-width:480px;margin:0 auto 32px">Every product in our collection is built around these botanicals. Explore the full range.</p>
    <a href="#/shop" data-link class="btn btn-primary reveal">Shop All Products</a>
  </section>
  `;
}

function renderContact(){
  return `
  <section class="page-hero botanical-hero" style="padding: 40px 20px !important; min-height: 200px !important; height: auto !important; display: flex; align-items: center; justify-content: center;">
    <div class="container" style="display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: center; margin: 0 auto; width: 100%;">
      <span class="eyebrow" style="font-size: 0.85rem; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px;">Get in Touch</span>
      
      <h1 style="font-size: clamp(2rem, 3.5vw, 3rem); line-height: 1.1; margin: 0 0 16px 0; letter-spacing: -0.5px;">
        WE'D LOVE TO HEAR FROM YOU
      </h1>
      
      <p style="margin: 0 auto; opacity: 0.9; font-size: 1.05rem; max-width: 500px; text-align: center;">
        Questions about our formulas, ingredients, or your order? We're here.
      </p>
    </div>
  </section>

  <section class="section container">
    <div class="contact-grid">
      <div class="reveal">
        <h3>Send us a message</h3>
        <p class="lead">We typically respond within one business day.</p>
        <form id="contactForm">
          <div class="field-row">
            <div><label>Name</label><input type="text" placeholder="Your name" required></div>
            <div><label>Email</label><input type="email" placeholder="your@email.com" required></div>
          </div>
          <label>What can we help with?</label>
          <div class="chip-select" id="contactChips">
            ${["Product question","Order or shipping","Ingredients & formulas","Wholesale enquiry","Something else"].map((c,i)=>`<button type="button" class="chip-option ${i===0?'active':''}" data-chip="${c}">${c}</button>`).join("")}
          </div>
          <label>Message</label>
          <textarea placeholder="Tell us how we can help…" required></textarea>
          <button type="submit" class="btn btn-primary" style="margin-top:22px">Send Message</button>
        </form>
      </div>
      <div class="reveal">
        <div class="contact-info-block">
          <h5>Email Us</h5>
          <a href="mailto:info@lavenherbs.in">info@lavenherbs.in</a>
        </div>
        <div class="contact-info-block">
          <h5>Call / WhatsApp</h5>
          <a href="https://wa.me/919520360398" target="_blank" rel="noopener">+91-9520360398</a>
        </div>
        <div class="contact-info-block">
          <h5>Response Hours</h5>
          <div>Monday – Friday, 9am – 5pm IST</div>
        </div>
        <div class="contact-info-block">
          <h5>Follow Along</h5>
          <div class="contact-social-links">
            <a href="https://www.instagram.com/lavenherbs?stkn=bGJmMGtwZjJzYTQ5" target="_blank" rel="noopener" class="contact-social-link instagram">
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>
              @lavenherbs
            </a>
            <a href="https://youtube.com/@lavenherbs?si=Nra68UlILvrCoQy7" target="_blank" rel="noopener" class="contact-social-link youtube">
              <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" stroke-width="1.8"/><path d="M10 9l6 3-6 3V9z" fill="currentColor"/></svg>
              @lavenherbs
            </a>
          </div>
        </div>
        <p class="contact-note">"Every message is read by a real person. We're a small team and we care deeply about every customer." — Suchi &amp; Aman</p>
      </div>
    </div>
  </section>
  `;
}

function wireContactPage(){
  $("#contactChips").addEventListener("click", e => {
    const chip = e.target.closest("[data-chip]"); if(!chip) return;
    $$("#contactChips .chip-option").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
  });
  $("#contactForm").addEventListener("submit", e => {
    e.preventDefault();
    showToast("Message sent! A real human will reply soon, promise.");
    e.target.reset();
  });
}

/* ---------------- Checkout ---------------- */
let lastOrder = null; // holds a snapshot of the most recent order for the confirmation page

function summaryMiniItem(it){
  const p = findProduct(it.id); if(!p) return "";
  return `<div class="summary-mini-item">
    <div class="thumb ${tintFor(p)}">${iconFor(p.category)}</div>
    <div class="grow">${p.name}<div class="qty">${p.size} · Qty ${it.qty}</div></div>
    <div>${fmt(p.price*it.qty)}</div>
  </div>`;
}

function renderCheckout(){
  if(Cart.items.length === 0){
    return `
    <section class="section container">
      <div class="empty-state reveal">
        ${ICONS.bag}
        <h2>Your bag is empty</h2>
        <p>Even the desert has more going on right now. Let's fix that.</p>
        <a href="#/shop" data-link class="btn btn-primary">Shop All Products</a>
      </div>
    </section>`;
  }
  const subtotal = Cart.subtotal();
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shipping;
  return `
  <section class="page-hero botanical-hero" style="padding:130px 0 50px">
    <div class="container">
      <span class="eyebrow">Secure Checkout</span>
      <h1 style="font-size:clamp(32px,5vw,54px)">Complete Your Order</h1>
    </div>
  </section>
  <section class="section container" style="padding-top:40px">
    <div class="checkout-wrap">
      <div>
        <form id="checkoutForm">
          <div class="co-section">
            <h3><i>1</i>Contact Information</h3>
            <div class="field-row">
              <div><label>Full Name</label><input type="text" name="name" required></div>
              <div><label>Phone Number</label><input type="tel" name="phone" pattern="[0-9]{10}" maxlength="10" placeholder="10-digit mobile" required></div>
            </div>
            <label>Email</label>
            <input type="email" name="email" required>
          </div>

          <div class="co-section">
            <h3><i>2</i>Shipping Address</h3>
            <label>Address</label>
            <input type="text" name="address" placeholder="House no., street, area" required>
            <div class="field-row" style="margin-top:18px">
              <div><label>City</label><input type="text" name="city" required></div>
              <div><label>State</label><input type="text" name="state" required></div>
            </div>
            <div class="field-row">
              <div><label>PIN Code</label><input type="text" name="pincode" pattern="[0-9]{6}" maxlength="6" required></div>
              <div><label>Country</label><input type="text" name="country" value="India" readonly></div>
            </div>
          </div>

          <div class="co-section">
            <h3><i>3</i>Payment Method</h3>
            <label class="radio-card selected">
              <input type="radio" name="pay" value="razorpay" checked>
              <div><div class="rc-title">UPI / Cards / Netbanking / Wallets</div><div class="rc-sub">Secured by Razorpay — pay however you like</div></div>
            </label>
            <label class="radio-card">
              <input type="radio" name="pay" value="cod">
              <div><div class="rc-title">Cash on Delivery</div><div class="rc-sub">Pay when your order arrives</div></div>
            </label>
          </div>
        </form>
      </div>

      <div class="summary-card">
        <h3>Order Summary</h3>
        <div style="max-height:220px;overflow-y:auto;margin-bottom:16px">
          ${Cart.items.map(summaryMiniItem).join("")}
        </div>
        <div class="summary-line"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
        <div class="summary-line"><span>Shipping</span><span>${shipping === 0 ? "Free" : fmt(shipping)}</span></div>
        <div class="summary-line total"><span>Total</span><span id="checkoutTotal">${fmt(total)}</span></div>
        <button class="btn btn-primary btn-block" id="payNowBtn" style="margin-top:20px">Pay ${fmt(total)}</button>
        <div class="secure-note">${ICONS.lock}<span>256-bit encrypted payment</span></div>
      </div>
    </div>
  </section>
  `;
}

function orderStatusTracker(activeStep){
  const steps = ["Order Placed","Processing","Shipped","Delivered"];
  return `
  <div class="order-tracker">
    ${steps.map((s,i)=>`
      <div class="tracker-step ${i<=activeStep?'done':''} ${i===activeStep?'current':''}">
        <div class="tracker-dot">${i<activeStep ? ICONS.check : i+1}</div>
        <span>${s}</span>
      </div>
      ${i<steps.length-1 ? `<div class="tracker-line ${i<activeStep?'done':''}"></div>` : ""}
    `).join("")}
  </div>`;
}

function wireOrderSuccessPage(){
  const btn = $("#printInvoiceBtn");
  if(btn) btn.addEventListener("click", () => window.print());
}

function renderOrderSuccess(){
  if(!lastOrder){
    return `
    <section class="section container">
      <div class="empty-state reveal">
        ${ICONS.bag}
        <h2>No recent order found</h2>
        <p>Nothing to confirm yet — your future glow-up starts with an order.</p>
        <a href="#/shop" data-link class="btn btn-primary">Shop All Products</a>
      </div>
    </section>`;
  }
  const o = lastOrder;
  const placed = new Date(o.placedAt);
  const deliveryStart = new Date(placed.getTime() + 4*86400000);
  const deliveryEnd = new Date(placed.getTime() + 7*86400000);
  const fmtDate = d => d.toLocaleDateString("en-IN", { day:"numeric", month:"short" });
  const fmtDateFull = d => d.toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric", hour:"2-digit", minute:"2-digit" });
  const payLabel = o.method === "cod" ? "Cash on Delivery" : "Prepaid — UPI / Card / Netbanking (Razorpay)";

  return `
  <section class="section container" style="padding-top:56px">
    <div class="order-success-head reveal">
      <div class="check">${ICONS.check}</div>
      <h2>Order Confirmed!</h2>
      <p>Thank you, ${o.customer.name.split(" ")[0]} — your botanicals are being prepared with care.</p>
      <div class="order-id">Order #${o.id}</div>
      <p class="order-placed-at">Placed on ${fmtDateFull(placed)}</p>
    </div>

    <div class="order-tracker-wrap reveal">
      ${orderStatusTracker(0)}
    </div>

    <div class="checkout-wrap" style="margin-top:50px">
      <div>
        <div class="co-section reveal">
          <h3><i>${ICONS.truck}</i>Delivery Estimate</h3>
          <div class="delivery-estimate">
            <strong>${fmtDate(deliveryStart)} – ${fmtDate(deliveryEnd)}</strong>
            <span>Standard delivery, pan-India</span>
          </div>
          <div class="address-block">
            <h5>Shipping to</h5>
            <p>${o.customer.name}<br>${o.customer.address}<br>${o.customer.city}, ${o.customer.state} ${o.customer.pincode}<br>${o.customer.phone}</p>
          </div>
        </div>

        <div class="co-section reveal">
          <h3><i>2</i>Payment</h3>
          <div class="payment-method-row">
            <span class="pm-badge ${o.method === 'cod' ? 'cod' : 'paid'}">${o.method === 'cod' ? 'Pay on Delivery' : 'Paid'}</span>
            <span>${payLabel}</span>
          </div>
          ${o.method !== "cod" ? `<div class="payment-ref">Payment ID: ${o.id}</div>` : ""}
        </div>

        <div class="co-section reveal">
          <h3><i>3</i>Items Ordered</h3>
          ${o.items.map(it => {
            const p = findProduct(it.id); if(!p) return "";
            return `<div class="order-line-item">
              <div class="thumb ${tintFor(p)}">${productArt(p)}</div>
              <div class="grow">
                <div class="oli-name">${p.name}</div>
                <div class="oli-meta">${p.size} · Qty ${it.qty}</div>
              </div>
              <div class="oli-price">${fmt(p.price*it.qty)}</div>
            </div>`;
          }).join("")}
        </div>
      </div>

      <div class="summary-card">
        <h3>Order Total</h3>
        <div class="summary-line"><span>Subtotal</span><span>${fmt(o.subtotal)}</span></div>
        <div class="summary-line"><span>Shipping</span><span>${o.shipping === 0 ? "Free" : fmt(o.shipping)}</span></div>
        <div class="summary-line total"><span>Total ${o.method==='cod' ? '(Due on delivery)' : 'Paid'}</span><span>${fmt(o.total)}</span></div>
        <button class="btn btn-outline btn-block" id="printInvoiceBtn" style="margin-top:20px">Download / Print Invoice</button>
        <a href="#/shop" data-link class="btn btn-primary btn-block" style="margin-top:12px">Continue Shopping</a>
        <div class="secure-note"><span>Questions about this order? <a href="#/contact" data-link style="color:var(--purple-700);text-decoration:underline">Contact us</a></span></div>
      </div>
    </div>
  </section>`;
}

// function wireCheckoutPage(){
//   const form = $("#checkoutForm");
//   if(!form) return;

//   function applyCheckoutAutofill(user){
//     if(!user) return;
//     if(user.displayName) form.querySelector('[name="name"]').value = user.displayName;
//     if(user.email) form.querySelector('[name="email"]').value = user.email;

//     firebase.firestore().collection('users').doc(user.uid).collection('addresses')
//       .orderBy('updatedAt', 'desc').limit(1).get()
//       .then(snap => {
//         if(!snap.empty){
//           const addr = snap.docs[0].data();
//           if(addr.name) form.querySelector('[name="name"]').value = addr.name;
//           if(addr.phone) form.querySelector('[name="phone"]').value = addr.phone;
//           if(addr.address) form.querySelector('[name="address"]').value = addr.address;
//           if(addr.city) form.querySelector('[name="city"]').value = addr.city;
//           if(addr.state) form.querySelector('[name="state"]').value = addr.state;
//           if(addr.pincode) form.querySelector('[name="pincode"]').value = addr.pincode;
//         }
//       })
//       .catch(err => console.warn('Could not load saved address for autofill:', err));
//   }

//   if(firebase.auth().currentUser){
//     applyCheckoutAutofill(firebase.auth().currentUser);
//   }else{
//     const unsubscribe = firebase.auth().onAuthStateChanged(function(user){
//       unsubscribe();
//       applyCheckoutAutofill(user);
//     });
//   }

//   $$(".radio-card").forEach(card => {
//     card.addEventListener("click", () => {
//       $$(".radio-card").forEach(c => c.classList.remove("selected"));
//       card.classList.add("selected");
//     });
//   });

//   $("#payNowBtn").addEventListener("click", async () => {
//     const currentUser = firebase.auth().currentUser;
//     if (!currentUser) {
//       showToast("Please log in or sign up to complete your order.", false);
//       localStorage.setItem("laven_redirect_after_login", "#/checkout");
//       navigate("#/login");
//       return;
//     }

//     if(!form.reportValidity()) return;
//     const fd = new FormData(form);
//     const customer = Object.fromEntries(fd.entries());
//     const payMethod = form.querySelector('input[name="pay"]:checked').value;
//     const subtotal = Cart.subtotal();
//     const shipping = subtotal >= 499 ? 0 : 49;
//     const total = subtotal + shipping;
//     const btn = $("#payNowBtn");
//     const originalLabel = btn.textContent;
//     const itemsSnapshot = Cart.items.map(i => ({ ...i }));

//     if(payMethod === "cod"){
//       const orderId = "LH-" + Date.now().toString().slice(-8);
//       btn.disabled = true;
//       btn.textContent = "Placing order…";
//       try{
//         const res = await fetch(`${RAZORPAY_CONFIG.API_BASE}/api/orders/cod`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
//           body: JSON.stringify({ orderId, customer, items: itemsSnapshot, subtotal, shipping, total, userId: currentUser.uid })
//         });
//         const data = await res.json();
//         if(!data.success) throw new Error(data.error || "Could not place order.");
//         lastOrder = { id: orderId, method: "cod", customer, items: itemsSnapshot, subtotal, shipping, total, placedAt: Date.now() };
//         Cart.clear();
//         navigate(`#/order-success`);
//       }catch(err){
//         console.error(err);
//         showToast("Could not place your order. Please try again.", false);
//         btn.disabled = false;
//         btn.textContent = originalLabel;
//       }
//       return;
//     }

//     btn.disabled = true;
//     btn.textContent = "Processing…";
//     try{
//       await LavenCheckout.pay({
//         amountInRupees: total,
//         customer,
//         orderData: { customer, items: itemsSnapshot, subtotal, shipping, total, userId: currentUser.uid },
//         onSuccess: (orderId) => {
//           lastOrder = { id: orderId, method: "razorpay", customer, items: itemsSnapshot, subtotal, shipping, total, placedAt: Date.now() };
//           Cart.clear();
//           navigate(`#/order-success`);
//         },
//         onFailure: (msg) => {
//           showToast(msg || "Payment could not be completed.", false);
//           btn.disabled = false;
//           btn.textContent = originalLabel;
//         }
//       });
//     }catch(err){
//       console.error(err);
//       showToast("Payment gateway is having a moment. Please try again.", false);
//       btn.disabled = false;
//       btn.textContent = originalLabel;
//     }
//   });
// }

function wireCheckoutPage(){
  const form = $("#checkoutForm");
  if(!form) return;

  function applyCheckoutAutofill(user){
    if(!user) return;
    if(user.displayName) form.querySelector('[name="name"]').value = user.displayName;
    if(user.email) form.querySelector('[name="email"]').value = user.email;

    // Fetch user profile info or latest address
    firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => {
        if(doc.exists && doc.data().phone){
          form.querySelector('[name="phone"]').value = doc.data().phone;
        }
      }).catch(err => console.warn('Could not load user phone:', err));

    firebase.firestore().collection('users').doc(user.uid).collection('addresses')
      .orderBy('updatedAt', 'desc').limit(1).get()
      .then(snap => {
        if(!snap.empty){
          const addr = snap.docs[0].data();
          if(addr.name) form.querySelector('[name="name"]').value = addr.name;
          if(addr.phone) form.querySelector('[name="phone"]').value = addr.phone;
          if(addr.address) form.querySelector('[name="address"]').value = addr.address;
          if(addr.city) form.querySelector('[name="city"]').value = addr.city;
          if(addr.state) form.querySelector('[name="state"]').value = addr.state;
          if(addr.pincode) form.querySelector('[name="pincode"]').value = addr.pincode;
        }
      })
      .catch(err => console.warn('Could not load saved address for autofill:', err));
  }

  if(firebase.auth().currentUser){
    applyCheckoutAutofill(firebase.auth().currentUser);
  }else{
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user){
      unsubscribe();
      applyCheckoutAutofill(user);
    });
  }

  $$(".radio-card").forEach(card => {
    card.addEventListener("click", () => {
      $$(".radio-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
    });
  });

  $("#payNowBtn").addEventListener("click", async () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      showToast("Please log in or sign up to complete your order.", false);
      localStorage.setItem("laven_redirect_after_login", "#/checkout");
      navigate("#/login");
      return;
    }

    if(!form.reportValidity()) return;
    const fd = new FormData(form);
    const customer = Object.fromEntries(fd.entries());
    const payMethod = form.querySelector('input[name="pay"]:checked').value;
    const subtotal = Cart.subtotal();
    const shipping = subtotal >= 499 ? 0 : 49;
    const total = subtotal + shipping;
    const btn = $("#payNowBtn");
    const originalLabel = btn.textContent;
    const itemsSnapshot = Cart.items.map(i => ({ ...i }));

    // Prevent duplicate address saves by checking if it already exists
    try {
      const addressRef = firebase.firestore().collection('users').doc(currentUser.uid).collection('addresses');
      const existingQuery = await addressRef
        .where('address', '==', customer.address)
        .where('pincode', '==', customer.pincode)
        .get();

      if(existingQuery.empty){
        await addressRef.add({
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          pincode: customer.pincode,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } else {
        await existingQuery.docs[0].ref.update({
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    } catch(e) {
      console.warn("Could not save address to profile:", e);
    }

    const orderId = "LH-" + Date.now().toString().slice(-8);

    if(payMethod === "cod"){
      btn.disabled = true;
      btn.textContent = "Placing order…";
      try{
        const res = await fetch(`${RAZORPAY_CONFIG.API_BASE}/api/orders/cod`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "ngrok-script-browser-warning": "true" },
          body: JSON.stringify({ orderId, customer, items: itemsSnapshot, subtotal, shipping, total, userId: currentUser.uid })
        });
        const data = await res.json();
        if(!data.success) throw new Error(data.error || "Could not place order.");
        lastOrder = { id: orderId, method: "cod", customer, items: itemsSnapshot, subtotal, shipping, total, placedAt: Date.now() };
        Cart.clear();
        navigate(`#/order-success`);
      }catch(err){
        console.error(err);
        showToast("Could not place your order. Please try again.", false);
        btn.disabled = false;
        btn.textContent = originalLabel;
      }
      return;
    }

    btn.disabled = true;
    btn.textContent = "Processing…";
    try{
      await LavenCheckout.pay({
        amountInRupees: total,
        customer,
        orderData: { orderId, customer, items: itemsSnapshot, subtotal, shipping, total, userId: currentUser.uid },
        onSuccess: (confirmedOrderId) => {
          lastOrder = { id: confirmedOrderId, method: "razorpay", customer, items: itemsSnapshot, subtotal, shipping, total, placedAt: Date.now() };
          Cart.clear();
          navigate(`#/order-success`);
        },
        onFailure: (msg) => {
          showToast(msg || "Payment could not be completed.", false);
          btn.disabled = false;
          btn.textContent = originalLabel;
        }
      });
    }catch(err){
      console.error(err);
      showToast("Payment gateway is having a moment. Please try again.", false);
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
});
}

/* ---------------- Extra informational pages ---------------- */
function renderFAQ(){
  const faqs = [
    ["Are Laven Herbs products suitable for sensitive skin?", "Most of our formulas are designed to be gentle enough for sensitive skin, but we always recommend a patch test 24 hours before first use — apply a small amount to your inner forearm and wait a day."],
    ["How long does a bottle typically last?", "With daily use, a 500ml product typically lasts 2–3 months and a 30–50ml serum around 6–8 weeks, depending on how much you use per application."],
    ["Are your products vegan and cruelty-free?", "Yes — every Laven Herbs formula is 100% vegan and we never test on animals, at any stage of development."],
    ["What's your shipping timeline?", "Orders are processed within 24 hours and typically arrive in 4–7 business days across India via our standard delivery partners."],
    ["Can I return a product if it doesn't suit my skin?", "Yes, unopened products can be returned within 7 days of delivery. See our Shipping & Returns page for full details."],
    ["Do you ship internationally?", "Not yet — we currently ship across India only, but international shipping is on our roadmap."]
  ];
  return `
  <section class="page-hero botanical-hero">
    <div class="container">
      <span class="eyebrow">Support</span>
      <h1>Frequently Asked Questions</h1>
      <p>Everything you need to know before your first order.</p>
    </div>
  </section>
  <section class="section container" style="max-width:840px">
    <div class="faq-list">
      ${faqs.map((f,i)=>`
        <div class="faq-item reveal">
          <button class="faq-q" data-faq="${i}">
            <span>${f[0]}</span>
            <span class="faq-plus">+</span>
          </button>
          <div class="faq-a"><p>${f[1]}</p></div>
        </div>
      `).join("")}
    </div>
  </section>`;
}
function wireFAQPage(){
  $$(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("open");
      $$(".faq-item").forEach(f => f.classList.remove("open"));
      if(!wasOpen) item.classList.add("open");
    });
  });
}

function renderShipping(){
  return `
  <section class="page-hero botanical-hero">
    <div class="container">
      <span class="eyebrow">Support</span>
      <h1>Shipping &amp; Returns</h1>
      <p>How your order gets to you, and what happens if it's not right.</p>
    </div>
  </section>
  <section class="section container" style="max-width:760px">
    <div class="policy-block reveal">
      <h3>Shipping</h3>
      <p>Orders are processed within 24 hours of confirmation and shipped via our trusted courier partners across India. Standard delivery takes 4–7 business days depending on your location. Orders above ₹499 ship free — a flat ₹49 fee applies below that.</p>
      <p>You'll receive a tracking link by email and SMS as soon as your order is handed to our courier partner.</p>
    </div>
    <div class="policy-block reveal">
      <h3>Returns &amp; Exchanges</h3>
      <p>We want you to love what you ordered. Unopened, unused products in their original packaging can be returned within 7 days of delivery for a full refund. Because of hygiene considerations, opened skincare products can't be returned unless the item arrived damaged or defective.</p>
      <p>To start a return, email us at info@lavenherbs.in with your order number — we'll arrange a pickup and process your refund within 5–7 business days of receiving the item back.</p>
    </div>
    <div class="policy-block reveal">
      <h3>Damaged or Incorrect Items</h3>
      <p>If your order arrives damaged or you received the wrong item, contact us within 48 hours of delivery with photos of the product and packaging, and we'll send a replacement at no extra cost.</p>
    </div>
  </section>`;
}

function renderPrivacy(){
  return `
  <section class="page-hero botanical-hero">
    <div class="container">
      <span class="eyebrow">Legal</span>
      <h1>Privacy Policy</h1>
      <p>Last updated ${new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</p>
    </div>
  </section>
  <section class="section container" style="max-width:760px">
    <div class="policy-block reveal">
      <h3>What we collect</h3>
      <p>When you place an order, we collect your name, email, phone number, and shipping address to fulfil and communicate about that order. We never sell your personal information to third parties.</p>
    </div>
    <div class="policy-block reveal">
      <h3>Payments</h3>
      <p>Payments are processed securely by Razorpay. We never see or store your full card, UPI, or banking details — those are handled entirely by Razorpay's PCI-DSS compliant infrastructure.</p>
    </div>
    <div class="policy-block reveal">
      <h3>Cookies</h3>
      <p>We use minimal, functional cookies to keep your cart and preferences working as you browse — no third-party ad tracking.</p>
    </div>
    <div class="policy-block reveal">
      <h3>Your rights</h3>
      <p>You can request a copy of the data we hold about you, or ask us to delete it, at any time by emailing info@lavenherbs.in.</p>
    </div>
  </section>`;
}

function renderTerms(){
  return `
  <section class="page-hero botanical-hero">
    <div class="container">
      <span class="eyebrow">Legal</span>
      <h1>Terms of Use</h1>
      <p>Last updated ${new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</p>
    </div>
  </section>
  <section class="section container" style="max-width:760px">
    <div class="policy-block reveal">
      <h3>Using this site</h3>
      <p>By placing an order with Laven Herbs, you confirm the information you provide is accurate and that you're authorized to use the payment method selected at checkout.</p>
    </div>
    <div class="policy-block reveal">
      <h3>Product information</h3>
      <p>We do our best to describe every formula accurately, including ingredients and expected results. Individual results can vary based on skin type — nothing on this site is a substitute for professional dermatological advice.</p>
    </div>
    <div class="policy-block reveal">
      <h3>Pricing</h3>
      <p>All prices are listed in Indian Rupees (INR) and are subject to change without notice. The price charged is the one displayed at the time your order is placed.</p>
    </div>
    <div class="policy-block reveal">
      <h3>Contact</h3>
      <p>Questions about these terms? Reach us at info@lavenherbs.in.</p>
    </div>
  </section>`;
}

function renderTrackOrder(){
  return `
  <section class="page-hero botanical-hero">
    <div class="container">
      <span class="eyebrow">Support</span>
      <h1>Track Your Order</h1>
      <p>Enter your order number and email to check the status.</p>
    </div>
  </section>
  <section class="section container" style="max-width:520px">
    <form id="trackOrderForm" class="reveal">
      <label>Order Number</label>
      <input type="text" name="orderId" placeholder="e.g. LH-12345678" required>
      <label style="margin-top:18px">Email Used at Checkout</label>
      <input type="email" name="email" placeholder="your@email.com" required>
      <button type="submit" class="btn btn-primary btn-block" style="margin-top:24px">Track Order</button>
    </form>
    <div id="trackOrderResult" style="margin-top:32px"></div>
  </section>`;
}
// function wireTrackOrder(){
//   const form = $("#trackOrderForm");
//   if(!form) return;
//   form.addEventListener("submit", async e => {
//     e.preventDefault();
//     const fd = new FormData(form);
//     const orderId = fd.get("orderId").trim();
//     const email = fd.get("email").trim().toLowerCase();
//     const result = $("#trackOrderResult");
//     result.innerHTML = `<p class="account-empty-note">Searching…</p>`;

//     try{
//       const doc = await firebase.firestore().collection('orders').doc(orderId).get();
//       const data = doc.exists ? doc.data() : null;
//       const matches = data && data.customer && data.customer.email && data.customer.email.toLowerCase() === email;

//       if(matches){
//         result.innerHTML = `
//           <div class="co-section">
//             <h3><i>${ICONS.check}</i>Order Found</h3>
//             ${orderStatusTracker(statusToStep(data.status))}
//             <p style="margin-top:20px;color:var(--ink-soft);font-size:14px">Status: <strong>${(data.status||'placed')}</strong></p>
//           </div>`;
//       }else{
//         result.innerHTML = `
//           <div class="co-section" style="text-align:center">
//             <p style="color:var(--ink-soft);font-family:var(--accent);font-style:italic;font-size:16px">We couldn't find a matching order.</p>
//             <p style="color:var(--ink-faint);font-size:13px;margin-top:10px">Double-check your order number and email, or <a href="#/contact" data-link style="color:var(--purple-700);text-decoration:underline">contact us</a> directly.</p>
//           </div>`;
//       }
//     }catch(err){
//       console.error(err);
//       result.innerHTML = `<div class="co-section" style="text-align:center"><p style="color:var(--err)">Something went wrong looking up your order. Please try again or contact us.</p></div>`;
//     }
//   });
// }

function wireTrackOrder() {
  const form = $("#trackOrderForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(form);

    // Strip leading # symbol so it matches Firestore document IDs correctly
    let orderId = fd.get("orderId").trim();
    orderId = orderId.replace(/^#/, "").trim();

    const email = fd.get("email").trim().toLowerCase();
    const result = $("#trackOrderResult");

    result.innerHTML = `
      <p class="account-empty-note">Searching…</p>
    `;

    try {
      const doc = await firebase
        .firestore()
        .collection("orders")
        .doc(orderId)
        .get();

      const data = doc.exists ? doc.data() : null;

      const matches =
        data &&
        data.customer &&
        data.customer.email &&
        data.customer.email.toLowerCase().trim() === email;

      if (matches) {
        result.innerHTML = `
          <div class="co-section">
            <h3>
              <i>${ICONS.check}</i>
              Order Found
            </h3>

            ${orderStatusTracker(statusToStep(data.status))}

            <p
              style="
                margin-top: 20px;
                color: var(--ink-soft);
                font-size: 14px;
              "
            >
              Status:
              <strong>${data.status || "placed"}</strong>
            </p>
          </div>
        `;
      } else {
        result.innerHTML = `
          <div
            class="co-section"
            style="text-align: center"
          >
            <p
              style="
                color: var(--ink-soft);
                font-family: var(--accent);
                font-style: italic;
                font-size: 16px;
              "
            >
              We couldn't find a matching order.
            </p>

            <p
              style="
                color: var(--ink-faint);
                font-size: 13px;
                margin-top: 10px;
              "
            >
              Double-check your order number and email, or
              <a
                href="#/contact"
                data-link
                style="
                  color: var(--purple-700);
                  text-decoration: underline;
                "
              >
                contact us
              </a>
              directly.
            </p>
          </div>
        `;
      }
    } catch (err) {
      console.error(err);

      result.innerHTML = `
        <div
          class="co-section"
          style="text-align: center"
        >
          <p style="color: var(--err)">
            Something went wrong looking up your order.
            Please try again or contact us.
          </p>
        </div>
      `;
    }
  });
}




function authCardHeader(mode){
  return `
  <div class="auth-card-header botanical-hero">
    <img src="assets/logo-icon.png" alt="Laven Herbs" class="auth-card-logo">
    <h2>${mode === 'signup' ? 'Join the Ritual' : 'Welcome Back'}</h2>
    <p>${mode === 'signup' ? "Create an account for faster checkout next time." : "Log in to pick up right where you left off."}</p>
  </div>`;
}

function renderLogin(){
  return `
  <div class="auth-page-wrap">
    <div class="auth-card">
      ${authCardHeader('login')}
      <div class="auth-card-body">
        <div class="auth-error" id="authError"></div>
        <form id="loginForm">
          <label>Email</label>
          <input type="email" name="email" required>
          <label>Password</label>
          <input type="password" name="password" required>
          <div class="auth-forgot"><a href="#" id="forgotPasswordLink">Forgot password?</a></div>
          <button type="submit" class="btn btn-primary btn-block" id="loginSubmitBtn">Log In</button>
        </form>
        <div class="auth-switch">Don't have an account? <a href="#/signup" data-link>Sign up</a></div>
      </div>
    </div>
  </div>`;
}

function renderSignup(){
  return `
  <div class="auth-page-wrap">
    <div class="auth-card">
      ${authCardHeader('signup')}
      <div class="auth-card-body">
        <div class="auth-error" id="authError"></div>
        <form id="signupForm">
          <label>Full Name</label>
          <input type="text" name="name" required>
          <label>Email</label>
          <input type="email" name="email" required>
          <label>Password</label>
          <input type="password" name="password" minlength="6" required>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" minlength="6" required>
          <button type="submit" class="btn btn-primary btn-block" style="margin-top:24px" id="signupSubmitBtn">Create Account</button>
        </form>
        <div class="auth-switch">Already have an account? <a href="#/login" data-link>Log in</a></div>
      </div>
    </div>
  </div>`;
}

function showAuthError(msg){
  const el = document.getElementById('authError');
  if(el){ el.textContent = msg; el.classList.add('show'); }
}

function friendlyAuthError(err){
  const code = err && err.code;
  const map = {
    'auth/email-already-in-use': "That email is already registered — try logging in instead.",
    'auth/invalid-email': "That email address doesn't look right.",
    'auth/weak-password': "Password should be at least 6 characters.",
    'auth/user-not-found': "No account found with that email.",
    'auth/wrong-password': "Incorrect password — try again.",
    'auth/invalid-credential': "Incorrect email or password.",
    'auth/too-many-requests': "Too many attempts — please wait a bit and try again.",
    'auth/network-request-failed': "Network error — check your connection and try again.",
    'auth/user-disabled': "This account has been disabled. Contact support if this seems wrong.",
    'auth/missing-password': "Please enter a password.",
    'auth/missing-email': "Please enter your email."
  };
  return map[code] || "Something went wrong. Please try again.";
}


function wireSignup(){
  const form = document.getElementById('signupForm');
  if(!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('signupSubmitBtn');
    const fd = new FormData(form);
    const password = fd.get('password');
    const confirmPassword = fd.get('confirmPassword');

    if(password !== confirmPassword){
      showAuthError("Passwords don't match — check and try again.");
      return;
    }
    if(password.length < 6){
      showAuthError("Password must be at least 6 characters.");
      return;
    }

    btn.disabled = true; btn.textContent = 'Creating account…';
    try{
      await window.LavenAuth.signup(fd.get('name'), fd.get('email'), password);
      showToast("Account created — welcome to Laven Herbs!");
      navigate('#/');
    }catch(err){
      showAuthError(friendlyAuthError(err));
      btn.disabled = false; btn.textContent = 'Create Account';
    }
  });
}

// function renderAccount(){
//   return `
//   <section class="section container account-page-section">
//     <div class="account-header reveal">
//       <div class="account-avatar-big" id="accountAvatarBig">--</div>
//       <div>
//         <h2 id="accountName" class="account-name">Loading…</h2>
//         <p id="accountEmail" class="account-email">—</p>
//         <p id="accountMemberSince" class="account-member-since"></p>
//       </div>
//     </div>

//     <div class="co-section reveal" style="margin-top:32px">
//       <h3><i>${ICONS.bag}</i>Order History</h3>
//       <div id="accountOrders">
//         <p class="account-empty-note">No orders yet — when you place one, it'll show up here.</p>
//       </div>
//     </div>

//     <div class="co-section reveal">
//       <h3><i>${ICONS.truck}</i>Saved Addresses</h3>
//       <p class="account-empty-note">No saved addresses yet.</p>
//     </div>

//     <button class="btn btn-outline" id="accountLogoutBtn" style="margin-top:10px">Log Out</button>
//   </section>`;
// }

function renderAccount() {
  return `
    <section class="section container account-page-section">
      <div class="account-header reveal">
        <div class="account-avatar-big" id="accountAvatarBig">--</div>
        <div>
          <h2 id="accountName" class="account-name">Loading…</h2>
          <p id="accountEmail" class="account-email">—</p>
          <p id="accountMemberSince" class="account-member-since"></p>
        </div>
      </div>

      <div class="co-section reveal" style="margin-top:32px">
        <h3><i>${ICONS.bag}</i>Order History</h3>
        <div id="accountOrders">
          <p class="account-empty-note">No orders yet — when you place one, it'll show up here.</p>
        </div>
      </div>

      <div class="co-section reveal" id="savedAddressesSection">
        <h3><i>${ICONS.truck}</i>Saved Addresses</h3>
        <p class="account-empty-note">No saved addresses yet.</p>
      </div>

      <button class="btn btn-outline" id="accountLogoutBtn" style="margin-top:10px">Log Out</button>
    </section>`;
}

function statusToStep(status){
  const map = { placed:0, processing:1, shipped:2, delivered:3 };
  return map[status] !== undefined ? map[status] : 0;
}

function renderOrdersList(orders){
  const container = document.getElementById('accountOrders');
  if(!container) return;
  if(orders.length === 0){
    container.innerHTML = '<p class="account-empty-note">No orders yet — when you place one, it\'ll show up here.</p>';
    return;
  }
  container.innerHTML = orders.map(o => {
    const date = o.placedAt && o.placedAt.toDate ? o.placedAt.toDate().toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'}) : '';
    const status = o.status || 'placed';
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
    const itemsText = (o.items||[]).map(i => {
      const p = findProduct(i.id);
      return i.qty + '× ' + (p ? p.name : i.id);
    }).join(', ');
    return `
      <div class="account-order-card">
        <div class="account-order-top">
          <div>
            <div class="account-order-id">#${o.orderId}</div>
            <div class="account-order-date">${date}</div>
          </div>
          <span class="account-order-status status-${status}">${statusLabel}</span>
        </div>
        <div class="account-order-items">${itemsText}</div>
        <div class="account-order-total">₹${(o.total||0).toLocaleString('en-IN')}</div>
      </div>`;
  }).join('');
}

function wireAccount() {
  // Wait for Firebase Auth to finish initializing on hard refresh
  const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  unsubscribe(); // Unsubscribe immediately once state resolves

  if (!user) {
    navigate('#/login');
    return;
  }

  const name = user.displayName || user.email.split('@')[0];

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  document.getElementById('accountAvatarBig').textContent = initials;
  document.getElementById('accountName').textContent = name;
  document.getElementById('accountEmail').textContent = user.email;

  window.db
    .collection('users')
    .doc(user.uid)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().createdAt) {
        const d = doc.data().createdAt.toDate();

        document.getElementById('accountMemberSince').textContent =
          'Member since ' +
          d.toLocaleDateString('en-IN', {
            month: 'long',
            year: 'numeric'
          });
      }
    })
    .catch(() => {});

  // 1. Listen for Order History updates in real-time
  window.db
    .collection('orders')
    .where('userId', '==', user.uid)
    .onSnapshot(
      (snapshot) => {
        const orders = snapshot.docs.map((d) => d.data());

        orders.sort(
          (a, b) =>
            ((b.placedAt && b.placedAt.toMillis)
              ? b.placedAt.toMillis()
              : 0) -
            ((a.placedAt && a.placedAt.toMillis)
              ? a.placedAt.toMillis()
              : 0)
        );

        renderOrdersList(orders);
      },
      (err) => {
        console.warn('Could not load order history:', err);
      }
    );

  // 2. Fetch and render Saved Addresses using ID
  const addressContainer = document.getElementById(
    'savedAddressesSection'
  );

  if (addressContainer) {
    window.db
      .collection('users')
      .doc(user.uid)
      .collection('addresses')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          addressContainer.innerHTML = `
            <h3><i>${ICONS.truck}</i>Saved Addresses</h3>
            <p>No saved addresses yet.</p>
          `;
        } else {
          const addressesHtml = snapshot.docs
            .map((doc) => {
              const addr = doc.data();

              return `
                <div class="saved-address">
                  <strong>${addr.name}</strong>
                  <p>${addr.address}</p>
                  <p>${addr.city}, ${addr.state} — ${addr.pincode}</p>
                  <p>Phone: ${addr.phone}</p>
                </div>
              `;
            })
            .join('');

          addressContainer.innerHTML = `
            <h3><i>${ICONS.truck}</i>Saved Addresses</h3>
            ${addressesHtml}
          `;
        }
      })
      .catch((err) => {
        console.warn('Could not load addresses:', err);
      });
  }

  // 3. Logout
  document
    .getElementById('accountLogoutBtn')
    .addEventListener('click', async () => {
      await window.LavenAuth.logout();

      showToast("You've been logged out. See you soon!");

      navigate('#/');
    });
  });
}

function render404(){
  return `
  <section class="section container">
    <div class="empty-state reveal">
      ${ICONS.leaf}
      <h2>This page wandered off to find itself</h2>
      <p>It's probably on a wellness retreat. Meanwhile, our full collection is right here.</p>
      <a href="#/shop" data-link class="btn btn-primary">Back to Shop</a>
    </div>
  </section>`;
}

/* =========================================================
   ROUTER
   ========================================================= */
const routes = {
  "": { render: renderHome, wire: wireHomePage },
  "shop": { render: renderShop, wire: wireShopPage },
  "about": { render: renderAbout },
  "ingredients": { render: renderIngredients },
  "contact": { render: renderContact, wire: wireContactPage },
  "checkout": { render: renderCheckout, wire: wireCheckoutPage },
  "order-success": { render: renderOrderSuccess, wire: wireOrderSuccessPage },
  "faq": { render: renderFAQ, wire: wireFAQPage },
  "shipping": { render: renderShipping },
  "privacy": { render: renderPrivacy },
  "terms": { render: renderTerms },
  "track-order": { render: renderTrackOrder, wire: wireTrackOrder },
  "account": { render: renderAccount, wire: wireAccount },
  "login": { render: renderLogin, wire: wireLogin },
  "signup": { render: renderSignup, wire: wireSignup },
  "404": { render: render404 }
};

function navigate(hash){ window.location.hash = hash; }

function wireLogin(){
  const form = document.getElementById('loginForm');
  if(!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('loginSubmitBtn');
    const fd = new FormData(form);
    btn.disabled = true; btn.textContent = 'Logging in…';
    try{
      await window.LavenAuth.login(fd.get('email'), fd.get('password'));
      showToast("Welcome back!");
      const redirectPath = localStorage.getItem("laven_redirect_after_login") || "#/";
      localStorage.removeItem("laven_redirect_after_login");
      navigate(redirectPath);
    }catch(err){
      showAuthError(friendlyAuthError(err));
      btn.disabled = false; btn.textContent = 'Log In';
    }
  });
  
  const forgotLink = document.getElementById('forgotPasswordLink');
  if(forgotLink){
    forgotLink.addEventListener('click', async e => {
      e.preventDefault();
      const email = form.querySelector('input[name="email"]').value;
      if(!email){ showAuthError("Enter your email above first, then click 'Forgot password?' again."); return; }
      try{
        await window.LavenAuth.resetPassword(email);
        showToast("Password reset email sent — check your inbox!");
      }catch(err){
        showAuthError(friendlyAuthError(err));
      }
    });
  }
}

function router(){
  const raw = window.location.hash.replace(/^#\//, "");
  const [path, queryStr] = raw.split("?");
  const params = new URLSearchParams(queryStr || "");
  const route = routes[path] || routes["404"];
  const app = $("#app");
  app.innerHTML = route.render(params);
  app.classList.remove("page-fade");
  void app.offsetWidth; // force reflow so the animation restarts
  app.classList.add("page-fade");
  $$(".main-nav a").forEach(a => a.classList.toggle("active", a.dataset.nav === path));
  window.scrollTo({ top:0, behavior:"instant" in window ? "instant" : "auto" });
  closeCart(); closeMobileMenu(); closeSearch(); closePDP();
  if(route.wire) route.wire(params);
  initReveal();
}
window.addEventListener("hashchange", router);

/* ---------------- Init ---------------- */
$("#year").textContent = new Date().getFullYear();
Cart.load();
Cart.render();
router();




/* ========== HERO CARD PARALLAX TILT ========== */
// function initHeroParallax() {
//   const card = document.getElementById('heroProductCard');
//   if (!card) return;
//   if (window.matchMedia('(max-width: 900px)').matches) return;
//   if ('ontouchstart' in window) return;

//   const inner = card.querySelector('.product-card-inner');
//   const MAX_TILT = 8;
//   const MAX_MOVE = 6;
//   let rafId = null;

//   function onMove(e) {
//     if (rafId) cancelAnimationFrame(rafId);
//     rafId = requestAnimationFrame(() => {
//       const rect = card.getBoundingClientRect();
//       const cx = rect.left + rect.width / 2;
//       const cy = rect.top + rect.height / 2;
//       const dx = (e.clientX - cx) / (rect.width / 2);
//       const dy = (e.clientY - cy) / (rect.height / 2);
//       const rotY = dx * MAX_TILT;
//       const rotX = -dy * MAX_TILT;
//       const moveX = dx * MAX_MOVE;
//       const moveY = dy * MAX_MOVE;
//       inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${moveX}px, ${moveY}px, 0)`;
//       inner.style.setProperty('--glow-x', `${(dx + 1) * 50}%`);
//       inner.style.setProperty('--glow-y', `${(dy + 1) * 50}%`);
//     });
//   }
//   function onLeave() {
//     if (rafId) cancelAnimationFrame(rafId);
//     inner.style.transform = 'rotateX(0) rotateY(0) translate3d(0,0,0)';
//   }
//   card.addEventListener('mousemove', onMove);
//   card.addEventListener('mouseleave', onLeave);
// }