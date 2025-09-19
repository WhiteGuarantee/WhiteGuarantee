(function(){
  const tg = window.Telegram?.WebApp;
  const dbg = document.getElementById('dbg');
  const themeToggle = document.getElementById('themeToggle');
  function applyTheme(next){
    if(next === 'light'){
      document.documentElement.setAttribute('data-theme','light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
  try {
    const savedTheme = localStorage.getItem('wg_theme');
    applyTheme(savedTheme);
  } catch(e) {}
  if (themeToggle){
    themeToggle.addEventListener('click', function(){
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('wg_theme', next); } catch(e) {}
    });
  }
  if (tg) {
    tg.ready();
    tg.expand();
    tg.MainButton.setText('Отправить');
    tg.MainButton.onClick(() => submitForm());
  }

  const form = document.getElementById('support-form');
  function setDbg(text){ if(dbg) dbg.textContent = text; }

  function submitForm() {
    const data = {
      type: 'support',
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim(),
      contact: document.getElementById('contact').value.trim(),
      lang: document.getElementById('lang').value,
      ts: Date.now()
    };
    if (!data.subject || !data.message) {
      alert('Заполните тему и сообщение');
      return;
    }
    const payload = JSON.stringify(data);
    console.log('Sending WebApp data:', payload);
    setDbg('Отправка...');
    if (tg) {
      try {
        tg.sendData(payload);
        setDbg('Отправлено, можно закрыть окно');
        tg.close();
      } catch (e) {
        console.error('sendData error', e);
        setDbg('Ошибка отправки. Обновите Telegram и попробуйте снова');
        alert('Не удалось отправить данные в Telegram. Обновите приложение.');
      }
    } else {
      alert(payload);
      setDbg('Вне Telegram: показан JSON');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });
})();
