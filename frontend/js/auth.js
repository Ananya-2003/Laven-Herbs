(function(){
  if(typeof firebase === 'undefined'){
    console.error('Firebase SDK not loaded — check your script tags in index.html');
    return;
  }
  firebase.initializeApp(window.FIREBASE_CONFIG);
  const auth = firebase.auth();
  const db = firebase.firestore();

  function showToastSafe(msg, ok){
    if(typeof showToast === 'function') showToast(msg, ok);
    else alert(msg);
  }

  function getInitials(name){
    if(!name) return '?';
    const parts = name.trim().split(/\s+/);
    return parts.slice(0,2).map(function(p){ return p[0]; }).join('').toUpperCase();
  }

  const LavenAuth = {
    currentUser: null,

    async signup(name, email, password){
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        try{
        await cred.user.updateProfile({ displayName: name });
        }catch(e){ console.warn('updateProfile failed (non-critical):', e); }
        try{
        await db.collection('users').doc(cred.user.uid).set({
            name: name, email: email, createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        }catch(e){ console.warn('Firestore profile write failed (non-critical):', e); }
        return cred.user;
    },

    async login(email, password){
        const cred = await auth.signInWithEmailAndPassword(email, password);
        return cred.user;
    },

    async logout(){
        await auth.signOut();
    },

    async resetPassword(email){
        await auth.sendPasswordResetEmail(email);
    },

    // async saveOrder(orderData){
    //     const user = auth.currentUser;
    //     const docId = orderData.orderId;
    //     await db.collection('orders').doc(docId).set(Object.assign({}, orderData, {
    //     userId: user ? user.uid : null,
    //     status: 'placed',
    //     placedAt: firebase.firestore.FieldValue.serverTimestamp()
    //     }));
    // }

    async saveOrder(orderData, explicitUserId){
        const finalUserId = explicitUserId || (auth.currentUser ? auth.currentUser.uid : null);
        const docId = orderData.orderId;
        await db.collection('orders').doc(docId).set(Object.assign({}, orderData, {
            userId: finalUserId,
            status: 'placed',
            placedAt: firebase.firestore.FieldValue.serverTimestamp()
        }));
        if (finalUserId && orderData.customer) {
        const addressData = {
            name: orderData.customer.name,
            phone: orderData.customer.phone,
            address: orderData.customer.address,
            city: orderData.customer.city,
            state: orderData.customer.state,
            pincode: orderData.customer.pincode,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        // Store addresses in a subcollection under the user
        await db.collection('users').doc(finalUserId).collection('addresses').doc(orderData.customer.pincode + '-' + orderData.customer.phone).set(addressData, { merge: true });
    }
    }
  };

  auth.onAuthStateChanged(function(user){
    LavenAuth.currentUser = user;
    renderAuthArea(user);
  });

  function renderAuthArea(user){
    const el = document.getElementById('authArea');
    if(!el) return;
    if(user){
      const name = user.displayName || user.email;
      const initials = getInitials(name);
      el.innerHTML =
        '<div class="auth-avatar-wrap">' +
          '<button class="auth-avatar-btn" id="authAvatarBtn" aria-label="Account menu">' + initials + '</button>' +
          '<div class="auth-dropdown" id="authDropdown">' +
            '<div class="auth-dropdown-name">' + (user.displayName || 'Welcome') + '</div>' +
            '<div class="auth-dropdown-email">' + user.email + '</div>' +
            '<div class="auth-dropdown-divider"></div>' +
            '<a href="#/account" data-link class="auth-dropdown-item">My Account</a>' +
            '<button class="auth-dropdown-item auth-dropdown-logout" id="authLogoutBtn">Log Out</button>' +
          '</div>' +
        '</div>';

      const avatarBtn = document.getElementById('authAvatarBtn');
      const dropdown = document.getElementById('authDropdown');
      avatarBtn.addEventListener('click', function(e){
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', function(e){
        if(!dropdown.contains(e.target) && e.target !== avatarBtn){
          dropdown.classList.remove('open');
        }
      });
      document.getElementById('authLogoutBtn').addEventListener('click', async function(){
        await LavenAuth.logout();
        showToastSafe("You've been logged out. See you soon!", true);
        if(typeof navigate === 'function') navigate('#/');
      });
    }else{
      el.innerHTML = '<a href="#/login" data-link class="auth-login-link">Login</a>';
    }
  }

  window.LavenAuth = LavenAuth;
  window.db = db;
  window.auth = auth;
})();

/* ---------------- Hide site chrome on auth pages ---------------- */
(function(){
  function updateChromeForAuthPages(){
    const hash = window.location.hash;
    const isAuthPage = hash.indexOf('#/login') === 0 || hash.indexOf('#/signup') === 0;
    const footer = document.querySelector('.site-footer');
    const announceBar = document.querySelector('.announce-bar');
    if(footer) footer.style.display = isAuthPage ? 'none' : '';
    if(announceBar) announceBar.style.display = isAuthPage ? 'none' : '';
  }
  window.addEventListener('hashchange', updateChromeForAuthPages);
  window.addEventListener('DOMContentLoaded', updateChromeForAuthPages);
  updateChromeForAuthPages();
})();