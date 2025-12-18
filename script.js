// Basic modal helpers
const modal = (id) => document.getElementById(id);
const openModal = (el) => { el.setAttribute('aria-hidden','false'); el.style.display = 'grid'; document.body.style.overflow='hidden'; }
const closeModal = (el) => { if(!el) return; el.setAttribute('aria-hidden','true'); el.style.display = 'none'; document.body.style.overflow=''; const panel = el.querySelector('.modal-panel'); if(panel) panel.classList.remove('xmas'); }

// Elements
const m = modal('modal');
const giftD = modal('giftDialog');
const celebrate = modal('celebrate');
const sorrow = modal('sorrow');

// Messages content
const messageText = `My Love,\n\nI don’t know how to fully explain what you mean to me, but I know this—my heart feels at home when I think of you. You came into my life quietly, yet you changed everything in ways I never expected.\n\nYou are my calm in chaos, my strength on difficult days, and the reason my smiles feel real. Loving you has taught me patience, kindness, and the beauty of choosing one person every single day.\n\nNo matter where life takes us, I want you to know that my heart carries you with it—always. You are not just someone I love; you are someone I treasure deeply.\n\nForever yours,\nRoy`;

const xmasText = `My Love,\n\nThis Christmas, I don’t wish for gifts or lights—because having you in my life is already the greatest gift I could ever receive. You make every season warmer, every moment brighter, and every day more meaningful.\n\nAs the world celebrates love and joy, I thank God for you and for the way you’ve filled my heart with peace, laughter, and hope. May this Christmas wrap you in happiness, protect your dreams, and remind you how deeply you are loved.\n\nNo matter where we are, my heart celebrates Christmas with you—today and always.\n\nMerry Christmas, my love.\nForever yours,\nRoy ❤️🎄`;

// Buttons
document.getElementById('btn-message').addEventListener('click',()=>{
  m.querySelector('.modal-title').textContent = 'A Message for You';
  m.querySelector('.modal-body').textContent = messageText;
  openModal(m);
});

document.getElementById('btn-xmas').addEventListener('click',()=>{
  m.querySelector('.modal-title').textContent = 'Christmas Wish';
  m.querySelector('.modal-body').textContent = xmasText;
  m.querySelector('.modal-panel').classList.add('xmas');
  openModal(m);
});

document.getElementById('btn-gift').addEventListener('click',()=>{
  openModal(giftD);
});

// Close buttons
document.querySelectorAll('.modal-close').forEach(b=>b.addEventListener('click', e=>{
  const modalEl = e.target.closest('.modal');
  closeModal(modalEl);
}));

// keyboard close (Escape)
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){
  document.querySelectorAll('.modal').forEach(mod=>closeModal(mod));
  celebrate.classList.add('hidden'); celebrate.setAttribute('aria-hidden','true');
  sorrow.classList.add('hidden'); sorrow.setAttribute('aria-hidden','true');
}});

// Gift choices
const yes = document.getElementById('btn-yes');
const no = document.getElementById('btn-no');

yes.addEventListener('click', ()=>{
  closeModal(giftD);
  startCelebration();
});

no.addEventListener('click', ()=>{
  closeModal(giftD);
  startSorrow();
});

// Celebration: generate flower/confetti emojis popping up across screen
function startCelebration(){
  celebrate.classList.remove('hidden'); celebrate.setAttribute('aria-hidden','false');
  // big message
  const text = document.getElementById('celebrate-text');
  text.textContent = 'WOW! 💐\nYou made me the happiest — Forever yours!';

  // create particles
  for(let i=0;i<40;i++){
    const node = document.createElement('div');
    node.className = 'particle';
    node.style.left = Math.random()*100 + 'vw';
    node.style.top = (80+Math.random()*10) + 'vh';
    node.style.fontSize = (14+Math.random()*34) + 'px';
    node.style.animationDuration = (6 + Math.random()*6) + 's';
    node.style.opacity = Math.random();
    node.textContent = ['🌸','🌺','💐','✨'][Math.floor(Math.random()*4)];
    document.body.appendChild(node);
    // remove after animation
    setTimeout(()=>node.remove(), 11000);
  }
  // auto hide after a while
  setTimeout(()=>{ celebrate.classList.add('hidden'); celebrate.setAttribute('aria-hidden','true'); }, 9000);
}

// Sorrow: sad floating emojis
function startSorrow(){
  sorrow.classList.remove('hidden'); sorrow.setAttribute('aria-hidden','false');
  for(let i=0;i<30;i++){
    const node = document.createElement('div');
    node.className = 'particle';
    node.style.left = Math.random()*100 + 'vw';
    node.style.top = (80+Math.random()*10) + 'vh';
    node.style.fontSize = (24+Math.random()*30) + 'px';
    node.style.animationDuration = (5 + Math.random()*6) + 's';
    node.style.opacity = .9;
    node.textContent = ['😢','😔','💧','☹️'][Math.floor(Math.random()*4)];
    document.body.appendChild(node);
    setTimeout(()=>node.remove(), 10000);
  }
  setTimeout(()=>{ sorrow.classList.add('hidden'); sorrow.setAttribute('aria-hidden','true'); }, 9000);
}

// small accessibility: focus first button when modal opens
['modal','giftDialog'].forEach(id=>{
  const el = document.getElementById(id);
  el.addEventListener('animationstart', ()=>{});
});
