
let lang = 'ja';
let reservationType = '集団説明会';
let selectedDate = '';
let selectedTime = '';
let choices = [];
let pendingData = null;
let currentMonth = new Date(2026, 6, 1);
let pageZoom = Number(localStorage.getItem('mayaReservationZoom') || '0.9');

const availability = {
  '2026-07-07':['10:00〜11:00','14:00〜15:00'],
  '2026-07-08':['13:00〜14:00','15:00〜16:00'],
  '2026-07-09':['10:00〜11:00','16:00〜17:00'],
  '2026-07-10':['11:00〜12:00','14:00〜15:00'],
  '2026-07-13':['10:00〜11:00','13:00〜14:00','15:00〜16:00'],
  '2026-07-15':['10:00〜11:00','14:00〜15:00','16:00〜17:00'],
  '2026-07-16':['13:00〜14:00','15:00〜16:00'],
  '2026-07-17':['10:00〜11:00'],
  '2026-07-20':['14:00〜15:00','16:00〜17:00'],
  '2026-07-21':['10:00〜11:00','13:00〜14:00'],
  '2026-07-22':['10:00〜11:00','14:00〜15:00'],
  '2026-07-23':['11:00〜12:00','15:00〜16:00'],
  '2026-07-24':['10:00〜11:00','16:00〜17:00'],
  '2026-07-27':['13:00〜14:00','15:00〜16:00'],
  '2026-07-29':['10:00〜11:00','14:00〜15:00','16:00〜17:00'],
  '2026-08-03':['10:00〜11:00','14:00〜15:00'],
  '2026-08-05':['13:00〜14:00','15:00〜16:00'],
  '2026-08-12':['10:00〜11:00','14:00〜15:00'],
  '2026-08-19':['13:00〜14:00','16:00〜17:00'],
  '2026-08-26':['10:00〜11:00','15:00〜16:00'],
  '2026-09-02':['10:00〜11:00','14:00〜15:00'],
  '2026-09-09':['13:00〜14:00','15:00〜16:00'],
  '2026-09-16':['10:00〜11:00'],
  '2026-09-24':['14:00〜15:00','16:00〜17:00']
};

function t(ja,en){ return lang === 'ja' ? ja : en; }

function applyZoom(){
  pageZoom = Math.max(0.5, Math.min(1.2, pageZoom));
  document.getElementById('appScale').style.transform = `scale(${pageZoom})`;
  document.getElementById('appScale').style.marginBottom = `${(pageZoom - 1) * 700}px`;
  document.getElementById('zoomLabel').textContent = Math.round(pageZoom * 100);
  localStorage.setItem('mayaReservationZoom', String(pageZoom));
}
function zoomIn(){ pageZoom = +(pageZoom + 0.1).toFixed(1); applyZoom(); }
function zoomOut(){ pageZoom = +(pageZoom - 0.1).toFixed(1); applyZoom(); }

function setLanguage(newLang){
  lang = newLang;
  document.documentElement.lang = lang;
  document.getElementById('flagJa').classList.toggle('active', lang === 'ja');
  document.getElementById('flagEn').classList.toggle('active', lang === 'en');
  document.querySelectorAll('[data-ja]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
  document.querySelectorAll('[data-placeholder-ja]').forEach(el => {
    el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
  });
  renderCalendar();
  if(selectedDate) renderTimes();
  renderSelected();
}

function selectType(type, el){
  document.querySelectorAll('.choice').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  reservationType = type === 'group' ? '集団説明会' : type === 'individual' ? '個別相談' : '問い合わせのみ';
  if(type === 'inquiry'){
    document.getElementById('place').value = 'メール回答';
    document.getElementById('calendarBlock').style.display = 'none';
  }else{
    document.getElementById('calendarBlock').style.display = 'block';
  }
}

function pad(n){ return String(n).padStart(2,'0'); }
function ymd(d){ return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
function formatDate(key){
  const [y,m,d] = key.split('-').map(Number);
  const date = new Date(y,m-1,d);
  if(lang === 'en') return `${y}-${pad(m)}-${pad(d)}`;
  const w = ['日','月','火','水','木','金','土'][date.getDay()];
  return `${m}月${d}日（${w}）`;
}

function renderCalendar(){
  const y = currentMonth.getFullYear();
  const m = currentMonth.getMonth();
  const monthsEn = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('monthTitle').textContent = lang === 'en' ? `${monthsEn[m]} ${y}` : `${y}年 ${m+1}月`;
  const labels = lang === 'en' ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] : ['日','月','火','水','木','金','土'];
  document.getElementById('week').innerHTML = labels.map(w => `<div>${w}</div>`).join('');
  const days = document.getElementById('days');
  days.innerHTML = '';
  const first = new Date(y,m,1).getDay();
  const last = new Date(y,m+1,0).getDate();
  for(let i=0;i<first;i++) days.appendChild(document.createElement('div'));
  for(let d=1; d<=last; d++){
    const key = ymd(new Date(y,m,d));
    const div = document.createElement('div');
    const has = availability[key]?.length;
    div.className = `day ${has ? 'available' : 'disabled'} ${selectedDate === key ? 'selected' : ''}`;
    div.textContent = d;
    if(has){
      div.onclick = () => {
        selectedDate = key;
        selectedTime = '';
        renderCalendar();
        renderTimes();
      };
    }
    days.appendChild(div);
  }
}

function changeMonth(diff){
  const n = new Date(currentMonth.getFullYear(), currentMonth.getMonth()+diff, 1);
  if(n < new Date(2026,6,1) || n > new Date(2026,8,1)) return;
  currentMonth = n;
  selectedDate = '';
  selectedTime = '';
  renderCalendar();
  document.getElementById('timesBox').innerHTML = `<h3>${t('日付を選択してください','Please select a date')}</h3><p class="hint">${t('選択した日の空き時間がここに表示されます。','Available times for the selected date will appear here.')}</p>`;
}

function renderTimes(){
  const times = availability[selectedDate] || [];
  document.getElementById('timesBox').innerHTML =
    `<h3>${formatDate(selectedDate)} ${t('の空き時間','Available Times')}</h3>` +
    `<div class="time-list">${times.map(time => `<button class="time ${selectedTime===time?'active':''}" type="button" onclick="selectTime('${time}')">${time}</button>`).join('')}</div>` +
    `<button class="add-btn" type="button" onclick="addChoice()">${t('＋ 希望日時に追加','+ Add to Choices')}</button>`;
}

function selectTime(time){ selectedTime = time; renderTimes(); }

function addChoice(){
  if(!selectedDate || !selectedTime){ alert(t('日付と時間を選択してください','Please select a date and time.')); return; }
  if(choices.length >= 3){ alert(t('希望日時は最大3件までです','You can select up to three choices.')); return; }
  const text = `${formatDate(selectedDate)} ${selectedTime}`;
  if(choices.includes(text)){ alert(t('すでに追加されています','This time has already been added.')); return; }
  choices.push(text);
  renderSelected();
}

function removeChoice(i){ choices.splice(i,1); renderSelected(); }

function renderSelected(){
  const labels = lang === 'en' ? ['1st Choice','2nd Choice','3rd Choice'] : ['第1希望','第2希望','第3希望'];
  let html = '';
  for(let i=0;i<3;i++){
    html += `<div class="selected-card"><b>${labels[i]}`;
    if(choices[i]) html += `<button class="remove" type="button" onclick="removeChoice(${i})">×</button>`;
    html += `</b>${choices[i] || `<span class="empty">${t('未選択','Not selected')}</span>`}</div>`;
  }
  document.getElementById('selectedList').innerHTML = html;
}

function toggleNoDate(){
  document.getElementById('noDateDetails').style.display = document.getElementById('noDateCheck').checked ? 'block' : 'none';
}

function buildData(){
  return {
    reservationType,
    place: document.getElementById('place').value,
    choice1: choices[0] || '',
    choice2: choices[1] || '',
    choice3: choices[2] || '',
    noDateWithin3Months: document.getElementById('noDateDetails').value.trim() ? 'はい' : '',
    noDateDetails: document.getElementById('noDateDetails').value.trim(),
    schoolName: document.getElementById('schoolName').value.trim(),
    contactName: document.getElementById('contactName').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    participants: document.getElementById('participants').value,
    country: document.getElementById('country').value.trim(),
    message: document.getElementById('message').value.trim()
  };
}

function validate(data){
  if(data.reservationType !== '問い合わせのみ' && !data.choice1 && !data.noDateDetails){
    alert(t('希望日時を選ぶか、希望時期を入力してください','Please select a preferred time or enter your preferred period.'));
    return false;
  }
  if(!data.schoolName){ alert(t('学校名 / お名前を入力してください','Please enter the school name / your name.')); return false; }
  if(!data.email){ alert(t('メールアドレスを入力してください','Please enter your email address.')); return false; }
  return true;
}

function goConfirm(){
  const data = buildData();
  if(!validate(data)) return;
  pendingData = data;
  const labels = [
    [t('予約内容','Reservation Type'), data.reservationType],
    [t('開催方法','Meeting Method'), data.place],
    [t('第1希望','1st Choice'), data.choice1 || '-'],
    [t('第2希望','2nd Choice'), data.choice2 || '-'],
    [t('第3希望','3rd Choice'), data.choice3 || '-'],
    [t('希望時期','Preferred Period'), data.noDateDetails || '-'],
    [t('学校名 / お名前','School Name / Name'), data.schoolName],
    [t('ご担当者名','Contact Person'), data.contactName || '-'],
    [t('メールアドレス','Email Address'), data.email],
    [t('電話番号','Phone Number'), data.phone || '-'],
    [t('参加予定人数','Expected Participants'), data.participants || '-'],
    [t('国','Country'), data.country || '-'],
    [t('ご質問・ご要望','Questions / Requests'), data.message || '-']
  ];
  document.getElementById('confirmRows').innerHTML = labels.map(r => `<div class="row"><b>${r[0]}</b><div>${String(r[1]).replace(/\n/g,'<br>')}</div></div>`).join('');
  document.getElementById('formView').classList.remove('active');
  document.getElementById('confirmView').classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

function backToForm(){
  document.getElementById('confirmView').classList.remove('active');
  document.getElementById('formView').classList.add('active');
}

function submitReservation(){
  if(!pendingData) return;
  fetch(GAS_ENDPOINT, {
    method:'POST',
    mode:'no-cors',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(pendingData)
  });
  document.getElementById('successModal').style.display = 'flex';
}

function newReservation(){
  location.reload();
}

window.addEventListener('load', () => {
  applyZoom();
  renderCalendar();
  renderSelected();
});

