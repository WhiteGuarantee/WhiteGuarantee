(function(){
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    tg.MainButton.setText('Отправить');
    tg.MainButton.onClick(() => submitForm());
  }

  const form = document.getElementById('support-form');
  function submitForm() {
    const data = {
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim(),
      contact: document.getElementById('contact').value.trim(),
      lang: document.getElementById('lang').value,
    };
    if (!data.subject || !data.message) {
      alert('Заполните тему и сообщение');
      return;
    }
    const payload = JSON.stringify({ type: 'support', ...data });
    if (tg) {
      tg.sendData(payload);
      tg.close();
    } else {
      // fallback: просто показать JSON
      alert(payload);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });
})();
