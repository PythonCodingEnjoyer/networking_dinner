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
  // Request phone sharing via WebApp API (simulate confirm dialog)
  // Telegram does not auto-ask phone; we send a signal to bot to ask for contact or use profile data
  sendData({ action: 'share_phone_request' });
});

btnManual.addEventListener('click', () => {
  manualForm.classList.remove('hidden');
});

cancelManual.addEventListener('click', () => {
  manualForm.classList.add('hidden');
});

manualForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    action: 'manual_phone_submit',
    name: (nameInput.value || '').trim(),
    phone: (phoneInput.value || '').trim(),
  };
  if (!payload.name || !payload.phone) return;
  sendData(payload);
});

function sendData(obj) {
  if (tg && typeof tg.sendData === 'function') {
    tg.sendData(JSON.stringify(obj));
  } else {
    alert('Telegram WebApp API недоступен.');
  }
}


