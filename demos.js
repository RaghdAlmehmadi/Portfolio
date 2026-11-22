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

  /* ================= Rakeez: the student's phone ================= */
  function rakeez(el){
    var LV=[
      {c:'#30d158', n:'Focused',          d:'On task. Rakeez stays quiet.'},
      {c:'#ffd60a', n:'Early drift',      d:'Attention is slipping. A subtle yellow cue.'},
      {c:'#ff9f0a', n:'Distracted',       d:'A stronger orange cue, with an optional gentle tone.'},
      {c:'#ff453a', n:'Deep distraction', d:'Red. Rakeez steps in.'}
    ];
    var CH=[
      {id:'grad', n:'Graduation project 🎓', av:'🎓', m:[['Reem','Did everyone finish their part?'],['Lama','I’m still on chapter 3 😅'],['Reem','Deadline is tomorrow at 9 AM!'],['Lama','Who is presenting first?'],['Reem','Let’s meet after Maghrib']], un:5},
      {id:'sara', n:'Sara', av:'🌸', m:[['Sara','Did you see the video I sent? 😂😂'],['Sara','Open it, it’s so funny']], un:2},
      {id:'fam',  n:'Family ❤️', av:'🏠', m:[['Mom','Dinner at 8, don’t be late'],['Dad','👍']], un:1},
      {id:'cls',  n:'Class of 2026', av:'📚', m:[['Noura','Who has the lecture slides?'],['Hind','Check the drive folder']], un:0}
    ];
    var REPLY=['😂😂','OK!','Focus on studying first 😄','Talk later?','Haha true','Send me the file'];
    var CLIPS=[['😹','Cats vs cucumbers','#ff6b9a','#ffb36b'],['🍝','5-minute pasta','#f7b733','#fc4a1a'],['⚽','Unbelievable last-minute goal','#11998e','#38ef7d'],['🖥️','My desk setup tour','#4776e6','#8e54e9'],['🏜️','Travel vlog: AlUla','#c79081','#dfa579'],['🫧','Satisfying slime','#00c6ff','#0072ff']];
    var NT=[
      {app:'chat', chat:'sara', from:'Sara', txt:'Did you see the video I sent? 😂'},
      {app:'chat', chat:'grad', from:'Graduation project 🎓', txt:'Reem: Deadline is tomorrow at 9 AM!'},
      {app:'reels', from:'Clips', txt:'A creator you follow posted a new clip'},
      {app:'news', from:'News', txt:'Weekend weather update for Jeddah'},
      {app:'shop', from:'Store', txt:'Flash sale: 50% off ends tonight'},
      {app:'chat', chat:'fam', from:'Family ❤️', txt:'Mom: Dinner at 8, don’t be late'},
      {app:'chat', chat:'cls', from:'Class of 2026', txt:'Noura: Who has the lecture slides?'}
    ];
    var TASKS=['Read section 3.1','Summarize stacks and queues','Solve exercises 1–5','Review before tomorrow’s deadline'];
    var W={chat:-3, reels:-4.5, photos:-2, home:-1.5, call:-2, camera:-1, settings:-1, clock:-1, cal:-1, weather:-1, music:-.5, phone:-1, notes:4, rakeez:1, lock:4};

    function ic(k){
      var I={
        chat:'<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 3.5c-5 0-9 3.4-9 7.6 0 2.2 1.1 4.2 2.9 5.6L5.2 20.5l4-2c.9.2 1.8.3 2.8.3 5 0 9-3.4 9-7.7S17 3.5 12 3.5z"/></svg>',
        reels:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="#fff" stroke-width="2"/><path fill="#fff" d="M10 8.8v6.4l5.4-3.2z"/></svg>',
        notes:'<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="6" fill="#ffd60a"/><path d="M5 12h14M5 15.5h14M5 19h10" stroke="#c7c7cc" stroke-width="1.2"/></svg>',
        phone:'<svg viewBox="0 0 24 24"><path fill="#fff" d="M6.6 3.5c.5-.3 1.1-.2 1.4.3l1.8 3c.3.5.2 1.1-.2 1.4L8.3 9.3c.9 2.2 3.2 4.6 5.4 5.4l1.1-1.3c.4-.4 1-.5 1.4-.2l3 1.8c.5.3.6.9.3 1.4l-1 1.7c-.5.8-1.4 1.2-2.3 1C10.6 18 6 13.4 4.9 7.8c-.2-.9.2-1.8 1-2.3z"/></svg>',
        camera:'<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="12" rx="3" fill="#3a3a3c"/><path d="M8.5 7l1.3-2h4.4l1.3 2" fill="#3a3a3c"/><circle cx="12" cy="13" r="3.6" fill="none" stroke="#fff" stroke-width="1.6"/></svg>',
        settings:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.5" fill="none" stroke="#3a3a3c" stroke-width="3" stroke-dasharray="2.2 1.6"/><circle cx="12" cy="12" r="3.4" fill="none" stroke="#3a3a3c" stroke-width="1.8"/></svg>',
        music:'<svg viewBox="0 0 24 24"><path fill="#fff" d="M17 4v10.2a2.8 2.8 0 1 1-1.6-2.5V7.4L10 8.6v7.6a2.8 2.8 0 1 1-1.6-2.5V6.3z"/></svg>',
        weather:'<svg viewBox="0 0 24 24"><circle cx="15" cy="9" r="3.6" fill="#ffd60a"/><path fill="#fff" d="M7.5 18.5a3.5 3.5 0 0 1-.4-7 4.6 4.6 0 0 1 8.8 1.3 3 3 0 0 1-.4 5.7z"/></svg>',
        photos:'<svg viewBox="0 0 24 24">'+['#ff9f0a','#ffd60a','#30d158','#64d2ff','#0a84ff','#bf5af2','#ff375f','#ff453a'].map(function(c,i){ return '<ellipse cx="12" cy="7.2" rx="2.6" ry="4.6" fill="'+c+'" opacity=".85" transform="rotate('+(i*45)+' 12 12)"/>'; }).join('')+'</svg>',
        clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6" fill="#fff"/><path d="M12 6.5V12l3.6 2.2" stroke="#1c1c1e" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M12 12l-4 3" stroke="#ff9f0a" stroke-width="1"/></svg>',
        rakeez:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.6" fill="none" class="ph-rkring" stroke-width="2.6"/><circle cx="12" cy="12" r="4.4" fill="#000"/></svg>'
      };
      if(k==='cal'){ var d=new Date(); return '<div class="ph-calic"><small>'+esc(d.toLocaleDateString(AR?'ar':'en-US',{weekday:'short'}))+'</small><b>'+d.toLocaleDateString(AR?'ar':'en-US',{day:'numeric'})+'</b></div>'; }
      return I[k]||'';
    }
    var NAMES={chat:'Chats',reels:'Clips',notes:'Notes',phone:'Phone',camera:'Camera',settings:'Settings',music:'Music',weather:'Weather',photos:'Photos',clock:'Clock',cal:'Calendar',rakeez:'Rakeez'};
    function icon(k, badge){ return '<button type="button" class="ph-app" data-open="'+k+'"><span class="ph-ic ic-'+k+'">'+ic(k)+(badge?'<i class="ph-badge">'+num(badge)+'</i>':'')+'</span><span class="ph-lbl">'+esc(t(NAMES[k]))+'</span></button>'; }

    shell(el,
      '<div class="rk5">'+
        '<div class="rk5-txt"><h3>'+esc(t('The phone on the desk'))+'</h3>'+
          '<p>'+esc(t('This is the phone of a student in a study session, with a deadline tomorrow. Unlock it and use it freely, as if it were yours. Rakeez sits on the desk and reads focus from the moment you pick it up.'))+'</p>'+
          '<div class="rk5-dev" data-lv="0"><i class="rk4-glow"></i><i class="rk4-ring"></i><div class="rk4-face"><b>Rakeez</b></div><div class="rk4-bub" hidden>'+esc(t('Time to get back to your task.'))+'</div></div>'+
          '<p class="rk5-name"></p><p class="rk5-desc" aria-live="polite"></p>'+
          '<div class="rk4-scale"><div class="rk4-bar">'+LV.map(function(l){ return '<i style="background:'+l.c+'"></i>'; }).join('')+'<b class="rk4-mark"></b></div><ol>'+LV.map(function(l){ return '<li>'+esc(t(l.n))+'</li>'; }).join('')+'</ol></div>'+
          '<p class="rk5-tip">'+esc(t('Tip: the notes app and the lock screen bring focus back.'))+'</p>'+
        '</div>'+
        '<div class="ph-wrap"><div class="rk5-mini" aria-hidden="true"><span class="rk5-mring"></span><b class="rk5-mname"></b><span class="rk5-mbar">'+LV.map(function(l){ return '<i style="background:'+l.c+'"></i>'; }).join('')+'<b></b></span></div><div class="ph"><button type="button" class="ph-side" aria-label="'+esc(t('Lock'))+'"></button><div class="ph-scr">'+
          '<div class="ph-island"></div>'+
          '<div class="ph-status"><span class="ph-time"></span><span class="ph-sig">▂▄▆ <svg viewBox="0 0 24 12" width="22"><rect x=".5" y=".5" width="20" height="11" rx="3" fill="none" stroke="currentColor" opacity=".5"/><rect x="2" y="2" width="12" height="8" rx="1.5" fill="currentColor"/></svg></span></div>'+
          '<div class="ph-view"></div>'+
          '<div class="ph-banner" hidden></div>'+
          '<div class="ph-call" hidden></div>'+
          '<div class="ph-int" hidden></div>'+
          '<button type="button" class="ph-homebar" aria-label="'+esc(t('Home'))+'"></button>'+
        '</div></div></div>'+
      '</div>');

    var ph=q(el,'.ph'), view=q(el,'.ph-view'), banner=q(el,'.ph-banner'), callL=q(el,'.ph-call'), intL=q(el,'.ph-int');
    var S={scr:'lock', app:null, chat:null, f:100, lv:0, hist:[], secs:0, onTask:0, inter:0, snooze:0, call:null, called:false, nextN:6, ntIdx:0, clip:0, likes:{}, done:{}, bTimer:null, ac:null};
    var nf=function(o){ return new Intl.DateTimeFormat(AR?'ar':'en-US',o); };
    function clock(){ return nf({hour:'numeric',minute:'2-digit',hour12:!AR}).format(new Date()).replace(/\s?[AP]M$/,''); }
    function totalUnread(){ return CH.reduce(function(a,c){ return a+c.un; },0); }
    function mmss(s){ var m=Math.floor(s/60), x=Math.floor(s%60); return num(m+':'+(x<10?'0':'')+x); }

    /* ---- screens ---- */
    function lock(){
      var d=new Date();
      var date=nf({weekday:'long',day:'numeric',month:'long'}).format(d)+(AR?' · '+new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura',{day:'numeric',month:'long'}).format(d):'');
      var ns=NT.slice(0,Math.min(3,S.ntIdx+2)).map(function(n){ return nItem(n); }).join('');
      view.innerHTML='<div class="ph-lock"><p class="ph-ldate">'+esc(date)+'</p><p class="ph-lclock">'+clock()+'</p>'+
        '<div class="ph-live"><span class="ph-livedot"></span><div><b>Rakeez · '+esc(t('Focus session'))+'</b><small class="ph-livest"></small></div><span class="ph-livet mono">'+mmss(S.secs)+'</span></div>'+
        '<div class="ph-nots">'+ns+'</div>'+
        '<button type="button" class="ph-unlock" data-act="unlock">'+esc(t('Swipe up to open'))+'</button></div>';
    }
    function nItem(n){ return '<button type="button" class="ph-n" data-act="openN" data-i="'+NT.indexOf(n)+'"><span class="ph-ic sm ic-'+(n.app==='news'||n.app==='shop'?'settings':n.app)+'">'+(n.app==='news'?'📰':n.app==='shop'?'🛍️':ic(n.app))+'</span><span class="ph-nb"><b>'+esc(t(n.from))+'</b><span>'+esc(t(n.txt))+'</span></span><small>'+esc(t('now'))+'</small></button>'; }
    function home(){
      view.innerHTML='<div class="ph-home">'+
        '<div class="ph-grid">'+
          '<button type="button" class="ph-widget" data-open="rakeez"><span class="ph-wh">Rakeez</span><span class="ph-wring"><i></i></span><b class="ph-wst"></b><small>'+esc(t('Focus time'))+' <span class="ph-wft">'+mmss(S.onTask)+'</span></small></button>'+
          icon('cal')+icon('clock')+icon('photos')+icon('camera')+icon('notes')+icon('weather')+icon('rakeez')+icon('settings')+
        '</div>'+
        '<div class="ph-dock">'+icon('phone',S.called&&!S.call?1:0)+icon('chat',totalUnread())+icon('reels')+icon('music')+'</div></div>';
      qa(view,'.ph-dock .ph-lbl').forEach(function(l){ l.remove(); });
      paintLive();
    }
    function bar(title, back){ return '<div class="ph-nav">'+(back?'<button type="button" class="ph-back" data-act="'+back+'">‹ '+esc(t(back==='chats'?'Chats':'Back'))+'</button>':'')+'<h4>'+esc(t(title))+'</h4></div>'; }
    var APPS={
      chat:function(){
        if(S.chat) return chatView();
        return '<div class="ph-app-s ph-dark">'+bar('Chats')+'<div class="ph-search">'+esc(t('Search'))+'</div>'+
          CH.map(function(c){ var last=c.m[c.m.length-1]; return '<button type="button" class="ph-chat" data-act="chat" data-id="'+c.id+'"><span class="ph-av">'+c.av+'</span><span class="ph-cb"><b>'+esc(t(c.n))+'</b><span>'+esc(t(last[1]))+'</span></span>'+(c.un?'<i class="ph-un">'+num(c.un)+'</i>':'')+'</button>'; }).join('')+'</div>';
      },
      reels:function(){
        var c=CLIPS[S.clip%CLIPS.length], liked=S.likes[S.clip%CLIPS.length];
        return '<div class="ph-reel" style="background:linear-gradient(160deg,'+c[2]+','+c[3]+')" data-act="nextclip"><span class="ph-reel-e">'+c[0]+'</span>'+
          '<div class="ph-reel-side"><button type="button" data-act="like" class="'+(liked?'on':'')+'">♥<small>'+num((12+S.clip*7)+(liked?1:0)+'K')+'</small></button><button type="button">💬<small>'+num(340+S.clip*21)+'</small></button><button type="button">↗</button></div>'+
          '<div class="ph-reel-cap"><b>@creator'+(S.clip%CLIPS.length+1)+'</b><span>'+esc(t(c[1]))+'</span></div><div class="ph-reel-prog"><i></i></div><p class="ph-reel-hint">'+esc(t('Tap for the next clip'))+'</p></div>';
      },
      notes:function(){
        return '<div class="ph-app-s ph-paper">'+bar('Notes','home')+'<h5>'+esc(t('Chapter 3: Data structures'))+'</h5><p class="ph-nsub">'+esc(t('Study plan for today'))+'</p>'+
          TASKS.map(function(x,i){ return '<button type="button" class="ph-task'+(S.done[i]?' on':'')+'" data-act="task" data-i="'+i+'"><i></i>'+esc(t(x))+'</button>'; }).join('')+
          '<p class="ph-nbody">'+esc(t('A stack follows last in, first out. A queue follows first in, first out. Both appear in tomorrow’s submission.'))+'</p></div>';
      },
      rakeez:function(){
        var segs=S.hist.slice(-60).map(function(l){ return '<i style="background:'+LV[l].c+'"></i>'; }).join('');
        return '<div class="ph-app-s ph-dark">'+bar('Rakeez','home')+'<div class="ph-rkbig"><span class="ph-wring big"><i></i></span><b class="ph-wst"></b><small>'+esc(t('Connected to the desk device'))+'</small></div>'+
          '<p class="ph-rkh">'+esc(t('This session'))+'</p><div class="ph-tl">'+(segs||'<i style="background:#30d158"></i>')+'</div>'+
          '<div class="ph-rkstats"><div><b class="ph-wft">'+mmss(S.onTask)+'</b><small>'+esc(t('Focus time'))+'</small></div><div><b>'+mmss(S.secs)+'</b><small>'+esc(t('Session'))+'</small></div><div><b>'+num(S.inter)+'</b><small>'+esc(t('Interventions'))+'</small></div></div></div>';
      },
      phone:function(){ return '<div class="ph-app-s ph-dark">'+bar('Recents','home')+[['Sara',S.called?'Missed':'Yesterday'],['Mom','Yesterday'],['Reem','Monday']].map(function(r){ return '<div class="ph-row"><b'+(r[1]==='Missed'?' class="red"':'')+'>'+esc(t(r[0]))+'</b><small>'+esc(t(r[1]))+'</small></div>'; }).join('')+'</div>'; },
      cal:function(){ return '<div class="ph-app-s ph-dark">'+bar('Calendar','home')+'<div class="ph-ev"><i style="background:#30d158"></i><div><b>'+esc(t('Study session'))+'</b><small>'+esc(t('Today · 4:00–6:00 PM'))+'</small></div></div><div class="ph-ev"><i style="background:#ff453a"></i><div><b>'+esc(t('Graduation project deadline'))+'</b><small>'+esc(t('Tomorrow · 9:00 AM'))+'</small></div></div></div>'; },
      clock:function(){ return '<div class="ph-app-s ph-dark ph-center">'+bar('Clock','home')+'<p class="ph-bigclock">'+clock()+'</p></div>'; },
      weather:function(){ return '<div class="ph-app-s ph-sky ph-center">'+bar('Weather','home')+'<p class="ph-city">'+esc(t('Jeddah'))+'</p><p class="ph-deg">'+num('31°')+'</p><p>'+esc(t('Sunny'))+'</p></div>'; },
      photos:function(){ var s=''; for(var i=0;i<18;i++) s+='<i style="background:hsl('+(i*47%360)+',55%,'+(45+i%3*10)+'%)"></i>'; return '<div class="ph-app-s ph-dark">'+bar('Photos','home')+'<div class="ph-pgrid">'+s+'</div></div>'; },
      camera:function(){ return '<div class="ph-app-s ph-cam">'+bar('Camera','home')+'<div class="ph-vf"></div><span class="ph-shut"></span></div>'; },
      settings:function(){ return '<div class="ph-app-s ph-dark">'+bar('Settings','home')+['Wi-Fi','Bluetooth','Notifications','Focus','Rakeez'].map(function(r,i){ return '<div class="ph-row"><b>'+esc(t(r))+'</b><span class="ph-tg'+(i!==3?' on':'')+'"></span></div>'; }).join('')+'</div>'; },
      music:function(){ return '<div class="ph-app-s ph-dark ph-center">'+bar('Music','home')+'<div class="ph-art">🎧</div><b>'+esc(t('Lo-fi study beats'))+'</b><small>'+esc(t('Study playlist'))+'</small><div class="ph-mctl">⏮ ⏸ ⏭</div></div>'; }
    };
    function chatView(){
      var c=CH.filter(function(x){ return x.id===S.chat; })[0];
      return '<div class="ph-app-s ph-dark ph-chatv">'+bar(c.n,'chats')+'<div class="ph-msgs">'+c.m.map(function(m){ var me=m[0]==='me';
        return '<div class="ph-msg'+(me?' me':'')+'">'+(me||c.id==='sara'?'':'<b>'+esc(t(m[0]))+'</b>')+esc(me?m[1]:t(m[1]))+'</div>'; }).join('')+'</div>'+
        '<form class="ph-input"><input type="text" placeholder="'+esc(t('Message'))+'" aria-label="'+esc(t('Message'))+'"><button type="submit">➤</button></form></div>';
    }
    function render(){
      ph.setAttribute('data-scr', S.scr==='app'?'app-'+S.app:S.scr);
      if(S.scr==='lock') lock(); else if(S.scr==='home') home(); else { view.innerHTML=APPS[S.app](); if(S.app==='chat'&&S.chat) wireChat(); }
      paintLive();
    }
    function open(k){ S.scr='app'; S.app=k; if(k!=='chat') S.chat=null; render(); }
    function wireChat(){
      var c=CH.filter(function(x){ return x.id===S.chat; })[0], box=q(view,'.ph-msgs'); box.scrollTop=1e5; c.un=0;
      q(view,'.ph-input').addEventListener('submit',function(e){ e.preventDefault(); var i=q(view,'.ph-input input'), v=i.value.trim(); if(!v) return;
        c.m.push(['me',v]); i.value=''; render();
        setTimeout(function(){ c.m.push([c.id==='sara'?'Sara':c.m[0][0], pickR(REPLY)]); if(S.scr==='app'&&S.app==='chat'&&S.chat===c.id) render(); }, 1300);
      });
    }
    /* ---- overlays ---- */
    function showBanner(n){
      banner.innerHTML=nItem(n); banner.hidden=false; banner.classList.remove('in'); void banner.offsetWidth; banner.classList.add('in');
      clearTimeout(S.bTimer); S.bTimer=setTimeout(function(){ banner.hidden=true; }, 4200);
      ph.classList.remove('buzz'); void ph.offsetWidth; ph.classList.add('buzz');
    }
    function ring(){
      S.called=true; S.call='ring';
      callL.innerHTML='<div class="ph-callin"><p class="ph-cn">'+esc(t('Sara'))+'</p><p class="ph-cs">'+esc(t('mobile'))+'</p><div class="ph-cav">🌸</div>'+
        '<div class="ph-cbtns"><button type="button" class="dec" data-act="decline">✕<small>'+esc(t('Decline'))+'</small></button><button type="button" class="acc" data-act="accept">✆<small>'+esc(t('Accept'))+'</small></button></div></div>';
      callL.hidden=false; ph.classList.add('ringing');
    }
    function endCall(){ S.call=null; callL.hidden=true; ph.classList.remove('ringing'); render(); }
    function intervene(){
      S.inter++; intL.hidden=false;
      intL.innerHTML='<div class="ph-intc"><span class="ph-wring big"><i></i></span><b>Rakeez</b><p>'+esc(t('You have been away from your study plan for a while. Your deadline is tomorrow at 9 AM.'))+'</p>'+
        '<button type="button" class="ph-ib" data-act="backtask">'+esc(t('Back to my notes'))+'</button><button type="button" class="ph-ib ph-ib2" data-act="snooze">'+esc(t('Two more minutes'))+'</button></div>';
    }
    /* ---- focus model ---- */
    function ctx(){ if(S.call==='talk') return 'call'; if(S.scr==='lock') return 'lock'; if(S.scr==='home') return 'home'; return S.app; }
    function level(f){ return f>=75?0 : f>=50?1 : f>=25?2 : 3; }
    function tone(l){ if(l<2 || !S.sound) return; }
    function paintLive(){
      var L=LV[S.lv];
      el.style.setProperty('--lc', L.c);
      q(el,'.rk5-dev').setAttribute('data-lv',S.lv);
      q(el,'.rk5-name').textContent=t(L.n); q(el,'.rk5-mname').textContent=t(L.n); q(el,'.rk5-mbar b').style.insetInlineStart='calc('+Math.min(97,Math.max(1,100-S.f))+'% - 2px)'; q(el,'.rk5-mini').classList.toggle('red',S.lv===3); q(el,'.rk5-desc').textContent=t(L.d);
      q(el,'.rk4-bub').hidden=S.lv<3;
      q(el,'.rk4-mark').style.insetInlineStart='calc('+Math.min(97,Math.max(1,100-S.f))+'% - 2px)';
      qa(el,'.rk4-scale li').forEach(function(li,i){ li.classList.toggle('on',i===S.lv); });
      qa(view,'.ph-wst,.ph-livest').forEach(function(x){ x.textContent=t(L.n); });
      qa(view,'.ph-wft').forEach(function(x){ x.textContent=mmss(S.onTask); });
      var lt=q(view,'.ph-livet'); if(lt) lt.textContent=mmss(S.secs);
      var tm=q(el,'.ph-time'); tm.textContent=clock();
    }
    function tick(){
      S.secs++; var c=ctx(), w=W[c]; if(w===undefined) w=-1;
      if(!intL.hidden) w=0;
      S.f=Math.max(0,Math.min(100,S.f+w*1.6)); if(c==='notes'||c==='lock') S.onTask++;
      var n=level(S.f); S.lv=n; S.hist.push(n); if(S.hist.length>300) S.hist.shift();
      if(S.snooze>0) S.snooze--;
      if(n===3 && intL.hidden && S.snooze<=0 && !S.call) intervene();
      if(S.scr==='app'&&S.app==='rakeez'){ var tl=q(view,'.ph-tl'); if(tl) tl.innerHTML=S.hist.slice(-60).map(function(l){ return '<i style="background:'+LV[l].c+'"></i>'; }).join(''); }
      if(S.scr==='lock' && S.secs%30===0) lock();
      S.nextN--;
      if(S.nextN<=0 && !S.call && intL.hidden){ var nn=NT[S.ntIdx%NT.length]; S.ntIdx++; var ch=CH.filter(function(x){ return x.id===nn.chat; })[0]; if(ch && !(S.scr==='app'&&S.chat===ch.id)) ch.un++; showBanner(nn); if(S.scr==='home') home(); S.nextN=Math.round(rnd(9,15)); }
      if(!S.called && S.secs>=28 && S.scr!=='lock' && intL.hidden) ring();
      if(S.call==='talk'){ var ct=q(callL,'.ph-ctime'); S.ctime=(S.ctime||0)+1; if(ct) ct.textContent=mmss(S.ctime); }
      if(S.scr==='app'&&S.app==='reels' && S.secs%5===0){ S.clip++; render(); }
      paintLive();
    }
    /* ---- events ---- */
    ph.addEventListener('click',function(e){
      var a=e.target.closest('[data-act],[data-open]'); if(!a || !ph.contains(a)) return;
      var k=a.getAttribute('data-act'), o=a.getAttribute('data-open');
      if(o){ open(o); return; }
      if(k==='unlock'){ S.scr='home'; render(); }
      else if(k==='home'){ S.scr='home'; S.chat=null; render(); }
      else if(k==='chats'){ S.chat=null; render(); }
      else if(k==='chat'){ S.chat=a.getAttribute('data-id'); render(); }
      else if(k==='openN'){ var n=NT[+a.getAttribute('data-i')]; banner.hidden=true; if(S.scr==='lock') S.scr='home';
        if(n.app==='chat'){ S.scr='app'; S.app='chat'; S.chat=n.chat; render(); } else if(n.app==='reels') open('reels'); else { if(S.scr!=='app') S.scr='home'; render(); } }
      else if(k==='nextclip'){ if(e.target.closest('.ph-reel-side')) return; S.clip++; render(); }
      else if(k==='like'){ var i=S.clip%CLIPS.length; S.likes[i]=!S.likes[i]; render(); }
      else if(k==='task'){ var j=+a.getAttribute('data-i'); S.done[j]=!S.done[j]; if(S.done[j]) S.f=Math.min(100,S.f+8); render(); }
      else if(k==='decline'){ endCall(); }
      else if(k==='accept'){ S.call='talk'; S.ctime=0; ph.classList.remove('ringing');
        callL.innerHTML='<div class="ph-callin talk"><p class="ph-cn">'+esc(t('Sara'))+'</p><p class="ph-cs ph-ctime mono">0:00</p><div class="ph-cav">🌸</div><p class="ph-cq">'+esc(t('“Did you see the video?! Open it now 😂”'))+'</p><div class="ph-cbtns"><button type="button" class="dec" data-act="decline">✕<small>'+esc(t('End'))+'</small></button></div></div>'; }
      else if(k==='backtask'){ intL.hidden=true; S.snooze=12; open('notes'); }
      else if(k==='snooze'){ intL.hidden=true; S.snooze=20; }
    });
    q(el,'.ph-homebar').addEventListener('click',function(){ if(S.call) return; if(S.scr==='lock'){ S.scr='home'; } else { S.scr='home'; S.chat=null; } render(); });
    q(el,'.ph-side').addEventListener('click',function(){ if(S.call) return; S.scr='lock'; S.chat=null; intL.hidden=true; render(); });
    var y0=null;
    view.addEventListener('pointerdown',function(e){ if(S.scr==='lock') y0=e.clientY; });
    view.addEventListener('pointerup',function(e){ if(S.scr==='lock' && y0!==null && y0-e.clientY>50){ S.scr='home'; render(); } y0=null; });
    render();
    var loop=null;
    onScreen(el,function(){ if(!loop) loop=setInterval(tick,1000); },function(){ clearInterval(loop); loop=null; });
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
  '.rk5{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:clamp(1.4rem,5vw,4rem);align-items:center}'+
  '.rk5-txt{display:grid;justify-items:center;text-align:center}'+
  '.rk5-txt h3{margin:0 0 .5rem;font-size:clamp(1.5rem,3vw,2.2rem);color:var(--fg)}.rk5-txt>p:first-of-type{margin:0 0 1.6rem;color:var(--body);line-height:1.7;max-width:44ch}'+
  '.rk5-dev{--sp:3.4s;position:relative;width:min(170px,40vw);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 30%,#2a3236,#0c1113 72%);box-shadow:inset 0 2px 0 rgba(255,255,255,.08),0 26px 40px -18px rgba(0,0,0,.8);margin:1.2rem 0 1rem}'+
  '.rk5-dev[data-lv="1"]{--sp:2.2s}.rk5-dev[data-lv="2"]{--sp:1.2s}.rk5-dev[data-lv="3"]{--sp:.55s;animation:rkSh .6s ease-in-out infinite}'+
  '@keyframes rkSh{25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}'+
  '.rk4-ring{position:absolute;inset:8%;border-radius:50%;border:7px solid var(--lc);box-shadow:0 0 22px var(--lc),inset 0 0 16px var(--lc);transition:border-color .7s,box-shadow .7s}'+
  '.rk4-glow{position:absolute;inset:-18%;border-radius:50%;background:radial-gradient(circle,var(--lc) 0%,transparent 62%);opacity:.4;animation:rkp var(--sp) ease-in-out infinite}'+
  '@keyframes rkp{50%{opacity:.08;transform:scale(.94)}}'+
  '.rk4-face{position:absolute;inset:27%;border-radius:50%;background:#050809;display:grid;place-items:center}.rk4-face b{font-size:.75rem;letter-spacing:.08em;color:var(--lc);transition:color .7s}'+
  '.rk4-bub{position:absolute;top:-22%;left:50%;transform:translateX(-50%);white-space:nowrap;background:#ff453a;color:#fff;font-weight:700;font-size:.82rem;padding:.45rem .85rem;border-radius:12px;animation:dmPop .35s}.rk4-bub::after{content:"";position:absolute;bottom:-6px;left:50%;margin-left:-6px;border:6px solid transparent;border-bottom:0;border-top-color:#ff453a}'+
  '.rk5-name{margin:0;font-size:clamp(1.3rem,2.6vw,1.8rem);font-weight:800;color:var(--lc);transition:color .7s}.rk5-desc{margin:.2rem 0 1rem;color:var(--body);min-height:1.6em}'+
  '.rk4-scale{width:100%;max-width:380px}.rk4-bar{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:3px;height:10px}.rk4-bar i{border-radius:4px;opacity:.85}'+
  '.rk4-mark{position:absolute;top:-6px;width:4px;height:22px;border-radius:2px;background:#fff;box-shadow:0 0 8px #fff;transition:inset-inline-start .9s linear}'+
  '.rk4-scale ol{list-style:none;margin:.45rem 0 0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);font-size:.72rem;color:var(--mute)}.rk4-scale li.on{color:var(--fg);font-weight:700}'+
  '.rk5-tip{margin:1.2rem 0 0;font-size:.85rem;color:var(--mute)}'+
  /* phone */
  '.rk5-mini{display:none;align-items:center;gap:.6rem;width:min(300px,calc(100vw - 72px));margin-bottom:.8rem;padding:.55rem .8rem;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid var(--line2)}'+
  '.rk5-mring{flex:none;width:28px;height:28px;border-radius:50%;border:4px solid var(--lc);box-shadow:0 0 12px var(--lc);transition:.7s}.rk5-mini.red .rk5-mring{animation:rkSh .6s infinite}'+
  '.rk5-mname{font-size:.9rem;color:var(--lc);white-space:nowrap;transition:color .7s}'+
  '.rk5-mbar{position:relative;flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:2px;height:7px}.rk5-mbar i{border-radius:3px}.rk5-mbar b{position:absolute;top:-4px;width:3px;height:15px;border-radius:2px;background:#fff;transition:inset-inline-start .9s linear}'+
  '.ph-wrap{display:grid;place-items:center}'+
  '.ph{position:relative;width:min(300px,calc(100vw - 72px),calc((100svh - 170px) * 300 / 630));aspect-ratio:300/630;border-radius:50px;padding:10px;background:#1c1c1e;box-shadow:0 0 0 2px #3a3a3c,0 50px 80px -30px rgba(0,0,0,.9);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,sans-serif;color:#fff;text-align:start}'+
  'html[lang=ar] .ph{font-family:"IBM Plex Sans Arabic",-apple-system,system-ui,sans-serif}'+
  '.ph.buzz{animation:phBz .45s}.ph.ringing{animation:phBz .5s infinite}@keyframes phBz{20%,60%{transform:translateX(-2px) rotate(-.6deg)}40%,80%{transform:translateX(2px) rotate(.6deg)}}'+
  '.ph-side{position:absolute;inset-inline-end:-4px;top:22%;width:4px;height:70px;border:0;border-radius:2px;background:#3a3a3c;padding:0}'+
  'html[dir=rtl] .ph-side{inset-inline-end:auto;inset-inline-start:-4px}'+
  '.ph-scr{position:relative;width:100%;height:100%;border-radius:40px;overflow:hidden;background:radial-gradient(120% 80% at 30% 0%,#4b2a8a,#1a1440 45%,#0b0b1a 80%)}'+
  '.ph[data-scr^=app] .ph-scr{background:#000}'+
  '.ph-island{position:absolute;top:9px;left:50%;transform:translateX(-50%);width:34%;height:26px;border-radius:14px;background:#000;z-index:9}'+
  '.ph-status{position:absolute;top:0;left:0;right:0;height:44px;display:flex;justify-content:space-between;align-items:center;padding:0 24px;font-size:.72rem;font-weight:600;z-index:8;direction:ltr}'+
  '.ph-sig{display:flex;align-items:center;gap:4px;letter-spacing:-1px;font-size:.6rem}'+
  '.ph[data-scr=lock] .ph-time{visibility:hidden}'+
  '.ph-view{position:absolute;inset:0;overflow:hidden}'+
  '.ph button{font-family:inherit}'+
  '.ph-homebar{position:absolute;bottom:7px;left:50%;transform:translateX(-50%);width:36%;height:5px;border:0;border-radius:3px;background:rgba(255,255,255,.85);z-index:12;padding:0;cursor:pointer}'+
  '.ph[data-scr=app-notes] .ph-homebar,.ph[data-scr=app-weather] .ph-homebar{background:rgba(0,0,0,.6)}'+
  /* lock */
  '.ph-lock{height:100%;display:flex;flex-direction:column;align-items:center;padding:52px 12px 18px;cursor:grab}'+
  '.ph-ldate{margin:0;font-size:.82rem;font-weight:600;opacity:.9}.ph-lclock{margin:0;font-size:4.2rem;font-weight:700;line-height:1.05;letter-spacing:-1px;background:linear-gradient(#fff,#cfd2ff);-webkit-background-clip:text;color:transparent}'+
  '.ph-live{width:100%;display:flex;align-items:center;gap:.6rem;margin:.8rem 0 .5rem;padding:.6rem .75rem;border-radius:18px;background:rgba(0,0,0,.55);backdrop-filter:blur(10px)}'+
  '.ph-livedot{width:26px;height:26px;border-radius:50%;border:4px solid var(--lc);box-shadow:0 0 10px var(--lc);flex:none;transition:.7s}.ph-live div{flex:1;display:grid;font-size:.72rem}.ph-live small{color:var(--lc);font-weight:700}.ph-livet{font-size:.8rem}'+
  '.ph-nots{width:100%;display:grid;gap:.4rem}'+
  '.ph-n{width:100%;display:flex;gap:.55rem;align-items:flex-start;text-align:start;background:rgba(40,40,60,.55);backdrop-filter:blur(14px);border:0;border-radius:16px;padding:.55rem .6rem;color:#fff!important;cursor:pointer}'+
  '.ph-nb{flex:1;display:grid;font-size:.68rem;line-height:1.35}.ph-nb b{font-size:.72rem}.ph-nb span{opacity:.9}.ph-n small{font-size:.6rem;opacity:.6}'+
  '.ph-unlock{margin-top:auto;background:none;border:0;color:#fff!important;font-size:.72rem;opacity:.75;padding:.4rem;animation:phUp 2s ease-in-out infinite}@keyframes phUp{50%{transform:translateY(-4px)}}'+
  /* home */
  '.ph-home{height:100%;display:flex;flex-direction:column;padding:54px 14px 16px;animation:phZoom .35s ease-out}@keyframes phZoom{from{transform:scale(1.08);opacity:0}}'+
  '.ph-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px 8px;align-content:start}'+
  '.ph-app{display:grid;justify-items:center;gap:4px;background:none;border:0;padding:0;color:#fff!important;cursor:pointer;min-width:0}'+
  '.ph-app:active .ph-ic{transform:scale(.9)}'+
  '.ph-ic{position:relative;width:52px;height:52px;max-width:100%;aspect-ratio:1;border-radius:14px;display:grid;place-items:center;overflow:visible;transition:transform .15s}.ph-ic svg{width:64%;height:64%}'+
  '.ph-ic.sm{width:30px;height:30px;border-radius:8px;flex:none;font-size:.9rem}'+
  '.ph-lbl{font-size:.6rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}'+
  '.ph-badge{position:absolute;top:-5px;inset-inline-end:-5px;min-width:19px;height:19px;padding:0 4px;border-radius:10px;background:#ff3b30;color:#fff;font:700 .62rem/19px sans-serif;font-style:normal;text-align:center}'+
  '.ic-chat{background:linear-gradient(#5af07a,#20c03f)}.ic-reels{background:linear-gradient(135deg,#ff2d76,#ff8a00)}.ic-notes{background:#fff;overflow:hidden}.ic-notes svg{width:100%;height:100%}.ic-phone{background:linear-gradient(#5af07a,#20c03f)}'+
  '.ic-camera{background:linear-gradient(#e5e5ea,#aeaeb2)}.ic-settings{background:linear-gradient(#e5e5ea,#8e8e93)}.ic-music{background:linear-gradient(#ff5f7e,#ff2d55)}.ic-weather{background:linear-gradient(#5ac8fa,#0a84ff)}'+
  '.ic-photos{background:#fff}.ic-clock{background:#000}.ic-rakeez{background:#0c1113}.ic-cal{background:#fff;color:#000}'+
  '.ph-rkring{stroke:var(--lc);transition:stroke .7s}'+
  '.ph-calic{display:grid;justify-items:center;line-height:1}.ph-calic small{font-size:.55rem;color:#ff3b30;font-weight:700}.ph-calic b{font-size:1.45rem;font-weight:400}'+
  '.ph-widget{grid-column:span 2;grid-row:span 2;border:0;border-radius:20px;background:rgba(10,14,16,.75);backdrop-filter:blur(10px);display:grid;justify-items:center;align-content:center;gap:.25rem;color:#fff!important;padding:.6rem;cursor:pointer}'+
  '.ph-wh{font-size:.62rem;opacity:.7;letter-spacing:.06em}.ph-widget b{font-size:.8rem;color:var(--lc)}.ph-widget small{font-size:.6rem;opacity:.75}'+
  '.ph-wring{width:44px;height:44px;border-radius:50%;border:5px solid var(--lc);box-shadow:0 0 12px var(--lc);display:grid;place-items:center;transition:.7s}.ph-wring i{width:55%;height:55%;border-radius:50%;background:#000}.ph-wring.big{width:90px;height:90px;border-width:9px}'+
  '.ph-dock{margin-top:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;justify-items:center;padding:10px;border-radius:26px;background:rgba(255,255,255,.18);backdrop-filter:blur(16px)}'+
  /* apps */
  '.ph-app-s{height:100%;overflow-y:auto;padding:48px 14px 22px;animation:phIn .28s ease-out;scrollbar-width:none}.ph-app-s::-webkit-scrollbar{display:none}@keyframes phIn{from{transform:scale(.92);opacity:0}}'+
  '.ph-dark{background:#000}.ph-nav{display:grid;gap:.2rem;margin-bottom:.6rem}.ph-nav h4{margin:0;font-size:1.45rem;font-weight:800;color:#fff}.ph-back{justify-self:start;background:none;border:0;padding:0;color:#0a84ff!important;font-size:.8rem}'+
  '.ph-search{background:#1c1c1e;border-radius:10px;padding:.45rem .7rem;font-size:.75rem;color:#8e8e93;margin-bottom:.4rem}'+
  '.ph-chat{width:100%;display:flex;align-items:center;gap:.6rem;background:none;border:0;border-bottom:1px solid #1c1c1e;padding:.6rem 0;text-align:start;color:#fff!important}'+
  '.ph-av{width:40px;height:40px;border-radius:50%;background:#2c2c2e;display:grid;place-items:center;font-size:1.2rem;flex:none}.ph-cb{flex:1;min-width:0;display:grid;font-size:.72rem}.ph-cb b{font-size:.8rem}.ph-cb span{color:#8e8e93;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
  '.ph-un{min-width:20px;height:20px;border-radius:10px;background:#30d158;color:#000;font:700 .62rem/20px sans-serif;font-style:normal;text-align:center;padding:0 5px}'+
  '.ph-chatv{display:flex;flex-direction:column;padding-bottom:16px}.ph-chatv .ph-nav h4{font-size:1rem}'+
  '.ph-msgs{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:.35rem;padding:.3rem 0;scrollbar-width:none}'+
  '.ph-msg{align-self:flex-start;max-width:80%;background:#1f2c34;border-radius:14px;padding:.4rem .6rem;font-size:.74rem;line-height:1.4}.ph-msg b{display:block;font-size:.62rem;color:#ff9f0a}.ph-msg.me{align-self:flex-end;background:#005c4b}'+
  '.ph-input{display:flex;gap:.4rem;margin-top:.4rem}.ph-input input{flex:1;min-width:0;background:#1c1c1e;border:0;border-radius:18px;padding:.5rem .8rem;color:#fff;font:inherit;font-size:.75rem}.ph-input button{width:34px;height:34px;border-radius:50%;border:0;background:#30d158;color:#000!important;font-size:.8rem}'+
  '.ph-reel{position:relative;height:100%;display:grid;place-items:center;cursor:pointer;animation:phIn .3s}.ph-reel-e{font-size:5.5rem;animation:dmBob 2s ease-in-out infinite}'+
  '.ph-reel-side{position:absolute;inset-inline-end:10px;bottom:90px;display:grid;gap:.9rem}.ph-reel-side button{background:none;border:0;color:#fff!important;font-size:1.3rem;display:grid;justify-items:center;text-shadow:0 1px 4px rgba(0,0,0,.4)}.ph-reel-side button.on{color:#ff2d55!important}.ph-reel-side small{font-size:.58rem}'+
  '.ph-reel-cap{position:absolute;inset-inline-start:14px;bottom:44px;display:grid;font-size:.75rem;max-width:70%;text-shadow:0 1px 4px rgba(0,0,0,.5)}'+
  '.ph-reel-prog{position:absolute;left:14px;right:14px;bottom:34px;height:2px;background:rgba(255,255,255,.3)}.ph-reel-prog i{display:block;height:100%;background:#fff;animation:phProg 5s linear}@keyframes phProg{from{width:0}to{width:100%}}'+
  '.ph-reel-hint{position:absolute;top:54px;margin:0;font-size:.62rem;opacity:.7}'+
  '.ph-paper{background:#fffdf5;color:#1c1c1e}.ph-paper .ph-nav h4{color:#1c1c1e}.ph-paper .ph-back{color:#c9a400!important}'+
  '.ph-paper h5{margin:.2rem 0;font-size:1rem}.ph-nsub{margin:0 0 .6rem;font-size:.7rem;color:#8e8e93}'+
  '.ph-task{width:100%;display:flex;gap:.5rem;align-items:center;background:none;border:0;padding:.42rem 0;font-size:.78rem;color:#1c1c1e!important;text-align:start}.ph-task i{width:18px;height:18px;border-radius:50%;border:2px solid #c7c7cc;flex:none}.ph-task.on{color:#8e8e93!important;text-decoration:line-through}.ph-task.on i{background:#ffd60a;border-color:#ffd60a}'+
  '.ph-nbody{font-size:.74rem;line-height:1.6;color:#3a3a3c;margin-top:.6rem}'+
  '.ph-rkbig{display:grid;justify-items:center;gap:.35rem;margin:.6rem 0 1rem}.ph-rkbig b{font-size:1.1rem;color:var(--lc)}.ph-rkbig small{font-size:.66rem;color:#8e8e93}'+
  '.ph-rkh{margin:0 0 .35rem;font-size:.7rem;color:#8e8e93}.ph-tl{display:flex;height:14px;border-radius:5px;overflow:hidden;gap:1px;background:#1c1c1e}.ph-tl i{flex:1}'+
  '.ph-rkstats{display:grid;grid-template-columns:repeat(3,1fr);gap:.4rem;margin-top:.9rem}.ph-rkstats div{background:#1c1c1e;border-radius:12px;padding:.5rem;display:grid;text-align:center}.ph-rkstats b{font-size:.9rem}.ph-rkstats small{font-size:.56rem;color:#8e8e93}'+
  '.ph-row{display:flex;justify-content:space-between;align-items:center;padding:.65rem 0;border-bottom:1px solid #1c1c1e;font-size:.78rem}.ph-row small{color:#8e8e93}.ph-row .red{color:#ff453a}'+
  '.ph-tg{width:38px;height:22px;border-radius:11px;background:#39393d;position:relative}.ph-tg::after{content:"";position:absolute;top:2px;inset-inline-start:2px;width:18px;height:18px;border-radius:50%;background:#fff}.ph-tg.on{background:#30d158}.ph-tg.on::after{inset-inline-start:18px}'+
  '.ph-ev{display:flex;gap:.6rem;padding:.6rem;border-radius:12px;background:#1c1c1e;margin-bottom:.4rem}.ph-ev i{width:4px;border-radius:2px}.ph-ev div{display:grid;font-size:.76rem}.ph-ev small{color:#8e8e93}'+
  '.ph-center{text-align:center}.ph-bigclock{font-size:3.4rem;margin:3rem 0;font-weight:200}.ph-sky{background:linear-gradient(#3a8ee6,#7fc4fd);color:#fff}.ph-city{margin:1.6rem 0 0;font-size:1.1rem}.ph-deg{margin:0;font-size:4.2rem;font-weight:200}'+
  '.ph-pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}.ph-pgrid i{aspect-ratio:1}'+
  '.ph-cam{background:#000;display:flex;flex-direction:column}.ph-vf{flex:1;border-radius:8px;background:radial-gradient(circle at 50% 40%,#3a3a3c,#111)}.ph-shut{width:56px;height:56px;border-radius:50%;border:4px solid #fff;background:#fff;box-shadow:inset 0 0 0 3px #000;margin:.8rem auto 0}'+
  '.ph-art{width:150px;height:150px;margin:1.4rem auto .8rem;border-radius:16px;background:linear-gradient(135deg,#5e5ce6,#bf5af2);display:grid;place-items:center;font-size:3.4rem}.ph-center b{display:block}.ph-center small{color:#8e8e93;font-size:.7rem}.ph-mctl{margin-top:1rem;font-size:1.3rem;letter-spacing:.6rem;direction:ltr}'+
  /* overlays */
  '.ph-banner{position:absolute;top:40px;left:8px;right:8px;z-index:10}.ph-banner[hidden]{display:none}.ph-banner.in{animation:phDrop .45s cubic-bezier(.2,1.3,.4,1)}@keyframes phDrop{from{transform:translateY(-140%)}}.ph-banner .ph-n{background:rgba(30,30,40,.9);box-shadow:0 10px 30px rgba(0,0,0,.5)}'+
  '.ph-call{position:absolute;inset:0;z-index:11;background:linear-gradient(#2c2c3e,#0d0d14);animation:phIn .3s}.ph-call[hidden]{display:none}'+
  '.ph-callin{height:100%;display:flex;flex-direction:column;align-items:center;padding:70px 20px 40px;text-align:center}.ph-cn{margin:0;font-size:1.6rem}.ph-cs{margin:.2rem 0;font-size:.8rem;opacity:.7}.ph-cav{width:90px;height:90px;border-radius:50%;background:#3a3a4c;display:grid;place-items:center;font-size:2.6rem;margin:1.4rem 0}'+
  '.ph-cq{font-size:.78rem;opacity:.85;max-width:22ch}.ph-cbtns{margin-top:auto;display:flex;gap:4rem}.ph-cbtns button{width:62px;height:62px;border-radius:50%;border:0;color:#fff!important;font-size:1.4rem;display:grid;place-items:center;position:relative}.ph-cbtns small{position:absolute;top:70px;font-size:.66rem;white-space:nowrap}'+
  '.ph-cbtns .dec{background:#ff3b30}.ph-cbtns .acc{background:#30d158;animation:phBz .6s infinite}'+
  '.ph-int{position:absolute;inset:0;z-index:12;display:grid;place-items:center;padding:18px;background:rgba(40,4,6,.82);backdrop-filter:blur(8px);animation:dmIn .4s}.ph-int[hidden]{display:none}'+
  '.ph-intc{display:flex;flex-direction:column;align-items:center;gap:.6rem;width:100%;text-align:center}.ph-intc b{font-size:1.05rem;letter-spacing:.08em;color:#ff453a}.ph-intc p{margin:0;font-size:.8rem;line-height:1.6}'+
  '.ph-ib{margin:0;position:static;width:100%;border:0;border-radius:14px;padding:.7rem;font-weight:700;background:#fff;color:#000!important;font-size:.8rem}.ph-ib.ph-ib2{background:rgba(255,255,255,.12);color:#fff!important}'+
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
  '@media (max-width:820px){.dm-ov{place-items:start center;padding-top:2.5rem}.rk5{grid-template-columns:1fr}.rk5-dev,.rk5-name,.rk5-desc,.rk4-scale,.rk5-tip{display:none}.rk5-txt>p:first-of-type{margin-bottom:0}.rk5-mini{display:flex}.mk4-phone{height:400px}.mk4-grid{grid-template-columns:1fr}.sn2-cards{grid-template-columns:1fr}.in3-path{grid-template-columns:1fr 1fr}.in3-star span{font-size:.64rem}.in3-sky{height:500px}.in3-hint{font-size:.82rem}.in3-star{padding:.2rem}}'+
  '@media (prefers-reduced-motion:reduce){.demo *{animation-duration:.01s!important;animation-iteration-count:1!important;transition:none!important}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
