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

  /* ================= Rakeez: a live work session ================= */
  function rakeez(el){
    var LV=[
      {c:'#2fd27a', n:'Focused',          d:'Steady green light. No intervention needed.'},
      {c:'#ffd43b', n:'Early drift',      d:'The light turns yellow: a subtle visual cue.'},
      {c:'#ff922b', n:'Distracted',       d:'Orange light, stronger, with an optional gentle tone.'},
      {c:'#ff4d4f', n:'Deep distraction', d:'Red light and an active intervention on screen.'}
    ];
    var EV=[
      {k:'phone',  e:'📱', n:'Phone notification', drop:24},
      {k:'switch', e:'🔀', n:'Switching screens',  drop:16},
      {k:'chat',   e:'💬', n:'Chat interruption',  drop:20},
      {k:'away',   e:'🚶', n:'Stepping away',      away:true}
    ];
    var lines=''; for(var i=0;i<7;i++) lines+='<p><i></i></p>';
    shell(el,
      '<div class="rk3">'+
        '<div class="rk3-desk">'+
          '<div class="rk3-laptop"><div class="rk3-scr"><div class="rk3-file">📄 Report.docx</div><div class="rk3-lines">'+lines+'</div>'+
            '<div class="rk3-int" hidden><span class="rk3-intdot"></span><b>Rakeez</b><p>'+esc(t('Time to bring your focus back to the task.'))+'</p><button type="button" class="dm-btn rk3-back">'+esc(t('I’m back'))+'</button></div>'+
          '</div><div class="rk3-base"></div></div>'+
          '<div class="rk3-dev"><i class="rk3-glow"></i><i class="rk3-ring"></i><div class="rk3-face"><b class="rk3-num">100</b><span>'+esc(t('Focus'))+'</span></div></div>'+
        '</div>'+
        '<div class="rk3-panel">'+
          '<div class="rk3-lv"><span class="rk3-dot"></span><div><b class="rk3-name"></b><p class="rk3-desc"></p></div></div>'+
          '<div class="rk3-chart"><svg viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">'+
            '<rect y="0" width="300" height="25" fill="#2fd27a" opacity=".07"/><rect y="25" width="300" height="25" fill="#ffd43b" opacity=".07"/><rect y="50" width="300" height="25" fill="#ff922b" opacity=".07"/><rect y="75" width="300" height="25" fill="#ff4d4f" opacity=".08"/>'+
            '<polyline class="rk3-line" fill="none" stroke-width="2.2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>'+
            '<span class="rk3-ax">'+esc(t('Focus over the last 30 seconds'))+'</span></div>'+
          '<ol class="rk3-tiers">'+LV.map(function(l){ return '<li style="--c:'+l.c+'"><i></i>'+esc(t(l.n))+'</li>'; }).join('')+'</ol>'+
          '<p class="dm-k">'+esc(t('Make something happen:'))+'</p>'+
          '<div class="rk3-ev">'+EV.map(function(e){ return '<button type="button" data-k="'+e.k+'"><span>'+e.e+'</span>'+esc(t(e.n))+'</button>'; }).join('')+'</div>'+
          '<div class="dm-row"><button type="button" class="dm-btn rk3-story">▶ '+esc(t('Play a typical session'))+'</button>'+
          '<label class="rk3-snd"><input type="checkbox"> '+esc(t('Sound'))+'</label></div>'+
          '<p class="rk3-cap" aria-live="polite"></p>'+
        '</div>'+
      '</div>');
    var f=100, pend=0, away=false, int_=false, lv=0, hist=[], loop=null, story=[], ac=null, adapt=0;
    for(var h=0;h<150;h++) hist.push(100);
    var dev=q(el,'.rk3-dev'), line=q(el,'.rk3-line'), intv=q(el,'.rk3-int');
    function level(x){ return x>=75?0 : x>=50?1 : x>=25?2 : 3; }
    function tone(l){
      if(!q(el,'.rk3-snd input').checked || l<2) return;
      try{ ac=ac||new (window.AudioContext||window.webkitAudioContext)(); var o=ac.createOscillator(), g=ac.createGain();
        o.frequency.value= l===2?660:520; o.type='sine'; g.gain.setValueAtTime(.0001,ac.currentTime); g.gain.exponentialRampToValueAtTime(.12,ac.currentTime+.05); g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.6);
        o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime+.65); }catch(e){}
    }
    function paint(){
      var nl=level(f), L=LV[nl];
      if(nl>lv) tone(nl);
      if(nl<lv && lv>=2) adapt=12;
      lv=nl;
      el.style.setProperty('--lc', L.c);
      dev.setAttribute('data-lv', nl);
      q(el,'.rk3-num').textContent=num(Math.round(f));
      q(el,'.rk3-name').textContent=t(L.n);
      q(el,'.rk3-desc').textContent= adapt>0 && nl<2 ? t('Adapting: the light eases back step by step as focus returns.') : t(L.d);
      qa(el,'.rk3-tiers li').forEach(function(li,i){ li.classList.toggle('on', i===nl); });
      line.setAttribute('points', hist.map(function(v,i){ return (i*2).toFixed(0)+','+(100-v).toFixed(1); }).join(' '));
      line.setAttribute('stroke', L.c);
      if(nl===3 && !int_){ int_=true; intv.hidden=false; }
      qa(el,'.rk3-lines p i').forEach(function(x){ x.style.animationPlayState = (nl>=2||away)?'paused':'running'; });
      q(el,'.rk3-laptop').classList.toggle('dim', away && !int_);
    }
    function step(){
      if(pend>0){ var d=Math.min(pend,3.2); f-=d; pend-=d; }
      else if(away) f-=2.4;
      else if(!int_) f+= f<100 ? 1.1 : 0;
      f=Math.max(0,Math.min(100,f)); if(adapt>0) adapt--;
      hist.push(f); hist.shift(); paint();
    }
    function ev(k){
      var e=EV.filter(function(x){ return x.k===k; })[0];
      if(e.away){ away=!away; var b=q(el,'.rk3-ev [data-k=away]'); b.classList.toggle('on',away); b.lastChild.textContent= t(away?'Return to the desk':'Stepping away'); }
      else { pend+=e.drop; var b2=q(el,'.rk3-ev [data-k='+k+']'); b2.classList.remove('hit'); void b2.offsetWidth; b2.classList.add('hit'); }
    }
    function back(){ int_=false; intv.hidden=true; if(away) ev('away'); pend=0; f=Math.max(f,30); }
    qa(el,'.rk3-ev button').forEach(function(b){ b.addEventListener('click',function(){ ev(b.getAttribute('data-k')); }); });
    q(el,'.rk3-back').addEventListener('click',back);
    function cap(s){ q(el,'.rk3-cap').textContent=s?t(s):''; }
    q(el,'.rk3-story').addEventListener('click',function(){
      var btn=this; story.forEach(clearTimeout); story=[]; btn.disabled=true;
      f=100; pend=0; if(away) ev('away'); back(); f=100;
      var S=[[0,null,'A work session begins. Rakeez stays green.'],[2600,'phone','A phone notification arrives…'],[5200,'switch','…then a quick switch to another screen.'],[7600,'chat','A chat message pulls attention further.'],[10600,'away','Now stepping away from the desk.'],[17500,'back','Back at the desk. Rakeez lowers its response as focus returns.'],[26000,'end','Session over: from green, to red, and back to green.']];
      S.forEach(function(s){ story.push(setTimeout(function(){
        if(s[1]==='back') back(); else if(s[1]==='end') btn.disabled=false; else if(s[1]) ev(s[1]);
        cap(s[2]); }, s[0])); });
    });
    cap('Tap an event, or play a typical session, and watch Rakeez respond.');
    paint();
    onScreen(el,function(){ if(!loop) loop=setInterval(step,200); },function(){ clearInterval(loop); loop=null; });
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

  /* ================= Quraa: one surah, shaped around each reader ================= */
  function quraa(el){
    var V=[
      ['بِسْمِ','اللَّهِ','الرَّحْمَٰنِ','الرَّحِيمِ'],
      ['الْحَمْدُ','لِلَّهِ','رَبِّ','الْعَالَمِينَ'],
      ['الرَّحْمَٰنِ','الرَّحِيمِ'],
      ['مَالِكِ','يَوْمِ','الدِّينِ'],
      ['إِيَّاكَ','نَعْبُدُ','وَإِيَّاكَ','نَسْتَعِينُ'],
      ['اهْدِنَا','الصِّرَاطَ','الْمُسْتَقِيمَ'],
      ['صِرَاطَ','الَّذِينَ','أَنْعَمْتَ','عَلَيْهِمْ','غَيْرِ','الْمَغْضُوبِ','عَلَيْهِمْ','وَلَا','الضَّالِّينَ']
    ];
    var AN='١٢٣٤٥٦٧';
    var M=[
      {k:'std', e:'📖', n:'Standard',            w:'The standard reading view.'},
      {k:'lv',  e:'🔍', n:'Low vision',          w:'Larger letters and high contrast for readers with low vision.'},
      {k:'rd',  e:'🔤', n:'Reading difficulties', w:'Wider spacing and a reading guide that moves word by word, at the reader’s pace.'},
      {k:'mo',  e:'✋', n:'Limited mobility',     w:'One verse at a time with large buttons and optional auto-advance, so fewer and easier taps are needed.'},
      {k:'me',  e:'🧠', n:'Memorization',        w:'Hide a share of the words, recite from memory, then tap a word to check it.'}
    ];
    shell(el,
      '<div class="qa3">'+
        '<p class="dm-k">'+esc(t('Who is reading?'))+'</p>'+
        '<div class="qa3-modes" role="group">'+M.map(function(m){ return '<button type="button" data-k="'+m.k+'"><span>'+m.e+'</span>'+esc(t(m.n))+'</button>'; }).join('')+'</div>'+
        '<p class="qa3-why" aria-live="polite"></p>'+
        '<div class="qa3-ctl"></div>'+
        '<div class="qa-page" dir="rtl" lang="ar"><p class="qa-sura">سورة الفاتحة</p><div class="qa3-text"></div></div>'+
      '</div>');
    var app=q(el,'.qa3'), txt=q(el,'.qa3-text'), ctl=q(el,'.qa3-ctl'), mode='std', size=1.8, cur=0, timer=null, hidePct=50, seed=1, guide=-1, pace=650;
    function words(){ return qa(txt,'.qa3-w'); }
    function render(){
      var vs = mode==='mo' ? [cur] : V.map(function(_,i){ return i; });
      txt.innerHTML=vs.map(function(i){ return '<span class="qa3-v">'+V[i].map(function(w,j){ return '<span class="qa3-w" data-v="'+i+'" data-j="'+j+'">'+w+'</span>'; }).join(' ')+' <span class="qa-n">﴿'+AN[i]+'﴾</span></span>'; }).join(' ');
      if(mode==='me'){ var all=words(); all.forEach(function(w,i){ var r=Math.abs(Math.sin((i+1)*seed*12.9898)*43758.5453)%1; if(r<hidePct/100) w.classList.add('hid'); });
        all.forEach(function(w){ w.addEventListener('click',function(){ w.classList.remove('hid'); w.classList.add('shown'); }); }); }
    }
    function stopGuide(){ clearInterval(timer); timer=null; var b=q(ctl,'.qa3-play'); if(b) b.textContent='▶ '+t('Start the reading guide'); }
    function setMode(k){
      stopGuide(); mode=k; guide=-1;
      app.setAttribute('data-m',k);
      qa(el,'.qa3-modes button').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-k')===k); });
      q(el,'.qa3-why').textContent=t(M.filter(function(m){ return m.k===k; })[0].w);
      size = k==='lv'?2.5 : k==='mo'?2.3 : 1.8; app.style.setProperty('--qs', size+'rem');
      var c='';
      if(k==='lv') c='<button type="button" data-a="dec">A−</button><button type="button" data-a="inc">A+</button>';
      if(k==='rd') c='<button type="button" class="qa3-play">▶ '+esc(t('Start the reading guide'))+'</button><button type="button" data-a="pace" aria-pressed="false">'+esc(t('Slower pace'))+'</button>';
      if(k==='mo') c='<button type="button" class="qa3-big" data-a="next">'+esc(t('Next verse'))+'</button><button type="button" class="qa3-big" data-a="prev">'+esc(t('Previous verse'))+'</button><button type="button" data-a="auto" aria-pressed="false">'+esc(t('Auto-advance'))+'</button>';
      if(k==='me') c='<label class="qa3-rng">'+esc(t('Hidden words'))+' <input type="range" min="25" max="100" step="25" value="'+hidePct+'"> <b>'+num(hidePct+'%')+'</b></label><button type="button" data-a="mix">'+esc(t('Hide different words'))+'</button>';
      ctl.innerHTML=c; ctl.hidden=!c;
      qa(ctl,'button').forEach(function(b){ b.addEventListener('click',function(){ act(b); }); });
      var r=q(ctl,'input[type=range]'); if(r) r.addEventListener('input',function(){ hidePct=+r.value; q(ctl,'.qa3-rng b').textContent=num(hidePct+'%'); render(); });
      render();
    }
    function act(b){
      var a=b.getAttribute('data-a');
      if(b.classList.contains('qa3-play')){
        if(timer){ stopGuide(); return; }
        b.textContent='❚❚ '+t('Pause');
        timer=setInterval(function(){ var w=words(); guide=(guide+1)%w.length; w.forEach(function(x,i){ x.classList.toggle('on',i===guide); x.classList.toggle('read',i<guide); }); }, pace);
        return;
      }
      if(a==='pace'){ var on=b.getAttribute('aria-pressed')!=='true'; b.setAttribute('aria-pressed',on); pace=on?1100:650; if(timer){ stopGuide(); act(q(ctl,'.qa3-play')); } }
      if(a==='dec'){ size=Math.max(1.6,size-.3); app.style.setProperty('--qs',size+'rem'); }
      if(a==='inc'){ size=Math.min(3.4,size+.3); app.style.setProperty('--qs',size+'rem'); }
      if(a==='next'){ cur=(cur+1)%V.length; render(); }
      if(a==='prev'){ cur=(cur+V.length-1)%V.length; render(); }
      if(a==='auto'){ var on2=b.getAttribute('aria-pressed')!=='true'; b.setAttribute('aria-pressed',on2); clearInterval(timer); timer= on2 ? setInterval(function(){ cur=(cur+1)%V.length; render(); },3200) : null; }
      if(a==='mix'){ seed++; render(); }
    }
    qa(el,'.qa3-modes button').forEach(function(b){ b.addEventListener('click',function(){ setMode(b.getAttribute('data-k')); }); });
    setMode('std');
    onScreen(el,function(){},function(){ if(timer){ clearInterval(timer); timer=null; var p=q(ctl,'.qa3-play'); if(p) p.textContent='▶ '+t('Start the reading guide'); var au=q(ctl,'[data-a=auto]'); if(au) au.setAttribute('aria-pressed',false); } });
  }

  /* ================= Inara: light up your constellation ================= */
  function inara(el){
    var T={
      'Drawing':['Sketching fundamentals workshop','Art and design institutes','Illustration and design projects'],
      'Writing':['Creative writing workshop','Literature and media programmes','Publishing and content opportunities'],
      'Programming':['Introductory coding course','Computing colleges and bootcamps','Hackathons and tech internships'],
      'Photography':['Photography basics workshop','Visual arts and media programmes','Exhibitions and photography commissions'],
      'Public speaking':['Public speaking workshop','Communication and media programmes','Events, podcasts and presenting'],
      'Science':['Hands-on science workshop','Research centres and university programmes','Competitions and research internships']
    };
    var A=[['Sketching','Drawing',11,18],['Designing posters','Drawing',33,9],['Storytelling','Writing',57,13],['Writing poetry','Writing',80,10],['Building apps','Programming',90,34],['Solving logic puzzles','Programming',9,46],
           ['Taking photos','Photography',91,62],['Editing videos','Photography',13,78],['Presenting to an audience','Public speaking',35,88],['Debating ideas','Public speaking',62,86],['Running experiments','Science',85,82],['Observing nature','Science',27,34]];
    var ST=['Talent Discovery','Talent Cultivation','Resource Identification','Professional Integration'];
    var bg=''; for(var i=0;i<70;i++) bg+='<i style="left:'+rnd(0,100).toFixed(1)+'%;top:'+rnd(0,100).toFixed(1)+'%;animation-delay:'+rnd(0,4).toFixed(1)+'s;opacity:'+rnd(.15,.6).toFixed(2)+'"></i>';
    shell(el,
      '<div class="in3">'+
        '<div class="in3-sky">'+
          '<div class="in3-bg" aria-hidden="true">'+bg+'</div>'+
          '<svg class="in3-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>'+
          A.map(function(a,i){ var side=a[2]>75?' r':a[2]<25?' l':''; return '<button type="button" class="in3-star'+side+'" data-i="'+i+'" style="left:'+a[2]+'%;top:'+a[3]+'%" aria-pressed="false"><i></i><span>'+esc(t(a[0]))+'</span></button>'; }).join('')+
          '<div class="in3-core" aria-live="polite"><p class="in3-hint">'+esc(t('Tap the things you enjoy. Each one lights a star.'))+'</p></div>'+
        '</div>'+
        '<div class="dm-row in3-bar"><button type="button" class="dm-btn in3-go" disabled>✨ '+esc(t('Illuminate my path'))+'</button><span class="in3-cnt"></span><button type="button" class="dm-link in3-reset" hidden>'+esc(t('Start again'))+'</button></div>'+
        '<ol class="in3-path">'+ST.map(function(s,i){ return '<li><span class="in3-lamp"><i></i></span><b>'+esc(t(s))+'</b><span class="in3-v"></span></li>'; }).join('')+'</ol>'+
      '</div>');
    var picked=[], sky=q(el,'.in3-sky'), svg=q(el,'.in3-lines'), lit=false, tm=[];
    function draw(){
      var pts=picked.map(function(i){ return A[i][2]+','+A[i][3]; });
      svg.innerHTML = pts.length>1 ? '<polyline points="'+pts.join(' ')+'" />' : '';
      var n=picked.length;
      q(el,'.in3-cnt').textContent= n<3 ? t('Pick at least 3')+' · '+num(n+'/3') : num(n)+' '+t('stars lit');
      q(el,'.in3-go').disabled=n<3||lit;
      sky.style.setProperty('--glow', Math.min(1,n/6).toFixed(2));
    }
    qa(el,'.in3-star').forEach(function(b){ b.addEventListener('click',function(){
      if(lit) return; var i=+b.getAttribute('data-i'), k=picked.indexOf(i);
      if(k>=0) picked.splice(k,1); else picked.push(i);
      b.setAttribute('aria-pressed', k<0); draw();
    }); });
    q(el,'.in3-go').addEventListener('click',function(){
      lit=true; var sc={}, best=null;
      picked.forEach(function(i){ var tl=A[i][1]; sc[tl]=(sc[tl]||0)+1; if(!best||sc[tl]>=sc[best]) best=tl; });
      sky.classList.add('lit');
      q(el,'.in3-core').innerHTML='<small>'+esc(t('Your light'))+'</small><b>'+esc(t(best))+'</b>';
      var v=[t('Your interest:')+' '+t(best)].concat(T[best].map(t));
      tm.forEach(clearTimeout); tm=[];
      qa(el,'.in3-path li').forEach(function(li,i){ tm.push(setTimeout(function(){ q(li,'.in3-v').textContent=v[i]; li.classList.add('on'); }, RM?0:900+i*550)); });
      q(el,'.in3-reset').hidden=false; draw();
    });
    q(el,'.in3-reset').addEventListener('click',function(){
      lit=false; picked=[]; tm.forEach(clearTimeout); sky.classList.remove('lit');
      qa(el,'.in3-star').forEach(function(b){ b.setAttribute('aria-pressed',false); });
      qa(el,'.in3-path li').forEach(function(li){ li.classList.remove('on'); q(li,'.in3-v').textContent=''; });
      q(el,'.in3-core').innerHTML='<p class="in3-hint">'+esc(t('Tap the things you enjoy. Each one lights a star.'))+'</p>';
      this.hidden=true; draw();
    });
    draw();
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
  '.demo{--lc:#2fd27a}.rk3{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:clamp(1.2rem,3.5vw,2.8rem);align-items:center}'+
  '.rk3-desk{position:relative;display:grid;justify-items:center;gap:1.4rem;padding:1.2rem 0}'+
  '.rk3-laptop{width:min(340px,100%);transition:filter .5s}.rk3-laptop.dim{filter:brightness(.45) saturate(.6)}'+
  '.rk3-scr{position:relative;aspect-ratio:16/10;border-radius:10px 10px 0 0;border:6px solid #1b2427;border-bottom-width:4px;background:#f4f6f7;overflow:hidden;padding:.7rem .8rem}'+
  '.rk3-file{font-size:.62rem;color:#4a5a60;margin-bottom:.55rem}'+
  '.rk3-lines{display:grid;gap:.42rem}.rk3-lines p{margin:0;height:5px;border-radius:3px;background:#e3e8ea}'+
  '.rk3-lines p i{display:block;height:100%;border-radius:3px;background:#9fb0b6;animation:rkType 6s linear infinite}'+
  '.rk3-lines p:nth-child(2) i{animation-delay:.8s}.rk3-lines p:nth-child(3) i{animation-delay:1.6s}.rk3-lines p:nth-child(4) i{animation-delay:2.4s}.rk3-lines p:nth-child(5) i{animation-delay:3.2s}.rk3-lines p:nth-child(6) i{animation-delay:4s}.rk3-lines p:nth-child(7) i{animation-delay:4.8s}'+
  '@keyframes rkType{0%{width:0}60%,100%{width:100%}}'+
  '.rk3-base{height:12px;margin:0 -8%;border-radius:0 0 12px 12px;background:linear-gradient(#2a3438,#151c1f)}'+
  '.rk3-int{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:.35rem;text-align:center;background:rgba(40,6,8,.88);color:#fff;padding:.6rem;animation:dmIn .4s}.rk3-int[hidden]{display:none}'+
  '.rk3-int b{font-size:.8rem;letter-spacing:.06em;color:#ff8a8c}.rk3-int p{margin:0;font-size:.78rem;max-width:24ch;line-height:1.5}.rk3-int .dm-btn{padding:.4rem .9rem;font-size:.75rem;background:#ff4d4f;color:#fff!important}'+
  '.rk3-intdot{width:10px;height:10px;border-radius:50%;background:#ff4d4f;box-shadow:0 0 0 0 #ff4d4f;animation:rkB .9s infinite}'+
  '@keyframes rkB{70%{box-shadow:0 0 0 10px transparent}}'+
  '.rk3-dev{--sp:3.4s;position:relative;width:min(170px,44vw);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 30%,#2a3236,#0c1113 72%);box-shadow:inset 0 2px 0 rgba(255,255,255,.08),0 26px 40px -18px rgba(0,0,0,.8)}'+
  '.rk3-dev[data-lv="1"]{--sp:2.4s}.rk3-dev[data-lv="2"]{--sp:1.3s}.rk3-dev[data-lv="3"]{--sp:.6s}'+
  '.rk3-ring{position:absolute;inset:8%;border-radius:50%;border:6px solid var(--lc);transition:border-color .6s;box-shadow:0 0 18px var(--lc),inset 0 0 14px var(--lc)}'+
  '.rk3-glow{position:absolute;inset:-14%;border-radius:50%;background:radial-gradient(circle,var(--lc) 0%,transparent 62%);opacity:.35;animation:rkp var(--sp) ease-in-out infinite;transition:background .6s}'+
  '@keyframes rkp{50%{opacity:.08;transform:scale(.94)}}'+
  '.rk3-face{position:absolute;inset:27%;border-radius:50%;background:#050809;display:grid;place-content:center;text-align:center}'+
  '.rk3-face b{font-size:1.7rem;line-height:1;color:#fff}.rk3-face span{font-size:.58rem;letter-spacing:.06em;color:var(--lc);transition:color .6s}'+
  '.rk3-lv{display:flex;gap:.8rem;align-items:flex-start;margin-bottom:.9rem}.rk3-dot{flex:none;width:14px;height:14px;margin-top:.45rem;border-radius:50%;background:var(--lc);box-shadow:0 0 12px var(--lc);transition:.6s}'+
  '.rk3-name{display:block;font-size:clamp(1.3rem,2.6vw,1.8rem);color:var(--fg);line-height:1.3}.rk3-desc{margin:.2rem 0 0;color:var(--body);font-size:.95rem;min-height:3em}'+
  '.rk3-chart{position:relative;height:110px;border:1px solid var(--line2);border-radius:12px;overflow:hidden;margin-bottom:.7rem;background:rgba(0,0,0,.25)}.rk3-chart svg{width:100%;height:100%;display:block}'+
  '.rk3-line{transition:stroke .6s}.rk3-ax{position:absolute;inset-inline-start:.6rem;bottom:.35rem;font-size:.66rem;color:var(--mute)}'+
  '.rk3-tiers{list-style:none;margin:0 0 1.1rem;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:5px}'+
  '.rk3-tiers li{display:flex;align-items:center;gap:.35rem;font-size:.72rem;color:var(--mute);padding:.4rem .45rem;border-radius:8px;border:1px solid var(--line2);transition:.4s}'+
  '.rk3-tiers li i{flex:none;width:9px;height:9px;border-radius:50%;background:var(--c)}.rk3-tiers li.on{border-color:var(--c);color:var(--fg);box-shadow:inset 0 0 0 1px var(--c)}'+
  '.rk3-ev{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:.9rem}'+
  '.rk3-ev button{display:flex;align-items:center;gap:.55rem;background:rgba(255,255,255,.03);border:1px solid var(--line2);border-radius:12px;padding:.65rem .8rem;font-size:.88rem;text-align:start;transition:border-color .2s,transform .15s}'+
  '.rk3-ev button:hover{border-color:var(--a)}.rk3-ev button span{font-size:1.15rem}.rk3-ev button.hit{animation:rkHit .4s}.rk3-ev button.on{border-color:#ff922b;background:rgba(255,146,43,.12)}'+
  '@keyframes rkHit{40%{transform:scale(.95)}}'+
  '.rk3-snd{display:inline-flex;gap:.4rem;align-items:center;color:var(--body);font-size:.88rem;cursor:pointer}.rk3-snd input{accent-color:var(--a)}'+
  '.rk3-cap{margin:.8rem 0 0;color:var(--a);font-size:.92rem;min-height:1.5em}'+
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
  '.qa3{--qs:1.8rem}'+
  '.qa3-modes{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:.8rem}'+
  '.qa3-modes button{display:inline-flex;align-items:center;gap:.45rem;background:none;border:1px solid var(--line2);border-radius:999px;padding:.5rem 1rem;font-size:.9rem;transition:.2s}'+
  '.qa3-modes button[aria-pressed=true]{background:var(--a);color:var(--a-ink,#fff)!important;border-color:var(--a)}'+
  '.qa3-why{margin:0 0 .8rem;color:var(--body);min-height:1.6em}'+
  '.qa3-ctl{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin-bottom:.9rem}.qa3-ctl[hidden]{display:none}'+
  '.qa3-ctl button{background:none;border:1px solid var(--line2);border-radius:999px;padding:.45rem 1rem;font-size:.88rem}.qa3-ctl button[aria-pressed=true]{background:var(--fg);color:var(--bg)!important}'+
  '.qa3-ctl .qa3-big{font-size:1.05rem;padding:.9rem 1.6rem;border-radius:16px;border-width:2px;font-weight:700}'+
  '.qa3-rng{display:inline-flex;gap:.6rem;align-items:center;color:var(--body);font-size:.9rem}.qa3-rng input{accent-color:var(--a)}'+
  '.qa-page{background:#fbf7ea;border:1px solid rgba(184,150,62,.45);border-radius:14px;padding:clamp(1rem,3.5vw,2.2rem);box-shadow:inset 0 0 0 6px #fbf7ea,inset 0 0 0 7px rgba(184,150,62,.35);text-align:center;transition:background .4s}'+
  '.qa-sura{font:700 1.1rem/1 "Amiri",serif;color:#8a6d22;margin:0 0 .9rem}'+
  '.qa3-text{font:400 var(--qs)/2.15 "Amiri",serif;color:#12281c;transition:font-size .3s,word-spacing .3s}'+
  '.qa3-w{border-radius:6px;transition:background .25s,color .25s}'+
  '.qa-n{color:#b8963e;font-size:.8em}'+
  '.qa3[data-m=lv] .qa-page{background:#0b0f0c;box-shadow:none;border:2px solid #ffe066}.qa3[data-m=lv] .qa3-text{color:#ffe066;font-weight:700}.qa3[data-m=lv] .qa-sura,.qa3[data-m=lv] .qa-n{color:#fff}'+
  '.qa3[data-m=rd] .qa3-text{word-spacing:.45em;line-height:2.6}.qa3-w.on{background:#ffe08a;color:#000;box-shadow:0 0 0 3px #ffe08a}.qa3-w.read{color:#8a9a90}'+
  '.qa3[data-m=mo] .qa3-text{min-height:5.5em;display:grid;place-items:center}.qa3[data-m=mo] .qa3-v{animation:qaIn .4s}'+
  '@keyframes qaIn{from{opacity:0;transform:translateY(8px)}}'+
  '.qa3[data-m=me] .qa3-w{cursor:pointer}.qa3-w.hid{color:transparent;background:repeating-linear-gradient(90deg,#d9c58c 0 6px,transparent 6px 10px) bottom/100% 2px no-repeat}.qa3-w.shown{color:#1d6b46;animation:dmPop .35s}'+
  /* inara */
  '.in3-sky{--glow:0;position:relative;height:clamp(360px,44vw,440px);border-radius:16px;overflow:hidden;background:radial-gradient(ellipse at 50% 50%,rgba(224,98,214,calc(var(--glow)*.28)),transparent 60%),linear-gradient(#0d0717,#1a0d2c);border:1px solid var(--line2);transition:background .6s}'+
  '.in3-sky.lit{background:radial-gradient(ellipse at 50% 50%,rgba(255,214,140,.45),rgba(224,98,214,.25) 35%,transparent 70%),linear-gradient(#1a0d2c,#2b1446)}'+
  '.in3-bg i{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;animation:inTw 3.5s ease-in-out infinite}@keyframes inTw{50%{opacity:.05}}'+
  '.in3-lines{position:absolute;inset:0;width:100%;height:100%}.in3-lines polyline{fill:none;stroke:#ffd6f5;stroke-width:.35;stroke-opacity:.75;stroke-dasharray:1.2 .8;vector-effect:none}'+
  '.in3-sky.lit .in3-lines polyline{stroke:#ffe3a6;stroke-dasharray:none;stroke-width:.45;filter:drop-shadow(0 0 1px #ffe3a6)}'+
  '.in3-star{position:absolute;transform:translate(-50%,-50%);background:none;border:0;padding:6px;z-index:2;line-height:0}'+
  '.in3-star i{display:block;width:12px;height:12px;border-radius:50%;background:#bfa9dc;box-shadow:0 0 6px rgba(191,169,220,.6);transition:.35s}'+
  '.in3-star span{position:absolute;top:calc(100% + 2px);left:50%;transform:translateX(-50%);line-height:1.3;font-size:.74rem;color:#bfa9dc;white-space:nowrap;transition:.35s}'+
  '.in3-star.l span{left:0;transform:none}.in3-star.r span{left:auto;right:0;transform:none}'+
  '.in3-star:hover i{transform:scale(1.3)}'+
  '.in3-star[aria-pressed=true] i{background:#fff;width:16px;height:16px;box-shadow:0 0 10px #fff,0 0 26px #e062d6,0 0 46px #e062d6}.in3-star[aria-pressed=true] span{color:#fff;font-weight:600}'+
  '.in3-sky.lit .in3-star[aria-pressed=true] i{box-shadow:0 0 10px #fff,0 0 30px #ffd27a,0 0 60px #ffb347}'+
  '.in3-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;display:grid;gap:.3rem;z-index:1;width:min(70%,420px)}'+
  '.in3-hint{margin:0;color:#cdb8e8;font-size:.95rem;line-height:1.6}'+
  '.in3-core small{color:#ffe3a6;letter-spacing:.06em;font-size:.8rem;animation:dmIn .8s}.in3-core b{font-size:clamp(2rem,5vw,3.4rem);color:#fff;text-shadow:0 0 30px rgba(255,214,140,.8);animation:inRise 1s cubic-bezier(.2,1,.3,1)}'+
  '@keyframes inRise{from{opacity:0;transform:scale(.7);filter:blur(8px)}}'+
  '.in3-bar{margin:1rem 0}.in3-cnt{color:var(--mute);font-size:.9rem}.dm-link{background:none;border:0;color:var(--a)!important;text-decoration:underline;text-underline-offset:3px}'+
  '.in3-path{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.7rem;position:relative}'+
  '.in3-path li{display:grid;gap:.3rem;align-content:start;padding:.9rem;border-radius:14px;border:1px solid var(--line2);opacity:.4;transition:opacity .6s,border-color .6s,box-shadow .6s}'+
  '.in3-path li.on{opacity:1;border-color:#ffd27a;box-shadow:0 10px 30px -14px rgba(255,210,122,.6)}'+
  '.in3-lamp{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--line2)}.in3-lamp i{width:10px;height:10px;border-radius:50%;background:var(--line2);transition:.6s}'+
  '.in3-path li.on .in3-lamp i{background:#ffd27a;box-shadow:0 0 14px #ffd27a,0 0 30px #ffb347}'+
  '.in3-path b{color:var(--fg);font-size:.95rem}.in3-v{color:var(--body);font-size:.88rem;line-height:1.55}'+
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
  '@media (max-width:820px){.dm-ov{place-items:start center;padding-top:2.5rem}.rk3{grid-template-columns:1fr}.sn2-cards{grid-template-columns:1fr}.in3-path{grid-template-columns:1fr 1fr}.in3-star span{font-size:.64rem}.in3-sky{height:500px}.in3-hint{font-size:.82rem}.in3-star{padding:.2rem}.rk3-desk{grid-template-columns:1fr auto;align-items:center}.rk3-dev{width:120px}.rk3-face b{font-size:1.25rem}}'+
  '@media (prefers-reduced-motion:reduce){.demo *{animation-duration:.01s!important;animation-iteration-count:1!important;transition:none!important}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
