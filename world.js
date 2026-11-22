/* Raghad's world: an imaginary room on the About page.
   Awards hang on the wall, skills sit on the bookshelf, and the window opens onto the night sky. */
(function(){
  var t=function(s){ return (window.AR && window.AR[s]) || s; };
  var AR=!!window.AR;
  var RM=window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  var RANK={gold:['Gold Medal','الميدالية الذهبية'],first:['First Place','المركز الأول'],second:['Second Place','المركز الثاني'],third:['Third Place','المركز الثالث'],top5:['Top 5 Finalist','ضمن أفضل 5']};
  function rk(k){ return RANK[k][AR?1:0]; }
  var AW=[
    {k:'second', img:'quraa/g1.png', n:'Quraa', s:'Qur’an Kareem Competition', y:'2022', link:'#quraa', c:'#c0c6cc'},
    {k:'first', img:'dafah/poster.jpg', n:'DAFAH COMPETITION', s:'Best University Explainer', y:'2026', c:'#e9c25a'},
    {k:'gold', img:'sgie/stage.jpg', n:'Rakeez', s:'Saudi Global Inventions & Innovations Expo', y:'2026', link:'#rakeez', big:1, c:'#e9c25a'},
    {k:'third', art:'🌾', bg:'linear-gradient(150deg,#3fcbc6,#1d4ed8)', n:'EBDAATHON', s:'Sanabel — Islamic Financial Solutions Track', y:'2026', link:'#sanabil', c:'#cd7f32'},
    {k:'third', img:'inara/g1.png', n:'Inara', s:'Fifth Scientific Forum', y:'2022', link:'#inara', c:'#cd7f32'},
    {k:'top5', art:'🧮', bg:'linear-gradient(150deg,#7c3aed,#c026d3)', n:'HASEEB SMART TAX', s:'Saudi Accounting Association Hackathon', y:'2024', c:'#a78bfa'}
  ];
  var SK=[
    {n:'Programming & Development', c:'#7c3aed', i:['Python','Java','JavaScript','HTML','CSS','Flutter','Web Development']},
    {n:'Hardware & Prototyping', c:'#0ea5a4', i:['ESP32','Electronics','IoT','GPS','OLED/TFT Display','Prototyping']},
    {n:'Innovation', c:'#e8793f', i:['Patent filing','Hackathons','Pitching & exhibitions','Problem Solving']},
    {n:'IT & Digital', c:'#2563eb', i:['Digital Transformation','Digital Strategy','IT Enablement','IT Governance','Database Management','Cybersecurity','Governance, Risk & Compliance']},
    {n:'Design & Productivity', c:'#db2777', i:['UI/UX Design','Excel','PowerPoint','Word']}
  ];
  var SPINE=['#f5f2ea','#1f2937','#fde68a'];

  function frame(a,i){
    var pic = a.img ? '<img src="'+a.img+'" alt="" loading="lazy">' : '<span class="rw-art" style="background:'+a.bg+'">'+a.art+'</span>';
    return '<button type="button" class="rw-frame'+(a.big?' big':'')+'" data-aw="'+i+'" style="--mc:'+a.c+'">'+
      '<span class="rw-pic">'+pic+'</span><span class="rw-plaque"><b>'+esc(rk(a.k))+'</b><small>'+esc(t(a.n))+' · '+a.y+'</small></span>'+
      (a.big?'<span class="rw-medal" aria-hidden="true"><i></i></span>':'')+'</button>';
  }
  function shelf(s,si){
    return '<div class="rw-shelf"><span class="rw-tag" style="--c:'+s.c+'">'+esc(t(s.n))+'</span><div class="rw-books">'+
      s.i.map(function(b,bi){ var h=150+((bi*37+si*11)%5)*12, w=34+((bi*13+si*7)%3)*6, tilt=(bi===s.i.length-1&&si%2===0)?' tilt':'';
        return '<button type="button" class="rw-book'+tilt+'" style="--c:'+s.c+';--h:'+h+'px;--w:'+w+'px;--sp:'+SPINE[(bi+si)%3]+'"><span>'+esc(t(b))+'</span></button>'; }).join('')+
      '</div><i class="rw-plank"></i></div>';
  }
  function stars(n){ var s=''; for(var i=0;i<n;i++) s+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;top:'+(Math.random()*100).toFixed(1)+'%;animation-delay:'+(Math.random()*4).toFixed(1)+'s;--s:'+(1+Math.random()*2).toFixed(1)+'px"></i>'; return s; }
  function bulbs(n){ var s=''; for(var i=0;i<n;i++) s+='<i style="--d:'+(i%5*.35)+'s;--c:'+['#ffd166','#ff9ec7','#9ae6ff','#c4b5fd','#fff3b0'][i%5]+'"></i>'; return s; }

  window.WORLD=function(host){
    if(!host) return;
    var neon=t('What if there’s a better way?');
    host.innerHTML=
      '<div class="rw" tabindex="-1">'+
        '<div class="rw-sky" aria-hidden="true">'+stars(80)+'</div>'+
        '<div class="rw-intro"><p class="rw-kick">'+esc(t('Step inside'))+'</p><h2>'+esc(t('Raghad’s world'))+'</h2><p>'+esc(t('A room where every award has its own frame, every skill its own book, and every window opens onto an idea. Drag to look around, and tap anything to bring it closer.'))+'</p></div>'+
        '<div class="rw-view"><div class="rw-stage"><div class="rw-scene">'+
          '<div class="rw-wall rw-back"><div class="rw-lights">'+bulbs(22)+'</div><p class="rw-wt">'+esc(t('Wall of awards'))+'</p><div class="rw-frames">'+AW.map(frame).join('')+'</div></div>'+
          '<div class="rw-wall rw-left"><p class="rw-wt">'+esc(t('The skills library'))+'</p><div class="rw-case">'+SK.map(shelf).join('')+'</div></div>'+
          '<div class="rw-wall rw-right"><div class="rw-window"><div class="rw-night">'+stars(40)+'<span class="rw-moon"></span><span class="rw-shoot"></span></div><i class="rw-bar v"></i><i class="rw-bar h"></i></div>'+
            '<p class="rw-neon" dir="auto">'+esc(neon)+'</p><div class="rw-plant" aria-hidden="true">🪴</div></div>'+
          '<div class="rw-floor"><div class="rw-rug"></div></div><div class="rw-ceil"><span class="rw-lamp"></span></div>'+
          '<div class="rw-desk"><div class="rw-top"></div><div class="rw-front"><span class="rw-drawer"></span><span class="rw-drawer"></span></div>'+
            '<button type="button" class="rw-rk" aria-label="Rakeez" data-go="#rakeez"><i></i><span>Rakeez</span></button><span class="rw-cup" aria-hidden="true">☕</span><span class="rw-lap" aria-hidden="true"><i></i></span></div>'+
        '</div></div></div>'+
        '<div class="rw-dust" aria-hidden="true">'+stars(26)+'</div>'+
        '<div class="rw-nav" role="group" aria-label="'+esc(t('Look around'))+'">'+
          [['left','The skills library'],['back','Wall of awards'],['all','Whole room'],['right','The window']].map(function(b){ return '<button type="button" data-f="'+b[0]+'">'+esc(t(b[1]))+'</button>'; }).join('')+
        '</div>'+
        '<div class="rw-door" aria-hidden="true"><i></i><i></i></div>'+
        '<div class="rw-lb" hidden><div class="rw-lbc"><button type="button" class="rw-x" aria-label="'+esc(t('Close'))+'">✕</button><div class="rw-lbi"></div><div class="rw-lbt"></div></div></div>'+
        '<p class="rw-tip" aria-live="polite"></p>'+
      '</div>';
    var rw=host.querySelector('.rw'), view=host.querySelector('.rw-view'), stage=host.querySelector('.rw-stage'), scene=host.querySelector('.rw-scene'), lb=host.querySelector('.rw-lb'), tip=host.querySelector('.rw-tip');
    var yaw=0, pitch=-4, focus='all', mob=false, drag=null, dx0=0;
    var POSE={all:function(){ return [-120,pitch,yaw,0]; }, back:function(){ return [330,0,0,0]; }, left:function(){ return [40,0,-90,600]; }, right:function(){ return [40,0,90,-600]; }};
    function apply(){ var p=POSE[focus](); scene.style.transform='translateZ('+p[0]+'px) rotateX('+p[1]+'deg) rotateY('+p[2]+'deg) translateX('+p[3]+'px)'; rw.setAttribute('data-f',focus);
      [].forEach.call(host.querySelectorAll('.rw-nav button'),function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-f')===focus); }); }
    function fit(){ var w=view.clientWidth, h=view.clientHeight; mob=w<760; rw.classList.toggle('rw-m',mob); stage.style.transform=mob?'':'scale('+Math.min(w/1240,h/760)+')'; }
    function go(f){ if(mob){ var el=host.querySelector('.rw-'+(f==='all'?'back':f)); if(el) view.scrollTo({left:el.offsetLeft-(view.clientWidth-el.offsetWidth)/2,behavior:RM?'auto':'smooth'}); focus=f; apply(); return; } focus=f; if(f==='all') yaw=0; apply(); }
    host.querySelector('.rw-nav').addEventListener('click',function(e){ var b=e.target.closest('[data-f]'); if(b) go(b.getAttribute('data-f')); });
    view.addEventListener('pointerdown',function(e){ if(mob||e.target.closest('button')) return; drag=e.clientX; dx0=yaw; view.setPointerCapture&&view.setPointerCapture(e.pointerId); if(focus!=='all'){ focus='all'; } rw.classList.add('dragging'); });
    view.addEventListener('pointermove',function(e){
      if(mob) return;
      if(drag!==null){ yaw=Math.max(-32,Math.min(32,dx0+(e.clientX-drag)*.08)); apply(); return; }
      if(focus==='all' && !RM){ var r=view.getBoundingClientRect(); var nx=(e.clientX-r.left)/r.width-.5, ny=(e.clientY-r.top)/r.height-.5; yaw=nx*14; pitch=-4-ny*5; apply(); }
    });
    ['pointerup','pointercancel'].forEach(function(ev){ view.addEventListener(ev,function(){ drag=null; rw.classList.remove('dragging'); }); });
    function open(html){ host.querySelector('.rw-lbi').innerHTML=html[0]; host.querySelector('.rw-lbt').innerHTML=html[1]; lb.hidden=false; host.querySelector('.rw-x').focus(); }
    lb.addEventListener('click',function(e){ if(e.target===lb||e.target.closest('.rw-x')) lb.hidden=true; });
    rw.addEventListener('keydown',function(e){ if(e.key==='Escape') lb.hidden=true; });
    rw.addEventListener('click',function(e){
      var f=e.target.closest('.rw-frame'), b=e.target.closest('.rw-book'), r=e.target.closest('.rw-rk');
      if(f){ var a=AW[+f.getAttribute('data-aw')];
        open([a.img?'<img src="'+a.img+'" alt="">':'<span class="rw-art big" style="background:'+a.bg+'">'+a.art+'</span>',
          '<p class="rw-lbk" style="color:'+a.c+'">'+esc(rk(a.k))+' · '+a.y+'</p><h3>'+esc(t(a.n))+'</h3><p>'+esc(t(a.s))+'</p>'+(a.link?'<a class="rw-lbl" href="'+a.link+'">'+esc(t('EXPLORE PROJECT'))+'</a>':'')]); return; }
      if(b){ [].forEach.call(host.querySelectorAll('.rw-book.out'),function(x){ if(x!==b) x.classList.remove('out'); }); b.classList.toggle('out');
        tip.textContent=b.classList.contains('out')?b.textContent:''; return; }
      if(r){ location.hash='rakeez'; }
    });
    if('ResizeObserver' in window) new ResizeObserver(function(){ fit(); }).observe(view);
    fit(); apply();
    /* the doors open each time the room comes into view */
    if('IntersectionObserver' in window) new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ rw.classList.add('open'); } else if(en.intersectionRatio===0){ rw.classList.remove('open'); } }); },{threshold:[0,.35]}).observe(rw);
    else rw.classList.add('open');
  };

  var css=
  '.rw{--ink:#0b0920;position:relative;overflow:hidden;isolation:isolate;margin:clamp(1rem,3vw,2rem) 0 clamp(2.5rem,6vw,4rem);border-radius:clamp(18px,3vw,32px);background:radial-gradient(120% 90% at 50% 0%,#2a1b5c,#120c2e 55%,#07061a);color:#efeaff;padding:clamp(1.6rem,4vw,3rem) 0 1.4rem;box-shadow:0 60px 120px -60px rgba(76,29,149,.9)}'+
  '.rw-sky,.rw-dust{position:absolute;inset:0;pointer-events:none;z-index:0}.rw-sky i,.rw-dust i,.rw-night i{position:absolute;width:var(--s);height:var(--s);border-radius:50%;background:#fff;animation:rwTw 3.6s ease-in-out infinite}'+
  '.rw-dust{z-index:3}.rw-dust i{background:#ffd9a8;box-shadow:0 0 8px #ffb36b;animation:rwFloat 9s ease-in-out infinite;opacity:.7}'+
  '@keyframes rwTw{50%{opacity:.15}}@keyframes rwFloat{50%{transform:translate(18px,-30px);opacity:.25}}'+
  '.rw-intro{position:relative;z-index:2;text-align:center;max-width:62ch;margin:0 auto;padding:0 1.2rem}.rw-kick{margin:0;color:#c4b5fd;font-size:.85rem;letter-spacing:.2em;text-transform:uppercase}html[lang=ar] .rw-kick{letter-spacing:0}'+
  '.rw-intro h2{margin:.3rem 0 .6rem;font:800 clamp(2.2rem,6vw,4.4rem)/1.05 var(--f-head);letter-spacing:-.03em;background:linear-gradient(100deg,#fff,#e9d5ff 40%,#ffd9a8);-webkit-background-clip:text;background-clip:text;color:transparent}html[lang=ar] .rw-intro h2{letter-spacing:0;line-height:1.35}'+
  '.rw-intro>p:last-child{margin:0;color:rgba(239,234,255,.75);line-height:1.75}'+
  '.rw-view{position:relative;z-index:2;height:clamp(520px,64vw,780px);perspective:1000px;perspective-origin:50% 42%;overflow:hidden;touch-action:pan-y;cursor:grab}.rw.dragging .rw-view{cursor:grabbing}'+
  '.rw-stage{position:absolute;left:50%;top:50%;width:1200px;height:720px;margin:-360px 0 0 -600px;transform-style:preserve-3d}'+
  '.rw-scene{position:absolute;inset:0;transform-style:preserve-3d;transition:transform 1.1s cubic-bezier(.65,0,.2,1)}.rw.dragging .rw-scene{transition:transform .15s linear}'+
  '.rw:not(.open) .rw-scene{transform:translateZ(-700px) rotateX(-4deg)!important;transition-duration:0s}'+
  '.rw-wall,.rw-floor,.rw-ceil{position:absolute;left:0;top:0;backface-visibility:hidden;transition:opacity .7s}'+
  '.rw-back{width:1200px;height:720px;transform:translateZ(-450px);background:radial-gradient(70% 60% at 50% 30%,#3b2a7a,#241a52 70%),#241a52;box-shadow:inset 0 -60px 80px rgba(0,0,0,.35)}'+
  '.rw-left{width:900px;height:720px;left:150px;transform:rotateY(90deg) translateZ(-600px);background:linear-gradient(90deg,#1c1442,#2b1f62)}'+
  '.rw-right{width:900px;height:720px;left:150px;transform:rotateY(-90deg) translateZ(-600px);background:linear-gradient(-90deg,#1c1442,#2b1f62)}'+
  '.rw-floor{width:1200px;height:900px;top:-90px;transform:rotateX(90deg) translateZ(-360px);background:repeating-linear-gradient(90deg,#3a2414 0 118px,#2e1c10 118px 120px),#3a2414;box-shadow:inset 0 0 160px rgba(0,0,0,.6)}'+
  '.rw-ceil{width:1200px;height:900px;top:-90px;transform:rotateX(-90deg) translateZ(-360px);background:radial-gradient(circle at 50% 50%,#2b2160,#0f0b26 70%)}'+
  '.rw-lamp{position:absolute;left:50%;top:50%;width:140px;height:140px;margin:-70px;border-radius:50%;background:radial-gradient(circle,#fff7d6,rgba(255,214,140,.25) 45%,transparent 70%)}'+
  '.rw-rug{position:absolute;left:50%;top:50%;width:620px;height:420px;margin:-210px 0 0 -310px;border-radius:50%;background:repeating-radial-gradient(ellipse at center,#6d28d9 0 18px,#7c3aed 18px 30px,#a78bfa 30px 34px,#4c1d95 34px 52px);opacity:.75}'+
  '.rw-wt{position:absolute;top:26px;left:0;right:0;margin:0;text-align:center;font:700 15px/1 var(--f-head);letter-spacing:.24em;text-transform:uppercase;color:rgba(233,213,255,.6)}html[lang=ar] .rw-wt{letter-spacing:0;font-size:18px}'+
  '.rw-lights{position:absolute;top:0;left:30px;right:30px;height:70px;display:flex;justify-content:space-between;border-top:0;background:radial-gradient(120% 70px at 50% -20px,transparent 60%,rgba(255,255,255,.15) 61%,transparent 62%)}'+
  '.rw-lights i{width:12px;height:16px;margin-top:calc(18px + 30px * var(--y,0));border-radius:50% 50% 45% 45%;background:var(--c);box-shadow:0 0 14px 3px var(--c);animation:rwBulb 2s ease-in-out infinite;animation-delay:var(--d)}'+
  '.rw-lights i:nth-child(odd){margin-top:34px}.rw-lights i:nth-child(4n){margin-top:44px}@keyframes rwBulb{50%{opacity:.45;box-shadow:0 0 4px var(--c)}}'+
  '.rw-frames{position:absolute;left:60px;right:60px;top:86px;height:350px;display:grid;grid-template-columns:1fr 1fr 1.6fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:22px 26px;align-items:center}'+
  '.rw-frame{position:relative;border:0;padding:10px;background:linear-gradient(145deg,#d8b468,#8a6420);border-radius:4px;box-shadow:0 18px 30px rgba(0,0,0,.55),inset 0 0 0 2px rgba(255,255,255,.25);cursor:pointer;transition:transform .35s cubic-bezier(.3,1.5,.5,1),box-shadow .35s;color:#1d1300}'+
  '.rw-frame:nth-child(even){transform:rotate(-1.2deg)}.rw-frame:hover,.rw-frame:focus-visible{transform:translateZ(30px) scale(1.06) rotate(0);box-shadow:0 28px 50px rgba(0,0,0,.6),0 0 40px rgba(255,214,140,.35);outline:none}'+
  '.rw-frame{display:flex;flex-direction:column;height:100%;min-height:0}.rw-frame.big{padding:14px;background:linear-gradient(145deg,#ffe9a8,#c8962e 50%,#8a6420)}'+
  '.rw-frames>:nth-child(1){grid-column:1;grid-row:1/3}.rw-frames>:nth-child(2){grid-column:2;grid-row:1}.rw-frames>:nth-child(6){grid-column:2;grid-row:2}.rw-frames>:nth-child(3){grid-column:3;grid-row:1/3}.rw-frames>:nth-child(4){grid-column:4;grid-row:1/3}.rw-frames>:nth-child(5){grid-column:5;grid-row:1/3}'+
  '.rw-pic{display:block;flex:1;min-height:0;overflow:hidden;background:#111;box-shadow:inset 0 0 0 6px #f5efe0}.rw-pic img{width:100%;height:100%;object-fit:cover;filter:saturate(1.05) contrast(1.05)}'+
  '.rw-art{display:grid;place-items:center;width:100%;height:100%;font-size:54px}.rw-art.big{font-size:120px;aspect-ratio:4/3;border-radius:12px}'+
  '.rw-plaque{display:grid;gap:2px;margin-top:8px;padding:6px 8px;background:linear-gradient(#f3e2b3,#c9a24a);border-radius:2px;font-size:11px;line-height:1.2;text-align:center}.rw-plaque b{font-size:12px}.rw-plaque small{font-size:10px;opacity:.8}'+
  '.rw-medal{position:absolute;top:-26px;right:-22px;width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff6c8,#e9c25a 40%,#9a6a12);box-shadow:0 8px 20px rgba(0,0,0,.5),0 0 30px rgba(233,194,90,.6);animation:rwSwing 4s ease-in-out infinite;transform-origin:50% -40px}.rw-medal::before{content:"";position:absolute;left:50%;top:-40px;width:18px;height:44px;margin-left:-9px;background:linear-gradient(90deg,#7c3aed 0 50%,#16a34a 50%);clip-path:polygon(0 0,100% 0,100% 100%,50% 80%,0 100%);z-index:-1}.rw-medal i{position:absolute;inset:12px;border-radius:50%;border:2px dashed rgba(122,82,10,.6)}'+
  '@keyframes rwSwing{50%{transform:rotate(6deg)}}'+
  '.rw-case{position:absolute;left:70px;right:70px;top:66px;bottom:40px;padding:16px 20px;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(#5b3a1e,#3e2611);border-radius:6px;box-shadow:inset 0 0 0 10px #4a2e16,inset 0 0 60px rgba(0,0,0,.6),0 30px 50px rgba(0,0,0,.5)}'+
  '.rw-shelf{position:relative;flex:1;display:flex;align-items:flex-end;gap:14px;padding:0 10px 10px}.rw-plank{position:absolute;left:-10px;right:-10px;bottom:0;height:10px;background:linear-gradient(#8a5a2b,#5b3a1e);box-shadow:0 6px 10px rgba(0,0,0,.5)}'+
  '.rw-tag{flex:none;align-self:center;writing-mode:vertical-rl;transform:rotate(180deg);font:700 11px/1 var(--f-mono);color:#f5e6c8;background:var(--c);padding:8px 5px;border-radius:3px;max-height:110px;overflow:hidden;text-overflow:ellipsis}html[lang=ar] .rw-tag{transform:none;font-family:var(--f-body)}'+
  '.rw-books{display:flex;align-items:flex-end;gap:3px;flex-wrap:nowrap;min-width:0}'+
  '.rw-book{position:relative;width:var(--w);height:calc(var(--h) * .5);flex:none;border:0;padding:0;border-radius:3px 3px 1px 1px;background:linear-gradient(90deg,rgba(0,0,0,.25),transparent 20%,rgba(255,255,255,.15) 45%,transparent 60%,rgba(0,0,0,.3)),var(--c);box-shadow:inset 0 6px 0 rgba(255,255,255,.18),inset 0 -6px 0 rgba(0,0,0,.2);cursor:pointer;transition:transform .35s cubic-bezier(.3,1.5,.5,1),filter .3s;color:var(--sp)}'+
  '.rw-book span{position:absolute;inset:8px 0;writing-mode:vertical-rl;transform:rotate(180deg);display:grid;place-items:center;font:700 11px/1 var(--f-body);white-space:nowrap;overflow:hidden;color:var(--sp)}html[lang=ar] .rw-book span{transform:none}'+
  '.rw-book:nth-child(3n){filter:brightness(1.15)}.rw-book:nth-child(4n){filter:saturate(.75) brightness(.9)}.rw-book.tilt{transform:rotate(-8deg);transform-origin:bottom left;margin-inline-start:10px}'+
  '.rw-book:hover,.rw-book:focus-visible{transform:translateY(-14px);filter:brightness(1.25);outline:none}.rw-book.out{transform:translateY(-26px) translateZ(40px) scale(1.15);filter:brightness(1.35);box-shadow:0 0 30px var(--c)}'+
  '.rw-window{position:absolute;left:90px;top:80px;width:330px;height:420px;border-radius:165px 165px 8px 8px;overflow:hidden;box-shadow:0 0 0 14px #4a2e16,0 0 0 18px #2b190b,0 30px 60px rgba(0,0,0,.6)}'+
  '.rw-night{position:absolute;inset:0;background:linear-gradient(#0b1033,#1e2a6e 70%,#5b3f8c)}.rw-moon{position:absolute;right:50px;top:70px;width:70px;height:70px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fffbe6,#f5e3a3);box-shadow:0 0 40px 10px rgba(255,240,180,.45)}'+
  '.rw-shoot{position:absolute;left:-40px;top:60px;width:90px;height:2px;background:linear-gradient(90deg,transparent,#fff);transform:rotate(18deg);animation:rwShoot 6s ease-in 2s infinite;opacity:0}@keyframes rwShoot{0%{opacity:0;transform:translate(0,0) rotate(18deg)}4%{opacity:1}14%{opacity:0;transform:translate(420px,140px) rotate(18deg)}100%{opacity:0}}'+
  '.rw-bar{position:absolute;background:#4a2e16}.rw-bar.v{left:50%;top:0;bottom:0;width:8px;margin-left:-4px}.rw-bar.h{left:0;right:0;top:55%;height:8px}'+
  '.rw-neon{position:absolute;right:60px;top:120px;width:360px;margin:0;font:700 40px/1.3 var(--f-head);color:#ffe9ff;text-align:center;text-shadow:0 0 6px #fff,0 0 16px #f0abfc,0 0 34px #d946ef,0 0 60px #a21caf;animation:rwNeon 5s infinite}@keyframes rwNeon{0%,18%,22%,100%{opacity:1}20%{opacity:.4}}'+
  '.rw-plant{position:absolute;right:120px;bottom:30px;font-size:120px;filter:drop-shadow(0 20px 20px rgba(0,0,0,.5))}'+
  '.rw-desk{position:absolute;left:300px;top:560px;width:600px;height:160px;transform:translateZ(-310px);transform-style:preserve-3d}'+
  '.rw-top{position:absolute;left:0;top:0;width:600px;height:130px;transform-origin:top;transform:rotateX(-90deg);background:linear-gradient(#a26b3b,#7a4a24);box-shadow:inset 0 0 40px rgba(0,0,0,.35)}'+
  '.rw-front{position:absolute;left:0;top:0;width:600px;height:160px;background:linear-gradient(#7a4a24,#5b3518);display:flex;gap:14px;padding:18px 30px;box-shadow:0 30px 40px rgba(0,0,0,.5)}.rw-drawer{flex:1;border-radius:4px;background:linear-gradient(#8a5a2b,#6b4120);box-shadow:inset 0 0 0 2px rgba(0,0,0,.2)}'+
  '.rw-rk{position:absolute;left:250px;top:-104px;width:100px;height:100px;border:0;border-radius:50%;background:radial-gradient(circle at 40% 30%,#e9eef0,#a9b4b8 70%);box-shadow:0 18px 24px rgba(0,0,0,.5);cursor:pointer;animation:rwRk 8s linear infinite}'+
  '.rw-rk i{position:absolute;inset:10px;border-radius:50%;border:6px solid currentColor;box-shadow:0 0 22px currentColor,inset 0 0 12px currentColor}.rw-rk span{position:absolute;left:0;right:0;top:40px;font:800 11px/1 sans-serif;color:#0b0f11;letter-spacing:.06em}'+
  '@keyframes rwRk{0%,22%{color:#30d158}25%,47%{color:#ffd60a}50%,72%{color:#ff9f0a}75%,90%{color:#ff453a}100%{color:#30d158}}'+
  '.rw-cup{position:absolute;left:120px;top:-62px;font-size:50px}.rw-lap{position:absolute;left:400px;top:-110px;width:150px;height:96px;border-radius:8px 8px 2px 2px;background:#1f2937;box-shadow:0 0 0 4px #374151}.rw-lap i{position:absolute;inset:8px;border-radius:3px;background:linear-gradient(135deg,#7c3aed,#23a0ba);opacity:.85}'+
  '.rw[data-f=back] .rw-left,.rw[data-f=back] .rw-right,.rw[data-f=back] .rw-floor,.rw[data-f=back] .rw-ceil{opacity:.0}'+
  '.rw[data-f=left] .rw-back,.rw[data-f=left] .rw-right,.rw[data-f=left] .rw-floor,.rw[data-f=left] .rw-ceil,.rw[data-f=left] .rw-desk,.rw[data-f=right] .rw-back,.rw[data-f=right] .rw-left,.rw[data-f=right] .rw-floor,.rw[data-f=right] .rw-ceil,.rw[data-f=right] .rw-desk{opacity:0;pointer-events:none}'+
  '.rw-desk{transition:opacity .7s}'+
  '.rw-nav{position:relative;z-index:4;display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;margin-top:.4rem;padding:0 1rem}.rw-nav button{border:1px solid rgba(196,181,253,.35);background:rgba(255,255,255,.06);color:#efeaff;border-radius:999px;padding:.55rem 1.05rem;font:inherit;font-size:.9rem;cursor:pointer;transition:.25s}.rw-nav button[aria-pressed=true],.rw-nav button:hover{background:#7c3aed;border-color:#7c3aed}'+
  '.rw-door{position:absolute;inset:0;z-index:6;pointer-events:none;display:flex;direction:ltr}.rw-door i{flex:1;background:linear-gradient(90deg,#1a1240,#2a1d63);box-shadow:inset 0 0 0 18px rgba(0,0,0,.15);transition:transform 1.3s cubic-bezier(.7,0,.2,1) .2s}.rw-door i:first-child{transform-origin:left}.rw-door i:last-child{transform-origin:right}'+
  '.rw.open .rw-door i:first-child{transform:translateX(-101%)}.rw.open .rw-door i:last-child{transform:translateX(101%)}'+
  '.rw-lb{position:absolute;inset:0;z-index:8;display:grid;place-items:center;background:rgba(7,6,26,.78);backdrop-filter:blur(10px);padding:1rem;animation:rwIn .35s}.rw-lb[hidden]{display:none}@keyframes rwIn{from{opacity:0}}'+
  '.rw-lbc{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:1.6rem;align-items:center;max-width:820px;width:100%;background:linear-gradient(160deg,#241a52,#120c2e);border:1px solid rgba(196,181,253,.25);border-radius:22px;padding:1.4rem;box-shadow:0 40px 80px rgba(0,0,0,.6)}'+
  '.rw-lbi img{width:100%;max-height:60vh;object-fit:contain;border-radius:12px}.rw-lbt h3{margin:.2rem 0 .5rem;font:800 clamp(1.5rem,3vw,2.2rem)/1.2 var(--f-head);color:#fff}.rw-lbt p{margin:0;color:rgba(239,234,255,.8);line-height:1.7}.rw-lbk{font-weight:700!important;font-size:.95rem}'+
  '.rw-lbl{display:inline-block;margin-top:1rem;color:#fff;background:#7c3aed;border-radius:999px;padding:.6rem 1.1rem;text-decoration:none;font-weight:700;font-size:.85rem}'+
  '.rw-x{position:absolute;top:10px;inset-inline-end:10px;width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.1);color:#fff;cursor:pointer}'+
  '.rw-tip{position:relative;z-index:4;margin:.6rem 0 0;min-height:1.4em;text-align:center;color:#fde68a;font-weight:700}'+
  /* phones: the three walls become a swipeable gallery */
  '.rw-m .rw-view{height:auto;perspective:none;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;cursor:auto;padding:1rem 0 .4rem}.rw-m .rw-view::-webkit-scrollbar{display:none}'+
  '.rw-m .rw-stage{position:static;width:auto;height:auto;margin:0;transform:none!important}.rw-m .rw-scene{position:static;display:flex;gap:14px;padding:0 14px;transform:none!important;width:max-content}'+
  '.rw-m .rw-floor,.rw-m .rw-ceil,.rw-m .rw-desk{display:none}'+
  '.rw-m .rw-wall{position:relative;left:auto;top:auto;transform:none!important;opacity:1!important;pointer-events:auto!important;width:calc(100vw - 56px);height:auto;min-height:470px;border-radius:20px;scroll-snap-align:center;padding:64px 14px 18px;order:2}.rw-m .rw-left{order:1}.rw-m .rw-right{order:3}'+
  '.rw-m .rw-frames{position:static;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:none;gap:16px 14px;height:auto}.rw-m .rw-frames>*{grid-column:auto!important;grid-row:auto!important;height:auto}.rw-m .rw-pic{flex:none;aspect-ratio:4/5}.rw-m .rw-frame.big{grid-column:1/3!important}.rw-m .rw-medal{right:-6px;top:-18px;width:52px;height:52px}'+
  '.rw-m .rw-case{position:static;gap:10px;padding:12px}.rw-m .rw-shelf{flex-wrap:wrap;gap:8px;padding:8px 6px 14px}.rw-m .rw-books{flex-wrap:wrap;row-gap:10px}.rw-m .rw-book{height:calc(var(--h) * .55)}'+
  '.rw-m .rw-window{position:relative;left:auto;top:auto;margin:0 auto;width:220px;height:280px}.rw-m .rw-neon{position:relative;right:auto;top:auto;width:auto;margin:1.4rem 0 0;font-size:30px}.rw-m .rw-plant{right:10px;bottom:6px;font-size:64px}'+
  '.rw-m .rw-lights{left:10px;right:10px;height:50px}.rw-m .rw-lights i:nth-child(n+12){display:none}'+
  '.rw-m .rw-lbc{grid-template-columns:1fr}.rw-m .rw-door{display:none}'+
  '@media (prefers-reduced-motion:reduce){.rw *{animation:none!important;transition:none!important}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
