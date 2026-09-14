/* =========================================================
   LAVEN HERBS — Chat Assistant Widget
   Self-contained: reads CHATBOT_FAQS from data.js and does
   simple keyword matching. No backend, no API cost.
   ========================================================= */
(function(){
  const bubble = document.getElementById('chatBubbleBtn');
  const panel = document.getElementById('chatPanel');
  const iconOpen = document.getElementById('chatIconOpen');
  const iconClose = document.getElementById('chatIconClose');
  const messages = document.getElementById('chatMessages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const suggestions = document.getElementById('chatSuggestions');

  if(!bubble || !panel) return;

  let opened = false;
  let greeted = false;

  const STARTERS = [
    "What's your shipping time?",
    "Are your products vegan?",
    "How do I track my order?",
    "What's your return policy?"
  ];

  function addMessage(text, from){
    const el = document.createElement('div');
    el.className = 'chat-msg ' + from;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  function addTyping(){
    const el = document.createElement('div');
    el.className = 'chat-msg bot typing';
    el.id = 'chatTyping';
    el.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }
  function removeTyping(){
    const el = document.getElementById('chatTyping');
    if(el) el.remove();
  }

  function renderSuggestions(){
    suggestions.innerHTML = STARTERS.map(s => `<button type="button" class="chat-chip">${s}</button>`).join('');
  }

  function bestMatch(query){
  const STOPWORDS = new Set(['how','what','who','why','when','where','does','do','is','are','the','and','for','you','your','my','our','can','will','with','this','that','from','about','have','has','had','get','got','need','want','please','tell','me','of','to','in','on','it']);
  const q = query.toLowerCase().replace(/[^a-z0-9\s]/g, '');
  const words = q.split(/\s+/).filter(w => w.length > 2 && !STOPWORDS.has(w));
  const faqs = (typeof CHATBOT_FAQS !== 'undefined') ? CHATBOT_FAQS : [];
  let best = null, bestScore = 0;
  faqs.forEach(item => {
    const hay = item.q.toLowerCase();
    let score = 0;
    words.forEach(w => { if(hay.includes(w)) score += w.length; });
    if(score > bestScore){ bestScore = score; best = item; }
  });
  return bestScore >= 4 ? best.a : null;
}

  function respond(userText){
    const lower = userText.toLowerCase();
    let reply;
    if(/^(hi|hello|hey)\b/.test(lower)){
      reply = "Hey there! I'm the Laven Herbs assistant. Ask me about shipping, ingredients, returns, or anything else!";
    }else if(/thank/.test(lower)){
      reply = "Anytime! Let me know if there's anything else I can help with. 🌿";
    }else{
      reply = bestMatch(userText) || "I don't have a ready answer for that one — but our team would love to help directly. Head to the Contact page and we'll get back to you personally!";
    }
    setTimeout(() => {
      removeTyping();
      addMessage(reply, 'bot');
    }, 500 + Math.random()*400);
  }

  function sendMessage(text){
    text = text.trim();
    if(!text) return;
    addMessage(text, 'user');
    input.value = '';
    suggestions.style.display = 'none';
    addTyping();
    respond(text);
  }

  bubble.addEventListener('click', () => {
    opened = !opened;
    panel.classList.toggle('open', opened);
    iconOpen.style.display = opened ? 'none' : 'block';
    iconClose.style.display = opened ? 'block' : 'none';
    if(opened && !greeted){
      greeted = true;
      addMessage("Hi! 👋 I'm here to help with anything about Laven Herbs — shipping, ingredients, returns, you name it.", 'bot');
      renderSuggestions();
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    sendMessage(input.value);
  });

  suggestions.addEventListener('click', e => {
    const chip = e.target.closest('.chat-chip');
    if(!chip) return;
    sendMessage(chip.textContent);
  });
})();