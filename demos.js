/* Interactive mini-games for the project pages.
   Each one is an illustrative prototype built only from the description on its page. */
(function(){
  var t = function(s){ return (window.AR && window.AR[s]) || s; };
  var AR = !!window.AR;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function q(el,s){ return el.querySelector(s); }
  function qa(el,s){ return [].slice.call(el.querySelectorAll(s)); }
  function num(n){ return '⁦'+n+'⁩'; }
  function rnd(a,b){ return a+Math.random()*(b-a); }
  function pickR(a){ return a[Math.floor(Math.random()*a.length)]; }
  function onScreen(el, start, stop){
    if(!('IntersectionObserver' in window)){ start(); return; }
    new IntersectionObserver(function(es){ es.forEach(function(e){ e.isIntersecting ? start() : stop(); }); }).observe(el);
  }
  function shell(el, inner){
    el.setAttribute('aria-label', t('Interactive prototype'));
    el.innerHTML =
      '<div class="dm-head"><h2>'+esc(t('Play the prototype'))+'</h2>'+
      '<p class="dm-note">'+esc(t('An illustrative prototype built from the project description — not the original product.'))+'</p></div>'+
      '<div class="dm-stage">'+inner+'</div>';
  }
  function confetti(host){
    if(RM) return;
    var cols=['#ffd166','#06d6a0','#4cc9f0','#f72585','#b5179e','#ffffff'];
    for(var i=0;i<70;i++){
      var c=document.createElement('i'); c.className='dm-cf';
      c.style.left=rnd(5,95)+'%'; c.style.background=pickR(cols);
      c.style.setProperty('--dx', rnd(-120,120)+'px'); c.style.setProperty('--r', rnd(-540,540)+'deg');
      c.style.animationDelay=rnd(0,.35)+'s'; c.style.animationDuration=rnd(1.4,2.4)+'s';
      host.appendChild(c); (function(c){ setTimeout(function(){ c.remove(); }, 3000); })(c);
    }
  }
  function overlay(host, html){
    var o=document.createElement('div'); o.className='dm-ov'; o.innerHTML='<div class="dm-ovc">'+html+'</div>';
    host.appendChild(o); return o;
  }
  function stars(n){ var s=''; for(var i=0;i<3;i++) s+='<span class="dm-star'+(i<n?' on':'')+'" style="animation-delay:'+(i*.18)+'s">★</span>'; return '<div class="dm-stars">'+s+'</div>'; }

  /* ================= Rakeez: keep the focus ================= */
  function rakeez(el){
    var DIS=[['📱','New message'],['🔔','12 new notifications'],['▶️','Recommended video for you'],['🛒','Flash sale ends in 5 min'],['💬','Group chat: 37 new'],['📧','5 unread emails'],['🎮','Your friend is online'],['🗂️','Switch to another tab?'],['📰','Breaking: tap to read'],['❤️','Someone liked your post']];
    shell(el,
      '<div class="rk2">'+
        '<div class="rk2-screen">'+
          '<div class="rk2-top"><span class="rk2-dots"><i></i><i></i><i></i></span><span>'+esc(t('Task: finish the report'))+'</span><b class="rk2-pct">0%</b></div>'+
          '<div class="rk2-prog"><i></i></div>'+
          '<div class="rk2-doc">'+Array(9).join('<p><i></i></p>')+'</div>'+
          '<div class="rk2-pop"></div>'+
        '</div>'+
        '<div class="rk2-side">'+
          '<div class="rk-dev" data-lv="0"><i class="rk-glow"></i><i class="rk-ring"></i><div class="rk-scr"><b class="rk-num">100</b><span>'+esc(t('Focus'))+'</span></div>'+
            '<button type="button" class="rk2-boost" hidden>'+esc(t('Refocus'))+'</button></div>'+
          '<p class="rk-state" aria-live="polite">'+esc(t('Ready when you are'))+'</p>'+
          '<p class="rk-resp">'+esc(t('Rakeez is watching your focus'))+'</p>'+
          '<ol class="rk-flow">'+['DETECT','MEASURE','INTERVENE','ADAPT'].map(function(s){return '<li>'+esc(t(s))+'</li>';}).join('')+'</ol>'+
          '<div class="rk2-stats"><span>⛔ <b class="rk2-blk">0</b> '+esc(t('blocked'))+'</span><span>⏱ <b class="rk2-time">0.0</b>s</span></div>'+
        '</div>'+
      '</div>');
    var stage=q(el,'.dm-stage'), pop=q(el,'.rk2-pop'), dev=q(el,'.rk-dev'), boost=q(el,'.rk2-boost');
    var G=null, loop=null;
    function intro(again){
      var o=overlay(stage,
        '<div class="dm-ovi">🎯</div><h3>'+esc(t(again||'Can you finish the task?'))+'</h3>'+
        '<p>'+esc(t('Distractions will pop up while you work. Close them before they drain your focus. When focus drops too low, Rakeez steps in, so tap Refocus.'))+'</p>'+
        '<button type="button" class="dm-btn">'+esc(t('Start'))+'</button>');
      q(o,'button').addEventListener('click',function(){ o.remove(); start(); });
    }
    function stage_(i){ qa(el,'.rk-flow li').forEach(function(li,k){ li.classList.toggle('on',k===i); }); }
    function start(){
      pop.innerHTML=''; G={f:100,p:0,t:0,blk:0,next:1.2,lv:0,low:false,cool:0,sum:0,n:0};
      clearInterval(loop); loop=setInterval(step,100);
    }
    function spawn(){
      var d=pickR(DIS), b=document.createElement('button'); b.type='button'; b.className='rk2-n';
      b.innerHTML='<span class="rk2-ni">'+d[0]+'</span><span>'+esc(t(d[1]))+'</span><i>✕</i>';
      b.style.left=rnd(2,52)+'%'; b.style.top=rnd(16,74)+'%';
      b.addEventListener('click',function(){ if(!G) return; G.blk++; b.classList.add('gone'); setTimeout(function(){ b.remove(); },250); });
      pop.appendChild(b);
    }
    function step(){
      var g=G; g.t+=.1;
      var act=qa(pop,'.rk2-n:not(.gone)').length;
      g.next-=.1; if(g.next<=0 && act<5){ spawn(); if(g.p>35 && Math.random()<.45) spawn(); g.next=rnd(.8,1.7)-g.p/160; }
      g.f+= act? -0.5*act : 0.7; g.f=Math.max(0,Math.min(100,g.f));
      g.p+= g.f>60? .5 : g.f>30? .22 : .06; g.cool=Math.max(0,g.cool-.1);
      g.sum+=g.f; g.n++;
      var lv= g.f>70?0 : g.f>35?1 : 2;
      dev.setAttribute('data-lv',lv);
      q(el,'.rk-num').textContent=num(Math.round(g.f));
      if(lv===2){ g.low=true; boost.hidden=g.cool>0; set('Focus is slipping away','Rakeez intervenes: tap Refocus'); stage_(2); }
      else if(g.low && lv===0){ g.low=false; g.adapt=1.6; }
      if(g.adapt>0){ g.adapt-=.1; set('Back on task','The response eases as focus returns'); stage_(3); boost.hidden=true; }
      else if(lv===1){ set('Attention drifting','Subtle visual indication'); stage_(1); boost.hidden=true; }
      else if(lv===0 && !g.low){ set('Focused', act?'Distraction detected':'No intervention needed'); stage_(act?0:-1); boost.hidden=true; }
      q(el,'.rk2-prog i').style.width=Math.min(100,g.p)+'%';
      q(el,'.rk2-pct').textContent=num(Math.floor(Math.min(100,g.p))+'%');
      qa(el,'.rk2-doc p i').forEach(function(x,i){ x.style.width=Math.max(0,Math.min(100,(g.p-i*11)*9))+'%'; });
      q(el,'.rk2-blk').textContent=num(g.blk); q(el,'.rk2-time').textContent=num(g.t.toFixed(1));
      if(g.p>=100) end(true); else if(g.f<=0) end(false);
    }
    function set(a,b){ q(el,'.rk-state').textContent=t(a); q(el,'.rk-resp').textContent=t(b); }
    boost.addEventListener('click',function(){ if(!G) return; qa(pop,'.rk2-n').forEach(function(n){ n.classList.add('gone'); setTimeout(function(){ n.remove(); },250); }); G.f=Math.min(100,G.f+40); G.cool=4; boost.hidden=true; dev.classList.remove('kick'); void dev.offsetWidth; dev.classList.add('kick'); });
    function end(win){
      clearInterval(loop); var g=G; G=null; boost.hidden=true;
      if(win){
        var avg=g.sum/g.n, s= avg>75?3 : avg>50?2 : 1;
        confetti(stage);
        var o=overlay(stage,'<div class="dm-ovi">🏆</div><h3>'+esc(t('Task complete!'))+'</h3>'+stars(s)+
          '<p>'+esc(t('Time'))+': <b>'+num(g.t.toFixed(1))+'s</b> · '+esc(t('Distractions blocked'))+': <b>'+num(g.blk)+'</b> · '+esc(t('Average focus'))+': <b>'+num(Math.round(avg)+'%')+'</b></p>'+
          '<button type="button" class="dm-btn">'+esc(t('Play again'))+'</button>');
        q(o,'button').addEventListener('click',function(){ o.remove(); start(); });
      } else {
        pop.innerHTML='';
        var o2=overlay(stage,'<div class="dm-ovi">😵‍💫</div><h3>'+esc(t('Focus lost!'))+'</h3><p>'+esc(t('The distractions won this time. Close them faster, and let Rakeez help when it steps in.'))+'</p><button type="button" class="dm-btn">'+esc(t('Try again'))+'</button>');
        q(o2,'button').addEventListener('click',function(){ o2.remove(); start(); });
      }
    }
    intro();
    onScreen(el,function(){ if(G && !loop) loop=setInterval(step,100); },function(){ clearInterval(loop); loop=null; });
  }

  /* ================= Makani: find them in the crowd ================= */
  function makani(el){
    var PEOPLE=['🧍','🧍‍♀️','🧕','👳‍♂️','🧔','👩','👨','👵','👴','🧑','👱‍♀️','🧑‍🦱'];
    var R=[
      {kind:'person', em:'🧒', id:'MK-0417', name:'Family member', title:'A child got separated from the family!', ask:'Find the child among the crowd.', decoy:['🧒','🧒','👦','👧','👦','👧']},
      {kind:'bag', em:'🎒', id:'MK-1290', name:'Backpack', title:'A backpack was left behind!', ask:'Find the backpack in the crowd.', decoy:['💼','👜','🧳','👝','💼','👜']}
    ];
    shell(el,
      '<div class="mk2">'+
        '<div class="mk2-hud"><span class="mk2-round"></span><span class="mk2-msg" aria-live="polite"></span><b class="mk2-tm">0.0s</b></div>'+
        '<div class="mk2-scene"><div class="mk2-grid"></div><div class="mk2-crowd"></div><div class="mk2-radar" hidden><i></i></div></div>'+
        '<div class="mk2-bar"><button type="button" class="dm-btn mk2-on" disabled>📡 '+esc(t('Turn on Makani'))+'</button><span class="mk2-hint"></span></div>'+
      '</div>');
    var stage=q(el,'.dm-stage'), crowd=q(el,'.mk2-crowd'), scene=q(el,'.mk2-scene'), radar=q(el,'.mk2-radar');
    var P=[], loop=null, clock=null, r=0, tm=0, phase='', target=null, res=[], visible=false;
    function build(){
      crowd.innerHTML=''; P=[];
      var n= innerWidth<700? 34 : 56, rd=R[r];
      function add(em,isT){
        var b=document.createElement(isT||rd.decoy.indexOf(em)>=0?'button':'span');
        if(b.tagName==='BUTTON'){ b.type='button'; b.setAttribute('aria-label', t('Someone in the crowd')); }
        b.className='mk2-p'+(isT?' tgt':''); b.textContent=em;
        var o={el:b,x:rnd(4,92),y:rnd(6,86),vx:rnd(-.18,.18),vy:rnd(-.12,.12),t:isT};
        crowd.appendChild(b); P.push(o);
        if(b.tagName==='BUTTON') b.addEventListener('click',function(){ hit(o,b); });
        return o;
      }
      for(var i=0;i<n;i++) add(pickR(PEOPLE));
      rd.decoy.forEach(function(d){ add(d); });
      target=add(rd.em,true);
      place();
    }
    function place(){ P.forEach(function(o){ o.el.style.left=o.x+'%'; o.el.style.top=o.y+'%'; }); }
    function move(){
      P.forEach(function(o){ o.x+=o.vx; o.y+=o.vy; if(o.x<2||o.x>94) o.vx*=-1; if(o.y<4||o.y>88) o.vy*=-1; if(Math.random()<.01){ o.vx=rnd(-.18,.18); o.vy=rnd(-.12,.12); } });
      place();
      if(phase==='makani'){ radar.style.left=target.x+'%'; radar.style.top=target.y+'%'; }
    }
    function msg(s){ q(el,'.mk2-msg').textContent=s; }
    function startRound(){
      var rd=R[r]; phase='search'; tm=0; build(); radar.hidden=true; scene.classList.remove('on');
      q(el,'.mk2-round').textContent=t('Round')+' '+num((r+1)+'/'+R.length);
      msg(t(rd.ask));
      var on=q(el,'.mk2-on'); on.disabled=true;
      q(el,'.mk2-hint').textContent=t('Try without Makani first…');
      setTimeout(function(){ if(phase==='search'){ on.disabled=false; q(el,'.mk2-hint').textContent=t('Hard in a crowd, right? Turn Makani on.'); } }, 5000);
      run();
    }
    function run(){ stop(); if(!visible) return; loop=setInterval(move, RM?400:60); clock=setInterval(function(){ if(phase==='search'||phase==='makani'){ tm+=.1; q(el,'.mk2-tm').textContent=num(tm.toFixed(1)+'s'); } },100); }
    function stop(){ clearInterval(loop); clearInterval(clock); loop=clock=null; }
    q(el,'.mk2-on').addEventListener('click',function(){
      if(phase!=='search') return; phase='makani'; this.disabled=true; res[r]={before:tm};
      scene.classList.add('on'); radar.hidden=false; move();
      q(radar,'i').setAttribute('data-id', R[r].id);
      msg(t('Makani is tracking')+' '+R[r].id+'. '+t('Tap the highlighted spot!'));
      q(el,'.mk2-hint').textContent='';
    });
    function hit(o,b){
      if(phase!=='search' && phase!=='makani') return;
      if(!o.t){ b.classList.remove('no'); void b.offsetWidth; b.classList.add('no'); msg(t('Not this one, keep looking!')); return; }
      var used=phase==='makani'; phase='found'; stop();
      res[r]=res[r]||{before:tm}; res[r].total=tm; res[r].used=used;
      b.classList.add('yes');
      setTimeout(function(){ found(used); }, 500);
    }
    function found(used){
      var rd=R[r];
      if(rd.kind==='bag'){
        var o=overlay(stage,'<div class="dm-ovi">🎒</div><h3>'+esc(t('Backpack found!'))+'</h3>'+
          '<p>'+esc(t('Now scan the code on its Makani device to identify the owner.'))+'</p>'+
          '<div class="mk2-qr"><div class="mk2-qrimg">'+qrSvg()+'<i class="mk2-beam"></i></div></div>'+
          '<button type="button" class="dm-btn">'+esc(t('Scan code'))+'</button>');
        q(o,'.dm-btn').addEventListener('click',function(){
          var btn=this; if(btn.dataset.done) return; btn.dataset.done=1; btn.disabled=true; q(o,'.mk2-qrimg').classList.add('scan');
          setTimeout(function(){
            q(o,'.mk2-qr').innerHTML='<div class="mk2-card"><p class="mk2-ok">✓ '+esc(t('Registered item identified'))+'</p><p><b>'+esc(t('Backpack'))+'</b> · <span class="mono">MK-1290</span></p><p>'+esc(t('Linked to the owner’s account'))+'</p></div>';
            btn.disabled=false; btn.textContent=t('See results');
            btn.onclick=function(){ o.remove(); summary(); };
          },1400);
        });
      } else {
        var o2=overlay(stage,'<div class="dm-ovi">🧒</div><h3>'+esc(t('Reunited!'))+'</h3><p>'+esc(t('Found in'))+' <b>'+num(tm.toFixed(1)+'s')+'</b>. '+esc(t(used?'Makani pinpointed their location.':'Impressive! Most people need Makani for that.'))+'</p><button type="button" class="dm-btn">'+esc(t('Next round'))+'</button>');
        q(o2,'button').addEventListener('click',function(){ o2.remove(); r++; startRound(); });
      }
    }
    function summary(){
      confetti(stage);
      var rows=res.map(function(x,i){ var a=x.used?x.before:x.total, b=x.used?(x.total-x.before):null;
        return '<tr><td>'+esc(t(R[i].name))+'</td><td>'+num(a.toFixed(1)+'s')+(x.used?'':' ✓')+'</td><td>'+(b===null?'—':num(b.toFixed(1)+'s'))+'</td></tr>'; }).join('');
      var o=overlay(stage,'<div class="dm-ovi">📍</div><h3>'+esc(t('Everyone and everything found!'))+'</h3>'+
        '<table class="mk2-tab"><tr><th></th><th>'+esc(t('Searching alone'))+'</th><th>'+esc(t('With Makani'))+'</th></tr>'+rows+'</table>'+
        '<button type="button" class="dm-btn">'+esc(t('Play again'))+'</button>');
      q(o,'button').addEventListener('click',function(){ o.remove(); r=0; res=[]; startRound(); });
    }
    function qrSvg(){ var n=21,c=9,s='',h=function(x,y){ return ((x*73856093)^(y*19349663)^(x*y*83492791))>>>0; };
      function f(x,y){ return '<rect x="'+x*c+'" y="'+y*c+'" width="'+7*c+'" height="'+7*c+'"/><rect x="'+(x+1)*c+'" y="'+(y+1)*c+'" width="'+5*c+'" height="'+5*c+'" fill="#fff"/><rect x="'+(x+2)*c+'" y="'+(y+2)*c+'" width="'+3*c+'" height="'+3*c+'"/>'; }
      for(var y=0;y<n;y++) for(var x=0;x<n;x++){ var inF=(x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12); if(!inF && h(x+3,y+5)%3===0) s+='<rect x="'+x*c+'" y="'+y*c+'" width="'+c+'" height="'+c+'"/>'; }
      return '<svg viewBox="-9 -9 207 207" aria-hidden="true"><rect x="-9" y="-9" width="207" height="207" fill="#fff"/><g fill="#02111f">'+s+f(0,0)+f(14,0)+f(0,14)+'</g></svg>'; }
    var o=overlay(stage,'<div class="dm-ovi">🕌</div><h3>'+esc(t('Lost in the crowd'))+'</h3><p>'+esc(t('In crowded places like Hajj, Umrah and malls, finding someone or something can take forever. Try it yourself, then see how Makani changes the search.'))+'</p><button type="button" class="dm-btn">'+esc(t('Start'))+'</button>');
    q(o,'button').addEventListener('click',function(){ o.remove(); startRound(); });
    onScreen(el,function(){ visible=true; if(phase==='search'||phase==='makani') run(); },function(){ visible=false; stop(); });
  }

  /* ================= Quraa: complete the verse ================= */
  function quraa(el){
    var V=[
      {w:['بِسْمِ','اللَّهِ','الرَّحْمَٰنِ','الرَّحِيمِ'], h:3, o:['الرَّحِيمِ','الْعَالَمِينَ','الدِّينِ']},
      {w:['الْحَمْدُ','لِلَّهِ','رَبِّ','الْعَالَمِينَ'], h:3, o:['الْمُسْتَقِيمَ','الْعَالَمِينَ','الضَّالِّينَ']},
      {w:['الرَّحْمَٰنِ','الرَّحِيمِ'], h:0, o:['مَالِكِ','الصِّرَاطَ','الرَّحْمَٰنِ']},
      {w:['مَالِكِ','يَوْمِ','الدِّينِ'], h:1, o:['يَوْمِ','رَبِّ','صِرَاطَ']},
      {w:['إِيَّاكَ','نَعْبُدُ','وَإِيَّاكَ','نَسْتَعِينُ'], h:3, o:['أَنْعَمْتَ','نَسْتَعِينُ','نَعْبُدُ']},
      {w:['اهْدِنَا','الصِّرَاطَ','الْمُسْتَقِيمَ'], h:1, o:['الدِّينِ','الْحَمْدُ','الصِّرَاطَ']},
      {w:['صِرَاطَ','الَّذِينَ','أَنْعَمْتَ','عَلَيْهِمْ','غَيْرِ','الْمَغْضُوبِ','عَلَيْهِمْ','وَلَا','الضَّالِّينَ'], h:5, o:['الْمَغْضُوبِ','الْمُسْتَقِيمَ','الْعَالَمِينَ']}
    ];
    var AN='١٢٣٤٥٦٧';
    shell(el,
      '<div class="qa2">'+
        '<div class="qa2-hud"><div class="qa2-dots">'+V.map(function(){return '<i></i>';}).join('')+'</div>'+
          '<span class="qa2-streak">🔥 <b>0</b></span><span class="qa2-pts">⭐ <b>0</b></span></div>'+
        '<div class="qa-tools" role="toolbar" aria-label="'+esc(t('Reading settings'))+'">'+
          '<button type="button" data-a="dec" aria-label="'+esc(t('Smaller text'))+'">A−</button>'+
          '<button type="button" data-a="inc" aria-label="'+esc(t('Larger text'))+'">A+</button>'+
          '<button type="button" data-a="con" aria-pressed="false">◐ '+esc(t('High contrast'))+'</button></div>'+
        '<div class="qa-page" dir="rtl" lang="ar"><p class="qa-sura">سورة الفاتحة</p><div class="qa2-done"></div><p class="qa2-cur"></p></div>'+
        '<p class="qa2-ask">'+esc(t('Which word completes the verse?'))+'</p>'+
        '<div class="qa2-opts" dir="rtl" lang="ar"></div>'+
        '<p class="qa2-fb" aria-live="polite"></p>'+
      '</div>');
    var app=q(el,'.qa2'), stage=q(el,'.dm-stage'), i=0, streak=0, pts=0, miss=0, size=1.75, lock=false;
    function verse(k, blank){ var v=V[k]; return v.w.map(function(w,j){ return j===v.h&&blank?'<span class="qa2-gap">'+(blank===2?'<b>'+w+'</b>':'&nbsp;؟&nbsp;')+'</span>':w; }).join(' ')+' <span class="qa-n">﴿'+AN[k]+'﴾</span>'; }
    function show(){
      lock=false; q(el,'.qa2-fb').textContent='';
      qa(el,'.qa2-dots i').forEach(function(d,k){ d.className= k<i?'ok':k===i?'cur':''; });
      if(i>=V.length) return finish();
      var cur=q(el,'.qa2-cur'); cur.innerHTML=verse(i,1); cur.classList.remove('in'); void cur.offsetWidth; cur.classList.add('in');
      var opts=V[i].o.slice().sort(function(){ return Math.random()-.5; });
      q(el,'.qa2-opts').innerHTML=opts.map(function(o){ return '<button type="button">'+o+'</button>'; }).join('');
      qa(el,'.qa2-opts button').forEach(function(b){ b.addEventListener('click',function(){ answer(b); }); });
    }
    function answer(b){
      if(lock) return; var v=V[i];
      if(b.textContent===v.w[v.h]){
        lock=true; b.classList.add('ok'); streak++; pts+= streak>=3?15:10;
        q(el,'.qa2-fb').textContent=pickR([t('Well done!'),t('Excellent!'),t('Correct!'),t('Keep going!')])+(streak>=3?' 🔥 ×'+num(streak):'');
        q(el,'.qa2-cur').innerHTML=verse(i,2);
        setTimeout(function(){ var d=document.createElement('span'); d.innerHTML=verse(i,0)+' '; q(el,'.qa2-done').appendChild(d); q(el,'.qa2-cur').innerHTML=''; i++; show(); }, 900);
      } else {
        streak=0; miss++; b.classList.add('no'); b.disabled=true;
        q(el,'.qa2-fb').textContent=t('Not quite, try another word.');
      }
      q(el,'.qa2-streak b').textContent=num(streak); q(el,'.qa2-pts b').textContent=num(pts);
    }
    function finish(){
      q(el,'.qa2-ask').hidden=true; q(el,'.qa2-opts').innerHTML='';
      confetti(stage);
      var s= miss===0?3 : miss<=2?2 : 1;
      var o=overlay(stage,'<div class="dm-ovi">📖</div><h3>'+esc(t('Surah complete!'))+'</h3>'+stars(s)+
        '<p>'+esc(t('Points'))+': <b>'+num(pts)+'</b> · '+esc(t('Mistakes'))+': <b>'+num(miss)+'</b></p>'+
        '<button type="button" class="dm-btn">'+esc(t('Practise again'))+'</button>');
      q(o,'button').addEventListener('click',function(){ o.remove(); i=0; streak=0; pts=0; miss=0; q(el,'.qa2-done').innerHTML=''; q(el,'.qa2-ask').hidden=false; q(el,'.qa2-streak b').textContent=num(0); q(el,'.qa2-pts b').textContent=num(0); show(); });
    }
    qa(el,'.qa-tools button').forEach(function(b){ b.addEventListener('click',function(){
      var a=b.getAttribute('data-a');
      if(a==='dec') size=Math.max(1.2, +(size-.25).toFixed(2));
      if(a==='inc') size=Math.min(2.8, +(size+.25).toFixed(2));
      if(a==='con'){ var on=b.getAttribute('aria-pressed')!=='true'; b.setAttribute('aria-pressed',on); app.classList.toggle('hc',on); }
      app.style.setProperty('--qs', size+'rem');
    }); });
    var o=overlay(stage,'<div class="dm-ovi">🌙</div><h3>'+esc(t('Memorization challenge'))+'</h3><p>'+esc(t('Complete Al-Fatiha verse by verse. Pick the missing word, build a streak, and collect stars. Text size and contrast are adjustable, because accessibility comes first.'))+'</p><button type="button" class="dm-btn">'+esc(t('Start'))+'</button>');
    q(o,'button').addEventListener('click',function(){ o.remove(); show(); });
  }

  /* ================= Inara: discover your spark ================= */
  function inara(el){
    var T={
      'Drawing':{e:'🎨',p:['Sketching fundamentals workshop','Art and design institutes','Illustration and design projects']},
      'Writing':{e:'✍️',p:['Creative writing workshop','Literature and media programmes','Publishing and content opportunities']},
      'Programming':{e:'💻',p:['Introductory coding course','Computing colleges and bootcamps','Hackathons and tech internships']},
      'Photography':{e:'📷',p:['Photography basics workshop','Visual arts and media programmes','Exhibitions and photography commissions']},
      'Public speaking':{e:'🎤',p:['Public speaking workshop','Communication and media programmes','Events, podcasts and presenting']},
      'Science':{e:'🔬',p:['Hands-on science workshop','Research centres and university programmes','Competitions and research internships']}
    };
    var Q=[
      {q:'A free afternoon. What do you reach for?', a:[['🎨','A sketchbook','Drawing'],['📓','A notebook to write in','Writing'],['💻','A laptop to build something','Programming'],['📷','A camera','Photography']]},
      {q:'Your friends usually come to you for…', a:[['✨','Making things look beautiful','Drawing'],['🗣️','Explaining an idea out loud','Public speaking'],['🛠️','Fixing a tech problem','Programming'],['❓','Asking why things happen','Science']]},
      {q:'Pick a weekend plan:', a:[['🧪','A science centre visit','Science'],['🎙️','An open-mic night','Public speaking'],['🌇','A photo walk at sunset','Photography'],['📚','Writing a short story','Writing']]},
      {q:'What excites you the most?', a:[['🖌️','Seeing my drawing come alive','Drawing'],['👏','An audience applauding','Public speaking'],['⚗️','An experiment that works','Science'],['🚀','Code that runs the first time','Programming']]}
    ];
    var ST=['Talent Discovery','Talent Cultivation','Resource Identification','Professional Integration'];
    shell(el,'<div class="in2"></div>');
    var box=q(el,'.in2'), stage=q(el,'.dm-stage'), sc, k;
    function begin(){ sc={}; k=0; ask(); }
    function ask(){
      var x=Q[k];
      box.innerHTML='<div class="in2-bar"><i style="width:'+(k/Q.length*100)+'%"></i></div>'+
        '<p class="in2-step">'+esc(t('Question'))+' '+num((k+1)+'/'+Q.length)+'</p><h3 class="in2-q">'+esc(t(x.q))+'</h3>'+
        '<div class="in2-a">'+x.a.map(function(a,j){ return '<button type="button" data-j="'+j+'" style="animation-delay:'+(j*.06)+'s"><span class="in2-e">'+a[0]+'</span><span>'+esc(t(a[1]))+'</span></button>'; }).join('')+'</div>';
      qa(box,'.in2-a button').forEach(function(b){ b.addEventListener('click',function(){
        var a=x.a[+b.getAttribute('data-j')]; sc[a[2]]=(sc[a[2]]||0)+1; b.classList.add('pick');
        setTimeout(function(){ k++; k<Q.length? ask() : reveal(); }, 380);
      }); });
    }
    function reveal(){
      var best=Object.keys(sc).sort(function(a,b){ return sc[b]-sc[a]; })[0], d=T[best];
      box.innerHTML=
        '<div class="in2-res">'+
          '<div class="in2-card"><div class="in2-shine"></div><span class="in2-big">'+d.e+'</span><small>'+esc(t('Your spark'))+'</small><b>'+esc(t(best))+'</b></div>'+
          '<div class="in2-map"><p class="in2-step">'+esc(t('Your path with Inara'))+'</p><ol>'+
            ST.map(function(s,i){ var v= i===0 ? t('Your interest:')+' '+t(best) : t(d.p[i-1]);
              return '<li style="--d:'+(0.5+i*.45)+'s"><span class="in2-lv">'+esc(t('Level'))+' '+num(i+1)+'</span><b>'+esc(t(s))+'</b><span>'+esc(v)+'</span></li>'; }).join('')+
          '</ol><button type="button" class="dm-btn">'+esc(t('Retake the quiz'))+'</button></div>'+
        '</div>';
      confetti(stage);
      q(box,'.dm-btn').addEventListener('click',begin);
    }
    var o=overlay(stage,'<div class="dm-ovi">💡</div><h3>'+esc(t('Discover your spark'))+'</h3><p>'+esc(t('Answer four quick questions. Inara will reveal a talent worth growing and map the path from discovery to real opportunities.'))+'</p><button type="button" class="dm-btn">'+esc(t('Start'))+'</button>');
    q(o,'button').addEventListener('click',function(){ o.remove(); begin(); });
  }

  /* ================= Sanabil: you are the investor ================= */
  function sanabil(el){
    var F=[
      {n:'Date palm farm', e:'🌴', s:82, mv:4.8, r:'Low',    ret:14, ef:88, h:.82},
      {n:'Wheat farm',     e:'🌾', s:61, mv:2.1, r:'High',   ret:8,  ef:64, h:.55},
      {n:'Greenhouse vegetables', e:'🥬', s:74, mv:1.3, r:'Medium', ret:12, ef:79, h:.7}
    ];
    var L=['Satellite imagery','GIS information','Production records'];
    function field(f){ var s='', W=12, H=6;
      for(var y=0;y<H;y++) for(var x=0;x<W;x++){ var v=Math.max(0,Math.min(1,f.h+((Math.sin(x*1.7+y*2.3+f.s)*.5)+(Math.random()-.5)*.5)*.35));
        s+='<rect x="'+(x*10+1)+'" y="'+(y*10+1)+'" width="8.6" height="8.6" rx="1.5" data-v="'+v.toFixed(2)+'"/>'; }
      return '<svg viewBox="0 0 120 60" class="sn2-f" aria-hidden="true">'+s+'</svg>'; }
    function money(m){ return AR ? num(m)+' '+t('million SAR') : 'SAR '+m+'M'; }
    shell(el,
      '<div class="sn2">'+
        '<div class="sn2-hud"><span>💰 '+esc(t('Financing available for one farm'))+'</span><label class="sn-edge"><input type="checkbox"> <span>📡 '+esc(t('Drop Sanabil Edge sensors'))+'</span></label></div>'+
        '<div class="sn2-cards">'+F.map(function(f,i){ return '<article class="sn2-c" data-i="'+i+'">'+
          '<header><span class="sn2-e">'+f.e+'</span><b>'+esc(t(f.n))+'</b></header>'+
          '<div class="sn2-fw">'+field(f)+'<i class="sn2-sweep"></i><span class="sn2-q">?</span></div>'+
          '<div class="sn2-layers">'+L.map(function(l){ return '<span>'+esc(t(l))+'</span>'; }).join('')+'</div>'+
          '<div class="sn2-out"><div class="sn2-score"><b>–</b><small>FarmScore</small></div>'+
            '<ul><li><small>'+esc(t('Estimated Market Value'))+'</small><b>'+money(f.mv)+'</b></li><li><small>'+esc(t('Risk Level'))+'</small><b class="rk-'+f.r.toLowerCase()+'">'+esc(t(f.r))+'</b></li>'+
            '<li><small>'+esc(t('Expected Return'))+'</small><b>'+num(f.ret+'%')+'</b></li><li><small>'+esc(t('Farm Efficiency'))+'</small><b>'+num(f.ef+'%')+'</b></li></ul>'+
            '<p class="sn2-live mono" hidden></p></div>'+
          '<p class="sn2-trad">🚜 '+esc(t('Traditional view: a field visit is needed…'))+'</p>'+
          '<div class="sn2-act"><button type="button" class="dm-btn sn2-scan">🛰️ '+esc(t('Scan with Sanabil'))+'</button><button type="button" class="dm-btn sn2-pick" hidden>'+esc(t('Finance this farm'))+'</button></div>'+
        '</article>'; }).join('')+'</div>'+
        '<p class="sn-foot">'+esc(t('Sample values for illustration only.'))+'</p>'+
      '</div>');
    var stage=q(el,'.dm-stage'), edge=false, scanned={}, timer=null;
    function colorize(c,on){ qa(c,'.sn2-f rect').forEach(function(r){ var v=+r.getAttribute('data-v'); r.style.fill= on ? 'hsl('+(30+v*95)+','+(45+v*30)+'%,'+(30+v*16)+'%)' : ''; }); }
    qa(el,'.sn2-c').forEach(function(c){
      var i=+c.getAttribute('data-i'), f=F[i];
      q(c,'.sn2-scan').addEventListener('click',function(){
        var b=this; b.disabled=true; c.classList.add('scanning'); q(c,'.sn2-trad').hidden=true;
        var ls=qa(c,'.sn2-layers span');
        ls.forEach(function(s,j){ setTimeout(function(){ s.classList.add('on'); }, RM?0:300+j*420); });
        setTimeout(function(){ colorize(c,true); }, RM?0:700);
        setTimeout(function(){
          c.classList.remove('scanning'); c.classList.add('done'); b.hidden=true; q(c,'.sn2-pick').hidden=false; scanned[i]=1;
          var sb=q(c,'.sn2-score b'), t0=performance.now(), tg=f.s+(edge?2:0);
          (function st(now){ var p=Math.min(1,(now-t0)/(RM?1:900)); sb.textContent=num(Math.round(tg*(1-Math.pow(1-p,3)))); if(p<1) requestAnimationFrame(st); })(t0);
          c.style.setProperty('--sc', tg);
          live();
        }, RM?0:1700);
      });
      q(c,'.sn2-pick').addEventListener('click',function(){ choose(i); });
    });
    function choose(i){
      var best=0; F.forEach(function(f,j){ if(f.s>F[best].s) best=j; });
      var n=Object.keys(scanned).length, f=F[i];
      if(i===best){
        confetti(stage);
        var o=overlay(stage,'<div class="dm-ovi">🏆</div><h3>'+esc(t('Smart investment!'))+'</h3>'+stars(n===3?3:2)+
          '<p>'+esc(t(f.n))+': FarmScore <b>'+num(f.s+(edge?2:0))+'</b>'+(AR?'، ':', ')+esc(t('low risk and the highest return.'))+'</p>'+
          (n<3?'<p class="dm-sub">'+esc(t('Tip: scan every farm before deciding, for the full picture.'))+'</p>':'')+
          '<button type="button" class="dm-btn">'+esc(t('Play again'))+'</button>');
      } else {
        var b=F[best], o=overlay(stage,'<div class="dm-ovi">🤔</div><h3>'+esc(t('Not the strongest pick'))+'</h3>'+stars(1)+
          '<p>'+esc(t(b.n))+' '+esc(t('scored higher'))+' (FarmScore <b>'+num(b.s+(edge?2:0))+'</b>) '+esc(t('with lower risk.'))+'</p>'+
          '<button type="button" class="dm-btn">'+esc(t('Try again'))+'</button>');
      }
      q(o,'button').addEventListener('click',function(){ o.remove(); reset(); });
    }
    function reset(){ scanned={}; qa(el,'.sn2-c').forEach(function(c){ c.classList.remove('done','scanning'); colorize(c,false); q(c,'.sn2-score b').textContent='–'; q(c,'.sn2-scan').hidden=false; q(c,'.sn2-scan').disabled=false; q(c,'.sn2-pick').hidden=true; q(c,'.sn2-trad').hidden=false; qa(c,'.sn2-layers span').forEach(function(s){ s.classList.remove('on'); }); }); live(); }
    function live(){ qa(el,'.sn2-c').forEach(function(c){ var p=q(c,'.sn2-live'), on=edge&&c.classList.contains('done'); p.hidden=!on;
      if(on) p.textContent='📡 '+t('soil moisture')+' '+num(Math.round(rnd(26,38))+'%')+' · '+t('temperature')+' '+num(rnd(26,31).toFixed(1)+'°C'); }); }
    q(el,'.sn-edge input').addEventListener('change',function(){ edge=this.checked; live(); });
    var o=overlay(stage,'<div class="dm-ovi">🌾</div><h3>'+esc(t('You are the investor'))+'</h3><p>'+esc(t('You can finance only one farm. Scan each farm with Sanabil to reveal its FarmScore, then make your call.'))+'</p><button type="button" class="dm-btn">'+esc(t('Start'))+'</button>');
    q(o,'button').addEventListener('click',function(){ o.remove(); });
    onScreen(el,function(){ if(!timer) timer=setInterval(live,2500); },function(){ clearInterval(timer); timer=null; });
  }

  var M={rakeez:rakeez, makani:makani, quraa:quraa, inara:inara, sanabil:sanabil};
  window.DEMO=function(el,id){ if(el && M[id]) try{ M[id](el); }catch(e){ if(window.console) console.error(e); el.remove(); } };

  /* ================= styles ================= */
  var css=
  '.demo{padding-block:clamp(2.4rem,6vw,4.4rem);border-top:1px solid var(--line)}'+
  '.dm-head{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:.6rem 2rem;margin-bottom:clamp(1.2rem,3vw,2rem)}'+
  '.dm-head h2{font-size:clamp(1.6rem,3.2vw,2.4rem);line-height:1.15;color:var(--fg);margin:0;font-weight:800}'+
  '.dm-note{margin:0;font-size:.85rem;color:var(--mute);max-width:46ch}'+
  '.dm-stage{position:relative;overflow:hidden;border:1px solid var(--line2);border-radius:20px;padding:clamp(1rem,3vw,2rem);background:color-mix(in srgb,var(--fg) 4%,transparent);min-height:420px}'+
  '.demo button{font:inherit;color:inherit;cursor:pointer}'+
  '.demo button:focus-visible,.demo input:focus-visible{outline:2px solid var(--a);outline-offset:2px}'+
  '.dm-btn{background:var(--a);color:var(--a-ink)!important;border:0;border-radius:999px;padding:.75rem 1.4rem;font-weight:700!important;transition:transform .15s}'+
  '.dm-btn:hover{transform:translateY(-1px)}.dm-btn:active{transform:scale(.97)}.dm-btn:disabled{opacity:.45;cursor:default;transform:none}'+
  '.mono{font-family:var(--f-mono)}'+
  /* overlay */
  '.dm-ov{position:absolute;inset:0;z-index:20;display:grid;place-items:center;padding:1.2rem;background:color-mix(in srgb,var(--bg) 78%,transparent);backdrop-filter:blur(6px);animation:dmIn .35s ease}'+
  '.dm-ovc{max-width:520px;text-align:center;display:grid;gap:.8rem;justify-items:center}'+
  '.dm-ovc h3{margin:0;font-size:clamp(1.5rem,3vw,2.1rem);color:var(--fg);font-weight:800}'+
  '.dm-ovc p{margin:0;color:var(--body);line-height:1.65}.dm-ovc .dm-sub{color:var(--mute);font-size:.9rem}'+
  '.dm-ovi{font-size:3.2rem;line-height:1;animation:dmBob 2.4s ease-in-out infinite}'+
  '@keyframes dmIn{from{opacity:0}}@keyframes dmBob{50%{transform:translateY(-8px)}}'+
  '.dm-stars{display:flex;gap:.4rem;font-size:2.2rem}.dm-star{color:var(--line2);animation:dmPop .5s both}.dm-star.on{color:#ffd166;text-shadow:0 0 18px rgba(255,209,102,.6)}'+
  '@keyframes dmPop{from{transform:scale(0) rotate(-40deg)}}'+
  '.dm-cf{position:absolute;top:-12px;width:8px;height:13px;border-radius:2px;z-index:30;pointer-events:none;animation:dmFall 2s ease-in forwards}'+
  '@keyframes dmFall{to{transform:translate(var(--dx),520px) rotate(var(--r));opacity:0}}'+
  /* rakeez */
  '.rk2{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:clamp(1rem,3vw,2.4rem);align-items:center}'+
  '.rk2-screen{position:relative;border-radius:14px;background:#0a1418;border:1px solid var(--line2);min-height:340px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(0,0,0,.7)}'+
  '.rk2-top{display:flex;align-items:center;gap:.8rem;padding:.65rem .9rem;border-bottom:1px solid var(--line);font-size:.85rem;color:var(--body)}'+
  '.rk2-top b{margin-inline-start:auto;color:var(--a)}'+
  '.rk2-dots{display:flex;gap:5px}.rk2-dots i{width:9px;height:9px;border-radius:50%;background:#ff5f57}.rk2-dots i+i{background:#febc2e}.rk2-dots i+i+i{background:#28c840}'+
  '.rk2-prog{height:4px;background:var(--line)}.rk2-prog i{display:block;height:100%;width:0;background:var(--a);transition:width .1s linear}'+
  '.rk2-doc{padding:1.2rem 1.3rem;display:grid;gap:.75rem}.rk2-doc p{margin:0;height:8px;border-radius:4px;background:rgba(255,255,255,.05)}.rk2-doc p i{display:block;height:100%;width:0;border-radius:4px;background:rgba(255,255,255,.28)}'+
  '.rk2-doc p:nth-child(3n) {width:72%}.rk2-doc p:nth-child(4n){width:88%}'+
  '.rk2-pop{position:absolute;inset:0;pointer-events:none}'+
  '.rk2-n{position:absolute;pointer-events:auto;display:flex;align-items:center;gap:.55rem;max-width:46%;background:#fff;color:#111!important;border:0;border-radius:12px;padding:.55rem .7rem;font-size:.8rem!important;text-align:start;box-shadow:0 12px 30px rgba(0,0,0,.45);animation:rkIn .3s cubic-bezier(.2,1.4,.4,1),rkW 2.2s ease-in-out .3s infinite}'+
  '.rk2-n i{font-style:normal;margin-inline-start:auto;opacity:.45;padding-inline-start:.3rem}.rk2-ni{font-size:1.2rem}'+
  '.rk2-n.gone{animation:rkOut .25s forwards}'+
  '@keyframes rkIn{from{transform:scale(.3);opacity:0}}@keyframes rkW{50%{transform:rotate(-1.5deg) translateY(-3px)}}@keyframes rkOut{to{transform:scale(.4);opacity:0}}'+
  '.rk2-side{display:grid;justify-items:center;text-align:center;gap:.3rem}'+
  '.rk-dev{--o:.35;--sp:3.2s;position:relative;width:min(210px,52vw);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 35%,#18292e,#081114 70%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 30px 60px -20px rgba(0,0,0,.6);margin-bottom:.6rem}'+
  '.rk-dev[data-lv="1"]{--o:.7;--sp:1.8s}.rk-dev[data-lv="2"]{--o:1;--sp:.7s}.rk-dev.kick{animation:rkK .5s}'+
  '@keyframes rkK{40%{transform:scale(1.08)}}'+
  '.rk-ring{position:absolute;inset:9%;border-radius:50%;border:5px solid var(--a);opacity:var(--o);transition:opacity .5s}'+
  '.rk-glow{position:absolute;inset:2%;border-radius:50%;box-shadow:0 0 44px 8px var(--a);opacity:calc(var(--o)*.6);animation:rkp var(--sp) ease-in-out infinite}'+
  '@keyframes rkp{50%{opacity:calc(var(--o)*.12)}}'+
  '.rk-scr{position:absolute;inset:30%;border-radius:50%;background:#050b0d;display:grid;place-content:center;text-align:center}'+
  '.rk-scr b{font-size:clamp(1.6rem,3.4vw,2.2rem);line-height:1;color:var(--fg)}.rk-scr span{font-size:.62rem;letter-spacing:.08em;color:var(--a);margin-top:.25rem}'+
  '.rk2-boost{position:absolute;left:50%;bottom:-6%;transform:translateX(-50%);background:var(--a);color:var(--a-ink)!important;border:0;border-radius:999px;padding:.5rem 1rem;font-weight:700!important;white-space:nowrap;animation:rkB .8s ease-in-out infinite;box-shadow:0 0 0 0 var(--a)}'+
  '@keyframes rkB{50%{box-shadow:0 0 0 10px transparent;transform:translateX(-50%) scale(1.06)}}'+
  '.rk-state{font-size:clamp(1.2rem,2.4vw,1.6rem);font-weight:800;margin:.4rem 0 0;color:var(--fg)}'+
  '.rk-resp{margin:0 0 .7rem;color:var(--a);font-size:.92rem;min-height:1.4em}'+
  '.rk-flow{list-style:none;padding:0;margin:0 0 .7rem;display:grid;grid-template-columns:repeat(4,1fr);gap:5px;width:100%}'+
  '.rk-flow li{font-size:.68rem;letter-spacing:.04em;text-align:center;padding:.5rem .15rem;border-radius:8px;border:1px solid var(--line2);color:var(--mute);transition:.3s}'+
  '.rk-flow li.on{background:var(--a);color:#041114;font-weight:700;border-color:var(--a)}'+
  '.rk2-stats{display:flex;gap:1.2rem;font-size:.88rem;color:var(--body)}.rk2-stats b{color:var(--fg)}'+
  /* makani */
  '.mk2-hud{display:flex;flex-wrap:wrap;gap:.4rem 1rem;align-items:center;margin-bottom:.8rem;font-size:.92rem}'+
  '.mk2-round{background:var(--a);color:var(--a-ink);border-radius:999px;padding:.2rem .7rem;font-weight:700;font-size:.8rem}.mk2-msg{color:var(--fg);font-weight:600}.mk2-tm{margin-inline-start:auto;color:var(--a);font-size:1.1rem}'+
  '.mk2-scene{position:relative;height:clamp(300px,42vw,400px);border-radius:14px;overflow:hidden;background:radial-gradient(ellipse at 50% 40%,#13233a,#060e1a 75%);border:1px solid var(--line2)}'+
  '.mk2-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(77,182,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(77,182,255,.06) 1px,transparent 1px);background-size:40px 40px;transition:.6s}'+
  '.mk2-scene.on .mk2-grid{background-image:linear-gradient(rgba(77,182,255,.22) 1px,transparent 1px),linear-gradient(90deg,rgba(77,182,255,.22) 1px,transparent 1px)}'+
  '.mk2-scene.on .mk2-p:not(.tgt){opacity:.35;filter:grayscale(1)}'+
  '.mk2-p{position:absolute;font-size:clamp(1.15rem,2.3vw,1.6rem);line-height:1;background:none;border:0;padding:2px;transition:opacity .5s,filter .5s;user-select:none}'+
  'button.mk2-p:hover{transform:scale(1.25)}.mk2-p.no{animation:mkNo .4s}.mk2-p.yes{animation:mkYes .5s forwards;z-index:5}'+
  '@keyframes mkNo{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}@keyframes mkYes{to{transform:scale(2.2)}}'+
  '.mk2-radar{position:absolute;width:0;height:0;pointer-events:none;z-index:3;transition:left .06s linear,top .06s linear}'+
  '.mk2-radar::before,.mk2-radar::after{content:"";position:absolute;left:-60px;top:-60px;width:120px;height:120px;border-radius:50%;border:2px solid var(--a);animation:mkR 1.6s ease-out infinite}.mk2-radar::after{animation-delay:.8s}'+
  '.mk2-radar i{position:absolute;left:-14px;top:14px}.mk2-radar i::after{content:"📍 " attr(data-id);position:absolute;top:8px;left:50%;transform:translateX(-50%);white-space:nowrap;font:600 .72rem var(--f-mono);background:var(--a);color:var(--a-ink);padding:.15rem .45rem;border-radius:6px;font-style:normal}'+
  '@keyframes mkR{from{transform:scale(.15);opacity:1}to{transform:scale(1);opacity:0}}'+
  '.mk2-bar{display:flex;flex-wrap:wrap;gap:.8rem;align-items:center;margin-top:.9rem}.mk2-hint{color:var(--mute);font-size:.9rem}'+
  '.mk2-qrimg{position:relative;width:150px;height:150px;border-radius:10px;overflow:hidden}.mk2-qrimg svg{width:100%;height:100%;display:block}'+
  '.mk2-beam{position:absolute;left:0;right:0;top:0;height:3px;background:#2ee6a0;box-shadow:0 0 14px #2ee6a0;opacity:0}.mk2-qrimg.scan .mk2-beam{opacity:1;animation:mkS .7s ease-in-out 2 alternate}'+
  '@keyframes mkS{to{top:calc(100% - 3px)}}'+
  '.mk2-card{border:1px solid var(--a);border-radius:12px;padding:.9rem 1.2rem;animation:dmPop .4s}.mk2-card p{margin:.15rem 0}.mk2-ok{color:#2ee6a0!important;font-weight:700}'+
  '.mk2-tab{border-collapse:collapse;font-size:.92rem;margin:.3rem 0}.mk2-tab th,.mk2-tab td{padding:.45rem .8rem;border-bottom:1px solid var(--line2);text-align:start}.mk2-tab th{color:var(--mute);font-weight:500}.mk2-tab td:last-child{color:var(--a);font-weight:700}'+
  /* quraa */
  '.qa2{--qs:1.75rem}'+
  '.qa2-hud{display:flex;align-items:center;gap:1rem;margin-bottom:.9rem;flex-wrap:wrap}'+
  '.qa2-dots{display:flex;gap:6px;margin-inline-end:auto}.qa2-dots i{width:26px;height:8px;border-radius:4px;background:var(--line2);transition:.3s}.qa2-dots i.ok{background:var(--a)}.qa2-dots i.cur{background:#c9a646;animation:qaP 1s ease-in-out infinite}'+
  '@keyframes qaP{50%{opacity:.4}}'+
  '.qa2-streak,.qa2-pts{font-weight:700;color:var(--fg)}'+
  '.qa-tools{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:.9rem}'+
  '.qa-tools button{background:none;border:1px solid var(--line2);border-radius:999px;padding:.45rem .95rem;font-size:.88rem}'+
  '.qa-tools button[aria-pressed=true]{background:var(--a);color:var(--a-ink);border-color:var(--a)}'+
  '.qa-page{background:#fbf7ea;border:1px solid rgba(184,150,62,.45);border-radius:14px;padding:clamp(1rem,3.5vw,2rem);box-shadow:inset 0 0 0 6px #fbf7ea,inset 0 0 0 7px rgba(184,150,62,.35);text-align:center;font:400 var(--qs)/2.1 "Amiri",serif;color:#12281c;transition:background .3s,font-size .25s;min-height:9rem}'+
  '.qa-sura{font:700 1.1rem/1 "Amiri",serif;color:#8a6d22;margin:0 0 .8rem}'+
  '.qa2-done{color:#12281c;opacity:.8}.qa2-done span{animation:dmIn .4s}'+
  '.qa2-cur{margin:0;color:#0b2f1e}.qa2-cur.in{animation:qaIn .45s ease}@keyframes qaIn{from{opacity:0;transform:translateY(8px)}}'+
  '.qa2-gap{display:inline-block;min-width:4.5em;border-bottom:2px dashed #b8963e;color:#b8963e;line-height:1.4}.qa2-gap b{color:#1d6b46;font-weight:700;animation:dmPop .35s}'+
  '.qa-n{color:#b8963e;font-size:.8em}'+
  '.qa2-ask{margin:1rem 0 .6rem;color:var(--body);text-align:center}'+
  '.qa2-opts{display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem}'+
  '.qa2-opts button{font:400 1.45rem/1.6 "Amiri",serif!important;background:#fff;color:#12281c!important;border:2px solid rgba(184,150,62,.5);border-radius:14px;padding:.35rem 1.2rem;transition:transform .15s,background .2s;animation:qaIn .35s both}'+
  '.qa2-opts button:hover{transform:translateY(-2px)}.qa2-opts button.ok{background:#1d6b46;color:#fff!important;border-color:#1d6b46;animation:dmPop .35s}.qa2-opts button.no{background:#f6dcdc;border-color:#d66;animation:mkNo .4s;opacity:.6}'+
  '.qa2-fb{text-align:center;min-height:1.6em;margin:.6rem 0 0;font-weight:700;color:var(--a)}'+
  '.qa2.hc .qa-page{background:#0d1a13;box-shadow:none;border-color:#f3d77a;color:#fff6cf}.qa2.hc .qa2-done,.qa2.hc .qa2-cur{color:#fff6cf}.qa2.hc .qa-sura,.qa2.hc .qa-n{color:#f3d77a}'+
  /* inara */
  '.in2{min-height:360px;display:grid;align-content:center}'+
  '.in2-bar{height:6px;border-radius:3px;background:var(--line2);overflow:hidden;margin-bottom:1.2rem}.in2-bar i{display:block;height:100%;background:linear-gradient(90deg,#e062d6,#8a4be0);transition:width .4s}'+
  '.in2-step{margin:0;color:var(--a);font-size:.85rem;font-weight:700}'+
  '.in2-q{margin:.3rem 0 1.2rem;font-size:clamp(1.3rem,2.6vw,1.9rem);color:var(--fg);font-weight:800}'+
  '.in2-a{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.7rem}'+
  '.in2-a button{display:flex;align-items:center;gap:.9rem;text-align:start;background:rgba(255,255,255,.03);border:1px solid var(--line2);border-radius:16px;padding:1rem 1.1rem;font-size:1rem;transition:transform .18s,border-color .2s,background .2s;animation:qaIn .35s both}'+
  '.in2-a button:hover{transform:translateY(-3px);border-color:var(--a)}.in2-a button.pick{background:linear-gradient(120deg,#e062d6,#8a4be0);border-color:transparent;color:#fff!important;transform:scale(1.03)}'+
  '.in2-e{font-size:1.9rem}'+
  '.in2-res{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.4fr);gap:clamp(1rem,4vw,2.6rem);align-items:center}'+
  '.in2-card{position:relative;overflow:hidden;aspect-ratio:3/4;max-width:260px;width:100%;justify-self:center;border-radius:22px;display:grid;place-content:center;justify-items:center;gap:.3rem;text-align:center;background:linear-gradient(150deg,#e062d6,#6d3bd6 60%,#2a1450);color:#fff;box-shadow:0 30px 60px -20px rgba(224,98,214,.55);animation:inFlip .9s cubic-bezier(.2,1.2,.3,1)}'+
  '@keyframes inFlip{from{transform:rotateY(90deg) scale(.6);opacity:0}}'+
  '.in2-shine{position:absolute;inset:-50%;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.45) 50%,transparent 60%);animation:inSh 2.6s ease-in-out .6s infinite}@keyframes inSh{from{transform:translateX(-60%)}to{transform:translateX(60%)}}'+
  '.in2-big{font-size:4.5rem;line-height:1}.in2-card small{opacity:.85;letter-spacing:.06em}.in2-card b{font-size:1.6rem}'+
  '.in2-map ol{list-style:none;margin:.6rem 0 1.2rem;padding:0;display:grid;gap:.55rem;position:relative}'+
  '.in2-map li{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:.9rem;padding:.75rem 1rem;border:1px solid var(--line2);border-radius:14px;opacity:0;transform:translateY(10px);animation:inUp .5s var(--d) forwards}'+
  '.in2-map li b{color:var(--fg)}.in2-map li span:last-child{grid-column:2;color:var(--body);font-size:.92rem}'+
  '.in2-lv{grid-row:span 2;align-self:center;background:linear-gradient(120deg,#e062d6,#8a4be0);color:#fff;border-radius:10px;padding:.35rem .55rem;font-size:.72rem;font-weight:700;white-space:nowrap}'+
  '@keyframes inUp{to{opacity:1;transform:none}}'+
  /* sanabil */
  '.sn2-hud{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.6rem 1rem;align-items:center;margin-bottom:1rem;color:var(--fg);font-weight:600}'+
  '.sn-edge{display:inline-flex;gap:.5rem;align-items:center;cursor:pointer;color:var(--body);font-weight:500}.sn-edge input{accent-color:var(--a);width:1.05rem;height:1.05rem}'+
  '.sn2-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.9rem}'+
  '.sn2-c{border:1px solid var(--line2);border-radius:16px;padding:1rem;display:flex;flex-direction:column;gap:.7rem;transition:border-color .4s,box-shadow .4s}'+
  '.sn2-c.done{border-color:var(--a);box-shadow:0 0 0 1px var(--a),0 20px 40px -24px var(--a)}'+
  '.sn2-c header{display:flex;align-items:center;gap:.6rem;color:var(--fg)}.sn2-e{font-size:1.6rem}'+
  '.sn2-fw{position:relative;border-radius:10px;overflow:hidden;background:#0b1410}'+
  '.sn2-f{display:block;width:100%}.sn2-f rect{fill:#26302b;transition:fill .5s}'+
  '.sn2-q{position:absolute;inset:0;display:grid;place-items:center;font-size:2rem;color:rgba(255,255,255,.35);font-weight:800;transition:opacity .4s}.sn2-c.done .sn2-q,.sn2-c.scanning .sn2-q{opacity:0}'+
  '.sn2-sweep{position:absolute;top:0;bottom:0;width:30%;left:-30%;background:linear-gradient(90deg,transparent,rgba(120,255,200,.5),transparent);opacity:0}'+
  '.sn2-c.scanning .sn2-sweep{opacity:1;animation:snSw .8s linear 2}@keyframes snSw{to{left:100%}}'+
  '.sn2-layers{display:flex;flex-wrap:wrap;gap:.3rem}.sn2-layers span{font-size:.72rem;border:1px solid var(--line2);border-radius:999px;padding:.2rem .55rem;color:var(--mute);transition:.3s}.sn2-layers span.on{border-color:var(--a);color:var(--fg)}.sn2-layers span.on::before{content:"✓ ";color:var(--a)}'+
  '.sn2-out{display:none;gap:.6rem}.sn2-c.done .sn2-out{display:grid;animation:qaIn .4s}'+
  '.sn2-score{display:flex;align-items:baseline;gap:.5rem}.sn2-score b{font-size:2.4rem;line-height:1;color:var(--fg)}.sn2-score small{color:var(--a);font-weight:700}'+
  '.sn2-out ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:.4rem}.sn2-out li{display:grid;gap:.1rem;padding:.45rem .55rem;border-radius:8px;background:rgba(255,255,255,.04)}.sn2-out li small{color:var(--mute);font-size:.7rem}.sn2-out li b{color:var(--fg);font-size:.95rem}'+
  '.sn2-out .rk-low{color:#5be38c}.sn2-out .rk-medium{color:#ffd166}.sn2-out .rk-high{color:#ff7b7b}'+
  '.sn2-live{margin:0;font-size:.74rem;color:#6ccb6c}'+
  '.sn2-trad{margin:0;font-size:.82rem;color:var(--mute)}'+
  '.sn2-act{margin-top:auto}.sn2-act .dm-btn{width:100%;padding:.65rem 1rem;font-size:.9rem}'+
  '.sn-foot{margin:1rem 0 0;font-size:.78rem;color:var(--mute)}'+
  'html[lang=ar] .demo .mono{letter-spacing:0}'+
  '@media (max-width:820px){.rk2,.in2-res{grid-template-columns:1fr}.sn2-cards{grid-template-columns:1fr}.in2-a{grid-template-columns:1fr}.rk2-n{max-width:70%}.rk2-screen{min-height:300px}.in2-card{max-width:200px}}'+
  '@media (prefers-reduced-motion:reduce){.demo *{animation-duration:.01s!important;animation-iteration-count:1!important;transition:none!important}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
