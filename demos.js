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

  /* ================= Rakeez: the phone on the desk ================= */
  function rakeez(el){
    var LV=[
      {c:'#2fd27a', n:'Focused',          d:'Green: you are on task. Rakeez stays quiet.'},
      {c:'#ffd43b', n:'Early drift',      d:'Yellow: Rakeez notices your attention slipping and gives a subtle cue.'},
      {c:'#ff922b', n:'Distracted',       d:'Orange: the cue gets stronger, with an optional gentle tone.'},
      {c:'#ff4d4f', n:'Deep distraction', d:'Red: Rakeez steps in and asks you to return to your task.'}
    ];
    var TH=[0,3,7,11];
    var feed=['🎬','🍔','⚽','😂','🛍️','🐱','✈️','🎮','📸','🎵'].map(function(e,i){ return '<div class="rk4-post"><span>'+e+'</span><p><i style="width:'+(60+(i*17)%35)+'%"></i><i style="width:'+(35+(i*23)%40)+'%"></i></p></div>'; }).join('');
    shell(el,
      '<div class="rk4">'+
        '<p class="rk4-intro">'+esc(t('You are studying at your desk. Your phone keeps buzzing. Pick it up and watch how Rakeez reacts.'))+'</p>'+
        '<div class="rk4-scene">'+
          '<div class="rk4-desk">'+
            '<div class="rk4-laptop"><div class="rk4-scr"><b>'+esc(t('Chapter 3 · Study notes'))+'</b>'+Array(7).join('<p><i></i></p>')+'</div><div class="rk4-base"></div></div>'+
            '<button type="button" class="rk4-phone" aria-label="'+esc(t('Pick up the phone'))+'"><span class="rk4-badge">1</span><span class="rk4-ptxt">'+esc(t('Pick up the phone'))+'</span></button>'+
            '<div class="rk4-hand" hidden><div class="rk4-mob"><div class="rk4-feed">'+feed+feed+'</div></div>'+
              '<p class="rk4-tm">'+esc(t('On the phone:'))+' <b>0s</b></p>'+
              '<button type="button" class="dm-btn rk4-down">'+esc(t('Put the phone down'))+'</button></div>'+
          '</div>'+
          '<div class="rk4-side">'+
            '<div class="rk4-dev" data-lv="0"><i class="rk4-glow"></i><i class="rk4-ring"></i><div class="rk4-face"><b>Rakeez</b></div>'+
              '<div class="rk4-bub" hidden>'+esc(t('Time to get back to your task.'))+'</div></div>'+
            '<h3 class="rk4-name"></h3><p class="rk4-desc" aria-live="polite"></p>'+
            '<div class="rk4-scale"><div class="rk4-bar">'+LV.map(function(l){ return '<i style="background:'+l.c+'"></i>'; }).join('')+'<b class="rk4-mark"></b></div>'+
              '<ol>'+LV.map(function(l){ return '<li>'+esc(t(l.n))+'</li>'; }).join('')+'</ol></div>'+
            '<label class="rk4-snd"><input type="checkbox"> '+esc(t('Play a gentle tone'))+'</label>'+
          '</div>'+
        '</div>'+
      '</div>');
    var dev=q(el,'.rk4-dev'), lv=0, secs=0, onPhone=false, loop=null, cool=null, ac=null, buzz=null;
    function tone(l){
      if(!q(el,'.rk4-snd input').checked || l<2) return;
      try{ ac=ac||new (window.AudioContext||window.webkitAudioContext)(); var o=ac.createOscillator(), g=ac.createGain();
        o.frequency.value=l===2?660:520; g.gain.setValueAtTime(.0001,ac.currentTime); g.gain.exponentialRampToValueAtTime(.12,ac.currentTime+.05); g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.6);
        o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime+.65); }catch(e){}
    }
    function set(n, adapting){
      if(n>lv) tone(n);
      lv=n; var L=LV[n];
      el.style.setProperty('--lc', L.c); dev.setAttribute('data-lv', n);
      q(el,'.rk4-name').textContent=t(L.n);
      q(el,'.rk4-desc').textContent= adapting ? t('Phone down. Rakeez adapts: the light calms step by step back to green.') : t(L.d);
      q(el,'.rk4-bub').hidden = n<3;
      qa(el,'.rk4-scale li').forEach(function(li,i){ li.classList.toggle('on',i===n); });
    }
    function mark(){ var p = onPhone ? Math.min(100, secs/14*100) : lv*25+4; q(el,'.rk4-mark').style.insetInlineStart='calc('+Math.min(97,p)+'% - 2px)'; }
    function pick(){
      if(onPhone) return; onPhone=true; secs=0; clearInterval(cool);
      q(el,'.rk4-phone').hidden=true; q(el,'.rk4-hand').hidden=false; q(el,'.rk4-laptop').classList.add('dim');
      loop=setInterval(function(){ secs+=.25; q(el,'.rk4-tm b').textContent=num(Math.floor(secs)+(AR?' ث':'s'));
        var n=0; for(var i=0;i<4;i++) if(secs>=TH[i]) n=i; if(n!==lv) set(n); mark(); },250);
    }
    function down(){
      if(!onPhone) return; onPhone=false; clearInterval(loop);
      q(el,'.rk4-phone').hidden=false; q(el,'.rk4-hand').hidden=true; q(el,'.rk4-laptop').classList.remove('dim');
      if(lv>0){ set(lv,true); mark(); cool=setInterval(function(){ if(lv<=0){ clearInterval(cool); set(0); mark(); return; } set(lv-1, lv-1>0); mark(); },1300); }
    }
    q(el,'.rk4-phone').addEventListener('click',pick);
    q(el,'.rk4-down').addEventListener('click',down);
    set(0); mark();
    onScreen(el,function(){ if(!buzz) buzz=setInterval(function(){ var p=q(el,'.rk4-phone'); if(!onPhone){ p.classList.remove('bz'); void p.offsetWidth; p.classList.add('bz'); } },3500); },
                function(){ clearInterval(buzz); buzz=null; if(onPhone) down(); });
  }
  /* ================= Makani: the app and the map ================= */
  function makani(el){
    var ST=[[0,145,600,35,'h'],[182,0,36,380,'v'],[392,0,36,380,'v'],[220,258,170,28,'h']];
    var B=[[40,30,140,110],[220,30,170,110],[430,30,140,110],[40,185,140,165],[220,185,170,70],[220,290,170,60],[430,185,140,165]];
    var YOU=[200,350], KID=[505,162], BAG=[300,272];
    var ROUTE_K=[[200,350],[200,162],[505,162]], ROUTE_B=[[200,350],[200,272],[300,272]];
    var map='<svg class="mk4-map" viewBox="0 0 600 380" aria-hidden="true">'+
      '<rect width="600" height="380" fill="#0a1522"/>'+
      ST.map(function(s){ return '<rect x="'+s[0]+'" y="'+s[1]+'" width="'+s[2]+'" height="'+s[3]+'" fill="#132538"/>'; }).join('')+
      B.map(function(b){ return '<rect x="'+b[0]+'" y="'+b[1]+'" width="'+b[2]+'" height="'+b[3]+'" rx="8" fill="#0e1d2d" stroke="#1d3954"/>'; }).join('')+
      '<text x="200" y="374" class="mk4-gt" text-anchor="middle">'+esc(t('Gate 1'))+'</text><text x="590" y="166" class="mk4-gt" text-anchor="'+(AR?'start':'end')+'">'+esc(t('Gate 2'))+'</text><text x="410" y="14" class="mk4-gt" text-anchor="middle">'+esc(t('Gate 3'))+'</text>'+
      '<text x="305" y="227" class="mk4-lb">'+esc(t('Lost & Found'))+'</text>'+
      '<g class="mk4-crowd"></g>'+
      '<polyline class="mk4-route" points="" />'+
      '<g class="mk4-radar" opacity="0"><circle r="10"/><circle r="10" style="animation-delay:.9s"/></g>'+
      '<g class="mk4-tgt" opacity="0"><circle r="9" class="mk4-tdot"/><text y="-16" class="mk4-tl"></text></g>'+
      '<g class="mk4-vol" opacity="0"><circle r="8" fill="#ffd166"/><text y="-14" class="mk4-tl">'+esc(t('Volunteer'))+'</text></g>'+
      '<g class="mk4-you"><circle r="9" fill="#4dabff" stroke="#fff" stroke-width="2.5"/><text y="-15" class="mk4-tl">'+esc(t('You'))+'</text></g>'+
    '</svg>';
    shell(el,
      '<div class="mk4">'+
        '<div class="dm-tabs mk4-tabs" role="tablist"><button type="button" role="tab" data-s="kid" aria-selected="true">🧒 '+esc(t('A child is lost'))+'</button><button type="button" role="tab" data-s="bag" aria-selected="false">🎒 '+esc(t('A bag is found'))+'</button></div>'+
        '<div class="mk4-grid">'+
          '<div class="mk4-mapw">'+map+'<div class="mk4-pop" hidden></div></div>'+
          '<div class="mk4-phone"><div class="mk4-notch"></div><div class="mk4-push" hidden></div><div class="mk4-app"></div></div>'+
        '</div>'+
        '<p class="mk4-cap" aria-live="polite"></p>'+
      '</div>');
    var svg=q(el,'.mk4-map'), app=q(el,'.mk4-app'), crowdG=q(el,'.mk4-crowd'), D=[], loop=null, tms=[], sc='kid';
    function at(sel,p){ q(el,sel).setAttribute('transform','translate('+p[0]+','+p[1]+')'); }
    function show(sel,on){ q(el,sel).setAttribute('opacity', on?1:0); }
    function cap(s){ q(el,'.mk4-cap').textContent=t(s); }
    function later(f,ms){ tms.push(setTimeout(f,ms)); }
    var ns='http://www.w3.org/2000/svg';
    for(var i=0;i<130;i++){ var s=ST[i%4], c=document.createElementNS(ns,'circle'); c.setAttribute('r','2.6'); c.setAttribute('fill','#7f95ab'); c.setAttribute('opacity','.55');
      var d={el:c,s:s,x:s[0]+Math.random()*s[2],y:s[1]+Math.random()*s[3],v:(Math.random()-.5)*1.4}; crowdG.appendChild(c); D.push(d); }
    function move(){ D.forEach(function(d){ var s=d.s; if(s[4]==='h'){ d.x+=d.v; if(d.x<s[0]) d.x=s[0]+s[2]; if(d.x>s[0]+s[2]) d.x=s[0]; } else { d.y+=d.v; if(d.y<s[1]) d.y=s[1]+s[3]; if(d.y>s[1]+s[3]) d.y=s[1]; } d.el.setAttribute('cx',d.x.toFixed(1)); d.el.setAttribute('cy',d.y.toFixed(1)); }); }
    function len(r){ var L=0; for(var i=1;i<r.length;i++) L+=Math.abs(r[i][0]-r[i-1][0])+Math.abs(r[i][1]-r[i-1][1]); return L; }
    function walk(r, ms, done){
      var L=len(r), t0=performance.now(), meters=Math.round(L*.5);
      (function f(now){ var p=Math.min(1,(now-t0)/ms), d=p*L, i=1;
        while(i<r.length){ var seg=Math.abs(r[i][0]-r[i-1][0])+Math.abs(r[i][1]-r[i-1][1]); if(d<=seg) break; d-=seg; i++; }
        if(i>=r.length) i=r.length-1, d=Math.abs(r[i][0]-r[i-1][0])+Math.abs(r[i][1]-r[i-1][1]);
        var a=r[i-1], b=r[i], seg2=Math.abs(b[0]-a[0])+Math.abs(b[1]-a[1])||1, k=d/seg2;
        at('.mk4-you',[a[0]+(b[0]-a[0])*k, a[1]+(b[1]-a[1])*k]);
        var m=q(app,'.mk4-dist'); if(m) m.textContent=num(Math.round(meters*(1-p))+' '+t('m'));
        if(p<1) requestAnimationFrame(f); else done();
      })(t0);
    }
    function screen(html){ app.innerHTML='<div class="mk4-scr">'+html+'</div>'; return app; }
    function head(){ return '<div class="mk4-ah"><b>Makani</b><span>●</span></div>'; }
    function reset(){
      tms.forEach(clearTimeout); tms=[]; at('.mk4-you',YOU); show('.mk4-tgt',0); show('.mk4-radar',0); show('.mk4-vol',0);
      q(el,'.mk4-route').setAttribute('points',''); q(el,'.mk4-route').classList.remove('on'); q(el,'.mk4-pop').hidden=true; q(el,'.mk4-push').hidden=true;
    }
    function kid(){
      reset(); sc='kid';
      cap('You are in a crowded place and suddenly cannot see your child, who is wearing a Makani tracker.');
      screen(head()+'<p class="mk4-h">'+esc(t('My devices'))+'</p>'+
        '<div class="mk4-item"><span>🧒</span><div><b>'+esc(t('My child'))+'</b><small class="mono">MK-0417 · '+esc(t('Connected'))+'</small></div></div>'+
        '<div class="mk4-item"><span>🎒</span><div><b>'+esc(t('Backpack'))+'</b><small class="mono">MK-1290 · '+esc(t('Connected'))+'</small></div></div>'+
        '<button type="button" class="mk4-cta red">'+esc(t('Locate my child'))+'</button>');
      q(app,'.mk4-cta').addEventListener('click',function(){
        at('.mk4-radar',KID); show('.mk4-radar',1);
        screen(head()+'<div class="mk4-scan"><i></i><i></i><span>📡</span></div><p class="mk4-h c">'+esc(t('Locating MK-0417…'))+'</p>');
        cap('Makani reads the location of the child’s device.');
        later(function(){
          show('.mk4-radar',0); at('.mk4-tgt',KID); q(el,'.mk4-tgt text').textContent='MK-0417'; show('.mk4-tgt',1);
          var r=q(el,'.mk4-route'); r.setAttribute('points',ROUTE_K.map(function(p){ return p.join(','); }).join(' ')); r.classList.add('on');
          screen(head()+'<p class="mk4-ok">✓ '+esc(t('Child located'))+'</p><p class="mk4-big mk4-dist">'+num(Math.round(len(ROUTE_K)*.5)+' '+t('m'))+'</p><p class="mk4-sub">'+esc(t('Near Gate 2 · updated just now'))+'</p><button type="button" class="mk4-cta">'+esc(t('Guide me there'))+'</button>');
          cap('The location appears on the map, with the shortest route through the crowd.');
          q(app,'.mk4-cta').addEventListener('click',function(){ this.disabled=true; cap('Follow the route…');
            walk(ROUTE_K, RM?10:3800, function(){ show('.mk4-tgt',0); q(el,'.mk4-route').classList.remove('on');
              screen(head()+'<div class="mk4-done">🤍</div><p class="mk4-ok c">'+esc(t('Reunited'))+'</p><p class="mk4-sub c">'+esc(t('The child is safe with the family again.'))+'</p><button type="button" class="mk4-cta ghost">'+esc(t('Watch again'))+'</button>');
              cap('From a stressful search to a direct path in a few steps.');
              q(app,'.mk4-cta').addEventListener('click',kid);
            });
          });
        }, RM?10:2200);
      });
    }
    function bag(){
      reset(); sc='bag';
      at('.mk4-vol',[BAG[0]+30,BAG[1]-50]); show('.mk4-vol',1);
      cap('Somewhere in the crowd, a volunteer finds a backpack that someone left behind.');
      screen(head()+'<p class="mk4-h">'+esc(t('My devices'))+'</p>'+
        '<div class="mk4-item"><span>🎒</span><div><b>'+esc(t('Backpack'))+'</b><small class="mono">MK-1290 · '+esc(t('Not with you'))+'</small></div></div>'+
        '<p class="mk4-sub">'+esc(t('Waiting for news about your backpack…'))+'</p>');
      var pop=q(el,'.mk4-pop'); pop.hidden=false;
      pop.innerHTML='<div class="mk4-qr">'+qr()+'<i class="mk4-beam"></i></div><div><b>🎒 MK-1290</b><p>'+esc(t('The volunteer scans the Makani code on the bag.'))+'</p><button type="button" class="dm-btn">'+esc(t('Scan the code'))+'</button></div>';
      q(pop,'.dm-btn').addEventListener('click',function(){
        this.disabled=true; q(pop,'.mk4-qr').classList.add('scan');
        later(function(){
          pop.hidden=true;
          var push=q(el,'.mk4-push'); push.hidden=false;
          push.innerHTML='<b>Makani</b><p>'+esc(t('Your backpack MK-1290 was found and handed to Lost & Found.'))+'</p>'; later(function(){ push.hidden=true; }, 4200);
          at('.mk4-tgt',BAG); q(el,'.mk4-tgt text').textContent='MK-1290'; show('.mk4-tgt',1);
          show('.mk4-vol',0);
          cap('The owner is identified instantly, and the phone receives a notification.');
          screen(head()+'<p class="mk4-ok">✓ '+esc(t('Backpack found'))+'</p><p class="mk4-sub">'+esc(t('Lost & Found'))+'</p><button type="button" class="mk4-cta">'+esc(t('Show the way'))+'</button>');
          q(app,'.mk4-cta').addEventListener('click',function(){ this.disabled=true; push.hidden=true;
            var r=q(el,'.mk4-route'); r.setAttribute('points',ROUTE_B.map(function(p){ return p.join(','); }).join(' ')); r.classList.add('on');
            screen(head()+'<p class="mk4-ok">✓ '+esc(t('Backpack found'))+'</p><p class="mk4-big mk4-dist"></p><p class="mk4-sub">'+esc(t('Lost & Found'))+'</p>');
            walk(ROUTE_B, RM?10:2600, function(){ show('.mk4-tgt',0); q(el,'.mk4-route').classList.remove('on');
              screen(head()+'<div class="mk4-done">🎒</div><p class="mk4-ok c">'+esc(t('Back with its owner'))+'</p><button type="button" class="mk4-cta ghost">'+esc(t('Watch again'))+'</button>');
              cap('Every registered item can find its way back to its owner.');
              q(app,'.mk4-cta').addEventListener('click',bag);
            });
          });
        }, RM?10:1500);
      });
    }
    function qr(){ var n=21,c=9,s='',h=function(x,y){ return ((x*73856093)^(y*19349663)^(x*y*83492791))>>>0; };
      function f(x,y){ return '<rect x="'+x*c+'" y="'+y*c+'" width="'+7*c+'" height="'+7*c+'"/><rect x="'+(x+1)*c+'" y="'+(y+1)*c+'" width="'+5*c+'" height="'+5*c+'" fill="#fff"/><rect x="'+(x+2)*c+'" y="'+(y+2)*c+'" width="'+3*c+'" height="'+3*c+'"/>'; }
      for(var y=0;y<n;y++) for(var x=0;x<n;x++){ var inF=(x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12); if(!inF && h(x+3,y+5)%3===0) s+='<rect x="'+x*c+'" y="'+y*c+'" width="'+c+'" height="'+c+'"/>'; }
      return '<svg viewBox="-9 -9 207 207"><rect x="-9" y="-9" width="207" height="207" fill="#fff"/><g fill="#02111f">'+s+f(0,0)+f(14,0)+f(0,14)+'</g></svg>'; }
    qa(el,'.mk4-tabs button').forEach(function(b){ b.addEventListener('click',function(){
      qa(el,'.mk4-tabs button').forEach(function(x){ x.setAttribute('aria-selected', x===b); });
      b.getAttribute('data-s')==='kid' ? kid() : bag(); }); });
    at('.mk4-you',YOU); kid(); move();
    onScreen(el,function(){ if(!loop) loop=setInterval(move, RM?500:70); },function(){ clearInterval(loop); loop=null; });
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
  '.demo{--lc:#2fd27a}'+
  '.rk4-intro{margin:0 0 1.2rem;color:var(--fg);font-size:clamp(1rem,1.6vw,1.15rem);max-width:60ch;line-height:1.6}'+
  '.rk4-scene{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:clamp(1.2rem,4vw,3rem);align-items:center}'+
  '.rk4-desk{position:relative;display:grid;justify-items:center;gap:1.2rem;min-height:360px;align-content:center}'+
  '.rk4-laptop{width:min(360px,100%);transition:filter .5s}.rk4-laptop.dim{filter:brightness(.4) blur(1px)}'+
  '.rk4-scr{aspect-ratio:16/10;border:7px solid #1b2427;border-bottom-width:5px;border-radius:12px 12px 0 0;background:#f5f7f8;padding:.8rem .9rem;display:grid;gap:.45rem;align-content:start}'+
  '.rk4-scr b{font-size:.72rem;color:#26363c;margin-bottom:.2rem}.rk4-scr p{margin:0;height:5px;border-radius:3px;background:#e2e7e9}.rk4-scr p i{display:block;height:100%;width:70%;border-radius:3px;background:#a8b7bc}.rk4-scr p:nth-child(odd) i{width:88%}'+
  '.rk4-base{height:13px;margin:0 -8%;border-radius:0 0 14px 14px;background:linear-gradient(#2a3438,#151c1f)}'+
  '.rk4-phone{position:relative;width:min(240px,80%);display:flex;align-items:center;justify-content:center;gap:.6rem;padding:.9rem 1rem;border-radius:16px;border:2px solid var(--a);background:rgba(255,255,255,.04);font-weight:700!important;color:var(--fg)!important}'+
  '.rk4-phone::before{content:"📱";font-size:1.4rem}.rk4-phone:hover{background:rgba(255,255,255,.08)}.rk4-phone.bz{animation:rkBz .5s}'+
  '@keyframes rkBz{20%,60%{transform:rotate(-3deg)}40%,80%{transform:rotate(3deg)}}'+
  '.rk4-badge{position:absolute;top:-8px;inset-inline-end:-8px;width:22px;height:22px;border-radius:50%;background:#ff4d4f;color:#fff;font-size:.75rem;display:grid;place-items:center}'+
  '.rk4-phone[hidden]{display:none}.rk4-hand{position:absolute;inset:0;display:grid;justify-items:center;align-content:center;gap:.6rem;animation:dmIn .3s}.rk4-hand[hidden]{display:none}'+
  '.rk4-mob{width:150px;height:250px;border-radius:24px;border:6px solid #111;background:#fff;overflow:hidden;box-shadow:0 30px 60px -20px rgba(0,0,0,.8);transform:rotate(-4deg)}'+
  '.rk4-feed{animation:rkFeed 9s linear infinite}@keyframes rkFeed{to{transform:translateY(-50%)}}'+
  '.rk4-post{display:flex;gap:.5rem;align-items:center;padding:.6rem;border-bottom:1px solid #eee}.rk4-post span{font-size:1.6rem}.rk4-post p{flex:1;margin:0;display:grid;gap:5px}.rk4-post i{display:block;height:5px;border-radius:3px;background:#d6dbe0}'+
  '.rk4-tm{margin:0;color:var(--fg);font-size:.95rem}.rk4-tm b{color:var(--lc)}'+
  '.rk4-side{display:grid;justify-items:center;text-align:center}'+
  '.rk4-dev{--sp:3.4s;position:relative;width:min(200px,50vw);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 30%,#2a3236,#0c1113 72%);box-shadow:inset 0 2px 0 rgba(255,255,255,.08),0 26px 40px -18px rgba(0,0,0,.8);margin-bottom:1rem}'+
  '.rk4-dev[data-lv="1"]{--sp:2.2s}.rk4-dev[data-lv="2"]{--sp:1.2s}.rk4-dev[data-lv="3"]{--sp:.55s;animation:rkSh .6s ease-in-out infinite}'+
  '@keyframes rkSh{25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}'+
  '.rk4-ring{position:absolute;inset:8%;border-radius:50%;border:7px solid var(--lc);box-shadow:0 0 22px var(--lc),inset 0 0 16px var(--lc);transition:border-color .7s,box-shadow .7s}'+
  '.rk4-glow{position:absolute;inset:-18%;border-radius:50%;background:radial-gradient(circle,var(--lc) 0%,transparent 62%);opacity:.4;animation:rkp var(--sp) ease-in-out infinite}'+
  '@keyframes rkp{50%{opacity:.08;transform:scale(.94)}}'+
  '.rk4-face{position:absolute;inset:27%;border-radius:50%;background:#050809;display:grid;place-items:center}.rk4-face b{font-size:.8rem;letter-spacing:.08em;color:var(--lc);transition:color .7s}'+
  '.rk4-bub{position:absolute;top:-14%;left:50%;transform:translateX(-50%);white-space:nowrap;background:#ff4d4f;color:#fff;font-weight:700;font-size:.85rem;padding:.5rem .9rem;border-radius:12px;animation:dmPop .35s}.rk4-bub::after{content:"";position:absolute;bottom:-6px;left:50%;margin-left:-6px;border:6px solid transparent;border-bottom:0;border-top-color:#ff4d4f}'+
  '.rk4-name{margin:0;font-size:clamp(1.4rem,2.8vw,2rem);color:var(--lc);transition:color .7s}'+
  '.rk4-desc{margin:.3rem 0 1.1rem;color:var(--body);min-height:3.2em;max-width:38ch;line-height:1.6}'+
  '.rk4-scale{width:100%;max-width:420px}.rk4-bar{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:3px;height:12px}.rk4-bar i{border-radius:4px;opacity:.85}'+
  '.rk4-mark{position:absolute;top:-6px;width:4px;height:24px;border-radius:2px;background:#fff;box-shadow:0 0 8px #fff;transition:inset-inline-start .3s linear}'+
  '.rk4-scale ol{list-style:none;margin:.5rem 0 0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);font-size:.74rem;color:var(--mute)}.rk4-scale li.on{color:var(--fg);font-weight:700}'+
  '.rk4-snd{margin-top:1rem;display:inline-flex;gap:.4rem;align-items:center;color:var(--mute);font-size:.85rem;cursor:pointer}.rk4-snd input{accent-color:var(--a)}'+
  /* makani */
  '.mk4-tabs{margin-bottom:1rem}'+
  '.dm-tabs{display:inline-flex;flex-wrap:wrap;border:1px solid var(--line2);border-radius:22px;padding:3px;gap:2px}.dm-tabs button{background:none;border:0;border-radius:999px;padding:.55rem 1rem;font-size:.92rem;color:var(--body)!important}.dm-tabs button[aria-selected=true]{background:var(--fg);color:var(--bg)!important}'+
  '.mk4-grid{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:clamp(1rem,3vw,2rem);align-items:center}'+
  '.mk4-mapw{position:relative;border-radius:14px;overflow:hidden;border:1px solid var(--line2)}.mk4-map{display:block;width:100%;height:auto}'+
  '.mk4-gt{font:600 11px var(--f-mono);fill:#5d7f9f}.mk4-lb{font:600 11px sans-serif;fill:#8fb3d4;text-anchor:middle}'+
  '.mk4-tl{font:700 11px sans-serif;fill:#fff;text-anchor:middle;paint-order:stroke;stroke:#0a1522;stroke-width:3px}'+
  '.mk4-route{fill:none;stroke:#4dabff;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:8 7;opacity:0}.mk4-route.on{opacity:1;animation:mkDash 1s linear infinite}'+
  '@keyframes mkDash{to{stroke-dashoffset:-15}}'+
  '.mk4-radar circle{fill:none;stroke:#4dabff;stroke-width:2;transform-box:fill-box;transform-origin:center;animation:mkR4 1.8s ease-out infinite}@keyframes mkR4{from{transform:scale(.3);opacity:1}to{transform:scale(7);opacity:0}}'+
  '.mk4-tgt,.mk4-radar,.mk4-vol,.mk4-route{transition:opacity .5s}.mk4-tdot{fill:#ff5c7a;stroke:#fff;stroke-width:2.5;animation:mkT 1.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes mkT{50%{transform:scale(1.35)}}'+
  '.mk4-pop{position:absolute;inset-inline-start:4%;bottom:5%;display:flex;gap:.9rem;align-items:center;max-width:min(92%,380px);background:rgba(4,12,22,.92);border:1px solid var(--line2);border-radius:14px;padding:.8rem;animation:dmIn .4s}.mk4-pop[hidden]{display:none}'+
  '.mk4-pop p{margin:.3rem 0 .6rem;font-size:.85rem;color:var(--body)}.mk4-pop .dm-btn{padding:.5rem 1rem;font-size:.85rem}'+
  '.mk4-qr{position:relative;flex:none;width:92px;height:92px;border-radius:8px;overflow:hidden}.mk4-qr svg{width:100%;height:100%;display:block}'+
  '.mk4-beam{position:absolute;left:0;right:0;top:0;height:3px;background:#2ee6a0;box-shadow:0 0 12px #2ee6a0;opacity:0}.mk4-qr.scan .mk4-beam{opacity:1;animation:mkS .6s ease-in-out 2 alternate}@keyframes mkS{to{top:calc(100% - 3px)}}'+
  '.mk4-phone{position:relative;justify-self:center;width:250px;height:470px;border-radius:38px;border:9px solid #10161c;background:#f5f8fb;box-shadow:0 40px 70px -30px rgba(0,0,0,.9),inset 0 0 0 1px #2a3440;overflow:hidden;color:#0d1b2a}'+
  '.mk4-notch{position:absolute;top:6px;left:50%;transform:translateX(-50%);width:80px;height:20px;border-radius:12px;background:#10161c;z-index:3}'+
  '.mk4-push{position:absolute;top:34px;left:10px;right:10px;z-index:4;background:rgba(255,255,255,.96);border-radius:14px;padding:.6rem .75rem;box-shadow:0 10px 30px rgba(0,0,0,.25);animation:mkPush .5s cubic-bezier(.2,1.3,.4,1)}.mk4-push[hidden]{display:none}'+
  '.mk4-push b{font-size:.72rem;color:#1971c2}.mk4-push p{margin:.15rem 0 0;font-size:.78rem;line-height:1.4;color:#0d1b2a}@keyframes mkPush{from{transform:translateY(-120%)}}'+
  '.mk4-app{position:absolute;inset:0;padding:40px 14px 16px}.mk4-scr{height:100%;display:flex;flex-direction:column;gap:.55rem;animation:dmIn .35s}'+
  '.mk4-ah{display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem}.mk4-ah b{color:#1971c2;font-size:1.05rem}.mk4-ah span{color:#2fb36b;font-size:.7rem}'+
  '.mk4-h{margin:0;font-weight:700;font-size:.9rem;color:#0d1b2a}.mk4-h.c,.mk4-ok.c,.mk4-sub.c{text-align:center}'+
  '.mk4-item{display:flex;gap:.6rem;align-items:center;background:#fff;border-radius:12px;padding:.6rem;box-shadow:0 2px 8px rgba(13,27,42,.08)}.mk4-item span{font-size:1.4rem}.mk4-item b{display:block;font-size:.85rem}.mk4-item small{font-size:.66rem;color:#5b6b7a;letter-spacing:0}'+
  '.mk4-cta{margin-top:auto;border:0;border-radius:14px;padding:.85rem;font-weight:700!important;font-size:.92rem!important;background:#1971c2;color:#fff!important}.mk4-cta.red{background:#e03151}.mk4-cta.ghost{background:#e7eef5;color:#1971c2!important}.mk4-cta:disabled{opacity:.5}'+
  '.mk4-scan{position:relative;width:120px;height:120px;margin:2.5rem auto .5rem;display:grid;place-items:center;font-size:2rem}.mk4-scan i{position:absolute;inset:0;border-radius:50%;border:2px solid #1971c2;animation:mkR4b 1.6s ease-out infinite}.mk4-scan i+i{animation-delay:.8s}@keyframes mkR4b{from{transform:scale(.3);opacity:1}to{transform:scale(1);opacity:0}}'+
  '.mk4-ok{margin:0;color:#1f9d55;font-weight:800;font-size:1rem}.mk4-big{margin:0;font-size:2.6rem;font-weight:800;color:#0d1b2a;line-height:1.1}.mk4-sub{margin:0;color:#5b6b7a;font-size:.82rem}'+
  '.mk4-done{font-size:3.4rem;text-align:center;margin-top:3rem;animation:dmPop .5s}'+
  '.mk4-cap{margin:1rem 0 0;color:var(--fg);font-size:1rem;min-height:1.6em}'+
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
  '@media (max-width:820px){.dm-ov{place-items:start center;padding-top:2.5rem}.rk4-scene{grid-template-columns:1fr}.rk4-side{order:-1}.rk4-dev{width:130px;margin-top:1.6rem}.rk4-desc{min-height:0;margin-bottom:.8rem}.rk4-desk{min-height:330px}.mk4-phone{height:400px}.mk4-grid{grid-template-columns:1fr}.sn2-cards{grid-template-columns:1fr}.in3-path{grid-template-columns:1fr 1fr}.in3-star span{font-size:.64rem}.in3-sky{height:500px}.in3-hint{font-size:.82rem}.in3-star{padding:.2rem}}'+
  '@media (prefers-reduced-motion:reduce){.demo *{animation-duration:.01s!important;animation-iteration-count:1!important;transition:none!important}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
