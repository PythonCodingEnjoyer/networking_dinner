const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  tg.setBackgroundColor('#0f1115');
  tg.setHeaderColor('secondary_bg_color');
}

const btnShare = document.getElementById('btnShare');
const btnManual = document.getElementById('btnManual');
const manualForm = document.getElementById('manualForm');
const cancelManual = document.getElementById('cancelManual');
const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');

btnShare.addEventListener('click', () => {
  btnShare.disabled = true;
  sendData({ action: 'share_phone_request' });
  setTimeout(()=>{ btnShare.disabled = false; }, 1200);
});

btnManual.addEventListener('click', () => {
  manualForm.classList.remove('hidden');
});

cancelManual.addEventListener('click', () => {
  manualForm.classList.add('hidden');
});

manualForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = (nameInput.value || '').trim();
  const phone = (phoneInput.value || '').trim();
  if (!name || !phone) return;
  if (!/^\+?[0-9\-\s()]{7,20}$/.test(phone)) {
    alert('Введите корректный номер телефона');
    return;
  }
  const payload = { action: 'manual_phone_submit', name, phone };
  sendData(payload);
});

function sendData(obj) {
  if (tg && typeof tg.sendData === 'function') {
    tg.sendData(JSON.stringify(obj));
  } else {
    alert('Telegram WebApp API недоступен.');
  }
}

// Load Lottie TGS (animated sticker) if provided
(function initLottie(){
  try{
    const el = document.getElementById('logoLottie');
    if(!el) return;
    // TGS is gzipped JSON; lottie-web player can load JSON, so we fetch, ungzip, and feed the JSON
    fetch('./assets/duck.tgs')
      .then(r=>r.arrayBuffer())
      .then(buf=>{
        const inflated = pako.ungzip(new Uint8Array(buf), {to: 'string'});
        const json = JSON.parse(inflated);
        lottie.loadAnimation({ container: el, renderer: 'svg', loop: true, autoplay: true, animationData: json });
      })
      .catch(()=>{
        el.innerText = '🦆';
      });
  }catch{ /* noop */ }
})();


