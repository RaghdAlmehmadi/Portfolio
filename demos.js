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

  /* ================= Rakeez: the employee's work computer ================= */
  function rakeez(el){
    var LV=[
      {c:'#30d158', n:'Focused',          d:'On task. Rakeez stays quiet.'},
      {c:'#ffd60a', n:'Early drift',      d:'Attention is slipping. A subtle yellow cue.'},
      {c:'#ff9f0a', n:'Distracted',       d:'A stronger orange cue, with an optional gentle tone.'},
      {c:'#ff453a', n:'Deep distraction', d:'Red. Rakeez steps in.'}
    ];
    var INV=[['INV-2041','Al-Noor Office Supplies',12400],['INV-2042','Delta Logistics',38750],['INV-2043','Bright IT Services',21900],['INV-2044','Red Sea Catering',8600],['INV-2045','Summit Print House',5320],['INV-2046','Coastline Maintenance',17200]];
    var CHK=['Purchase order matched','Goods received','Amount verified'];
    var CH=[
      {id:'fin', n:'Finance team', av:'💼', m:[['Abdullah','Who is closing the November invoices?'],['Manager','Please finish them before 4 PM']], un:2},
      {id:'fs',  n:'Faisal', av:'⚽', m:[['Faisal','Did you see last night’s match? ⚽'],['Faisal','That last goal 🔥']], un:2},
      {id:'cof', n:'Coffee corner ☕', av:'☕', m:[['Noura','Anyone up for coffee?'],['Hind','In 5 minutes!']], un:1}
    ];
    var REPLY=['😂😂','OK!','Finish your invoices first 😄','Talk later?','Haha true','On my way'];
    var MAIL=[['Manager','Invoices due today','Please close all pending November invoices before 4 PM. Thank you.'],['Newsletter','Your weekly digest','Ten articles picked for you this week.'],['Store','Flash sale: 50% off','Tonight only. Do not miss out.'],['HR','Team building next week','Save the date for Thursday afternoon.']];
    var NEWS=[['📈','Stock markets close higher today'],['📱','New phone launch event announced'],['✈️','Top 10 winter travel destinations'],['☀️','Weekend weather: mild and sunny'],['⚽','Local team wins the derby']];
    var CLIPS=[['😹','Cats vs cucumbers','#ff6b9a','#ffb36b'],['🍝','5-minute pasta','#f7b733','#fc4a1a'],['⚽','Unbelievable last-minute goal','#11998e','#38ef7d'],['🖥️','My desk setup tour','#4776e6','#8e54e9'],['🏜️','Travel vlog: AlUla','#c79081','#dfa579'],['🫧','Satisfying slime','#00c6ff','#0072ff']];
    var NT=[
      {app:'chat', chat:'fs', from:'Faisal', txt:'Did you see last night’s match? ⚽'},
      {app:'mail', from:'Mail', txt:'New email: Your weekly digest'},
      {app:'video', from:'Videos', txt:'A channel you follow posted a new video'},
      {app:'news', from:'News', txt:'Breaking: New phone launch event announced'},
      {app:'chat', chat:'cof', from:'Coffee corner ☕', txt:'Noura: Anyone up for coffee?'},
      {app:'chat', chat:'fin', from:'Finance team', txt:'Abdullah: Who is closing the November invoices?'},
      {app:'mail', from:'Mail', txt:'Store: Flash sale, 50% off tonight'}
    ];
    var W={inv:4, rakeez:1, mail:-1.2, chat:-3, video:-4.5, news:-3, desk:-1.5, call:-2};
    var NM={inv:'Invoices', mail:'Mail', chat:'Team chat', video:'Videos', news:'News', rakeez:'Rakeez'};
    var IC={inv:'🧾', mail:'✉️', chat:'💬', video:'▶️', news:'📰', rakeez:''};
    function sar(n){ var s=n.toLocaleString('en-US',{minimumFractionDigits:2}); return AR ? num(s)+' ر.س' : 'SAR '+s; }
    function mmss(s){ var m=Math.floor(s/60), x=Math.floor(s%60); return num(m+':'+(x<10?'0':'')+x); }
    function clock(){ return new Intl.DateTimeFormat(AR?'ar':'en-US',{hour:'numeric',minute:'2-digit'}).format(new Date()); }

    shell(el,
      '<div class="rk6">'+
        '<div class="rk6-intro"><h3>'+esc(t('A workday with Rakeez'))+'</h3><p>'+esc(t('An interactive simulation of how Rakeez works. In front of you is an employee’s work computer and one urgent task: close this month’s invoices before the end of the day. Use it as your own, and watch Rakeez read your focus moment by moment, then step in at the right time to bring you back to the task.'))+'</p></div>'+
        '<div class="rk5-mini" aria-hidden="true"><span class="rk5-mring"></span><b class="rk5-mname"></b><span class="rk5-mbar">'+LV.map(function(l){ return '<i style="background:'+l.c+'"></i>'; }).join('')+'<b></b></span></div>'+
        '<div class="rk6-row">'+
          '<div class="pc"><div class="pc-fit"><div class="pc-scr">'+
            '<div class="pc-bar"><b class="pc-appname"></b><span class="pc-task"></span><span class="pc-clock"></span></div>'+
            '<div class="pc-desk"><div class="pc-wall"><span>'+esc(t('Today’s task'))+'</span><b>'+esc(t('Close November invoices'))+'</b><small class="pc-prog"></small></div></div>'+
            '<div class="pc-win" hidden><div class="pc-wt"><span class="pc-dots"><i data-act="close"></i><i></i><i></i></span><b class="pc-wtitle"></b></div><div class="pc-wb"></div></div>'+
            '<div class="pc-nots"></div>'+
            '<div class="pc-call" hidden></div>'+
            '<div class="pc-int" hidden></div>'+
            '<div class="pc-done" hidden></div>'+
            '<div class="pc-dock">'+['inv','mail','chat','video','news','rakeez'].map(function(k){ return '<button type="button" class="pc-ico" data-open="'+k+'" title="'+esc(t(NM[k]))+'"><span class="pc-i ic6-'+k+'">'+(k==='rakeez'?'<i></i>':IC[k])+'</span><em class="pc-bdg" hidden></em><small>'+esc(t(NM[k]))+'</small></button>'; }).join('')+'</div>'+
          '</div></div><div class="pc-stand"></div></div>'+
          '<div class="rk6-side">'+
            '<div class="rk5-dev" data-lv="0"><i class="rk4-glow"></i><i class="rk4-ring"></i><div class="rk4-face"><b>Rakeez</b></div><div class="rk4-bub" hidden>'+esc(t('Time to get back to your task.'))+'</div></div>'+
            '<p class="rk5-name"></p><p class="rk5-desc" aria-live="polite"></p>'+
            '<div class="rk4-scale"><div class="rk4-bar">'+LV.map(function(l){ return '<i style="background:'+l.c+'"></i>'; }).join('')+'<b class="rk4-mark"></b></div><ol>'+LV.map(function(l){ return '<li>'+esc(t(l.n))+'</li>'; }).join('')+'</ol></div>'+
          '</div>'+
        '</div>'+
      '</div>');

    var scr=q(el,'.pc-scr'), fit=q(el,'.pc-fit'), win=q(el,'.pc-win'), wb=q(el,'.pc-wb'), nots=q(el,'.pc-nots'), callL=q(el,'.pc-call'), intL=q(el,'.pc-int'), doneL=q(el,'.pc-done');
    var S={app:null, f:100, lv:0, hist:[], secs:0, onTask:0, inter:0, snooze:0, call:null, called:false, nextN:7, ni:0, inv:null, closed:{}, chk:{}, chat:null, mail:null, clip:null, done:false};
    function scale(){ var m=fit.clientWidth<560, bw=m?440:960, bh=m?660:600; scr.classList.toggle('pc-m',m); fit.style.aspectRatio=bw+'/'+bh; scr.style.width=bw+'px'; scr.style.height=bh+'px'; scr.style.transform='scale('+(fit.clientWidth/bw)+')'; }
    if('ResizeObserver' in window) new ResizeObserver(scale).observe(fit); scale();
    function nClosed(){ return Object.keys(S.closed).length; }
    function unread(){ return CH.reduce(function(a,c){ return a+c.un; },0); }

    var APP={
      inv:function(){
        var list='<div class="iv-list">'+INV.map(function(v,i){ return '<button type="button" class="iv-row'+(S.inv===i?' sel':'')+'" data-act="inv" data-i="'+i+'"><span class="mono">'+v[0]+'</span><span>'+esc(t(v[1]))+'</span><b>'+sar(v[2])+'</b><em class="'+(S.closed[i]?'ok':'')+'">'+esc(t(S.closed[i]?'Closed':'Pending'))+'</em></button>'; }).join('')+'</div>';
        var det='<div class="iv-det"><p class="iv-empty">'+esc(t('Select an invoice to review it.'))+'</p></div>';
        if(S.inv!==null){ var v=INV[S.inv], vat=Math.round(v[2]*.15*100)/100, c=S.chk[S.inv]||{}, all=CHK.every(function(_,j){ return c[j]; });
          det='<div class="iv-det"><p class="iv-no mono">'+v[0]+'</p><h5>'+esc(t(v[1]))+'</h5>'+
            '<dl><dt>'+esc(t('Subtotal'))+'</dt><dd>'+sar(v[2])+'</dd><dt>'+esc(t('VAT 15%'))+'</dt><dd>'+sar(vat)+'</dd><dt><b>'+esc(t('Total'))+'</b></dt><dd><b>'+sar(v[2]+vat)+'</b></dd></dl>'+
            (S.closed[S.inv] ? '<p class="iv-closed">✓ '+esc(t('Invoice closed'))+'</p>' :
            '<p class="iv-h">'+esc(t('Review before closing'))+'</p>'+CHK.map(function(x,j){ return '<button type="button" class="iv-chk'+(c[j]?' on':'')+'" data-act="chk" data-j="'+j+'"><i></i>'+esc(t(x))+'</button>'; }).join('')+
            '<button type="button" class="iv-close" data-act="closeinv"'+(all?'':' disabled')+'>'+esc(t('Close invoice'))+'</button>')+'</div>'; }
        return '<div class="iv"><div class="iv-top"><b>'+esc(t('November invoices'))+'</b><span>'+num(nClosed()+' / '+INV.length)+' '+esc(t('closed'))+'</span><i style="--p:'+(nClosed()/INV.length*100)+'%"></i></div><div class="iv-body">'+list+det+'</div></div>';
      },
      mail:function(){
        var m=S.mail===null?null:MAIL[S.mail];
        return '<div class="ml"><div class="ml-list">'+MAIL.map(function(x,i){ return '<button type="button" class="ml-row'+(S.mail===i?' sel':'')+'" data-act="mail" data-i="'+i+'"><b>'+esc(t(x[0]))+'</b><span>'+esc(t(x[1]))+'</span></button>'; }).join('')+'</div><div class="ml-read">'+(m?'<h5>'+esc(t(m[1]))+'</h5><p class="ml-from">'+esc(t(m[0]))+'</p><p>'+esc(t(m[2]))+'</p>':'<p class="iv-empty">'+esc(t('No message selected'))+'</p>')+'</div></div>';
      },
      chat:function(){
        var c=CH.filter(function(x){ return x.id===S.chat; })[0]||CH[0]; S.chat=c.id; c.un=0;
        return '<div class="ct"><div class="ct-list">'+CH.map(function(x){ return '<button type="button" class="ct-row'+(x.id===c.id?' sel':'')+'" data-act="chat" data-id="'+x.id+'"><span>'+x.av+'</span><b>'+esc(t(x.n))+'</b>'+(x.un?'<em>'+num(x.un)+'</em>':'')+'</button>'; }).join('')+'</div>'+
          '<div class="ct-main"><div class="ct-msgs">'+c.m.map(function(m){ var me=m[0]==='me'; return '<div class="ct-msg'+(me?' me':'')+'">'+(me?'':'<b>'+esc(t(m[0]))+'</b>')+esc(me?m[1]:t(m[1]))+'</div>'; }).join('')+'</div>'+
          '<form class="ct-in"><input type="text" placeholder="'+esc(t('Message'))+'" aria-label="'+esc(t('Message'))+'"><button type="submit">'+esc(t('Send'))+'</button></form></div></div>';
      },
      video:function(){
        if(S.clip!==null){ var c=CLIPS[S.clip%CLIPS.length];
          return '<div class="vd-play" style="background:linear-gradient(150deg,'+c[2]+','+c[3]+')"><span>'+c[0]+'</span><p>'+esc(t(c[1]))+'</p><div class="vd-prog"><i></i></div><small>'+esc(t('Up next in a few seconds…'))+'</small><button type="button" data-act="vback">‹ '+esc(t('All videos'))+'</button></div>'; }
        return '<div class="vd-grid">'+CLIPS.map(function(c,i){ return '<button type="button" data-act="clip" data-i="'+i+'"><span style="background:linear-gradient(150deg,'+c[2]+','+c[3]+')">'+c[0]+'</span><b>'+esc(t(c[1]))+'</b><small>'+num((120+i*37)+'K')+' '+esc(t('views'))+'</small></button>'; }).join('')+'</div>';
      },
      news:function(){ return '<div class="nw">'+NEWS.map(function(n){ return '<div class="nw-item"><span>'+n[0]+'</span><b>'+esc(t(n[1]))+'</b></div>'; }).join('')+'</div>'; },
      rakeez:function(){
        return '<div class="rz"><span class="rz-ring"><i></i></span><b class="rz-st"></b><small>'+esc(t('Connected to the desk device'))+'</small>'+
          '<p class="rz-h">'+esc(t('This session'))+'</p><div class="rz-tl"></div>'+
          '<div class="rz-stats"><div><b class="rz-ft"></b><small>'+esc(t('Focus time'))+'</small></div><div><b class="rz-ss"></b><small>'+esc(t('Session'))+'</small></div><div><b class="rz-in"></b><small>'+esc(t('Interventions'))+'</small></div></div></div>';
      }
    };
    function render(){
      if(S.app){ win.hidden=false; q(el,'.pc-wtitle').textContent=t(NM[S.app]); wb.innerHTML=APP[S.app](); wb.setAttribute('data-app',S.app);
        if(S.app==='chat') wireChat(); } else win.hidden=true;
      q(el,'.pc-appname').textContent= S.app ? t(NM[S.app]) : t('Desktop');
      qa(el,'.pc-ico').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-open')===S.app); });
      var bd=q(el,'.pc-ico[data-open=chat] .pc-bdg'), u=unread(); bd.hidden=!u; bd.textContent=num(u);
      q(el,'.pc-prog').textContent=num(nClosed()+' / '+INV.length)+' '+t('closed');
      q(el,'.pc-task').textContent='🧾 '+num(nClosed()+'/'+INV.length);
      paint();
    }
    function wireChat(){
      var c=CH.filter(function(x){ return x.id===S.chat; })[0], box=q(wb,'.ct-msgs'); box.scrollTop=1e5;
      q(wb,'.ct-in').addEventListener('submit',function(e){ e.preventDefault(); var i=q(wb,'.ct-in input'), v=i.value.trim(); if(!v) return;
        c.m.push(['me',v]); render(); setTimeout(function(){ c.m.push([c.m[0][0]==='me'?c.n:c.m[0][0], pickR(REPLY)]); if(S.app==='chat'&&S.chat===c.id) render(); },1300); });
    }
    function notify(n){
      var d=document.createElement('button'); d.type='button'; d.className='pc-n'; d.setAttribute('data-act','openN'); d.setAttribute('data-i',NT.indexOf(n));
      d.innerHTML='<span>'+(IC[n.app]||'🔔')+'</span><div><b>'+esc(t(n.from))+'</b><p>'+esc(t(n.txt))+'</p></div><small>'+esc(t('now'))+'</small>';
      nots.prepend(d); while(nots.children.length>2) nots.lastChild.remove();
      setTimeout(function(){ d.classList.add('out'); setTimeout(function(){ d.remove(); },400); },5200);
    }
    function ring(){
      S.called=true; S.call='ring';
      callL.innerHTML='<div class="pc-callc"><span class="pc-cav">👥</span><div><b>'+esc(t('Team sync'))+'</b><p>'+esc(t('Incoming video call…'))+'</p></div><button type="button" class="dec" data-act="decline">'+esc(t('Decline'))+'</button><button type="button" class="acc" data-act="accept">'+esc(t('Join'))+'</button></div>';
      callL.hidden=false;
    }
    function intervene(){
      S.inter++; intL.hidden=false; var left=INV.length-nClosed();
      intL.innerHTML='<div class="pc-intc"><span class="rz-ring"><i></i></span><b>Rakeez</b><p>'+esc(t('You have drifted away from your task for a while.'))+' '+num(left)+' '+esc(t(left===1?'invoice is still open.':'invoices are still open.'))+'</p><div><button type="button" class="pc-ib" data-act="backtask">'+esc(t('Back to invoices'))+'</button><button type="button" class="pc-ib pc-ib2" data-act="snooze">'+esc(t('Two more minutes'))+'</button></div></div>';
    }
    function finish(){
      S.done=true; var pct=Math.round(S.onTask/Math.max(1,S.secs)*100);
      doneL.hidden=false; confetti(q(el,'.dm-stage'));
      doneL.innerHTML='<div class="pc-donec"><span>✅</span><b>'+esc(t('All invoices closed!'))+'</b><div class="rz-stats"><div><b>'+mmss(S.secs)+'</b><small>'+esc(t('Session'))+'</small></div><div><b>'+num(pct+'%')+'</b><small>'+esc(t('Time on task'))+'</small></div><div><b>'+num(S.inter)+'</b><small>'+esc(t('Interventions'))+'</small></div></div><button type="button" class="pc-ib" data-act="restart">'+esc(t('Start a new day'))+'</button></div>';
    }
    function level(f){ return f>=75?0 : f>=50?1 : f>=25?2 : 3; }
    function paint(){
      var L=LV[S.lv], mk='calc('+Math.min(97,Math.max(1,100-S.f))+'% - 2px)';
      el.style.setProperty('--lc', L.c);
      q(el,'.rk5-dev').setAttribute('data-lv',S.lv);
      q(el,'.rk5-name').textContent=t(L.n); q(el,'.rk5-desc').textContent=t(L.d); q(el,'.rk5-mname').textContent=t(L.n);
      q(el,'.rk4-mark').style.insetInlineStart=mk; q(el,'.rk5-mbar b').style.insetInlineStart=mk;
      q(el,'.rk5-mini').classList.toggle('red',S.lv===3); q(el,'.rk4-bub').hidden=S.lv<3;
      qa(el,'.rk4-scale li').forEach(function(li,i){ li.classList.toggle('on',i===S.lv); });
      q(el,'.pc-clock').textContent=clock();
      if(S.app==='rakeez'){ q(wb,'.rz-st').textContent=t(L.n); q(wb,'.rz-ft').textContent=mmss(S.onTask); q(wb,'.rz-ss').textContent=mmss(S.secs); q(wb,'.rz-in').textContent=num(S.inter);
        q(wb,'.rz-tl').innerHTML=(S.hist.slice(-80).map(function(l){ return '<i style="background:'+LV[l].c+'"></i>'; }).join(''))||'<i style="background:#30d158"></i>'; }
    }
    function tick(){
      if(S.done) return;
      S.secs++; var c= S.call==='talk' ? 'call' : (S.app||'desk'), w=W[c];
      if(!intL.hidden) w=0;
      S.f=Math.max(0,Math.min(100,S.f+w*1.6)); if(c==='inv') S.onTask++;
      S.lv=level(S.f); S.hist.push(S.lv); if(S.hist.length>400) S.hist.shift();
      if(S.snooze>0) S.snooze--;
      if(S.lv===3 && intL.hidden && S.snooze<=0 && !S.call) intervene();
      S.nextN--;
      if(S.nextN<=0 && intL.hidden){ var n=NT[S.ni%NT.length]; S.ni++; var ch=CH.filter(function(x){ return x.id===n.chat; })[0]; if(ch && !(S.app==='chat'&&S.chat===ch.id)) ch.un++; notify(n); S.nextN=Math.round(rnd(8,13)); render(); }
      if(!S.called && S.secs>=32 && intL.hidden) ring();
      if(S.call==='talk'){ S.ct=(S.ct||0)+1; var x=q(callL,'.pc-ct'); if(x) x.textContent=mmss(S.ct); }
      if(S.app==='video' && S.clip!==null && S.secs%6===0){ S.clip++; render(); }
      paint();
    }
    scr.addEventListener('click',function(e){
      var a=e.target.closest('[data-act],[data-open]'); if(!a) return;
      var k=a.getAttribute('data-act'), o=a.getAttribute('data-open');
      if(o){ S.app=o; render(); return; }
      if(k==='close'){ S.app=null; render(); }
      else if(k==='inv'){ S.inv=+a.getAttribute('data-i'); render(); }
      else if(k==='chk'){ var j=+a.getAttribute('data-j'); S.chk[S.inv]=S.chk[S.inv]||{}; S.chk[S.inv][j]=!S.chk[S.inv][j]; render(); }
      else if(k==='closeinv'){ S.closed[S.inv]=1; S.f=Math.min(100,S.f+8); var nx=INV.findIndex(function(_,i){ return !S.closed[i]; }); S.inv= nx<0?S.inv:nx; render(); if(nClosed()===INV.length) finish(); }
      else if(k==='mail'){ S.mail=+a.getAttribute('data-i'); render(); }
      else if(k==='chat'){ S.chat=a.getAttribute('data-id'); render(); }
      else if(k==='clip'){ S.clip=+a.getAttribute('data-i'); render(); }
      else if(k==='vback'){ S.clip=null; render(); }
      else if(k==='openN'){ var n=NT[+a.getAttribute('data-i')]; a.remove(); if(n.chat) S.chat=n.chat; S.app=n.app; if(n.app==='video') S.clip=0; render(); }
      else if(k==='decline'){ S.call=null; callL.hidden=true; }
      else if(k==='accept'){ S.call='talk'; S.ct=0; callL.innerHTML='<div class="pc-callc talk"><span class="pc-cav">👥</span><div><b>'+esc(t('Team sync'))+'</b><p class="pc-ct mono">0:00</p></div><button type="button" class="dec" data-act="decline">'+esc(t('Leave'))+'</button></div>'; }
      else if(k==='backtask'){ intL.hidden=true; S.snooze=12; S.app='inv'; render(); }
      else if(k==='snooze'){ intL.hidden=true; S.snooze=20; }
      else if(k==='restart'){ S.closed={}; S.chk={}; S.inv=null; S.secs=0; S.onTask=0; S.inter=0; S.f=100; S.hist=[]; S.done=false; S.app=null; doneL.hidden=true; render(); }
    });
    render();
    var loop=null;
    onScreen(el,function(){ if(!loop) loop=setInterval(tick,1000); scale(); },function(){ clearInterval(loop); loop=null; });
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
  '.demo{--lc:#30d158}'+
  '.rk6-intro{text-align:center;max-width:70ch;margin:0 auto 1.6rem}.rk6-intro h3{margin:0 0 .5rem;font-size:clamp(1.5rem,3vw,2.2rem);color:var(--fg)}.rk6-intro p{margin:0;color:var(--body);line-height:1.8}'+
  '.rk6-row{display:grid;grid-template-columns:minmax(0,1fr) 230px;gap:clamp(1rem,3vw,2.4rem);align-items:center}'+
  '.rk6-side{display:grid;justify-items:center;text-align:center}'+
  '.rk5-dev{--sp:3.4s;position:relative;width:170px;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 30%,#2a3236,#0c1113 72%);box-shadow:inset 0 2px 0 rgba(255,255,255,.08),0 26px 40px -18px rgba(0,0,0,.8);margin:1.4rem 0 1rem}'+
  '.rk5-dev[data-lv="1"]{--sp:2.2s}.rk5-dev[data-lv="2"]{--sp:1.2s}.rk5-dev[data-lv="3"]{--sp:.55s;animation:rkSh .6s ease-in-out infinite}'+
  '@keyframes rkSh{25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}'+
  '.rk4-ring{position:absolute;inset:8%;border-radius:50%;border:7px solid var(--lc);box-shadow:0 0 22px var(--lc),inset 0 0 16px var(--lc);transition:border-color .7s,box-shadow .7s}'+
  '.rk4-glow{position:absolute;inset:-18%;border-radius:50%;background:radial-gradient(circle,var(--lc) 0%,transparent 62%);opacity:.4;animation:rkp var(--sp) ease-in-out infinite}'+
  '@keyframes rkp{50%{opacity:.08;transform:scale(.94)}}'+
  '.rk4-face{position:absolute;inset:27%;border-radius:50%;background:#050809;display:grid;place-items:center}.rk4-face b{font-size:.75rem;letter-spacing:.08em;color:var(--lc);transition:color .7s}'+
  '.rk4-bub{position:absolute;top:-24%;left:50%;transform:translateX(-50%);white-space:nowrap;background:#ff453a;color:#fff;font-weight:700;font-size:.8rem;padding:.45rem .8rem;border-radius:12px;animation:dmPop .35s}.rk4-bub::after{content:"";position:absolute;bottom:-6px;left:50%;margin-left:-6px;border:6px solid transparent;border-bottom:0;border-top-color:#ff453a}'+
  '.rk5-name{margin:0;font-size:1.5rem;font-weight:800;color:var(--lc);transition:color .7s}.rk5-desc{margin:.2rem 0 1rem;color:var(--body);min-height:3.2em;font-size:.92rem;line-height:1.6}'+
  '.rk4-scale{width:100%}.rk4-bar{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:3px;height:10px}.rk4-bar i{border-radius:4px;opacity:.85}'+
  '.rk4-mark{position:absolute;top:-6px;width:4px;height:22px;border-radius:2px;background:#fff;box-shadow:0 0 8px #fff;transition:inset-inline-start .9s linear}'+
  '.rk4-scale ol{list-style:none;margin:.45rem 0 0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);font-size:.62rem;color:var(--mute)}.rk4-scale li.on{color:var(--fg);font-weight:700}'+
  '.rk5-mini{display:none;align-items:center;gap:.6rem;margin-bottom:.8rem;padding:.55rem .8rem;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid var(--line2)}'+
  '.rk5-mring{flex:none;width:26px;height:26px;border-radius:50%;border:4px solid var(--lc);box-shadow:0 0 12px var(--lc);transition:.7s}.rk5-mini.red .rk5-mring{animation:rkSh .6s infinite}'+
  '.rk5-mname{font-size:.9rem;color:var(--lc);white-space:nowrap;transition:color .7s}'+
  '.rk5-mbar{position:relative;flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:2px;height:7px}.rk5-mbar i{border-radius:3px}.rk5-mbar b{position:absolute;top:-4px;width:3px;height:15px;border-radius:2px;background:#fff;transition:inset-inline-start .9s linear}'+
  /* computer */
  '.pc{display:grid;justify-items:center}'+
  '.pc-fit{position:relative;width:100%;aspect-ratio:16/10;border-radius:14px;border:10px solid #16191c;border-bottom-width:14px;background:#000;overflow:hidden;box-shadow:0 0 0 1px #2c3136,0 40px 70px -30px rgba(0,0,0,.9)}'+
  '.pc-stand{width:18%;height:34px;background:linear-gradient(#2a2f33,#15181b);clip-path:polygon(18% 0,82% 0,100% 100%,0 100%);margin-top:-2px}'+
  '.pc-scr{position:absolute;top:0;left:0;width:960px;height:600px;transform-origin:0 0;overflow:hidden;font-size:14px;color:#1d1d1f;background:radial-gradient(120% 90% at 80% 0%,#2e6f73,#123a45 45%,#0a1c26 85%);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;text-align:start}'+
  'html[dir=rtl] .pc-scr{left:auto;right:0;transform-origin:100% 0}'+
  'html[lang=ar] .pc-scr{font-family:"IBM Plex Sans Arabic",system-ui,sans-serif}'+
  '.pc-scr button{font-family:inherit;font-size:inherit}'+
  '.pc-bar{position:absolute;top:0;left:0;right:0;height:28px;display:flex;align-items:center;gap:14px;padding:0 14px;background:rgba(0,0,0,.35);backdrop-filter:blur(10px);color:#fff;font-size:13px;z-index:5}'+
  '.pc-bar b{font-weight:700}.pc-clock{margin-inline-start:auto}.pc-task{opacity:.85}'+
  '.pc-desk{position:absolute;inset:28px 0 0}.pc-wall{position:absolute;top:60px;inset-inline-start:60px;display:grid;gap:4px;color:#fff;padding:18px 22px;border-radius:16px;background:rgba(255,255,255,.1);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.15)}'+
  '.pc-wall span{font-size:12px;opacity:.75}.pc-wall b{font-size:22px}.pc-wall small{font-size:13px;color:#7ff0c0}'+
  '.pc-win{position:absolute;top:44px;left:40px;right:40px;bottom:94px;border-radius:12px;background:#fff;box-shadow:0 30px 60px rgba(0,0,0,.45);overflow:hidden;display:flex;flex-direction:column;z-index:3;animation:pcIn .25s ease-out}.pc-win[hidden]{display:none}'+
  '@keyframes pcIn{from{transform:scale(.96);opacity:0}}'+
  '.pc-wt{height:34px;flex:none;display:flex;align-items:center;gap:12px;padding:0 12px;background:#f1f1f3;border-bottom:1px solid #e3e3e6;font-size:13px}'+
  '.pc-dots{display:flex;gap:7px;direction:ltr}.pc-dots i{width:12px;height:12px;border-radius:50%;background:#ff5f57;cursor:pointer}.pc-dots i+i{background:#febc2e;cursor:default}.pc-dots i+i+i{background:#28c840}'+
  '.pc-wb{flex:1;overflow:hidden;display:flex}.pc-wb>div{flex:1;min-width:0}'+
  '.pc-dock{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);display:flex;gap:10px;padding:8px 12px;border-radius:20px;background:rgba(255,255,255,.18);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.2);z-index:6}'+
  '.pc-ico{position:relative;display:grid;justify-items:center;gap:2px;background:none;border:0;padding:0;cursor:pointer;color:#fff!important}.pc-ico small{font-size:10px;opacity:0;transition:.2s;white-space:nowrap}.pc-ico:hover small,.pc-ico.on small{opacity:1}'+
  '.pc-i{width:50px;height:50px;border-radius:13px;display:grid;place-items:center;font-size:26px;transition:transform .15s;box-shadow:0 4px 10px rgba(0,0,0,.25)}.pc-ico:hover .pc-i{transform:translateY(-4px) scale(1.08)}'+
  '.pc-ico.on::after{content:"";position:absolute;bottom:-5px;width:4px;height:4px;border-radius:50%;background:#fff}'+
  '.ic6-inv{background:linear-gradient(#34c759,#1e9e45)}.ic6-mail{background:linear-gradient(#5ac8fa,#007aff)}.ic6-chat{background:linear-gradient(#bf5af2,#7d3cff)}.ic6-video{background:linear-gradient(#ff453a,#c7162b)}.ic6-news{background:linear-gradient(#ff9f0a,#ff6a00)}.ic6-rakeez{background:#0c1113}'+
  '.ic6-rakeez i{width:28px;height:28px;border-radius:50%;border:5px solid var(--lc);box-shadow:0 0 10px var(--lc);transition:.7s}'+
  '.pc-bdg{position:absolute;top:-5px;inset-inline-end:-5px;min-width:20px;height:20px;border-radius:10px;background:#ff3b30;color:#fff;font:700 11px/20px sans-serif;font-style:normal;text-align:center;padding:0 5px}.pc-bdg[hidden]{display:none}'+
  /* notifications, call, intervention */
  '.pc-nots{position:absolute;top:38px;inset-inline-end:12px;width:320px;display:grid;gap:8px;z-index:8}'+
  '.pc-n{display:flex;gap:10px;align-items:flex-start;text-align:start;background:rgba(245,245,247,.94);backdrop-filter:blur(14px);border:0;border-radius:14px;padding:10px 12px;box-shadow:0 12px 30px rgba(0,0,0,.35);cursor:pointer;color:#1d1d1f!important;animation:pcN .45s cubic-bezier(.2,1.3,.4,1)}'+
  'html[dir=rtl] .pc-n{animation-name:pcNr}@keyframes pcN{from{transform:translateX(120%)}}@keyframes pcNr{from{transform:translateX(-120%)}}'+
  '.pc-n.out{opacity:0;transition:opacity .4s}.pc-n>span{font-size:22px}.pc-n div{flex:1}.pc-n b{font-size:13px}.pc-n p{margin:2px 0 0;font-size:12px;line-height:1.4;color:#3a3a3c}.pc-n small{font-size:11px;color:#8e8e93}'+
  '.pc-call{position:absolute;top:38px;left:50%;transform:translateX(-50%);z-index:9;animation:pcIn .3s}.pc-call[hidden]{display:none}'+
  '.pc-callc{display:flex;align-items:center;gap:12px;background:#1c1c1e;color:#fff;border-radius:16px;padding:12px 14px;box-shadow:0 20px 50px rgba(0,0,0,.5);min-width:380px}'+
  '.pc-cav{width:42px;height:42px;border-radius:50%;background:#3a3a3c;display:grid;place-items:center;font-size:20px}.pc-callc div{flex:1}.pc-callc b{font-size:14px}.pc-callc p{margin:2px 0 0;font-size:12px;opacity:.7}'+
  '.pc-callc button{border:0;border-radius:10px;padding:8px 14px;font-weight:700;color:#fff!important;cursor:pointer}.pc-callc .dec{background:#ff3b30}.pc-callc .acc{background:#30d158;animation:rkSh .6s infinite}'+
  '.pc-int,.pc-done{position:absolute;inset:28px 0 0;z-index:10;display:grid;place-items:center;background:rgba(40,4,6,.78);backdrop-filter:blur(8px);animation:dmIn .4s}.pc-int[hidden],.pc-done[hidden]{display:none}.pc-done{background:rgba(4,30,20,.8)}'+
  '.pc-intc,.pc-donec{width:440px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;color:#fff}.pc-intc>b{font-size:20px;letter-spacing:.08em;color:#ff453a}.pc-intc p{margin:0;font-size:15px;line-height:1.7}.pc-intc>div{display:flex;gap:10px;width:100%}'+
  '.pc-donec>span{font-size:48px}.pc-donec>b{font-size:24px}'+
  '.pc-ib{flex:1;border:0;border-radius:12px;padding:12px 16px;font-weight:700;background:#fff;color:#000!important;cursor:pointer}.pc-ib.pc-ib2{background:rgba(255,255,255,.14);color:#fff!important}'+
  '.pc-m .pc-win{left:10px;right:10px;top:38px}.pc-m .pc-wall{inset-inline-start:24px;top:40px}.pc-m .pc-dock{gap:6px;padding:6px 8px}.pc-m .pc-i{width:44px;height:44px;font-size:22px}'+
  '.pc-m .iv-body{grid-template-columns:1fr;grid-template-rows:auto 1fr}.pc-m .iv-list{max-height:210px;border-inline-end:0;border-bottom:1px solid #eee}.pc-m .iv-row{grid-template-columns:70px 1fr auto;padding:7px}.pc-m .iv-row em{display:none}.pc-m .iv-row>span:nth-child(2){white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
  '.pc-m .ml,.pc-m .ct{grid-template-columns:1fr;grid-template-rows:auto 1fr}.pc-m .ml-list{max-height:180px;border-inline-end:0;border-bottom:1px solid #eee}.pc-m .ct-list{display:flex;overflow-x:auto;border-inline-end:0}.pc-m .ct-row{width:auto;white-space:nowrap}'+
  '.pc-m .vd-grid{grid-template-columns:1fr 1fr}.pc-m .pc-nots{width:calc(100% - 24px)}.pc-m .pc-callc{min-width:0;width:400px}.pc-m .pc-intc,.pc-m .pc-donec{width:88%}.pc-m .pc-intc>div{flex-direction:column}.pc-m .rz{padding:20px}'+
  /* app content */
  '.iv{display:flex;flex-direction:column}.iv-top{position:relative;display:flex;justify-content:space-between;align-items:center;padding:12px 18px;border-bottom:1px solid #eee}.iv-top b{font-size:16px}.iv-top span{font-size:13px;color:#1e9e45;font-weight:600}'+
  '.iv-top i{position:absolute;bottom:-1px;inset-inline-start:0;height:3px;width:var(--p);background:#34c759;transition:width .5s}'+
  '.iv-body{flex:1;display:grid;grid-template-columns:1.25fr 1fr;min-height:0}.iv-list{overflow:auto;border-inline-end:1px solid #eee;padding:8px}'+
  '.iv-row{width:100%;display:grid;grid-template-columns:80px 1fr auto 74px;gap:10px;align-items:center;text-align:start;background:none;border:0;border-radius:8px;padding:10px;font-size:13px;color:#1d1d1f!important;cursor:pointer}.iv-row:hover{background:#f5f5f7}.iv-row.sel{background:#e8f6ec}'+
  '.iv-row span:first-child{color:#8e8e93;font-size:12px}.iv-row em{font-style:normal;font-size:11px;text-align:center;padding:3px 6px;border-radius:6px;background:#fff4e0;color:#b25c00}.iv-row em.ok{background:#e3f7e8;color:#1e9e45}'+
  '.iv-det{padding:16px 20px;overflow:auto}.iv-empty{color:#8e8e93;margin-top:40px;text-align:center}.iv-no{margin:0;color:#8e8e93;font-size:12px}.iv-det h5{margin:4px 0 12px;font-size:17px}'+
  '.iv-det dl{display:grid;grid-template-columns:1fr auto;gap:6px 10px;margin:0 0 14px;font-size:13px}.iv-det dd{margin:0;text-align:end}'+
  '.iv-h{margin:0 0 6px;font-size:12px;color:#8e8e93}.iv-chk{width:100%;display:flex;gap:8px;align-items:center;background:none;border:0;padding:6px 0;font-size:13px;color:#1d1d1f!important;cursor:pointer;text-align:start}.iv-chk i{width:18px;height:18px;border-radius:5px;border:2px solid #c7c7cc;flex:none}.iv-chk.on i{background:#34c759;border-color:#34c759}'+
  '.iv-close{margin-top:12px;width:100%;border:0;border-radius:10px;padding:11px;background:#34c759;color:#fff!important;font-weight:700;cursor:pointer}.iv-close:disabled{background:#d1d1d6;cursor:default}.iv-closed{color:#1e9e45;font-weight:700;margin-top:10px}'+
  '.ml{display:grid;grid-template-columns:260px 1fr}.ml-list{border-inline-end:1px solid #eee;overflow:auto}.ml-row{width:100%;display:grid;gap:2px;text-align:start;background:none;border:0;border-bottom:1px solid #f0f0f2;padding:12px 14px;font-size:13px;color:#1d1d1f!important;cursor:pointer}.ml-row span{color:#6e6e73;font-size:12px}.ml-row.sel{background:#e8f1fd}'+
  '.ml-read{padding:20px}.ml-read h5{margin:0;font-size:18px}.ml-from{color:#007aff;font-size:13px;margin:4px 0 14px}.ml-read p{line-height:1.6}'+
  '.ct{display:grid;grid-template-columns:220px 1fr}.ct-list{background:#f5f3fb;padding:8px;border-inline-end:1px solid #eee}.ct-row{width:100%;display:flex;gap:8px;align-items:center;background:none;border:0;border-radius:8px;padding:9px;font-size:13px;color:#1d1d1f!important;cursor:pointer;text-align:start}.ct-row.sel{background:#e5dcff}.ct-row b{flex:1}.ct-row em{font-style:normal;background:#7d3cff;color:#fff;border-radius:9px;font-size:11px;padding:1px 7px}'+
  '.ct-main{display:flex;flex-direction:column;min-height:0}.ct-msgs{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:8px}.ct-msg{align-self:flex-start;max-width:70%;background:#f1f1f3;border-radius:12px;padding:8px 12px;font-size:13px}.ct-msg b{display:block;font-size:11px;color:#7d3cff}.ct-msg.me{align-self:flex-end;background:#7d3cff;color:#fff}'+
  '.ct-in{display:flex;gap:8px;padding:10px;border-top:1px solid #eee}.ct-in input{flex:1;min-width:0;border:1px solid #ddd;border-radius:10px;padding:8px 12px;font:inherit;font-size:13px;background:#fff;color:#1d1d1f}.ct-in button{border:0;border-radius:10px;background:#7d3cff;color:#fff!important;padding:0 16px;font-weight:700;cursor:pointer}'+
  '.vd-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:16px;align-content:start;background:#0f0f0f}.vd-grid button{display:grid;gap:5px;background:none;border:0;padding:0;text-align:start;color:#fff!important;cursor:pointer}.vd-grid span{aspect-ratio:16/9;border-radius:10px;display:grid;place-items:center;font-size:40px}.vd-grid b{font-size:13px}.vd-grid small{font-size:11px;color:#aaa}'+
  '.vd-play{display:grid;place-items:center;align-content:center;gap:6px;color:#fff;position:relative}.vd-play>span{font-size:90px;animation:dmBob 2s ease-in-out infinite}.vd-play p{margin:0;font-size:18px;font-weight:700}.vd-prog{width:60%;height:4px;background:rgba(255,255,255,.3);border-radius:2px}.vd-prog i{display:block;height:100%;background:#fff;animation:phProg 6s linear}@keyframes phProg{from{width:0}to{width:100%}}'+
  '.vd-play small{opacity:.75}.vd-play button{position:absolute;top:12px;inset-inline-start:12px;border:0;border-radius:8px;background:rgba(0,0,0,.35);color:#fff!important;padding:6px 12px;cursor:pointer}'+
  '.nw{padding:16px 24px;overflow:auto}.nw-item{display:flex;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid #eee;font-size:15px}.nw-item span{width:56px;height:56px;border-radius:10px;background:#f5f5f7;display:grid;place-items:center;font-size:28px}'+
  '.rz{background:#0b0f11;color:#fff;display:flex;flex-direction:column;align-items:center;padding:24px 40px;gap:6px}.rz-ring{width:90px;height:90px;border-radius:50%;border:10px solid var(--lc);box-shadow:0 0 22px var(--lc);display:grid;place-items:center;transition:.7s}.rz-ring i{width:50%;height:50%;border-radius:50%;background:#000}'+
  '.rz>b{font-size:20px;color:var(--lc)}.rz>small{color:#8e8e93}.rz-h{align-self:stretch;margin:14px 0 4px;font-size:12px;color:#8e8e93}.rz-tl{align-self:stretch;display:flex;height:16px;border-radius:5px;overflow:hidden;gap:1px;background:#1c1c1e}.rz-tl i{flex:1}'+
  '.rz-stats{align-self:stretch;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px;width:100%}.rz-stats div{background:rgba(255,255,255,.08);border-radius:12px;padding:10px;display:grid;text-align:center}.rz-stats b{font-size:18px}.rz-stats small{font-size:11px;color:#aaa}'+
  '.pc-intc .rz-ring{width:64px;height:64px;border-width:8px}'+
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
  '@media (max-width:820px){.dm-ov{place-items:start center;padding-top:2.5rem}.rk6-row{grid-template-columns:1fr}.rk6-side{display:none}.rk5-mini{display:flex}.rk6-intro{margin-bottom:1rem}.rk6-intro p{font-size:.92rem}.pc-fit{border-width:6px;border-bottom-width:9px;border-radius:10px}.mk4-phone{height:400px}.mk4-grid{grid-template-columns:1fr}.sn2-cards{grid-template-columns:1fr}.in3-path{grid-template-columns:1fr 1fr}.in3-star span{font-size:.64rem}.in3-sky{height:500px}.in3-hint{font-size:.82rem}.in3-star{padding:.2rem}}'+
  '@media (prefers-reduced-motion:reduce){.demo *{animation-duration:.01s!important;animation-iteration-count:1!important;transition:none!important}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
