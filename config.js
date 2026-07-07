
:root{
  --navy:#0B2D5C;
  --blue:#174B91;
  --bg:#F7F9FC;
  --card:#FFFFFF;
  --line:#E3EAF5;
  --text:#0B1F3A;
  --muted:#667085;
  --green:#16A34A;
  --red:#D92D20;
}
*{box-sizing:border-box}
body{
  margin:0;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans JP",Arial,sans-serif;
  color:var(--text);
  background:#F7F9FC;
}
.app-scale{transform-origin:top center;transition:transform .18s ease}
.page{max-width:1080px;margin:0 auto;padding:32px 18px 72px}
.hero{position:relative;text-align:center;padding:18px 0 28px}
.brand{font-size:14px;font-weight:900;letter-spacing:.16em;color:var(--navy);margin-bottom:14px}
.hero h1{margin:0;font-size:clamp(29px,5vw,47px);line-height:1.15;font-weight:900}
.hero p{max-width:650px;margin:14px auto 0;color:var(--muted);line-height:1.8;font-size:15px}
.tools{position:absolute;top:8px;right:0;display:flex;align-items:center;gap:10px}
.flags,.zoom{
  display:flex;align-items:center;gap:5px;background:white;border:1px solid var(--line);
  border-radius:999px;padding:5px;box-shadow:0 10px 24px rgba(11,45,92,.10)
}
.flag{border:0;background:transparent;border-radius:999px;width:30px;height:30px;cursor:pointer;font-size:17px;line-height:1}
.flag.active{background:var(--navy);box-shadow:0 5px 14px rgba(11,45,92,.16)}
.zoom button{width:28px;height:28px;border:0;border-radius:50%;background:#EEF5FF;color:var(--navy);font-weight:900;cursor:pointer;font-size:15px}
.zoom span{min-width:34px;text-align:center;font-size:12px;font-weight:900;color:var(--navy)}
.steps{display:flex;justify-content:center;gap:10px;margin:8px 0 24px;flex-wrap:wrap}
.step{display:flex;gap:7px;align-items:center;color:#98A2B3;font-size:13px;font-weight:900}
.step span{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:white;border:1px solid #CBD5E1}
.step.active{color:var(--navy)}
.step.active span{background:var(--navy);color:white;border-color:var(--navy)}
.shell{background:white;border:1px solid var(--line);border-radius:30px;box-shadow:0 24px 70px rgba(11,45,92,.10);overflow:hidden}
.bar{height:8px;background:linear-gradient(90deg,var(--navy),var(--blue),var(--green))}
.view{display:none}
.view.active{display:block}
.layout{display:grid;grid-template-columns:1.28fr .82fr}
.main{padding:32px;border-right:1px solid var(--line)}
.side{padding:32px;background:#FBFCFE}
.block{margin-bottom:30px}
.block h2,.side h2,.confirm-card h2{margin:0 0 12px;color:var(--navy);font-size:22px}
.hint,.side p{color:var(--muted);line-height:1.7;font-size:14px;margin:0 0 14px}
.choice-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.choice{
  border:2px solid var(--line);border-radius:18px;padding:16px 12px;text-align:center;
  font-weight:900;background:#FBFDFF;cursor:pointer;min-height:74px
}
.choice.active{border-color:var(--navy);background:#EEF5FF;color:var(--navy)}
label{display:block;font-weight:900;margin:12px 0 7px}
select,input,textarea{
  width:100%;border:1px solid var(--line);border-radius:15px;padding:14px 15px;font-size:16px;background:white;outline:none
}
select:focus,input:focus,textarea:focus{border-color:var(--navy);box-shadow:0 0 0 4px rgba(11,45,92,.08)}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
textarea{min-height:112px;resize:vertical}
.calendar-head{display:flex;justify-content:space-between;align-items:center;margin:8px 0 12px}
.calendar-head h3{margin:0;font-size:22px}
.calendar-head button{width:40px;height:40px;border-radius:50%;border:1px solid var(--line);background:white;color:var(--navy);font-size:20px;cursor:pointer}
.week,.days{display:grid;grid-template-columns:repeat(7,1fr);gap:7px}
.week div{text-align:center;color:#98A2B3;font-size:13px;font-weight:900;padding:7px 0}
.day{height:46px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:900;position:relative}
.day.available{border:1px solid var(--line);background:white;cursor:pointer}
.day.available:after{content:"";position:absolute;bottom:6px;width:5px;height:5px;border-radius:50%;background:var(--green)}
.day.disabled{color:#CBD5E1}
.day.selected{background:var(--navy);color:white;border-color:var(--navy)}
.day.selected:after{background:white}
.times-box{margin-top:22px;padding-top:20px;border-top:1px solid var(--line)}
.times-box h3{margin:0 0 12px;font-size:18px}
.time-list{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.time{border:1px solid var(--line);border-radius:14px;padding:13px 10px;text-align:center;font-weight:900;cursor:pointer;background:white}
.time.active{background:#EEF5FF;border-color:var(--navy);color:var(--navy)}
.add-btn,.primary-btn,.secondary-btn{
  border:0;border-radius:16px;padding:16px;font-size:16px;font-weight:900;cursor:pointer;text-align:center
}
.add-btn,.primary-btn{width:100%;background:linear-gradient(135deg,var(--navy),var(--blue));color:white;box-shadow:0 14px 28px rgba(11,45,92,.16)}
.secondary-btn{background:#EEF2F7;color:var(--navy)}
.no-date{margin-top:16px;padding:16px;border:1px dashed #C8D8F1;border-radius:18px;background:#FBFDFF}
.no-date label{display:flex;gap:10px;align-items:flex-start;margin:0;cursor:pointer}
.no-date input[type="checkbox"]{width:20px;height:20px;accent-color:var(--navy)}
.hidden-input{display:none;margin-top:12px}
.selected-card{border:1px solid var(--line);border-radius:18px;padding:16px;background:white;margin-bottom:12px}
.selected-card b{display:block;color:var(--navy);margin-bottom:6px}
.empty{color:#98A2B3}
.remove{float:right;border:0;background:#FEE4E2;color:var(--red);border-radius:999px;width:28px;height:28px;font-weight:900;cursor:pointer}
.confirm-card{padding:34px;max-width:780px;margin:0 auto}
.confirm-rows{display:grid;gap:10px;margin-top:18px}
.row{display:grid;grid-template-columns:190px 1fr;gap:12px;background:#FBFDFF;border:1px solid var(--line);border-radius:15px;padding:13px}
.row b{color:var(--navy)}
.confirm-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:22px}
footer{text-align:center;color:var(--muted);margin-top:28px;font-size:14px}
.modal{display:none;position:fixed;inset:0;background:rgba(7,31,66,.56);align-items:center;justify-content:center;padding:18px;z-index:999}
.modal-card{background:white;max-width:520px;width:100%;border-radius:30px;text-align:center;padding:42px 30px;box-shadow:0 28px 80px rgba(0,0,0,.25)}
.check{width:82px;height:82px;border-radius:50%;background:var(--green);color:white;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:44px;font-weight:900}
.modal-card h2{font-size:30px;margin:0 0 12px;color:var(--text)}
.modal-card p{color:var(--muted);line-height:1.8}
.modal-card button{margin-top:16px;border:0;background:var(--navy);color:white;border-radius:14px;padding:14px 24px;font-weight:900;cursor:pointer}
@media(max-width:860px){
  .page{padding:18px 12px 56px}
  .hero{padding-top:8px}
  .tools{position:static;justify-content:center;flex-direction:column;margin:16px auto 0}
  .zoom{position:fixed;right:14px;bottom:14px;z-index:1000;transform:scale(.92)}
  .layout{grid-template-columns:1fr}
  .main{border-right:0;border-bottom:1px solid var(--line);padding:22px}
  .side{padding:22px}
  .choice-grid,.form-grid,.time-list{grid-template-columns:1fr}
  .shell{border-radius:22px}
  .week,.days{gap:5px}
  .day{height:40px;border-radius:11px;font-size:13px}
  .week div{font-size:12px}
  .row{grid-template-columns:1fr}
  .confirm-actions{grid-template-columns:1fr}
  .confirm-card{padding:24px}
}
