/* Interactive prototypes for the project pages.
   Each one is an illustrative model built only from the description on its page. */
(function(){
  var t = function(s){ return (window.AR && window.AR[s]) || s; };
  var AR = !!window.AR;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function q(el,s){ return el.querySelector(s); }
  function qa(el,s){ return [].slice.call(el.querySelectorAll(s)); }
  function live(el, start, stop){
    if(!('IntersectionObserver' in window)){ start(); return; }
    new IntersectionObserver(function(es){ es.forEach(function(e){ e.isIntersecting ? start() : stop(); }); }).observe(el);
  }
  function shell(el, inner){
    el.setAttribute('aria-label', t('Interactive prototype'));
    el.innerHTML =
      '<div class="dm-head"><h2 class="mono">'+esc(t('TRY THE PROTOTYPE'))+'</h2>'+
      '<p class="dm-note">'+esc(t('An illustrative prototype built from the project description — not the original product.'))+'</p></div>'+
      '<div class="dm-stage">'+inner+'</div>';
  }
  function num(n){ return '\u2066'+n+'\u2069'; }

  /* ---------------- Rakeez ---------------- */
  function rakeez(el){
    var S = {
      focused:   {l:'Focused',            r:'No intervention needed',            st:0, lv:0, sc:92},
      drifting:  {l:'Attention drifting', r:'Subtle visual indication',          st:1, lv:1, sc:64},
      distracted:{l:'Distracted',         r:'A more active intervention',        st:2, lv:2, sc:31},
      refocus:   {l:'Back on task',       r:'The response eases as focus returns', st:3, lv:0, sc:78}
    };
    var bars = function(){ var s=''; for(var i=0;i<22;i++) s+='<i></i>'; return s; };
    shell(el,
      '<div class="rk">'+
        '<div class="rk-devwrap"><div class="rk-dev" data-lv="0"><i class="rk-glow"></i><i class="rk-ring"></i>'+
          '<div class="rk-scr"><b class="rk-num">92</b><span class="mono">'+esc(t('Focus'))+'</span></div></div></div>'+
        '<div class="rk-side">'+
          '<p class="dm-k mono">'+esc(t('Current state'))+'</p>'+
          '<p class="rk-state" aria-live="polite"></p><p class="rk-resp"></p>'+
          '<div class="rk-sig"><span>'+esc(t('Desk activity'))+'</span><div class="rk-bars">'+bars()+'</div>'+
          '<span>'+esc(t('Digital interaction'))+'</span><div class="rk-bars">'+bars()+'</div></div>'+
          '<ol class="rk-flow">'+['DETECT','MEASURE','INTERVENE','ADAPT'].map(function(s){return '<li>'+esc(t(s))+'</li>';}).join('')+'</ol>'+
          '<div class="dm-row"><div class="dm-seg" role="group" aria-label="'+esc(t('Simulate a state'))+'">'+
            ['focused','drifting','distracted'].map(function(k){return '<button type="button" data-s="'+k+'">'+esc(t(S[k].l))+'</button>';}).join('')+
          '</div><button type="button" class="dm-btn rk-play">'+esc(t('Play a work session'))+'</button></div>'+
        '</div>'+
      '</div>');
    var dev=q(el,'.rk-dev'), cur='focused', timer=null, seqT=[];
    function set(k){
      cur=k; var s=S[k];
      dev.setAttribute('data-lv', s.lv);
      q(el,'.rk-num').textContent=num(s.sc);
      q(el,'.rk-state').textContent=t(s.l);
      q(el,'.rk-resp').textContent=t(s.r);
      qa(el,'.rk-flow li').forEach(function(li,i){ li.classList.toggle('on', i===s.st); li.classList.toggle('done', i<s.st); });
      qa(el,'.dm-seg button').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-s')===k); });
    }
    function tick(){
      var lv=S[cur].lv, base=[.62,.42,.22][lv], vr=[.12,.32,.5][lv];
      if(cur==='refocus'){ base=.55; vr=.18; }
      qa(el,'.rk-bars i').forEach(function(b){ var v=Math.max(.06,Math.min(1,base+(Math.random()-.5)*vr*2)); b.style.transform='scaleY('+v.toFixed(2)+')'; });
    }
    function clearSeq(){ seqT.forEach(clearTimeout); seqT=[]; q(el,'.rk-play').disabled=false; }
    qa(el,'.dm-seg button').forEach(function(b){ b.addEventListener('click',function(){ clearSeq(); set(b.getAttribute('data-s')); }); });
    q(el,'.rk-play').addEventListener('click',function(){
      clearSeq(); this.disabled=true;
      ['focused','drifting','distracted','refocus','focused'].forEach(function(k,i){ seqT.push(setTimeout(function(){ set(k); if(i===4) clearSeq(); }, i*2200)); });
    });
    set('focused'); tick();
    live(el,function(){ if(!timer) timer=setInterval(tick, RM?1200:380); },function(){ clearInterval(timer); timer=null; });
  }

  /* ---------------- Makani ---------------- */
  function makani(el){
    var items=[
      {n:'Family member', id:'MK-0417', x:63, y:36, ic:'<circle cx="12" cy="7" r="3.2"/><path d="M5.5 20c.8-4 3.4-6 6.5-6s5.7 2 6.5 6"/>'},
      {n:'Backpack',      id:'MK-1290', x:28, y:62, ic:'<rect x="6" y="7" width="12" height="13" rx="3"/><path d="M9 7V5.5a3 3 0 0 1 6 0V7M9 13h6"/>'},
      {n:'Suitcase',      id:'MK-2051', x:79, y:71, ic:'<rect x="4" y="8" width="16" height="11" rx="2"/><path d="M9 8V5h6v3M4 13h16"/>'}
    ];
    var dots=''; for(var i=0;i<70;i++){ dots+='<circle cx="'+(Math.random()*400).toFixed(0)+'" cy="'+(Math.random()*260).toFixed(0)+'" r="1.6"/>'; }
    var qrs = (function(){ var n=21, c=9, s='', r=function(x,y){ return ((x*73856093)^(y*19349663)^(x*y*83492791))>>>0; };
      function finder(x,y){ return '<rect x="'+x*c+'" y="'+y*c+'" width="'+7*c+'" height="'+7*c+'"/><rect x="'+(x+1)*c+'" y="'+(y+1)*c+'" width="'+5*c+'" height="'+5*c+'" fill="#fff"/><rect x="'+(x+2)*c+'" y="'+(y+2)*c+'" width="'+3*c+'" height="'+3*c+'"/>'; }
      for(var y=0;y<n;y++) for(var x=0;x<n;x++){ var inF=(x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12); if(!inF && r(x+3,y+5)%3===0) s+='<rect x="'+x*c+'" y="'+y*c+'" width="'+c+'" height="'+c+'"/>'; }
      return '<svg viewBox="-9 -9 207 207" class="mk-qrimg" aria-hidden="true"><rect x="-9" y="-9" width="207" height="207" fill="#fff"/><g fill="#02111f">'+s+finder(0,0)+finder(14,0)+finder(0,14)+'</g></svg>'; })();
    shell(el,
      '<div class="mk"><div class="mk-app">'+
        '<div class="mk-bar"><b>Makani</b><div class="dm-tabs" role="tablist">'+
          '<button type="button" role="tab" data-tab="map" aria-selected="true">'+esc(t('My items'))+'</button>'+
          '<button type="button" role="tab" data-tab="qr" aria-selected="false">'+esc(t('Scan QR code'))+'</button></div></div>'+
        '<div class="mk-body" data-tab="map">'+
          '<ul class="mk-list">'+items.map(function(it,i){ return '<li><button type="button" data-i="'+i+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">'+it.ic+'</svg><span><b>'+esc(t(it.n))+'</b><small class="mono">'+it.id+'</small></span><i class="mk-live mono">'+esc(t('Live'))+'</i></button></li>'; }).join('')+'</ul>'+
          '<div class="mk-map"><svg viewBox="0 0 400 260" preserveAspectRatio="none" aria-hidden="true">'+
            '<g stroke="currentColor" stroke-opacity=".22" stroke-width="10" fill="none"><path d="M0 80H400M0 190H400M110 0V260M290 0V260"/></g>'+
            '<g stroke="currentColor" stroke-opacity=".12" stroke-width="4" fill="none"><path d="M0 135H400M200 0V260M50 0L160 260M340 0L240 260"/></g>'+
            '<g fill="currentColor" fill-opacity=".28">'+dots+'</g></svg>'+
            '<span class="mk-pin"><i></i></span><div class="mk-info" aria-live="polite"></div></div>'+
        '</div>'+
        '<div class="mk-body mk-qr" data-tab="qr" hidden>'+
          '<div class="mk-qrcard">'+qrs+'<small class="mono">'+esc(t('QR code on device'))+' MK-1290</small></div>'+
          '<div class="mk-scan"><p>'+esc(t('Each device carries a unique code. Scanning it identifies the registered item and links it to the owner’s account.'))+'</p>'+
          '<button type="button" class="dm-btn mk-go">'+esc(t('Scan code'))+'</button><div class="mk-res" aria-live="polite"></div></div>'+
        '</div>'+
      '</div></div>');
    var sel=0, pin=q(el,'.mk-pin'), info=q(el,'.mk-info'), timer=null, secs=0, jx=0, jy=0;
    function show(i){
      sel=i; secs=0; jx=jy=0; var it=items[i];
      pin.style.left=it.x+'%'; pin.style.top=it.y+'%';
      pin.classList.remove('ping'); void pin.offsetWidth; pin.classList.add('ping');
      qa(el,'.mk-list button').forEach(function(b,k){ b.setAttribute('aria-pressed', k===i); });
      upd();
    }
    function upd(){ var it=items[sel]; info.innerHTML='<b>'+esc(t(it.n))+'</b> <span class="mono">'+it.id+'</span><br><small>'+esc(secs<2?t('Location updated just now'):t('Location updated')+' '+num(secs)+' '+t('s ago'))+'</small>'; }
    function tab(k){
      qa(el,'.dm-tabs button').forEach(function(b){ b.setAttribute('aria-selected', b.getAttribute('data-tab')===k); });
      qa(el,'.mk-body').forEach(function(b){ b.hidden = b.getAttribute('data-tab')!==k; });
    }
    qa(el,'.mk-list button').forEach(function(b){ b.addEventListener('click',function(){ show(+b.getAttribute('data-i')); }); });
    qa(el,'.dm-tabs button').forEach(function(b){ b.addEventListener('click',function(){ tab(b.getAttribute('data-tab')); }); });
    q(el,'.mk-go').addEventListener('click',function(){
      var r=q(el,'.mk-res'), btn=this; btn.disabled=true; r.innerHTML='<span class="mono">'+esc(t('Scanning…'))+'</span>';
      setTimeout(function(){ btn.disabled=false;
        r.innerHTML='<p class="mk-ok">'+esc(t('Registered item identified'))+'</p><p><b>'+esc(t('Backpack'))+'</b> <span class="mono">MK-1290</span></p><p><small>'+esc(t('Linked to the owner’s account'))+'</small></p><button type="button" class="dm-link">'+esc(t('Show on map'))+'</button>';
        q(r,'.dm-link').addEventListener('click',function(){ tab('map'); show(1); });
      }, 900);
    });
    show(0);
    live(el,function(){ if(!timer) timer=setInterval(function(){
      secs+=3; var it=items[sel];
      if(secs%6===0){ jx=Math.max(-3,Math.min(3,jx+(Math.random()-.5)*2.4)); jy=Math.max(-3,Math.min(3,jy+(Math.random()-.5)*2.4)); pin.style.left=(it.x+jx)+'%'; pin.style.top=(it.y+jy)+'%'; secs=0; }
      upd(); },3000); },function(){ clearInterval(timer); timer=null; });
  }

  /* ---------------- Quraa ---------------- */
  function quraa(el){
    var V=['بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ','الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ','الرَّحْمَٰنِ الرَّحِيمِ','مَالِكِ يَوْمِ الدِّينِ','إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ','اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ','صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'];
    var AN='١٢٣٤٥٦٧';
    shell(el,
      '<div class="qa-app">'+
        '<div class="qa-tools" role="toolbar" aria-label="'+esc(t('Reading settings'))+'">'+
          '<button type="button" data-a="dec" aria-label="'+esc(t('Smaller text'))+'">A−</button>'+
          '<button type="button" data-a="inc" aria-label="'+esc(t('Larger text'))+'">A+</button>'+
          '<button type="button" data-a="con" aria-pressed="false">'+esc(t('High contrast'))+'</button>'+
          '<button type="button" data-a="mem" aria-pressed="false">'+esc(t('Memorization mode'))+'</button>'+
        '</div>'+
        '<div class="qa-page" dir="rtl" lang="ar"><p class="qa-sura">سورة الفاتحة</p>'+
          '<ol class="qa-v">'+V.map(function(v,i){ return '<li><button type="button" data-i="'+i+'"><span class="qa-t">'+v+'</span> <span class="qa-n">﴿'+AN[i]+'﴾</span></button></li>'; }).join('')+'</ol></div>'+
        '<p class="qa-stat mono" aria-live="polite"></p>'+
      '</div>');
    var app=q(el,'.qa-app'), size=1.7, mem=false, shown={}, pick=-1;
    function stat(){
      var s=q(el,'.qa-stat');
      if(mem){ var n=Object.keys(shown).length; s.textContent = n===V.length ? t('All verses revealed. Turn the mode off and on to practise again.') : t('Recall each verse, then tap it to check:')+' '+num(n)+' / '+num(V.length); }
      else s.textContent = pick<0 ? t('Tap a verse to highlight it.') : t('Verse')+' '+num(pick+1)+' '+t('highlighted');
    }
    function paint(){
      app.style.setProperty('--qs', size+'rem');
      qa(el,'.qa-v button').forEach(function(b,i){ b.classList.toggle('hid', mem && !shown[i]); b.classList.toggle('sel', !mem && i===pick); });
      stat();
    }
    qa(el,'.qa-tools button').forEach(function(b){ b.addEventListener('click',function(){
      var a=b.getAttribute('data-a');
      if(a==='dec') size=Math.max(1.2, +(size-.25).toFixed(2));
      if(a==='inc') size=Math.min(2.8, +(size+.25).toFixed(2));
      if(a==='con'){ var on=b.getAttribute('aria-pressed')!=='true'; b.setAttribute('aria-pressed',on); app.classList.toggle('hc',on); }
      if(a==='mem'){ mem=!mem; shown={}; pick=-1; b.setAttribute('aria-pressed',mem); }
      paint();
    }); });
    qa(el,'.qa-v button').forEach(function(b,i){ b.addEventListener('click',function(){ if(mem) shown[i]=1; else pick=(pick===i?-1:i); paint(); }); });
    paint();
  }

  /* ---------------- Inara ---------------- */
  function inara(el){
    var D={
      'Drawing':['Sketching fundamentals workshop','Art and design institutes','Illustration and design projects'],
      'Writing':['Creative writing workshop','Literature and media programmes','Publishing and content opportunities'],
      'Programming':['Introductory coding course','Computing colleges and bootcamps','Hackathons and tech internships'],
      'Photography':['Photography basics workshop','Visual arts and media programmes','Exhibitions and photography commissions'],
      'Public speaking':['Public speaking workshop','Communication and media programmes','Events, podcasts and presenting'],
      'Science':['Hands-on science workshop','Research centres and university programmes','Competitions and research internships']
    };
    var ST=['Talent Discovery','Talent Cultivation','Resource Identification','Professional Integration'];
    shell(el,
      '<div class="in-app">'+
        '<p class="dm-k mono">'+esc(t('What do you enjoy?'))+'</p>'+
        '<div class="in-chips" role="group">'+Object.keys(D).map(function(k){ return '<button type="button" data-k="'+esc(k)+'">'+esc(t(k))+'</button>'; }).join('')+'</div>'+
        '<ol class="in-path">'+ST.map(function(s,i){ return '<li><span class="in-n mono">0'+(i+1)+'</span><b>'+esc(t(s))+'</b><span class="in-v"></span></li>'; }).join('')+'</ol>'+
        '<p class="in-hint">'+esc(t('Pick an interest to see the path Inara would suggest.'))+'</p>'+
      '</div>');
    var steps=qa(el,'.in-path li'), tm=[];
    qa(el,'.in-chips button').forEach(function(b){ b.addEventListener('click',function(){
      var k=b.getAttribute('data-k'), v=[t('Your interest:')+' '+t(k)].concat(D[k].map(t));
      qa(el,'.in-chips button').forEach(function(x){ x.setAttribute('aria-pressed', x===b); });
      q(el,'.in-hint').hidden=true;
      tm.forEach(clearTimeout); tm=[];
      steps.forEach(function(li,i){ li.classList.remove('on');
        tm.push(setTimeout(function(){ q(li,'.in-v').textContent=v[i]; li.classList.add('on'); }, RM?0:i*260)); });
    }); });
  }

  /* ---------------- Sanabil ---------------- */
  function sanabil(el){
    var F=[
      {n:'Date palm farm',          s:82, mv:4.8, r:'Low',    ret:14, ef:88},
      {n:'Wheat farm',              s:67, mv:2.1, r:'Medium', ret:9,  ef:71},
      {n:'Greenhouse vegetables',   s:74, mv:1.3, r:'Medium', ret:12, ef:79}
    ];
    var SRC=['Agricultural data','Satellite imagery','GIS information','Production records'];
    shell(el,
      '<div class="sn-app">'+
        '<div class="dm-tabs sn-farms" role="tablist">'+F.map(function(f,i){ return '<button type="button" role="tab" data-i="'+i+'" aria-selected="'+(i===0)+'">'+esc(t(f.n))+'</button>'; }).join('')+'</div>'+
        '<div class="sn-grid">'+
          '<div class="sn-gauge"><svg viewBox="0 0 220 130" aria-hidden="true"><path d="M20 115a90 90 0 0 1 180 0" class="sn-trk"/><path d="M20 115a90 90 0 0 1 180 0" class="sn-val" pathLength="100"/></svg>'+
            '<div class="sn-score"><b class="sn-num">0</b><span class="mono">FarmScore</span></div></div>'+
          '<ul class="sn-kpi">'+
            '<li><small>'+esc(t('Estimated Market Value'))+'</small><b data-k="mv"></b></li>'+
            '<li><small>'+esc(t('Risk Level'))+'</small><b data-k="r"></b></li>'+
            '<li><small>'+esc(t('Expected Return'))+'</small><b data-k="ret"></b></li>'+
            '<li><small>'+esc(t('Farm Efficiency'))+'</small><b data-k="ef"></b></li>'+
          '</ul>'+
        '</div>'+
        '<div class="sn-src"><span class="dm-k mono">'+esc(t('Data analysed'))+'</span>'+SRC.map(function(s){ return '<span class="sn-chip">'+esc(t(s))+'</span>'; }).join('')+'<span class="sn-chip sn-edgechip" hidden>Sanabil Edge</span></div>'+
        '<label class="sn-edge"><input type="checkbox"> <span>'+esc(t('Add the optional Sanabil Edge Sensor'))+'</span></label>'+
        '<p class="sn-livedata mono" hidden></p>'+
        '<p class="sn-foot">'+esc(t('Sample values for illustration only.'))+'</p>'+
      '</div>');
    var cur=0, edge=false, shownS=0, raf=0, val=q(el,'.sn-val'), timer=null;
    function money(m){ return AR ? num(m)+' '+t('million SAR') : 'SAR '+m+'M'; }
    function render(){
      var f=F[cur], target=f.s+(edge?3:0);
      q(el,'[data-k=mv]').textContent=money(f.mv);
      q(el,'[data-k=r]').textContent=t(f.r);
      q(el,'[data-k=ret]').textContent=num((f.ret+(edge?1:0))+'%');
      q(el,'[data-k=ef]').textContent=num(f.ef+'%');
      val.style.strokeDasharray=target+' 100';
      cancelAnimationFrame(raf); var from=shownS, t0=performance.now();
      (function step(now){ var p=Math.min(1,(now-t0)/(RM?1:700)); shownS=Math.round(from+(target-from)*(1-Math.pow(1-p,3))); q(el,'.sn-num').textContent=num(shownS); if(p<1) raf=requestAnimationFrame(step); })(t0);
      q(el,'.sn-edgechip').hidden=!edge; q(el,'.sn-livedata').hidden=!edge;
    }
    function livedata(){ if(!edge) return; var m=(28+Math.random()*8).toFixed(0), c=(27+Math.random()*4).toFixed(1);
      q(el,'.sn-livedata').textContent=t('Live field data')+': '+t('soil moisture')+' '+num(m+'%')+' · '+t('temperature')+' '+num(c+'°C'); }
    qa(el,'.sn-farms button').forEach(function(b){ b.addEventListener('click',function(){ cur=+b.getAttribute('data-i'); qa(el,'.sn-farms button').forEach(function(x){ x.setAttribute('aria-selected', x===b); }); render(); }); });
    q(el,'.sn-edge input').addEventListener('change',function(){ edge=this.checked; livedata(); render(); });
    render();
    live(el,function(){ if(!timer) timer=setInterval(livedata,2500); },function(){ clearInterval(timer); timer=null; });
  }

  var M={rakeez:rakeez, makani:makani, quraa:quraa, inara:inara, sanabil:sanabil};
  window.DEMO=function(el,id){ if(el && M[id]) try{ M[id](el); }catch(e){ el.remove(); } };

  /* ---------------- styles ---------------- */
  var css=
  '.demo{padding-block:clamp(2.4rem,6vw,4.4rem);border-top:1px solid var(--line)}'+
  '.dm-head{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:.6rem 2rem;margin-bottom:clamp(1.2rem,3vw,2rem)}'+
  '.dm-head h2{font:600 clamp(1.05rem,1.7vw,1.3rem)/1.35 var(--f-mono);letter-spacing:.08em;color:var(--a);margin:0}'+
  '.dm-note{margin:0;font-size:.85rem;color:var(--mute);max-width:46ch}'+
  '.dm-stage{border:1px solid var(--line2);border-radius:18px;padding:clamp(1rem,3vw,2.2rem);background:color-mix(in srgb,var(--fg) 4%,transparent)}'+
  '.dm-k{font-size:.78rem;letter-spacing:.06em;color:var(--mute);margin:0 0 .5rem}'+
  '.demo button{font:inherit;color:inherit;cursor:pointer}'+
  '.demo button:focus-visible,.demo input:focus-visible{outline:2px solid var(--a);outline-offset:2px}'+
  '.dm-btn{background:var(--a);color:var(--a-ink)!important;border:0;border-radius:999px;padding:.7rem 1.2rem;font-weight:600!important}'+
  '.dm-btn:disabled{opacity:.5;cursor:default}'+
  '.dm-link{background:none;border:0;padding:0;color:var(--a)!important;text-decoration:underline;text-underline-offset:3px}'+
  '.dm-row{display:flex;flex-wrap:wrap;gap:.8rem;align-items:center}'+
  '.dm-seg,.dm-tabs{display:inline-flex;flex-wrap:wrap;border:1px solid var(--line2);border-radius:22px;padding:3px;gap:2px}'+
  '.dm-seg button,.dm-tabs button{background:none;border:0;border-radius:999px;padding:.5rem .95rem;font-size:.9rem;color:var(--body)!important}'+
  '.dm-seg button[aria-pressed=true],.dm-tabs button[aria-selected=true]{background:var(--fg);color:var(--bg)!important}'+
  /* rakeez */
  '.rk{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.35fr);gap:clamp(1.4rem,4vw,3.4rem);align-items:center}'+
  '.rk-devwrap{display:grid;place-items:center;padding:1rem 0}'+
  '.rk-dev{--o:.35;--sp:3.2s;position:relative;width:min(260px,62vw);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 35%,#18292e,#081114 70%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 30px 60px -20px rgba(0,0,0,.6)}'+
  '.rk-dev[data-lv="1"]{--o:.7;--sp:2s}.rk-dev[data-lv="2"]{--o:1;--sp:.9s}'+
  '.rk-ring{position:absolute;inset:9%;border-radius:50%;border:5px solid var(--a);opacity:var(--o);transition:opacity .6s}'+
  '.rk-glow{position:absolute;inset:2%;border-radius:50%;box-shadow:0 0 40px 6px var(--a);opacity:calc(var(--o)*.55);animation:rkp var(--sp) ease-in-out infinite;transition:opacity .6s}'+
  '@keyframes rkp{50%{opacity:calc(var(--o)*.15)}}'+
  '.rk-scr{position:absolute;inset:30%;border-radius:50%;background:#050b0d;display:grid;place-content:center;text-align:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06)}'+
  '.rk-scr b{font:700 clamp(1.8rem,4vw,2.4rem)/1 var(--f-display,inherit);color:var(--fg)}'+
  '.rk-scr span{font-size:.62rem;letter-spacing:.1em;color:var(--a);margin-top:.25rem}'+
  '.rk-state{font-size:clamp(1.5rem,3vw,2.1rem);font-weight:700;margin:0;color:var(--fg)}'+
  '.rk-resp{margin:.2rem 0 1.2rem;color:var(--a)}'+
  '.rk-sig{display:grid;grid-template-columns:auto 1fr;gap:.5rem 1rem;align-items:center;font-size:.82rem;color:var(--mute);margin-bottom:1.2rem}'+
  '.rk-bars{display:flex;gap:3px;height:26px;align-items:flex-end}'+
  '.rk-bars i{flex:1;height:100%;background:var(--a);opacity:.75;border-radius:2px;transform-origin:bottom;transform:scaleY(.4);transition:transform .35s ease}'+
  '.rk-flow{list-style:none;padding:0;margin:0 0 1.3rem;display:grid;grid-template-columns:repeat(4,1fr);gap:6px}'+
  '.rk-flow li{font:500 .72rem/1.2 var(--f-mono);letter-spacing:.06em;text-align:center;padding:.6rem .2rem;border-radius:8px;border:1px solid var(--line2);color:var(--mute);transition:.4s}'+
  '.rk-flow li.done{color:var(--body);border-color:var(--a)}'+
  '.rk-flow li.on{background:var(--a);color:var(--a-ink);border-color:var(--a)}'+
  /* makani */
  '.mk-app{border-radius:14px;overflow:hidden;border:1px solid var(--line2);background:#06101d}'+
  '.mk-bar{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.7rem 1rem;border-bottom:1px solid var(--line);flex-wrap:wrap}'+
  '.mk-bar>b{color:var(--a);letter-spacing:.02em}'+
  '.mk-body{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,2fr);min-height:330px}'+
  '.mk-body[hidden]{display:none}'+
  '.mk-list{list-style:none;margin:0;padding:.6rem;display:grid;gap:.4rem;align-content:start;border-inline-end:1px solid var(--line)}'+
  '.mk-list button{width:100%;display:flex;align-items:center;gap:.7rem;text-align:start;background:none;border:1px solid transparent;border-radius:10px;padding:.65rem .7rem}'+
  '.mk-list button[aria-pressed=true]{border-color:var(--a);background:rgba(77,182,255,.08)}'+
  '.mk-list svg{width:22px;height:22px;flex:none;color:var(--a)}'+
  '.mk-list span{display:grid;flex:1;min-width:0}.mk-list small{color:var(--mute);font-size:.72rem}'+
  '.mk-live{font-style:normal;font-size:.62rem;color:#5be3a0;letter-spacing:.06em}.mk-live::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:currentColor;margin-inline-end:5px;vertical-align:middle}'+
  '.mk-map{position:relative;color:var(--a);background:radial-gradient(circle at 50% 50%,rgba(77,182,255,.08),transparent 70%);overflow:hidden}'+
  '.mk-map svg{position:absolute;inset:0;width:100%;height:100%}'+
  '.mk-pin{position:absolute;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:var(--a);box-shadow:0 0 0 4px rgba(77,182,255,.25);transition:left .9s cubic-bezier(.3,.7,.2,1),top .9s cubic-bezier(.3,.7,.2,1)}'+
  '.mk-pin i{position:absolute;inset:-4px;border-radius:50%;border:2px solid var(--a);opacity:0}'+
  '.mk-pin.ping i{animation:mkp 1.6s ease-out 2}'+
  '@keyframes mkp{0%{transform:scale(.6);opacity:1}100%{transform:scale(3.4);opacity:0}}'+
  '.mk-info{position:absolute;inset-inline-start:.8rem;bottom:.8rem;background:rgba(2,10,20,.85);border:1px solid var(--line2);border-radius:10px;padding:.55rem .8rem;font-size:.85rem;line-height:1.5}'+
  '.mk-info small{color:var(--mute)}'+
  '.mk-qr{grid-template-columns:auto 1fr;gap:clamp(1rem,4vw,3rem);align-items:center;padding:clamp(1rem,3vw,2rem)}'+
  '.mk-qrcard{display:grid;gap:.5rem;justify-items:center}.mk-qrimg{width:170px;height:170px;border-radius:8px}.mk-qrcard small{color:var(--mute);font-size:.72rem}'+
  '.mk-scan p{margin:0 0 1rem;color:var(--body);max-width:42ch}'+
  '.mk-res{margin-top:1rem;min-height:5rem}.mk-res p{margin:.2rem 0}.mk-ok{color:#5be3a0!important;font-weight:600}'+
  /* quraa */
  '.qa-app{--qs:1.7rem}'+
  '.qa-tools{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1rem}'+
  '.qa-tools button{background:none;border:1px solid var(--line2);border-radius:999px;padding:.5rem 1rem;font-size:.9rem}'+
  '.qa-tools button[aria-pressed=true]{background:var(--a);color:var(--a-ink);border-color:var(--a)}'+
  '.qa-page{background:#fbf7ea;border:1px solid rgba(184,150,62,.45);border-radius:14px;padding:clamp(1.2rem,4vw,2.4rem);box-shadow:inset 0 0 0 6px #fbf7ea,inset 0 0 0 7px rgba(184,150,62,.35);transition:background .3s}'+
  '.qa-sura{text-align:center;font:700 1.15rem/1 "Amiri",serif;color:#8a6d22;margin:0 0 1.2rem}'+
  '.qa-v{list-style:none;margin:0;padding:0;text-align:center;font:400 var(--qs)/2.15 "Amiri","Amiri Quran",serif;color:#12281c;transition:font-size .25s}'+
  '.qa-v li{display:inline}'+
  '.qa-v button{background:none;border:0;padding:0 .15em;border-radius:8px;line-height:inherit;transition:background .25s,color .25s,filter .3s}'+
  '.qa-v button.sel{background:rgba(29,90,62,.14)}'+
  '.qa-v button.hid .qa-t{filter:blur(7px);opacity:.55}'+
  '.qa-n{color:#b8963e;font-size:.8em}'+
  '.qa-app.hc .qa-page{background:#0d1a13;box-shadow:none;border-color:#f3d77a}.qa-app.hc .qa-v{color:#fff6cf}.qa-app.hc .qa-sura,.qa-app.hc .qa-n{color:#f3d77a}.qa-app.hc .qa-v button.sel{background:rgba(243,215,122,.22)}'+
  '.qa-stat{margin:.9rem 0 0;font-size:.82rem;color:var(--mute)}'+
  /* inara */
  '.in-chips{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.6rem}'+
  '.in-chips button{background:none;border:1px solid var(--line2);border-radius:999px;padding:.55rem 1.05rem}'+
  '.in-chips button[aria-pressed=true]{background:linear-gradient(120deg,#e062d6,#8a4be0);border-color:transparent;color:#fff}'+
  '.in-path{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.8rem;counter-reset:s}'+
  '.in-path li{position:relative;border:1px solid var(--line2);border-radius:14px;padding:1rem;min-height:9.5rem;display:flex;flex-direction:column;gap:.4rem;opacity:.45;transform:translateY(6px);transition:opacity .45s,transform .45s,border-color .45s}'+
  '.in-path li.on{opacity:1;transform:none;border-color:var(--a)}'+
  '.in-n{color:var(--a);font-size:.75rem}.in-path b{color:var(--fg);font-size:.98rem}.in-v{color:var(--body);font-size:.9rem;line-height:1.55}'+
  '.in-hint{margin:1rem 0 0;color:var(--mute);font-size:.9rem}'+
  /* sanabil */
  '.sn-farms{margin-bottom:1.4rem}'+
  '.sn-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:clamp(1rem,4vw,3rem);align-items:center}'+
  '.sn-gauge{position:relative;max-width:300px;width:100%;justify-self:center}.sn-gauge svg{width:100%;display:block}'+
  '.sn-trk,.sn-val{fill:none;stroke-width:14;stroke-linecap:round}.sn-trk{stroke:var(--line2)}'+
  '.sn-val{stroke:var(--a);stroke-dasharray:0 100;transition:stroke-dasharray .7s cubic-bezier(.3,.7,.2,1)}'+
  '.sn-score{position:absolute;left:0;right:0;bottom:4%;text-align:center;display:grid}'+
  '.sn-score b{font-size:clamp(2.4rem,5vw,3.2rem);line-height:1;color:var(--fg)}.sn-score span{font-size:.72rem;color:var(--a);letter-spacing:.08em}'+
  '.sn-kpi{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:.7rem}'+
  '.sn-kpi li{border:1px solid var(--line2);border-radius:12px;padding:.85rem 1rem;display:grid;gap:.3rem}'+
  '.sn-kpi small{color:var(--mute);font-size:.8rem}.sn-kpi b{font-size:1.25rem;color:var(--fg)}'+
  '.sn-src{display:flex;flex-wrap:wrap;gap:.45rem;align-items:center;margin-top:1.6rem}.sn-src .dm-k{margin:0 .4rem 0 0}'+
  '.sn-chip{border:1px solid var(--line2);border-radius:999px;padding:.3rem .75rem;font-size:.8rem;color:var(--body)}.sn-chip::before{content:"✓ ";color:var(--a)}'+
  '.sn-chip[hidden]{display:none}'+
  '.sn-edge{display:inline-flex;gap:.5rem;align-items:center;margin-top:1rem;cursor:pointer;color:var(--body)}.sn-edge input{accent-color:var(--a);width:1.05rem;height:1.05rem}'+
  '.sn-livedata{margin:.6rem 0 0;color:#6ccb6c;font-size:.82rem}'+
  '.sn-foot{margin:1rem 0 0;font-size:.78rem;color:var(--mute)}'+
  'html[lang=ar] .demo .mono{letter-spacing:0}'+
  '@media (max-width:760px){.rk,.sn-grid{grid-template-columns:1fr}.mk-body{grid-template-columns:1fr}.mk-list{border-inline-end:0;border-bottom:1px solid var(--line);grid-template-columns:1fr}.mk-map{min-height:260px}.mk-qr{grid-template-columns:1fr;justify-items:center;text-align:center}.in-path{grid-template-columns:1fr 1fr}.rk-flow li{font-size:.62rem}}'+
  '@media (prefers-reduced-motion:reduce){.demo *{animation:none!important;transition:none!important}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
