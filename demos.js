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
    var INV=[
      ['INV-2041','Al-Noor Office Supplies',24,[['Printer paper A4 (box)',40,180],['Toner cartridges',8,650]]],
      ['INV-2042','Delta Logistics',24,[['Freight: Jeddah to Riyadh',5,6200],['Warehouse handling',1,7750]]],
      ['INV-2043','Bright IT Services',25,[['Laptop maintenance',12,950],['Network audit',1,10500]]],
      ['INV-2044','Red Sea Catering',26,[['Team lunch, 40 guests',40,165],['Coffee service',1,2000]]],
      ['INV-2045','Summit Print House',27,[['Business cards (boxes)',20,96],['Brochures',400,8.5]]],
      ['INV-2046','Coastline Maintenance',29,[['HVAC servicing',4,2800],['Plumbing repairs',1,6000]]]
    ];
    INV.forEach(function(v){ v.sub=v[3].reduce(function(a,l){ return a+l[1]*l[2]; },0); });
    var CHK=['Purchase order matched','Goods received','Amount verified'];
    var COL={Manager:'#e8590c',Abdullah:'#1c7ed6',Faisal:'#2f9e44',Noura:'#c2255c',Hind:'#7048e8',HR:'#0c8599',Lama:'#0ca678',me:'#7d3cff'};
    var CH=[
      {id:'fin', n:'Finance team', kind:'ch', sub:'8 members', m:[['Abdullah','Who is closing the November invoices?','9:12'],['Manager','Please finish them before 4 PM','9:15']], un:2,
       turns:[[['I’m on it 👍','Manager','Great, thank you! Ping me when it’s done.'],['Can someone take half of them?','Abdullah','Sorry, I’m stuck on the Q4 report today 😅'],['Give me ten more minutes','Manager','OK, but no later than 4 PM please.']],
              [['Will do','Manager','👍'],['Is the Delta Logistics invoice approved?','Abdullah','Yes, the purchase order was matched yesterday.']]]},
      {id:'gen', n:'Company announcements', kind:'ch', sub:'42 members', m:[['HR','Reminder: team building next Thursday afternoon 🎉','8:30']], un:0, turns:[]},
      {id:'fs', n:'Faisal', kind:'dm', sub:'Active now', m:[['Faisal','Did you see last night’s match? ⚽','10:02'],['Faisal','That last goal 🔥','10:02']], un:2,
       turns:[[['Yes! What a goal 😍','Faisal','Unbelievable, right? I still can’t believe it.'],['Not yet, no spoilers!','Faisal','Too late 😂 they won 3–1.'],['Not now, I’m closing invoices','Faisal','Fair enough, talk after work 👋',1]],
              [['Haha, send me the highlights','Faisal','Sent! Check Clips 🎬',0,'clip'],['OK, back to work now','Faisal','Deal, talk later 🤝']]]},
      {id:'mgr', n:'Manager', kind:'dm', sub:'Finance Manager', at:15, m:[['Manager','How is it going with the invoices?','14:45']], un:0,
       turns:[[['Almost there, a few left','Manager','Great, keep going 💪'],['Honestly, I’ve been distracted','Manager','It happens. Silence the notifications and give it 20 focused minutes 🙂'],['Can I get an extension?','Manager','Sorry, finance needs them at 4 PM sharp.']],
              [['OK 👍','Manager','👍'],['On it now','Manager','Thanks!']]]},
      {id:'lama', n:'Lama · Procurement', kind:'dm', sub:'Procurement team', at:30, m:[['Lama','Hi! Did you receive the Bright IT Services invoice? They say they sent it twice 😅','15:00']], un:0,
       turns:[[['Yes, it’s already in Ledger','Lama','Perfect, thanks! I’ll let them know.'],['Let me check and get back to you','Lama','Sure, no rush… well, a little rush 😄'],['Which one, the first or the second?','Lama','The second one. The first had the wrong amount.']]]},
      {id:'lun', n:'Lunch crew 🍔', kind:'ch', sub:'Faisal, Noura, +3', at:42, m:[['Faisal','Burger place or shawarma? 🍔🌯','15:12'],['Noura','Shawarma!!','15:12']], un:0,
       turns:[[['Shawarma 🌯','Faisal','Shawarma it is! Ordering now.'],['Burger 🍔','Noura','Traitor 😂 OK, burgers.'],['I’ll skip, deadline today','Faisal','Respect. We’ll bring you something 🫡']]]},
      {id:'cof', n:'Coffee corner ☕', kind:'ch', sub:'Noura, Hind', m:[['Noura','Anyone up for coffee?','10:20'],['Hind','In 5 minutes!','10:21']], un:1,
       turns:[[['Count me in ☕','Noura','Yay! Meet you in the lobby.'],['I can’t, deadline today','Hind','Good luck! We’ll save you a cup 💪'],['Could you bring me a latte? 🙏','Noura','Got it, one latte on its way ☕']]]}
    ];
    var MAIL=[
      ['Manager','Invoices due today','Please close all pending November invoices in Ledger before 4 PM. Finance needs them for the monthly report.','9:05','#e8590c',1],
      ['Newsletter','Your weekly digest','Ten articles picked for you this week, from productivity tips to the latest in tech.','8:40','#868e96',1],
      ['Store','Flash sale: 50% off','Tonight only. Thousands of products at half price. Do not miss out.','8:12','#d6336c',1],
      ['HR','Team building next week','Save the date for Thursday afternoon. Details to follow.','Yesterday','#0c8599',0]
    ];
    var NEWS=[['📈','Stock markets close higher today','Markets','#2b8a3e'],['📱','New phone launch event announced','Tech','#1971c2'],['✈️','Top 10 winter travel destinations','Travel','#e67700'],['☀️','Weekend weather: mild and sunny','Weather','#0c8599'],['⚽','Local team wins the derby','Sport','#c92a2a']];
    var CLIPS=[['😹','Cats vs cucumbers','#ff6b9a','#ffb36b','Funny Pets','4:12'],['🍝','5-minute pasta','#f7b733','#fc4a1a','Quick Kitchen','6:30'],['⚽','Unbelievable last-minute goal','#11998e','#38ef7d','Match Day','2:48'],['🖥️','My desk setup tour','#4776e6','#8e54e9','Tech Corner','11:05'],['🏜️','Travel vlog: AlUla','#c79081','#dfa579','Wander KSA','14:20'],['🫧','Satisfying slime','#00c6ff','#0072ff','Calm Corner','8:01']];
    var NT=[
      {app:'chat', chat:'fs', from:'Faisal', txt:'Did you see last night’s match? ⚽'},
      {app:'mail', from:'Mail', txt:'New email: Your weekly digest'},
      {app:'video', from:'Clips', txt:'A channel you follow posted a new video'},
      {app:'news', from:'News', txt:'Breaking: New phone launch event announced'},
      {app:'chat', chat:'cof', from:'Coffee corner ☕', txt:'Noura: Anyone up for coffee?'},
      {app:'chat', chat:'fin', from:'# finance', txt:'Abdullah: Who is closing the November invoices?'},
      {app:'mail', from:'Mail', txt:'Store: Flash sale, 50% off tonight'}
    ];
    var W={inv:4, rakeez:1, mail:-1.2, chat:-3, video:-4.5, news:-3, desk:-1.5, call:-2};
    var NM={inv:'Ledger', mail:'Mail', chat:'Chats', video:'Clips', news:'News', rakeez:'Rakeez'};

    var G={
      inv:'<rect width="50" height="50" rx="12" fill="url(#gInv)"/><path d="M16 11h18v28l-3-2-3 2-3-2-3 2-3-2-3 2z" fill="#fff"/><path d="M20 18h10M20 23h10M20 28h6" stroke="#1e9e45" stroke-width="2" stroke-linecap="round"/>',
      mail:'<rect width="50" height="50" rx="12" fill="url(#gMail)"/><rect x="10" y="15" width="30" height="21" rx="3" fill="#fff"/><path d="M11 17l14 10 14-10" fill="none" stroke="#1971c2" stroke-width="2"/>',
      chat:'<rect width="50" height="50" rx="12" fill="url(#gChat)"/><path d="M25 10.5a14.5 14.5 0 0 0-12.6 21.7L10.5 39.5l7.6-2A14.5 14.5 0 1 0 25 10.5z" fill="#fff"/><circle cx="19" cy="25" r="2.2" fill="#1fa855"/><circle cx="25" cy="25" r="2.2" fill="#1fa855"/><circle cx="31" cy="25" r="2.2" fill="#1fa855"/>',
      video:'<rect width="50" height="50" rx="12" fill="url(#gVid)"/><rect x="10" y="14" width="30" height="22" rx="6" fill="#fff"/><path d="M22 20v10l9-5z" fill="#e03131"/>',
      news:'<rect width="50" height="50" rx="12" fill="url(#gNews)"/><rect x="11" y="12" width="28" height="26" rx="3" fill="#fff"/><rect x="15" y="16" width="20" height="5" rx="1" fill="#e8590c"/><path d="M15 26h9M15 30h9M15 34h9" stroke="#adb5bd" stroke-width="2"/><rect x="27" y="25" width="8" height="10" rx="1" fill="#ffd8a8"/>',
      rakeez:'<rect width="50" height="50" rx="12" fill="#0c1113"/><g transform="translate(7 7) scale(.5625)"><path d="M32 4a28 28 0 1 1-28 28" fill="none" stroke="#1B8FA6" stroke-width="6" stroke-linecap="round"/><circle cx="32" cy="32" r="16.5" fill="none" stroke="#14C7BE" stroke-width="5"/><circle cx="32" cy="32" r="6.5" fill="#8FEFE3"/></g>',
      trash:'<rect width="50" height="50" rx="12" fill="rgba(255,255,255,.22)"/><path d="M17 17h16l-1.5 20h-13z" fill="none" stroke="#fff" stroke-width="2"/><path d="M15 17h20M22 14h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M22 21v12M28 21v12" stroke="#fff" stroke-width="1.5" opacity=".7"/>'
    };
    var DEFS='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'+
      '<linearGradient id="gInv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#51cf66"/><stop offset="1" stop-color="#2b8a3e"/></linearGradient>'+
      '<linearGradient id="gMail" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#74c0fc"/><stop offset="1" stop-color="#1971c2"/></linearGradient>'+
      '<linearGradient id="gChat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fd77c"/><stop offset="1" stop-color="#1fa855"/></linearGradient>'+
      '<linearGradient id="gVid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset="1" stop-color="#c92a2a"/></linearGradient>'+
      '<linearGradient id="gNews" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffa94d"/><stop offset="1" stop-color="#e8590c"/></linearGradient>'+
      '</defs></svg>';
    function ico(k){ return '<svg viewBox="0 0 50 50" aria-hidden="true">'+G[k]+'</svg>'; }
    var WA=(function(){
      function s(d,w){ return '<svg viewBox="0 0 24 24" width="'+(w||20)+'" height="'+(w||20)+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>'; }
      var doodle='<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none" stroke="#d3cabc" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".7">'+
        '<path d="M14 18h22a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H24l-6 5v-5h-4a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4z"/><circle cx="96" cy="26" r="8"/><path d="M92 26h8M96 22v8"/>'+
        '<path d="M130 60l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z"/><path d="M30 80c6-8 16-8 22 0M34 92h14"/><rect x="70" y="70" width="20" height="16" rx="3"/><path d="M74 70v-4h12v4"/>'+
        '<path d="M108 112a10 10 0 1 1 0 .1"/><path d="M20 128l10-10 8 8 12-14"/><path d="M60 130h18M69 121v18"/><path d="M140 130c-4-6-12-6-14 0-2 6 7 10 7 14 0-4 9-8 7-14z"/></svg>';
      return {
        bg:"url(&quot;data:image/svg+xml,"+encodeURIComponent(doodle).replace(/'/g,'%27')+"&quot;)",
        grp:'<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" fill="#dfe5e7"/><circle cx="15" cy="16" r="5" fill="#fff"/><circle cx="26" cy="15" r="5.5" fill="#fff"/><path d="M4 34c1-7 6-10 11-10s9 3 10 10zM15 34c1-8 6-11 11-11s9 3 10 11z" fill="#fff"/></svg>',
        newc:s('<path d="M4 20l1.5-4.5A8 8 0 1 1 9 19z"/><path d="M12 8v6M9 11h6"/>'),
        dots:s('<circle cx="12" cy="5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/>'),
        vid:s('<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="M16 10l5-3v10l-5-3"/>'),
        emoji:s('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><circle cx="9" cy="10" r=".8" fill="currentColor"/><circle cx="15" cy="10" r=".8" fill="currentColor"/>',22),
        plus:s('<path d="M12 5v14M5 12h14"/>',22),
        mic:s('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',22)
      };
    })();
    var SV={
      search:'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
      wifi:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 9.5a13 13 0 0 1 18 0M6.5 13a8 8 0 0 1 11 0M10 16.5a3 3 0 0 1 4 0"/><circle cx="12" cy="19.5" r=".9" fill="currentColor"/></svg>',
      bat:'<svg viewBox="0 0 28 14" width="24" height="12"><rect x=".7" y=".7" width="23.6" height="12.6" rx="3.5" fill="none" stroke="currentColor" opacity=".55"/><rect x="2.5" y="2.5" width="17" height="9" rx="2" fill="currentColor"/><rect x="25.3" y="4.5" width="1.8" height="5" rx="1" fill="currentColor" opacity=".55"/></svg>',
      folder:'<svg viewBox="0 0 48 40"><path d="M2 6a3 3 0 0 1 3-3h13l4 5h21a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" fill="#4dabf7"/><path d="M2 13h44v22a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" fill="#74c0fc"/></svg>',
      xlsx:'<svg viewBox="0 0 40 48"><path d="M4 2h22l10 10v32a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#fff"/><path d="M26 2v10h10" fill="#dee2e6"/><rect x="7" y="22" width="26" height="16" rx="2" fill="#2b8a3e"/><path d="M15 26l10 8M25 26l-10 8" stroke="#fff" stroke-width="2.4"/></svg>',
      pdf:'<svg viewBox="0 0 40 48"><path d="M4 2h22l10 10v32a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#fff"/><path d="M26 2v10h10" fill="#dee2e6"/><rect x="7" y="22" width="26" height="14" rx="2" fill="#e03131"/><text x="20" y="32.5" text-anchor="middle" font-size="9" font-weight="700" fill="#fff" font-family="sans-serif">PDF</text></svg>',
      img:'<svg viewBox="0 0 40 48"><path d="M4 2h22l10 10v32a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#fff"/><path d="M26 2v10h10" fill="#dee2e6"/><rect x="7" y="20" width="26" height="18" rx="2" fill="#a5d8ff"/><path d="M7 34l8-8 6 6 4-4 8 8v0a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" fill="#1c7ed6"/><circle cx="27" cy="25" r="2.5" fill="#ffd43b"/></svg>'
    };
    var DAYF=function(d,o){ return new Intl.DateTimeFormat(AR?'ar':'en-US',o).format(d); };
    function due(d){ return DAYF(new Date(2026,10,d),{day:'numeric',month:'short'}); }
    function sar(n){ var s=n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); return AR ? num(s)+' ر.س' : 'SAR '+s; }
    function mmss(s){ var m=Math.floor(s/60), x=Math.floor(s%60); return num(m+':'+(x<10?'0':'')+x); }
    var START=870, DEAD=960;
    function tod(min){ var d=new Date(); d.setHours(Math.floor(min/60),min%60,0,0); return DAYF(d,{hour:'numeric',minute:'2-digit'}); }
    function clock(){ return tod(START+Math.min(S.secs,DEAD-START+30)); }
    function leftTxt(){ var l=Math.max(0,DEAD-START-S.secs); return l>0 ? num(l)+' '+t(l===1?'minute left':'minutes left') : t('Deadline passed'); }
    function hm(s){ if(!/^\d/.test(s)) return t(s); var p=s.split(':'); var d=new Date(); d.setHours(+p[0],+p[1]); return DAYF(d,{hour:'numeric',minute:'2-digit'}); }
    function ini(x){ return String(x).replace(/^#\s*/,'').replace(/^ال/,'').charAt(0); }
    function av(name,size){ var c=COL[name]||'#495057'; return '<span class="tm-av" style="background:'+c+'">'+esc(ini(name==='me'?t('You'):t(name)))+'</span>'; }

    var files=[['folder','Q4 Reports',0],['xlsx','Invoices_November.xlsx','inv'],['pdf','Budget_2026.pdf',0],['folder','Contracts',0],['img','Screenshot 10.42.png',0]];
    shell(el,
      '<div class="rk6">'+DEFS+
        '<div class="rk6-intro"><h3>'+esc(t('A workday with Rakeez'))+'</h3><p>'+esc(t('An interactive simulation of how Rakeez works. In front of you is an employee’s work computer and one urgent task: close this month’s invoices before the end of the day. Use it as your own, and watch Rakeez read your focus moment by moment, then step in at the right time to bring you back to the task.'))+'</p></div>'+
        '<div class="rk5-mini" aria-hidden="true"><span class="rk5-mring"></span><b class="rk5-mname"></b><span class="rk5-mbar">'+LV.map(function(l){ return '<i style="background:'+l.c+'"></i>'; }).join('')+'<b></b></span></div>'+
        '<div class="rk6-row of">'+
          '<div class="fx-bg" aria-hidden="true"><i class="fx-au"></i><i class="fx-au fx-au2"></i><i class="fx-rings"></i></div>'+
          '<div class="pc"><div class="pc-fit"><div class="pc-scr">'+
            '<div class="pc-bar"><span class="pc-logo" aria-hidden="true"></span><b class="pc-appname"></b>'+
              '<span class="pc-menus">'+['File','Edit','View','Window','Help'].map(function(x){ return '<span>'+esc(t(x))+'</span>'; }).join('')+'</span>'+
              '<span class="pc-r"><i class="pc-rkdot" title="Rakeez"></i>'+SV.wifi+'<span class="pc-bat">'+SV.bat+num('82%')+'</span>'+SV.search+'<span class="pc-date"></span><span class="pc-clock"></span></span></div>'+
            '<div class="pc-desk"><div class="pc-wp" aria-hidden="true"><i></i><i></i><i></i></div>'+
              '<div class="pc-widgets">'+
                '<div class="pc-wcal"><div class="pc-wch"><small class="pc-wday"></small><b class="pc-wnum"></b></div><ul>'+
                  '<li style="--c:#ff6b6b"><b>'+esc(t('Close November invoices'))+'</b><small>'+esc(t('Due 4:00 PM'))+' · <span class="pc-wleft"></span></small></li>'+
                  '<li style="--c:#4dabf7"><b>'+esc(t('Team sync'))+'</b><small>'+esc(t('3:30 PM, video call'))+'</small></li></ul></div>'+
                '<div class="pc-wnote"><b>'+esc(t('To do'))+'</b><p>'+esc(t('Check VAT on every invoice before closing ✔'))+'</p></div>'+
              '</div>'+
              '<div class="pc-files">'+files.map(function(f){ return '<button type="button" class="pc-file"'+(f[2]?' data-open="'+f[2]+'"':' data-act="sel"')+'><span>'+SV[f[0]]+'</span><small>'+esc(t(f[1]))+'</small></button>'; }).join('')+'</div>'+
            '</div>'+
            '<div class="pc-win" hidden><div class="pc-wt"><span class="pc-dots"><i data-act="close" title="Close"></i><i data-act="close" title="Minimize"></i><i data-act="zoom" title="Zoom"></i></span><b class="pc-wtitle"></b></div><div class="pc-wb"></div></div>'+
            '<div class="pc-nots"></div><div class="pc-call" hidden></div><div class="pc-int" hidden></div><div class="pc-done" hidden></div>'+
            '<div class="pc-lock"><div class="pc-lk-t"><small class="pc-lk-date"></small><b class="pc-lk-clock"></b></div><div class="pc-lk-u"><span class="pc-lk-av"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="16" r="7" fill="#fff"/><path d="M6 38c2-9 8-13 14-13s12 4 14 13z" fill="#fff"/></svg></span><b>'+esc(t('Accountant'))+'</b><small>'+esc(t('Finance team'))+'</small><p>'+esc(t('Today’s task: close November invoices before 4:00 PM.'))+'</p><button type="button" class="pc-lk-go" data-act="start">'+esc(t('Start the workday'))+'</button></div></div>'+
            '<div class="pc-dock">'+['inv','mail','chat','video','news','rakeez'].map(function(k){ return '<button type="button" class="pc-ico" data-open="'+k+'"><span class="pc-i">'+ico(k)+'</span><em class="pc-bdg" hidden></em><small>'+esc(t(NM[k]))+'</small></button>'; }).join('')+
              '<span class="pc-sep"></span><span class="pc-ico pc-trash"><span class="pc-i">'+ico('trash')+'</span></span></div>'+
          '</div></div><div class="pc-stand"></div></div>'+
          '<div class="rk6-side">'+
                        '<div class="rk6-card"><p class="rk5-name"></p><p class="rk5-desc" aria-live="polite"></p>'+
            '<div class="rk4-scale"><div class="rk4-bar">'+LV.map(function(l){ return '<i style="background:'+l.c+'"></i>'; }).join('')+'<b class="rk4-mark"></b></div><ol>'+LV.map(function(l){ return '<li>'+esc(t(l.n))+'</li>'; }).join('')+'</ol></div>'+'</div>'+
            '<div class="rk5-dev" data-lv="0"><span class="fx-son" aria-hidden="true"><i></i><i></i><i></i></span><i class="rk4-glow"></i><i class="rk4-ring"></i><div class="rk4-face"><b>Rakeez</b></div><div class="rk4-bub" hidden>'+esc(t('Time to get back to your task.'))+'</div></div>'+
          '</div>'+
        '</div>'+
      '</div>');

    var scr=q(el,'.pc-scr'), fit=q(el,'.pc-fit'), win=q(el,'.pc-win'), wb=q(el,'.pc-wb'), nots=q(el,'.pc-nots'), callL=q(el,'.pc-call'), intL=q(el,'.pc-int'), doneL=q(el,'.pc-done'), lock=q(el,'.pc-lock');
    var S={fh:[], ilog:[], play:true, vt:0, sub:{}, like:{}, app:null, max:false, f:100, lv:0, hist:[], secs:0, onTask:0, inter:0, snooze:0, call:null, called:false, started:false, nextN:12, ni:0, inv:0, filt:'all', closed:{}, chk:{}, chat:'fin', step:{}, typing:null, mail:0, clip:null, done:false};
    function scale(){ var m=fit.clientWidth<560, bw=m?440:1000, bh=m?720:625; scr.classList.toggle('pc-m',m); fit.style.aspectRatio=bw+'/'+bh; scr.style.width=bw+'px'; scr.style.height=bh+'px'; scr.style.transform='scale('+(fit.clientWidth/bw)+')'; }
    if('ResizeObserver' in window) new ResizeObserver(scale).observe(fit); scale();
    function nClosed(){ return Object.keys(S.closed).length; }
    function unread(){ return CH.reduce(function(a,c){ return a+c.un; },0); }
    function chatById(id){ return CH.filter(function(x){ return x.id===id; })[0]; }

    var APP={
      inv:function(){
        var pend=INV.length-nClosed(), pAmt=INV.reduce(function(a,v,i){ return a+(S.closed[i]?0:v.sub*1.15); },0);
        var rows=INV.map(function(v,i){
          var st=S.closed[i]?'closed':'pending'; if(S.filt!=='all' && S.filt!==st) return '';
          return '<button type="button" class="ldg-row'+(S.inv===i?' sel':'')+'" data-act="inv" data-i="'+i+'"><span class="mono">'+v[0]+'</span><span class="ldg-sup">'+esc(t(v[1]))+'</span><span>'+due(v[2])+'</span><b>'+sar(v.sub*1.15)+'</b><em class="'+st+'">'+esc(t(S.closed[i]?'Closed':'Pending'))+'</em></button>'; }).join('');
        var v=INV[S.inv], c=S.chk[S.inv]||{}, all=CHK.every(function(_,j){ return c[j]; }), vat=v.sub*.15;
        var det='<div class="ldg-paper'+(S.closed[S.inv]?' is-closed':'')+'"><div class="ldg-ph"><div><b>'+esc(t(v[1]))+'</b><small>'+esc(t('Tax invoice'))+' · <span class="mono">'+v[0]+'</span></small></div><span class="ldg-qr" aria-hidden="true"></span></div>'+
          '<table><thead><tr><th>'+esc(t('Item'))+'</th><th>'+esc(t('Qty'))+'</th><th>'+esc(t('Amount'))+'</th></tr></thead><tbody>'+v[3].map(function(l){ return '<tr><td>'+esc(t(l[0]))+'</td><td>'+num(l[1])+'</td><td>'+sar(l[1]*l[2])+'</td></tr>'; }).join('')+'</tbody></table>'+
          '<dl><dt>'+esc(t('Subtotal'))+'</dt><dd>'+sar(v.sub)+'</dd><dt>'+esc(t('VAT 15%'))+'</dt><dd>'+sar(vat)+'</dd><dt><b>'+esc(t('Total'))+'</b></dt><dd><b>'+sar(v.sub+vat)+'</b></dd></dl>'+
          '<span class="ldg-stamp">'+esc(t('CLOSED'))+'</span></div>'+
          (S.closed[S.inv] ? '<p class="iv-closed">✓ '+esc(t('Invoice closed'))+'</p>' :
          '<p class="iv-h">'+esc(t('Review before closing'))+'</p>'+CHK.map(function(x,j){ return '<button type="button" class="iv-chk'+(c[j]?' on':'')+'" data-act="chk" data-j="'+j+'"><i></i>'+esc(t(x))+'</button>'; }).join('')+
          '<button type="button" class="iv-close" data-act="closeinv"'+(all?'':' disabled')+'>'+esc(t('Close invoice'))+'</button>');
        return '<div class="lg"><aside class="ldg-side"><div class="ldg-org"><span class="ldg-mark">L</span><div><b>Ledger</b><small>'+esc(t('Finance department'))+'</small></div></div>'+
            ['Dashboard','Invoices','Suppliers','Purchase orders','Reports'].map(function(x,i){ return '<span class="ldg-nav'+(i===1?' on':'')+'"><i>'+['▦','🧾','🏢','📦','📊'][i]+'</i>'+esc(t(x))+(i===1&&pend?'<em>'+num(pend)+'</em>':'')+'</span>'; }).join('')+
            '<div class="ldg-user"><span class="tm-av" style="background:#7d3cff">'+esc(ini(t('You')))+'</span><div><b>'+esc(t('Accountant'))+'</b><small>'+esc(t('Finance team'))+'</small></div></div></aside>'+
          '<section class="ldg-main"><div class="ldg-tool"><h4>'+esc(t('November invoices'))+'</h4><span class="ldg-search">'+SV.search+esc(t('Search invoices'))+'</span></div>'+
            '<div class="ldg-kpis"><div><small>'+esc(t('Pending amount'))+'</small><b>'+sar(pAmt)+'</b></div><div><small>'+esc(t('Closed'))+'</small><b>'+num(nClosed()+' / '+INV.length)+'</b></div><div class="red"><small>'+esc(t('Deadline'))+' · '+esc(t('Today, 4:00 PM'))+'</small><b class="ldg-left">'+leftTxt()+'</b></div></div>'+
            '<div class="ldg-seg">'+[['all','All'],['pending','Pending'],['closed','Closed']].map(function(f){ return '<button type="button" data-act="filt" data-f="'+f[0]+'" class="'+(S.filt===f[0]?'on':'')+'">'+esc(t(f[1]))+'</button>'; }).join('')+'</div>'+
            '<div class="ldg-tab"><div class="ldg-th"><span>'+esc(t('No.'))+'</span><span>'+esc(t('Supplier'))+'</span><span>'+esc(t('Due'))+'</span><span>'+esc(t('Amount'))+'</span><span>'+esc(t('Status'))+'</span></div>'+(rows||'<p class="iv-empty">'+esc(t('Nothing here.'))+'</p>')+'</div>'+
            '<div class="ldg-foot"><span class="ldg-pb"><i style="width:'+(nClosed()/INV.length*100)+'%"></i></span><span>'+num(nClosed()+' / '+INV.length)+' '+esc(t('closed'))+'</span></div></section>'+
          '<section class="ldg-det">'+det+'</section></div>';
      },
      mail:function(){
        var m=MAIL[S.mail];
        return '<div class="ml2"><aside class="ml2-side">'+[['Inbox',MAIL.filter(function(x){ return x[5]; }).length],['Flagged'],['Sent'],['Drafts'],['Trash']].map(function(f,i){ return '<span class="'+(i?'':'on')+'">'+['📥','🚩','📤','📝','🗑️'][i]+' '+esc(t(f[0]))+(f[1]?'<em>'+num(f[1])+'</em>':'')+'</span>'; }).join('')+'</aside>'+
          '<div class="ml2-list"><div class="ldg-search">'+SV.search+esc(t('Search'))+'</div>'+MAIL.map(function(x,i){ return '<button type="button" class="ml2-row'+(S.mail===i?' sel':'')+(x[5]?' un':'')+'" data-act="mail" data-i="'+i+'"><span class="tm-av" style="background:'+x[4]+'">'+esc(ini(t(x[0])))+'</span><span class="ml2-b"><span class="ml2-top"><b>'+esc(t(x[0]))+'</b><small>'+hm(x[3])+'</small></span><span class="ml2-s">'+esc(t(x[1]))+'</span><span class="ml2-p">'+esc(t(x[2]))+'</span></span></button>'; }).join('')+'</div>'+
          '<div class="ml2-read"><h5>'+esc(t(m[1]))+'</h5><div class="ml2-from"><span class="tm-av" style="background:'+m[4]+'">'+esc(ini(t(m[0])))+'</span><div><b>'+esc(t(m[0]))+'</b><small>'+esc(t('To: me'))+' · '+hm(m[3])+'</small></div></div><p>'+esc(t(m[2]))+'</p><div class="ml2-act"><span>↩ '+esc(t('Reply'))+'</span><span>↪ '+esc(t('Forward'))+'</span></div></div></div>';
      },
      chat:function(){
        var c=chatById(S.chat); c.un=0; var cf=S.cf||'all';
        function mins(s){ var p=String(s).split(':'); return p.length<2?-1:(+p[0])*60+(+p[1]); }
        function last(x){ return x.m[x.m.length-1]; }
        function cav(x){ return x.kind==='ch' ? '<span class="wa-av">'+WA.grp+'</span>' : '<span class="wa-av" style="background:'+(COL[x.m[0][0]]||'#6a7175')+'">'+esc(ini(t(x.m[0][0])))+'</span>'; }
        function tk(r){ return '<svg class="wa-tk'+(r?' read':'')+'" viewBox="0 0 18 12" aria-hidden="true"><path d="M1 6.5l3.2 3.2L11 2.8M7 9.7l.9.9L15 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
        var vis=CH.filter(function(x){ return (x.at||0)<=S.secs && (cf==='all' || (cf==='un' && (x.un || x.id===c.id)) || (cf==='gr' && x.kind==='ch')); }).sort(function(a,b){ return mins(last(b)[2])-mins(last(a)[2]); });
        var rows=vis.map(function(x){ var l=last(x), me=l[0]==='me', who= me?'':(x.kind==='ch'?t(l[0])+': ':'');
          return '<button type="button" class="wa-row'+(x.id===c.id?' sel':'')+(x.un?' un':'')+'" data-act="chat" data-id="'+x.id+'">'+cav(x)+'<span class="wa-rb"><span class="wa-r1"><b>'+esc(t(x.n))+'</b><small>'+hm(l[2])+'</small></span><span class="wa-r2">'+(me?tk(l[3]):'')+'<span>'+esc(who+t(l[1]))+'</span>'+(x.un?'<em>'+num(x.un)+'</em>':'')+'</span></span></button>'; }).join('');
        var prev=null, msgs='<div class="wa-day">'+esc(t('Today'))+'</div>'+c.m.map(function(m){ var me=m[0]==='me', first=m[0]!==prev; prev=m[0];
          return '<div class="wa-m '+(me?'out':'in')+(first?' first':'')+'"><div class="wa-b">'+(!me&&first&&c.kind==='ch'?'<b class="wa-n" style="color:'+(COL[m[0]]||'#6a7175')+'">'+esc(t(m[0]))+'</b>':'')+'<span class="wa-tx">'+esc(t(m[1]))+'</span><span class="wa-meta">'+hm(m[2])+(me?tk(m[3]):'')+'</span></div></div>'; }).join('');
        var typing=S.typing===c.id;
        if(typing) msgs+='<div class="wa-m in'+(prev!==S.typer?' first':'')+'"><div class="wa-b">'+(c.kind==='ch'&&prev!==S.typer?'<b class="wa-n" style="color:'+(COL[S.typer]||'#6a7175')+'">'+esc(t(S.typer))+'</b>':'')+'<p class="tm-dots"><i></i><i></i><i></i></p></div></div>';
        var st=S.step[c.id]||0, turn=c.turns[st], foot;
        if(!c.turns.length) foot='<div class="wa-lock">'+esc(t('Only admins can send messages'))+'</div>';
        else foot=(!typing && turn && !c.ended ? '<div class="wa-sug">'+turn.map(function(o,i){ return '<button type="button" data-act="reply" data-i="'+i+'">'+esc(t(o[0]))+'</button>'; }).join('')+'</div>' : '')+
          '<div class="wa-in">'+WA.emoji+WA.plus+'<span class="wa-fld">'+esc(t('Type a message'))+'</span>'+WA.mic+'</div>';
        var sub= typing ? '<small class="ty">'+esc(c.kind==='ch' ? t(S.typer)+' '+t('is typing…') : t('typing…'))+'</small>' : '<small>'+esc(c.kind==='ch'?t(c.sub):t('online'))+'</small>';
        return '<div class="wa"><aside class="wa-side"><div class="wa-sh"><b>'+esc(t('Chats'))+'</b><span>'+WA.newc+WA.dots+'</span></div>'+
            '<div class="wa-srch">'+SV.search+esc(t('Search or start a new chat'))+'</div>'+
            '<div class="wa-pills">'+[['all','All'],['un','Unread'],['gr','Groups']].map(function(f){ return '<button type="button" data-act="cfilt" data-f="'+f[0]+'" class="'+(cf===f[0]?'on':'')+'">'+esc(t(f[1]))+'</button>'; }).join('')+'</div>'+
            '<div class="wa-list">'+rows+'</div></aside>'+
          '<section class="wa-main"><header class="wa-hd">'+cav(c)+'<div><b>'+esc(t(c.n))+'</b>'+sub+'</div><span>'+WA.vid+SV.search+WA.dots+'</span></header>'+
            '<div class="wa-msgs" style="background-image:'+WA.bg+'">'+msgs+'</div>'+foot+'</section></div>';
      },
      video:function(){
        var i=(S.clip||0)%CLIPS.length, c=CLIPS[i], liked=S.like[i], subd=S.sub[c[4]];
        var SC=[
          '<div class="sc sc-cat"><i class="sc-floor"></i><span class="sc-cuke">🥒</span><span class="sc-kitty">🐈</span><b class="sc-meme">'+esc(t('wait for it… 😹'))+'</b></div>',
          '<div class="sc sc-pan"><i class="sc-steam"></i><i class="sc-steam s2"></i><i class="sc-steam s3"></i><div class="sc-pot"><i></i><i></i><i></i><i></i><span>🍝</span></div><b class="sc-meme">'+esc(t('5-minute pasta 🔥'))+'</b></div>',
          '<div class="sc sc-pitch"><i class="sc-lines"></i><i class="sc-net"></i><span class="sc-ball">⚽</span><b class="sc-goal">'+esc(t('GOAL!!!'))+'</b></div>',
          '<div class="sc sc-desk"><i class="sc-glow"></i><div class="sc-mon"><i></i></div><i class="sc-kb"></i><span class="sc-plant">🪴</span><b class="sc-meme">'+esc(t('rate my setup 1–10'))+'</b></div>',
          '<div class="sc sc-ula"><i class="sc-sun"></i><svg class="sc-rock" viewBox="0 0 200 120" preserveAspectRatio="xMidYMax meet"><path d="M10 120V78c6-22 20-36 38-40 10-18 32-30 54-26 20 4 30 18 34 30 18 4 30 16 34 34l2 44z"/><path d="M84 120V92c0-10 8-16 16-16s16 6 16 16v28z" class="sc-hole"/></svg><i class="sc-dune d1"></i><i class="sc-dune d2"></i><b class="sc-meme">'+esc(t('AlUla at golden hour ✨'))+'</b></div>',
          '<div class="sc sc-slime"><i></i><i></i><i></i><b class="sc-meme">'+esc(t('so satisfying 🫧'))+'</b></div>'
        ];
        return '<div class="rl" style="--a:'+c[2]+';--b:'+c[3]+'"><div class="rl-bg"></div>'+
          '<div class="rl-top"><span>'+esc(t('Following'))+'</span><b>'+esc(t('For You'))+'</b></div>'+
          '<div class="rl-card rl-'+(S.dir||'up')+'" data-k="'+i+'">'+SC[i]+
            '<div class="rl-rail"><span class="rl-av" style="background:'+c[3]+'">'+esc(ini(t(c[4])))+'<button type="button" data-act="vsub" class="'+(subd?'on':'')+'">'+(subd?'✓':'+')+'</button></span>'+
              '<button type="button" data-act="vlike" class="rl-b'+(liked?' on':'')+'"><i>♥</i><small>'+num((12+i*3+(liked?1:0))+'.'+(i*7%10)+'K')+'</small></button>'+
              '<span class="rl-b"><i>💬</i><small>'+num(340+i*41)+'</small></span><span class="rl-b"><i>↗</i><small>'+esc(t('Share'))+'</small></span><span class="rl-disc" style="background:conic-gradient('+c[2]+','+c[3]+','+c[2]+')"></span></div>'+
            '<div class="rl-cap"><b>@'+esc(t(c[4]))+'</b><p>'+esc(t(c[1]))+' <span>#fyp #'+esc(t(['cats','food','football','setup','travel','asmr'][i]))+'</span></p><p class="rl-snd">♪ '+esc(t('original sound'))+' · '+esc(t(c[4]))+'</p></div>'+
            '<button type="button" class="rl-tap" data-act="vplay" aria-label="Play or pause">'+(S.play?'':'<span>▶</span>')+'</button>'+
            '<i class="rl-prog"><b></b></i></div>'+
          '<div class="rl-nav"><button type="button" data-act="vprev" aria-label="Previous clip">▲</button><button type="button" data-act="vnext" aria-label="Next clip">▼</button></div>'+
          '<p class="rl-count">'+esc(t('Clips watched'))+': <b>'+num(S.watched||0)+'</b></p>'+
        '</div>';
      },
      news:function(){
        var h=NEWS[1];
        return '<div class="nw2"><header><b>'+esc(t('The Daily Brief'))+'</b><small>'+DAYF(new Date(),{weekday:'long',day:'numeric',month:'long'})+'</small></header>'+
          '<div class="nw2-tabs">'+['Top stories','Tech','Markets','Sport','Travel'].map(function(x,i){ return '<span class="'+(i?'':'on')+'">'+esc(t(x))+'</span>'; }).join('')+'</div>'+
          '<div class="nw2-body"><article class="nw2-hero"><span style="background:linear-gradient(135deg,#1971c2,#5f3dc4)">'+h[0]+'</span><small style="color:'+h[3]+'">'+esc(t(h[2]))+'</small><b>'+esc(t(h[1]))+'</b><p>'+esc(t('Live coverage starts at 6 PM. Here is everything we know so far about the new lineup.'))+'</p></article>'+
          '<div class="nw2-list">'+NEWS.filter(function(_,i){ return i!==1; }).map(function(n){ return '<div><span>'+n[0]+'</span><p><small style="color:'+n[3]+'">'+esc(t(n[2]))+'</small><b>'+esc(t(n[1]))+'</b></p></div>'; }).join('')+'</div></div></div>';
      },
      rakeez:function(){
        return '<div class="rz2"><header><span class="rz2-logo">'+ico('rakeez')+'</span><b>Rakeez</b><span class="rz2-dev"><i></i>'+esc(t('Desk device connected'))+' · '+num('92%')+'</span></header>'+
          '<div class="rz2-grid">'+
            '<div class="rz2-card rz2-g"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" class="rz2-trk"/><circle cx="60" cy="60" r="50" class="rz2-val" pathLength="100"/></svg><div class="rz2-gt"><b class="rz2-pct"></b><small class="rz-st"></small></div><p>'+esc(t('Current focus'))+'</p></div>'+
            '<div class="rz2-card rz2-t"><p class="rz2-h">'+esc(t('Time in each state'))+'</p>'+LV.map(function(l,k){ return '<div class="rz2-tr"><i style="background:'+l.c+'"></i><span>'+esc(t(l.n))+'</span><em><b data-k="'+k+'" style="background:'+l.c+'"></b></em><small data-k="'+k+'"></small></div>'; }).join('')+'</div>'+
            '<div class="rz2-card rz2-c"><p class="rz2-h">'+esc(t('Focus this session'))+'</p><svg viewBox="0 0 400 110" preserveAspectRatio="none"><defs><linearGradient id="rzA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c3aed" stop-opacity=".5"/><stop offset="1" stop-color="#7c3aed" stop-opacity="0"/></linearGradient></defs><path d="M0 27.5H400M0 55H400M0 82.5H400" stroke="rgba(255,255,255,.07)"/><path class="rz2-area" fill="url(#rzA)"/><polyline class="rz2-line" fill="none" stroke-width="2.2" vector-effect="non-scaling-stroke"/></svg><div class="rz2-ax"><span class="rz2-a0"></span><span class="rz2-a1"></span></div></div>'+
            '<div class="rz2-card rz2-l"><p class="rz2-h">'+esc(t('Interventions'))+' <b class="rz2-n"></b></p><ul class="rz2-log"></ul></div>'+
            '<div class="rz2-card rz2-s"><div><b class="rz-ft"></b><small>'+esc(t('Time on task'))+'</small></div><div><b class="rz2-left"></b><small>'+esc(t('Until the deadline'))+'</small></div><div><b>'+num(nClosed()+'/'+INV.length)+'</b><small>'+esc(t('Invoices closed'))+'</small></div></div>'+
          '</div></div>';
      }
    };
    function render(){
      if(S.app){ win.hidden=false; win.classList.toggle('max',S.max); q(el,'.pc-wtitle').textContent=t(NM[S.app]);
        /* keep every scrolled area where it was, so ticking a box never jumps the view */
        var same=wb.getAttribute('data-app')===S.app, keep=[], all, ws=wb.scrollTop, sy=window.scrollY;
        if(same){ all=wb.querySelectorAll('*'); for(var i=0;i<all.length;i++) if(all[i].scrollTop) keep.push([i,all[i].scrollTop]); }
        var n0=same?all.length:0; wb.innerHTML=APP[S.app](); wb.setAttribute('data-app',S.app);
        if(same){ wb.scrollTop=ws; all=wb.querySelectorAll('*'); if(all.length===n0) keep.forEach(function(k){ all[k[0]].scrollTop=k[1]; }); if(Math.abs(window.scrollY-sy)>2) window.scrollTo(window.scrollX,sy); }
        var box=q(wb,'.tm-msgs,.wa-msgs'); if(box) box.scrollTop=1e5; } else win.hidden=true;
      q(el,'.pc-appname').textContent= S.app ? t(NM[S.app]) : t('Finder');
      qa(el,'.pc-ico').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-open')===S.app); });
      var bd=q(el,'.pc-ico[data-open=chat] .pc-bdg'), u=unread(); bd.hidden=!u; bd.textContent=num(u);
      var bm=q(el,'.pc-ico[data-open=mail] .pc-bdg'), mu=MAIL.filter(function(x){ return x[5]; }).length; bm.hidden=!mu; bm.textContent=num(mu);
      paint();
    }
    function pick(i){
      var c=chatById(S.chat), st=S.step[c.id]||0, o=c.turns[st][i]; if(!o || S.typing) return;
      var mn=START+S.secs, now=Math.floor(mn/60)+':'+('0'+mn%60).slice(-2);
      var mine=['me',o[0],now,0]; c.m.push(mine); S.step[c.id]=st+1; if(o[3]) c.ended=1;
      S.typing=c.id; S.typer=o[1]; render();
      setTimeout(function(){ mine[3]=1; if(S.app==='chat'&&S.chat===c.id) render(); },700);
      setTimeout(function(){ S.typing=null; c.m.push([o[1],o[2],now]); if(S.step[c.id]>=c.turns.length) c.ended=1;
        if(S.app==='chat'&&S.chat===c.id) render(); else { c.un++; notify({app:'chat',chat:c.id,from:c.n,txt:o[2]}); render(); }
        if(o[4]==='clip') setTimeout(function(){ notify({app:'video',from:'Clips',txt:'Faisal shared a video with you'}); },1400);
      },1800+o[2].length*25);
    }
    function notify(n){
      var d=document.createElement('button'); d.type='button'; d.className='pc-n'; d.setAttribute('data-act','openN');
      d._n=n; d.innerHTML='<span class="pc-ni">'+ico(n.app==='video'?'video':n.app)+'</span><div><p class="pc-nh"><b>'+esc(t(NM[n.app]||n.from))+'</b><small>'+esc(t('now'))+'</small></p><b>'+esc(t(n.from))+'</b><p>'+esc(t(n.txt))+'</p></div>';
      nots.prepend(d); while(nots.children.length>3) nots.lastChild.remove();
      setTimeout(function(){ d.classList.add('out'); setTimeout(function(){ d.remove(); },400); },5600);
    }
    function ring(){
      S.called=true; S.call='ring';
      callL.innerHTML='<div class="pc-callc"><span class="pc-cav">👥</span><div><b>'+esc(t('Team sync'))+'</b><p>'+esc(t('Incoming video call…'))+'</p></div><button type="button" class="dec" data-act="decline">'+esc(t('Decline'))+'</button><button type="button" class="acc" data-act="accept">'+esc(t('Join'))+'</button></div>';
      callL.hidden=false;
    }
    function intervene(){
      S.inter++; S.ilog.push(clock()); intL.hidden=false; var left=INV.length-nClosed();
      intL.innerHTML='<div class="pc-intc"><span class="rz-ring"><i></i></span><b>Rakeez</b><p>'+esc(t('You have drifted away from your task for a while.'))+' '+num(left)+' '+esc(t(left===1?'invoice is still open.':'invoices are still open.'))+'</p><div><button type="button" class="pc-ib" data-act="backtask">'+esc(t('Back to invoices'))+'</button><button type="button" class="pc-ib pc-ib2" data-act="snooze">'+esc(t('Two more minutes'))+'</button></div></div>';
    }
    function nextClip(d){ S.clip=((S.clip||0)+d+CLIPS.length)%CLIPS.length; S.vt=0; S.dir=d>0?'up':'down'; S.play=true; S.watched=(S.watched||0)+1; render(); S.dir=null; }
    var wheelT=0; scr.addEventListener('wheel',function(e){ if(S.app!=='video'||!e.target.closest('.rl')) return; e.preventDefault(); var now=Date.now(); if(now-wheelT<650||Math.abs(e.deltaY)<8) return; wheelT=now; nextClip(e.deltaY>0?1:-1); },{passive:false});
    var ty0=null; scr.addEventListener('touchstart',function(e){ if(S.app==='video') ty0=e.touches[0].clientY; },{passive:true}); scr.addEventListener('touchend',function(e){ if(ty0===null) return; var dy=ty0-e.changedTouches[0].clientY; ty0=null; if(Math.abs(dy)>40) nextClip(dy>0?1:-1); });
    function arrive(){
      CH.forEach(function(c){ if(c.at===S.secs){ if(!(S.app==='chat'&&S.chat===c.id)) c.un+=c.m.length; notify({app:'chat',chat:c.id,from:c.n,txt:c.m[c.m.length-1][1]}); render(); } });
      if(S.secs===DEAD-START-15){ var mg=chatById('mgr'), mn=START+S.secs; mg.m.push(['Manager','15 minutes left ⏳ How many invoices are still open?',Math.floor(mn/60)+':'+('0'+mn%60).slice(-2)]); if(!(S.app==='chat'&&S.chat==='mgr')) mg.un++; notify({app:'chat',chat:'mgr',from:'Manager',txt:'15 minutes left ⏳ How many invoices are still open?'}); render(); }
    }
    function timeUp(){
      S.done=true; intL.hidden=true; var mg=chatById('mgr'); mg.m.push(['Manager','It’s 4 PM. Where are the invoices? 😠','16:00']); mg.un++;
      notify({app:'chat',chat:'mgr',from:'Manager',txt:'It’s 4 PM. Where are the invoices? 😠'});
      var pct=Math.round(S.onTask/Math.max(1,S.secs)*100), left=INV.length-nClosed();
      doneL.hidden=false; doneL.classList.add('late');
      doneL.innerHTML='<div class="pc-donec"><span>⏰</span><b>'+esc(t('4:00 PM. The deadline has passed.'))+'</b><p>'+num(left)+' '+esc(t(left===1?'invoice is still open.':'invoices are still open.'))+' '+esc(t('Most of the afternoon went to chats, clips and notifications.'))+'</p><div class="rz-stats"><div><b>'+num(pct+'%')+'</b><small>'+esc(t('Time on task'))+'</small></div><div><b>'+num(S.inter)+'</b><small>'+esc(t('Interventions'))+'</small></div><div><b>'+num(nClosed()+'/'+INV.length)+'</b><small>'+esc(t('Invoices closed'))+'</small></div></div><button type="button" class="pc-ib" data-act="restart">'+esc(t('Try the afternoon again'))+'</button></div>';
      render();
    }
    function finish(){
      S.done=true; var pct=Math.round(S.onTask/Math.max(1,S.secs)*100);
      doneL.hidden=false; confetti(q(el,'.dm-stage'));
      doneL.classList.remove('late'); doneL.innerHTML='<div class="pc-donec"><span>✅</span><b>'+esc(t('All invoices closed!'))+'</b><p>'+esc(t('Finished at'))+' '+clock()+', '+num(DEAD-START-S.secs)+' '+esc(t('minutes before the deadline.'))+'</p><div class="rz-stats"><div><b>'+num(S.secs)+' '+esc(t('min'))+'</b><small>'+esc(t('Session'))+'</small></div><div><b>'+num(pct+'%')+'</b><small>'+esc(t('Time on task'))+'</small></div><div><b>'+num(S.inter)+'</b><small>'+esc(t('Interventions'))+'</small></div></div><button type="button" class="pc-ib" data-act="restart">'+esc(t('Start a new day'))+'</button></div>';
    }
    function level(f){ return f>=75?0 : f>=50?1 : f>=25?2 : 3; }
    function paint(){
      var L=LV[S.lv], mk='calc('+Math.min(97,Math.max(1,100-S.f))+'% - 2px)', d=new Date();
      el.style.setProperty('--lc', L.c);
      q(el,'.rk5-dev').setAttribute('data-lv',S.lv);
      q(el,'.rk5-name').textContent=t(L.n); q(el,'.rk5-desc').textContent=t(L.d); q(el,'.rk5-mname').textContent=t(L.n);
      q(el,'.rk4-mark').style.insetInlineStart=mk; q(el,'.rk5-mbar b').style.insetInlineStart=mk;
      q(el,'.rk5-mini').classList.toggle('red',S.lv===3); q(el,'.rk4-bub').hidden=S.lv<3;
      qa(el,'.rk4-scale li').forEach(function(li,i){ li.classList.toggle('on',i===S.lv); });
      var lc=q(el,'.pc-lk-clock'); if(lc){ lc.textContent=clock().replace(/\s?[AP]M|\s?[صم]$/,''); q(el,'.pc-lk-date').textContent=DAYF(d,{weekday:'long',day:'numeric',month:'long'}); }
      q(el,'.pc-clock').textContent=clock(); q(el,'.pc-date').textContent=DAYF(d,{weekday:'short',day:'numeric',month:'short'});
      q(el,'.pc-wday').textContent=DAYF(d,{weekday:'long'}); q(el,'.pc-wnum').textContent=DAYF(d,{day:'numeric'});
      var wl=q(el,'.pc-wleft'); if(wl) wl.textContent=leftTxt(); var ll=q(wb,'.ldg-left'); if(ll) ll.textContent=leftTxt();
      if(S.app==='rakeez'){ q(wb,'.rz-st').textContent=t(L.n); q(wb,'.rz2-pct').textContent=num(Math.round(S.f)+'%'); q(wb,'.rz-ft').textContent=num(S.onTask)+' '+t('min'); q(wb,'.rz2-left').textContent=num(Math.max(0,DEAD-START-S.secs))+' '+t('min');
        var v=q(wb,'.rz2-val'); v.style.strokeDasharray=S.f+' 100'; v.style.stroke=L.c;
        var cnt=[0,0,0,0]; S.hist.forEach(function(h){ cnt[h]++; }); var tot=Math.max(1,S.hist.length);
        qa(wb,'.rz2-tr em b').forEach(function(b){ b.style.width=(cnt[+b.getAttribute('data-k')]/tot*100)+'%'; }); qa(wb,'.rz2-tr small').forEach(function(x){ x.textContent=num(cnt[+x.getAttribute('data-k')])+' '+t('min'); });
        var fh=S.fh.length?S.fh:[100], n=Math.max(2,fh.length), pts=fh.map(function(f,k){ return (k/(n-1)*400).toFixed(1)+','+(110-f*1.05).toFixed(1); });
        if(fh.length===1) pts.push('400,'+(110-fh[0]*1.05).toFixed(1));
        q(wb,'.rz2-line').setAttribute('points',pts.join(' ')); q(wb,'.rz2-line').setAttribute('stroke',L.c); q(wb,'.rz2-area').setAttribute('d','M0,110 L'+pts.join(' L')+' L400,110 Z');
        q(wb,'.rz2-a0').textContent=tod(START); q(wb,'.rz2-a1').textContent=clock();
        q(wb,'.rz2-n').textContent=num(S.inter); q(wb,'.rz2-log').innerHTML=S.ilog.length?S.ilog.slice().reverse().map(function(x){ return '<li><i></i><b>'+x+'</b><span>'+esc(t('Rakeez stepped in'))+'</span></li>'; }).join(''):'<li class="none">'+esc(t('No interventions yet. Keep it up!'))+'</li>'; }
      if(S.app==='video'){ var pb=q(wb,'.rl-prog b'); if(pb) pb.style.width=Math.min(100,S.vt/4*100)+'%'; var rc=q(wb,'.rl-card'); if(rc) rc.classList.toggle('paused',!S.play); }
    }
    function tick(){
      if(S.done||!S.started) return;
      S.secs++; var c= S.call==='talk' ? 'call' : (S.app||'desk'), w=W[c];
      if(!intL.hidden) w=0;
      S.f=Math.max(0,Math.min(100,S.f+w*1.1)); if(c==='inv') S.onTask++;
      S.lv=level(S.f); S.hist.push(S.lv); if(S.hist.length>400) S.hist.shift(); S.fh.push(S.f); if(S.fh.length>200) S.fh.shift();
      arrive();
      if(S.snooze>0) S.snooze--;
      if(S.lv===3 && intL.hidden && S.snooze<=0 && !S.call) intervene();
      S.nextN--;
      if(S.nextN<=0 && intL.hidden){ var n=NT[S.ni%NT.length]; S.ni++; var ch=chatById(n.chat); if(ch && !(S.app==='chat'&&S.chat===ch.id)){ ch.un++; render(); } notify(n); S.nextN=Math.round(rnd(16,22)); }
      if(!S.called && S.secs>=45 && intL.hidden) ring();
      if(S.secs===DEAD-START && !S.done){ timeUp(); return; }
      if(S.call==='talk'){ S.ct=(S.ct||0)+2; var x=q(callL,'.pc-ct'); if(x) x.textContent=mmss(S.ct); }
      if(S.app==='video' && S.play){ S.vt++; if(S.vt>4){ nextClip(1); } }
      paint();
    }
    scr.addEventListener('click',function(e){
      var a=e.target.closest('[data-act],[data-open]'); if(!a) return;
      var k=a.getAttribute('data-act'), o=a.getAttribute('data-open');
      if(o){ S.app=o; render(); return; }
      if(k==='sel'){ qa(el,'.pc-file').forEach(function(f){ f.classList.toggle('sel',f===a); }); }
      else if(k==='close'){ S.app=null; render(); }
      else if(k==='zoom'){ S.max=!S.max; render(); }
      else if(k==='inv'){ S.inv=+a.getAttribute('data-i'); render(); }
      else if(k==='filt'){ S.filt=a.getAttribute('data-f'); render(); }
      else if(k==='chk'){ var j=+a.getAttribute('data-j'); S.chk[S.inv]=S.chk[S.inv]||{}; S.chk[S.inv][j]=!S.chk[S.inv][j]; render(); }
      else if(k==='closeinv'){ S.closed[S.inv]=1; S.f=Math.min(100,S.f+8); var nx=INV.findIndex(function(_,i){ return !S.closed[i]; }); S.inv= nx<0?S.inv:nx; render(); if(nClosed()===INV.length) finish(); }
      else if(k==='mail'){ S.mail=+a.getAttribute('data-i'); MAIL[S.mail][5]=0; render(); }
      else if(k==='chat'){ S.chat=a.getAttribute('data-id'); render(); }
      else if(k==='cfilt'){ S.cf=a.getAttribute('data-f'); render(); }
      else if(k==='start'){ S.started=true; lock.classList.add('off'); setTimeout(function(){ lock.hidden=true; },650); render(); }
      else if(k==='reply'){ pick(+a.getAttribute('data-i')); }
      else if(k==='vplay'){ S.play=!S.play; render(); }
      else if(k==='vnext'){ nextClip(1); }
      else if(k==='vprev'){ nextClip(-1); }
      else if(k==='vsub'){ var cc=CLIPS[S.clip%CLIPS.length][4]; S.sub[cc]=!S.sub[cc]; render(); }
      else if(k==='vlike'){ var ci=S.clip%CLIPS.length; S.like[ci]=!S.like[ci]; render(); }
      else if(k==='openN'){ var n=a._n; a.remove(); if(!n) return; if(n.chat) S.chat=n.chat; S.app=n.app; if(n.app==='video'){ S.clip=n.txt.indexOf('Faisal')===0?2:(S.clip||0); S.vt=0; S.dir='up'; } render(); }
      else if(k==='decline'){ S.call=null; callL.hidden=true; }
      else if(k==='accept'){ S.call='talk'; S.ct=0; callL.innerHTML='<div class="pc-callc talk"><span class="pc-cav">👥</span><div><b>'+esc(t('Team sync'))+'</b><p class="pc-ct mono">0:00</p></div><button type="button" class="dec" data-act="decline">'+esc(t('Leave'))+'</button></div>'; }
      else if(k==='backtask'){ intL.hidden=true; S.snooze=12; S.app='inv'; render(); }
      else if(k==='snooze'){ intL.hidden=true; S.snooze=20; }
      else if(k==='restart'){ S.closed={}; S.chk={}; S.inv=0; S.secs=0; S.onTask=0; S.inter=0; S.f=100; S.hist=[]; S.fh=[]; S.ilog=[]; S.called=false; S.call=null; callL.hidden=true; S.done=false; S.app=null; S.step={}; S.typing=null;
        CH.forEach(function(c){ c.m=JSON.parse(c.m0); c.un=c.un0; c.ended=0; }); doneL.hidden=true; render(); }
    });
    NT.forEach(function(n,i){ n._i=i; }); CH.forEach(function(c){ c.m0=JSON.stringify(c.m); c.un0=c.un; });
    render();
    var loop=null;
    onScreen(el,function(){ if(!loop) loop=setInterval(tick,2000); scale(); },function(){ clearInterval(loop); loop=null; });
  }
  /* ================= Makani: walk through the crowd yourself ================= */
  function makani(el){
    /* hand-drawn people: thobes and shemaghs, abayas and hijabs, travellers and children */
    var SKIN=['#f1c27d','#e0ac69','#c68642','#a86b3c','#8d5524'];
    function spr(type,seed){
      var w=110,h=280,c=document.createElement('canvas'); c.width=w; c.height=h; var x=c.getContext('2d'), sk=SKIN[seed%SKIN.length];
      function rr2(a,b,ww,hh,r){ x.beginPath(); x.moveTo(a+r,b); x.arcTo(a+ww,b,a+ww,b+hh,r); x.arcTo(a+ww,b+hh,a,b+hh,r); x.arcTo(a,b+hh,a,b,r); x.arcTo(a,b,a+ww,b,r); x.closePath(); }
      function shade(col,body){ var g=x.createLinearGradient(20,0,90,0); g.addColorStop(0,'rgba(0,0,0,.18)'); g.addColorStop(.45,'rgba(255,255,255,.08)'); g.addColorStop(1,'rgba(0,0,0,.28)'); x.fillStyle=col; body(); x.fill(); x.fillStyle=g; body(); x.fill(); }
      var cx=55;
      if(type==='kid'||type==='kid2'){
        var shirt=type==='kid'?'#ff8a00':['#2f9e44','#e64980','#1c7ed6','#fab005'][seed%4];
        x.fillStyle='#2b2f3a'; x.fillRect(cx-14,196,11,72); x.fillRect(cx+3,196,11,72); x.fillStyle='#fff'; x.fillRect(cx-16,262,15,8); x.fillRect(cx+1,262,15,8);
        shade(shirt,function(){ rr2(cx-22,130,44,72,12); }); x.fillStyle=sk; x.beginPath(); x.arc(cx,112,20,0,7); x.fill(); x.fillStyle='#2b1a10'; x.beginPath(); x.arc(cx,106,21,Math.PI*1.05,Math.PI*1.95); x.fill();
        if(type==='kid'){ x.fillStyle='#4db6ff'; x.beginPath(); x.arc(cx+10,150,5,0,7); x.fill(); x.strokeStyle='rgba(77,182,255,.6)'; x.lineWidth=2; x.beginPath(); x.arc(cx+10,150,9,0,7); x.stroke(); }
        return c;
      }
      if(type==='bag'){ var bc=['#495057','#1c7ed6','#c92a2a','#2b8a3e'][seed%4]; x.strokeStyle='#adb5bd'; x.lineWidth=5; x.beginPath(); x.moveTo(cx-10,170); x.lineTo(cx-10,140); x.lineTo(cx+10,140); x.lineTo(cx+10,170); x.stroke();
        shade(bc,function(){ rr2(cx-28,168,56,92,9); }); x.fillStyle='#111'; x.beginPath(); x.arc(cx-18,266,6,0,7); x.arc(cx+18,266,6,0,7); x.fill(); return c; }
      /* legs / feet */
      x.fillStyle='#1a1a1a'; x.fillRect(cx-18,262,16,10); x.fillRect(cx+2,262,16,10);
      if(type==='thobe'||type==='thobe2'||type==='elder'){
        var th=type==='elder'?'#e9e2d0':'#f8f9fa';
        shade(th,function(){ x.beginPath(); x.moveTo(cx-24,78); x.lineTo(cx+24,78); x.lineTo(cx+30,264); x.lineTo(cx-30,264); x.closePath(); });
        x.strokeStyle='rgba(0,0,0,.12)'; x.lineWidth=2; x.beginPath(); x.moveTo(cx,82); x.lineTo(cx,140); x.stroke();
        x.fillStyle=sk; x.beginPath(); x.ellipse(cx,52,15,18,0,0,7); x.fill();
        var gh=type==='thobe'?'#d6283a':'#ffffff';
        x.fillStyle=gh; x.beginPath(); x.moveTo(cx-19,40); x.quadraticCurveTo(cx,18,cx+19,40); x.lineTo(cx+30,104); x.lineTo(cx+16,96); x.lineTo(cx+14,52); x.lineTo(cx-14,52); x.lineTo(cx-16,96); x.lineTo(cx-30,104); x.closePath(); x.fill();
        if(type==='thobe'){ x.fillStyle='rgba(255,255,255,.55)'; for(var k=0;k<6;k++){ x.fillRect(cx-16+k*6,36+(k%2)*8,2,2); x.fillRect(cx-22+k*2,70+k*6,2,2); x.fillRect(cx+18-k*2,70+k*6,2,2); } }
        else { x.strokeStyle='rgba(0,0,0,.08)'; x.lineWidth=1; x.beginPath(); x.moveTo(cx-16,60); x.lineTo(cx-26,100); x.stroke(); }
        x.strokeStyle='#111'; x.lineWidth=4; x.beginPath(); x.ellipse(cx,33,17,5,0,0,7); x.stroke();
        x.fillStyle=sk; x.beginPath(); x.ellipse(cx,56,10,12,0,0,7); x.fill(); x.fillStyle='#2b1a10'; x.beginPath(); x.ellipse(cx,64,8,5,0,0,Math.PI); x.fill();
        if(type==='elder'){ x.strokeStyle='#6b4120'; x.lineWidth=5; x.beginPath(); x.moveTo(cx+34,150); x.lineTo(cx+40,268); x.stroke(); }
        return c;
      }
      if(type==='abaya'||type==='abaya2'){
        var hj=type==='abaya'?'#151515':['#3b2a4a','#7a1f2b','#c9b79c','#1e3a5f'][seed%4];
        shade('#141414',function(){ x.beginPath(); x.moveTo(cx-20,84); x.lineTo(cx+20,84); x.quadraticCurveTo(cx+36,180,cx+34,268); x.lineTo(cx-34,268); x.quadraticCurveTo(cx-36,180,cx-20,84); x.closePath(); });
        x.fillStyle=hj; x.beginPath(); x.ellipse(cx,58,22,26,0,0,7); x.fill(); x.beginPath(); x.moveTo(cx-24,62); x.quadraticCurveTo(cx,112,cx+24,62); x.lineTo(cx+26,98); x.quadraticCurveTo(cx,112,cx-26,98); x.closePath(); x.fill();
        x.fillStyle=sk; x.beginPath(); x.ellipse(cx,60,12,15,0,0,7); x.fill();
        if(seed%3===0){ x.fillStyle='#c9a24a'; rr2(cx+20,150,22,30,4); x.fill(); }
        return c;
      }
      /* casual traveller */
      var sh=['#1c7ed6','#e8590c','#2f9e44','#862e9c','#495057','#f8f9fa'][seed%6], pa=['#2b3a55','#343a40','#7a6a52'][seed%3];
      x.fillStyle=pa; x.fillRect(cx-20,170,18,94); x.fillRect(cx+2,170,18,94);
      shade(sh,function(){ rr2(cx-26,80,52,100,14); });
      x.fillStyle=sk; x.fillRect(cx-6,68,12,14); x.beginPath(); x.ellipse(cx,52,16,19,0,0,7); x.fill();
      if(type==='casualf'){ x.fillStyle=['#e599f7','#74c0fc','#ffd8a8','#b2f2bb'][seed%4]; x.beginPath(); x.ellipse(cx,52,21,24,0,Math.PI*.95,Math.PI*2.05); x.fill(); x.beginPath(); x.moveTo(cx-21,54); x.quadraticCurveTo(cx,100,cx+21,54); x.lineTo(cx+22,90); x.quadraticCurveTo(cx,104,cx-22,90); x.closePath(); x.fill(); x.fillStyle=sk; x.beginPath(); x.ellipse(cx,56,11,14,0,0,7); x.fill(); }
      else { x.fillStyle='#2b1a10'; x.beginPath(); x.ellipse(cx,42,17,11,0,Math.PI,0); x.fill(); x.fillStyle='#343a40'; rr2(cx+22,96,10,40,4); x.fill(); }
      return c;
    }
    var TYPES=['thobe','thobe2','thobe','abaya','abaya2','abaya','casual','casualf','elder','thobe2','abaya2','casual'], SPR={};
    function sprite(type,seed){ var k=type+(seed%6); return SPR[k]||(SPR[k]=spr(type,seed%6)); }
    var WS=84, TAU=Math.PI*2, FOV=1.25;
    shell(el,
      '<div class="vr">'+
        '<div class="vr-intro-t"><h3>'+esc(t('Lost in the crowd'))+'</h3><p>'+esc(t('A first-person simulation. It is rush hour at a busy train station, and your child, who wears a Makani tag, has slipped away into the crowd. Walk through the station yourself and try to find them, first on your own, then with Makani.'))+'</p></div>'+
        '<div class="vr-view">'+
          '<canvas class="vr-cv" tabindex="0" aria-label="'+esc(t('First-person view of a busy train station'))+'"></canvas>'+
          '<div class="vr-vig" aria-hidden="true"></div>'+
          '<div class="vr-top"><span class="vr-tag">● '+esc(t('Live view'))+'</span><span class="vr-tm mono">0:00</span></div>'+
          '<p class="vr-toast" aria-live="polite"></p>'+
          '<div class="vr-ph"><div class="vr-ph-in"></div></div>'+
          '<div class="vr-pad" aria-label="'+esc(t('Movement'))+'">'+
            '<button type="button" data-k="f" aria-label="'+esc(t('Walk forward'))+'">▲</button>'+
            '<button type="button" data-k="l" aria-label="'+esc(t('Turn left'))+'">◀</button>'+
            '<button type="button" data-k="b" aria-label="'+esc(t('Walk back'))+'">▼</button>'+
            '<button type="button" data-k="r" aria-label="'+esc(t('Turn right'))+'">▶</button>'+
          '</div>'+
          '<p class="vr-help">'+esc(t('Arrow keys or W A S D to walk · drag to look around'))+'</p>'+
          '<div class="vr-ov"></div>'+
        '</div>'+
      '</div>');
    var cv=q(el,'.vr-cv'), ctx=cv.getContext('2d'), view=q(el,'.vr-view'), ov=q(el,'.vr-ov'), ph=q(el,'.vr-ph-in'), toast=q(el,'.vr-toast');
    var W=0,H=0,DPR=1,F=1,HOR=0, raf=0, last=0, vis=false;
    var P, kid, crowd=[], cols=[], keys={}, phase='intro', T0=0, Ton=0, makani=false, tmsg=0;
    for(var cx=8; cx<WS; cx+=11) for(var cy=8; cy<WS; cy+=11){ if(!(Math.abs(cx-41)<6 && Math.abs(cy-41)<6)) cols.push({x:cx,y:cy}); }
    var SKY=[]; for(var i=0;i<14;i++) SKY.push({a:i/14*TAU+.2, k:i%3, h:.7+((i*37)%10)/14, w:.12+((i*13)%7)/60});
    function size(){ var r=view.getBoundingClientRect(); DPR=Math.min(2,window.devicePixelRatio||1); W=r.width; H=r.height; cv.width=W*DPR; cv.height=H*DPR; F=(W/2)/Math.tan(FOV/2); HOR=H*.46; draw(); }
    function reset(){
      P={x:46.5,y:80,a:-Math.PI/2};
      kid={x:rnd(10,74), y:rnd(8,34), tx:0, ty:0, e:'🧒'}; kid.x=Math.floor(kid.x/11)*11+13.5;
      kid.x=Math.max(6,Math.min(WS-6,kid.x)); kid.tx=kid.x; kid.ty=kid.y;
      crowd=[]; for(var i=0;i<170;i++){ var ty=i%23===0?'kid2':TYPES[i%TYPES.length], p={x:rnd(3,WS-3),y:rnd(3,WS-3),ty:ty,sd:i,ph:rnd(0,6),h:ty==='kid2'?rnd(1.6,1.8):rnd(1.6,1.85),sp:rnd(.4,1.1),a:rnd(0,TAU)}; if(Math.hypot(p.x-P.x,p.y-P.y)<4) p.y-=8; crowd.push(p); }
      makani=false; Ton=0; phone();
    }
    function say(s,ms){ toast.textContent=t(s); toast.classList.add('on'); clearTimeout(tmsg); tmsg=setTimeout(function(){ toast.classList.remove('on'); }, ms||3800); }
    function phone(){
      if(!makani){
        ph.innerHTML='<p class="vr-ph-h"><b>Makani</b><i class="off"></i></p><div class="vr-ph-c"><span class="vr-kid">🧒</span><b>'+esc(t('My child'))+'</b><small class="mono">MK-0417</small></div>'+
          '<button type="button" class="vr-ph-btn" data-act="on"'+(phase==='play'&&(performance.now()-T0)>9000?'':' disabled')+'>'+esc(t('Locate my child'))+'</button>';
      } else {
        ph.innerHTML='<p class="vr-ph-h"><b>Makani</b><i></i></p><div class="vr-comp"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(77,182,255,.35)" stroke-width="2"/><path class="vr-arrow" d="M50 14 L64 56 L50 48 L36 56 Z" fill="#4db6ff"/></svg></div>'+
          '<p class="vr-dist mono">— '+esc(t('m'))+'</p><small class="vr-ph-s">'+esc(t('Live location · updated just now'))+'</small>';
      }
    }
    ph.addEventListener('click',function(e){ var b=e.target.closest('[data-act=on]'); if(!b||b.disabled) return; makani=true; Ton=performance.now(); phone(); say('Makani found MK-0417. Follow the arrow and the light beam.',4500); cv.focus(); });
    function start(){
      reset(); phase='play'; T0=performance.now(); ov.innerHTML=''; ov.hidden=true; cv.focus();
      say('Your child was right here a moment ago… Look around and search the crowd.',4500);
      setTimeout(function(){ if(phase==='play'&&!makani){ phone(); say('Hard to spot anyone in this crowd? Open Makani on your phone.',5000); q(el,'.vr-ph').classList.add('ping'); } },9000);
      loopOn();
    }
    function intro(){
      phase='intro'; ov.hidden=false;
      ov.innerHTML='<div class="vr-ovc"><span class="vr-ovi">🕶️</span><h4>'+esc(t('Step into the crowd'))+'</h4><p>'+esc(t('Walk with the arrow keys, W A S D, or the on-screen buttons. Drag the view to look around.'))+'</p><button type="button" class="dm-btn" data-act="go">'+esc(t('Start walking'))+'</button></div>';
      q(ov,'[data-act=go]').addEventListener('click',start);
    }
    function win(){
      phase='done'; var tt=(performance.now()-T0)/1000, tm=makani?(performance.now()-Ton)/1000:0;
      ov.hidden=false; confetti(q(el,'.dm-stage'));
      ov.innerHTML='<div class="vr-ovc"><span class="vr-ovi">🤍</span><h4>'+esc(t('Found! Safe and sound'))+'</h4><p>'+esc(t('You found your child in'))+' <b>'+mmss(tt)+'</b>.</p>'+
        '<div class="vr-st"><div><b>'+mmss(tt-tm)+'</b><small>'+esc(t('Searching alone'))+'</small></div><div><b>'+(makani?mmss(tm):'—')+'</b><small>'+esc(t('With Makani'))+'</small></div></div>'+
        '<button type="button" class="dm-btn" data-act="go">'+esc(t('Play again'))+'</button></div>';
      q(ov,'[data-act=go]').addEventListener('click',start);
      loopOff(); draw();
    }
    function mmss(s){ var m=Math.floor(s/60), x=Math.floor(s%60); return num(m+':'+(x<10?'0':'')+x); }
    /* ---- world update ---- */
    function blocked(x,y,r){ if(x<1.5||y<1.5||x>WS-1.5||y>WS-1.5) return true; for(var i=0;i<cols.length;i++){ if(Math.abs(cols[i].x-x)<r+.7 && Math.abs(cols[i].y-y)<r+.7) return true; } return false; }
    function update(dt){
      var turn=(keys.r?1:0)-(keys.l?1:0), mv=(keys.f?1:0)-(keys.b?1:0);
      P.a+=turn*1.9*dt;
      if(mv){ var near=0; for(var i=0;i<crowd.length;i++){ if(Math.abs(crowd[i].x-P.x)<1.2&&Math.abs(crowd[i].y-P.y)<1.2) near++; }
        var sp=mv*(3.4/(1+near*.45))*dt, nx=P.x+Math.cos(P.a)*sp, ny=P.y+Math.sin(P.a)*sp;
        var ox=P.x,oy=P.y; if(!blocked(nx,P.y,.4)) P.x=nx; if(!blocked(P.x,ny,.4)) P.y=ny; if(ox===P.x&&oy===P.y&&mv>0){ var sx2=P.x-Math.sin(P.a)*sp, sy2=P.y+Math.cos(P.a)*sp; if(!blocked(sx2,sy2,.4)){ P.x=sx2; P.y=sy2; } } }
      crowd.forEach(function(p){ if(Math.random()<.004) p.a+=rnd(-1.5,1.5); var nx=p.x+Math.cos(p.a)*p.sp*dt, ny=p.y+Math.sin(p.a)*p.sp*dt; if(blocked(nx,ny,.3)) p.a+=Math.PI*.7; else { p.x=nx; p.y=ny; } });
      if(Math.hypot(kid.tx-kid.x,kid.ty-kid.y)<.5){ kid.tx=Math.max(4,Math.min(WS-4,kid.x+rnd(-6,6))); kid.ty=Math.max(4,Math.min(WS-4,kid.y+rnd(-6,6))); }
      var ka=Math.atan2(kid.ty-kid.y,kid.tx-kid.x), kx=kid.x+Math.cos(ka)*.45*dt, ky=kid.y+Math.sin(ka)*.45*dt; if(!blocked(kx,ky,.2)){ kid.x=kx; kid.y=ky; } else { kid.tx=kid.x; kid.ty=kid.y; }
      var d=Math.hypot(kid.x-P.x,kid.y-P.y);
      if(makani){ var rel=Math.atan2(kid.y-P.y,kid.x-P.x)-P.a; var ar=q(ph,'.vr-arrow'); if(ar) ar.setAttribute('transform','rotate('+(rel*180/Math.PI)+' 50 50)'); var ds=q(ph,'.vr-dist'); if(ds) ds.textContent=num(Math.max(0,Math.round(d))+' '+t('m')); }
      q(el,'.vr-tm').textContent=mmss((performance.now()-T0)/1000);
      if(d<2.1) win();
    }
    /* ---- rendering ---- */
    function cam(x,y){ var dx=x-P.x, dy=y-P.y, c=Math.cos(P.a), s=Math.sin(P.a); return {z:dx*c+dy*s, x:-dx*s+dy*c}; }
    var BOARD=['JED → RUH  16:05','JED → MED  16:20','JED → MAK  16:30','JED → DMM  16:45'];
    function draw(){
      if(!W) return; var g=ctx; g.setTransform(DPR,0,0,DPR,0,0);
      /* glass roof at night with rows of lights */
      var sk=g.createLinearGradient(0,0,0,HOR); sk.addColorStop(0,'#05070f'); sk.addColorStop(.6,'#111a33'); sk.addColorStop(1,'#2a3557'); g.fillStyle=sk; g.fillRect(0,0,W,HOR+1);
      if(P){
        g.strokeStyle='rgba(140,170,220,.12)'; g.lineWidth=1;
        for(var rz=2; rz<40; rz+=3){ var ry=HOR-(6)/rz*F; if(ry<0) continue; g.beginPath(); g.moveTo(0,ry); g.lineTo(W,ry); g.stroke(); }
        for(var lx=-60; lx<=60; lx+=4){ for(var lz=3; lz<42; lz+=4){ var wx=P.x+Math.cos(P.a)*lz-Math.sin(P.a)*lx, wy=P.y+Math.sin(P.a)*lz+Math.cos(P.a)*lx; var gx=Math.round(wx/8)*8, gy=Math.round(wy/8)*8; var v=cam(gx,gy); if(v.z<1.5) continue;
            var x=W/2+v.x/v.z*F, y=HOR-(6.2)/v.z*F; if(x<-20||x>W+20||y<0) continue; var r=Math.max(1,2.4/v.z*F*.06);
            g.fillStyle='rgba(255,232,180,'+Math.max(.15,Math.min(.95,1.4-v.z/30))+')'; g.beginPath(); g.ellipse(x,y,r*2.2,r*.7,0,0,TAU); g.fill(); } }
        /* far end of the hall: platforms and a waiting train */
        SKY.forEach(function(b,bi){ var d=((b.a-P.a+Math.PI)%TAU+TAU)%TAU-Math.PI; if(Math.abs(d)>FOV) return; var x=W/2+Math.tan(d)*F; if(!isFinite(x)) return;
          if(b.k===0){ var tw=W*.22, th=H*.07; var tg=g.createLinearGradient(0,HOR-th,0,HOR); tg.addColorStop(0,'#e9eef5'); tg.addColorStop(1,'#9aa6b8'); g.fillStyle=tg; rr(g,x-tw/2,HOR-th,tw,th,th*.45); g.fill();
            g.fillStyle='#2b8a3e'; g.fillRect(x-tw/2,HOR-th*.32,tw,th*.12); g.fillStyle='rgba(30,50,90,.85)'; for(var k=0;k<7;k++) g.fillRect(x-tw/2+tw*.08+k*tw*.12,HOR-th*.78,tw*.08,th*.32); }
          else if(b.k===1){ var bw=W*.09, bh=H*.05; g.fillStyle='#0b0f1a'; g.fillRect(x-bw/2,HOR-H*.2,bw,bh); g.fillStyle='#ffb000'; g.font='700 '+Math.max(8,bh*.32)+'px ui-monospace,monospace'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(BOARD[bi%4],x,HOR-H*.2+bh/2); }
          else { g.fillStyle='rgba(160,180,210,.25)'; g.fillRect(x-W*b.w/2,HOR-H*.035*b.h,W*b.w,H*.035*b.h); } });
      }
      g.fillStyle='rgba(60,72,100,.9)'; g.fillRect(0,HOR-H*.012,W,H*.012);
      /* polished stone floor */
      var fl=g.createLinearGradient(0,HOR,0,H); fl.addColorStop(0,'#5d6678'); fl.addColorStop(.5,'#9aa2b1'); fl.addColorStop(1,'#cdd2db'); g.fillStyle=fl; g.fillRect(0,HOR,W,H-HOR);
      var gl=g.createRadialGradient(W/2,HOR+10,10,W/2,HOR+10,W*.6); gl.addColorStop(0,'rgba(255,230,180,.28)'); gl.addColorStop(1,'rgba(255,230,180,0)'); g.fillStyle=gl; g.fillRect(0,HOR,W,H-HOR);
      if(!P) return;
      g.strokeStyle='rgba(255,255,255,.14)'; g.lineWidth=1;
      var gx0=Math.floor((P.x-30)/3)*3, gy0=Math.floor((P.y-30)/3)*3;
      for(var gx=gx0; gx<=P.x+30; gx+=3) seg(gx,P.y-30,gx,P.y+30);
      for(var gy=gy0; gy<=P.y+30; gy+=3) seg(P.x-30,gy,P.x+30,gy);
      g.strokeStyle='rgba(255,196,0,.55)'; g.lineWidth=3; seg(4,WS-4,WS-4,WS-4); seg(4,4,WS-4,4);
      var S=[];
      cols.forEach(function(c){ var v=cam(c.x,c.y); if(v.z>.3&&v.z<60) S.push({z:v.z,x:v.x,t:'c'}); });
      crowd.forEach(function(p,pi){ var v=cam(p.x,p.y); if(v.z>.35&&v.z<45){ S.push({z:v.z,x:v.x,t:'p',ty:p.ty,sd:p.sd,ph:p.ph,h:p.h}); if(pi%4===0&&p.ty!=='kid2'){ var v2=cam(p.x+.45,p.y+.3); if(v2.z>.35) S.push({z:v2.z,x:v2.x,t:'p',ty:'bag',sd:pi,ph:0,h:.62}); } } });
      var kv=cam(kid.x,kid.y); if(kv.z>.35&&kv.z<45) S.push({z:kv.z,x:kv.x,t:'p',ty:'kid',sd:3,ph:1,h:1.75,kid:1});
      S.sort(function(a,b){ return b.z-a.z; });
      S.forEach(function(o){
        var sx=W/2+o.x/o.z*F, fy=HOR+1.6/o.z*F, fade=1;
        g.globalAlpha=1;
        if(o.t==='c'){ var cw=.55/o.z*F, ty=HOR+(1.6-7)/o.z*F; if(sx<-cw*3||sx>W+cw*3) return;
          var cg=g.createLinearGradient(sx-cw/2,0,sx+cw/2,0); cg.addColorStop(0,'#3d4658'); cg.addColorStop(.45,'#c7ced9'); cg.addColorStop(1,'#2c3342'); g.fillStyle=cg; g.fillRect(sx-cw/2,ty,cw,fy-ty);
          g.globalAlpha=.35; g.fillStyle=cg; g.fillRect(sx-cw/2,fy,cw,(fy-ty)*.22); g.globalAlpha=1;
          var bw2=2.2/o.z*F, bh2=.75/o.z*F, by2=HOR+(1.6-3.2)/o.z*F; g.fillStyle='#0b0f1a'; rr(g,sx-bw2/2,by2,bw2,bh2,Math.max(2,bh2*.12)); g.fill();
          if(bh2>9){ g.fillStyle='#ffb000'; g.font='700 '+Math.round(bh2*.3)+'px ui-monospace,monospace'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(BOARD[Math.abs(Math.round(o.x*7+o.z))%4],sx,by2+bh2*.36);
            g.fillStyle='#4ade80'; g.font='600 '+Math.round(bh2*.2)+'px ui-monospace,monospace'; g.fillText('ON TIME',sx,by2+bh2*.74); }
          g.globalAlpha=1; return; }
        var hpx=o.h/o.z*F; if(sx<-hpx||sx>W+hpx){ g.globalAlpha=1; return; }
        g.fillStyle='rgba(0,0,0,.22)'; g.beginPath(); g.ellipse(sx,fy,hpx*.28,hpx*.06,0,0,TAU); g.fill();
        var im=sprite(o.ty,o.sd), bob=o.ty==='bag'?0:Math.abs(Math.sin(performance.now()/260+o.ph))*hpx*.015, iw=hpx*im.width/im.height; g.drawImage(im,sx-iw/2,fy-hpx-bob,iw,hpx);
        if(o.z>14){ g.fillStyle='rgba(17,26,51,'+Math.min(.55,(o.z-14)/50)+')'; g.fillRect(sx-iw/2,fy-hpx-bob,iw,hpx*.0); }
        g.globalAlpha=1;
      });
      if(makani && phase==='play'){
        if(kv.z>.35){ var bx=W/2+kv.x/kv.z*F, by=HOR+(1.6-1.15)/kv.z*F, bw=Math.max(10,.7/kv.z*F);
          var bg=g.createLinearGradient(0,0,0,by); bg.addColorStop(0,'rgba(77,182,255,0)'); bg.addColorStop(1,'rgba(77,182,255,.75)');
          g.fillStyle=bg; g.fillRect(bx-bw/2,0,bw,by);
          g.fillStyle='#4db6ff'; g.beginPath(); g.arc(bx,by-6,5,0,TAU); g.fill();
          var lbl='MK-0417 · '+Math.round(Math.hypot(kid.x-P.x,kid.y-P.y))+' m'; g.font='700 13px system-ui,sans-serif'; var lw=g.measureText(lbl).width+16, ly=Math.max(54,by-60);
          var lx=Math.max(lw/2+8,Math.min(W-lw/2-8,bx)); g.fillStyle='rgba(4,20,36,.85)'; rr(g,lx-lw/2,ly,lw,24,12); g.fill(); g.fillStyle='#fff'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(lbl,lx,ly+12);
        }
        var rel=((Math.atan2(kid.y-P.y,kid.x-P.x)-P.a+Math.PI)%TAU+TAU)%TAU-Math.PI;
        if(Math.abs(rel)>FOV/2){ var sd=rel>0?1:-1, ax=sd>0?W-34:34; g.fillStyle='rgba(77,182,255,.95)'; g.beginPath(); g.moveTo(ax+sd*16,HOR); g.lineTo(ax-sd*6,HOR-16); g.lineTo(ax-sd*6,HOR+16); g.fill(); }
      }
    }
    function rr(g,x,y,w,h,r){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
    function seg(x1,y1,x2,y2){ var a=cam(x1,y1), b=cam(x2,y2), n=.4; if(a.z<n&&b.z<n) return;
      if(a.z<n){ var k=(n-a.z)/(b.z-a.z); a={z:n,x:a.x+(b.x-a.x)*k}; } if(b.z<n){ var k2=(n-b.z)/(a.z-b.z); b={z:n,x:b.x+(a.x-b.x)*k2}; }
      ctx.beginPath(); ctx.moveTo(W/2+a.x/a.z*F, HOR+1.6/a.z*F); ctx.lineTo(W/2+b.x/b.z*F, HOR+1.6/b.z*F); ctx.stroke(); }
    function frame(now){ raf=0; if(!vis||phase!=='play') return; var dt=Math.min(.05,(now-(last||now))/1000); last=now; update(dt); if(phase==='play'){ draw(); raf=requestAnimationFrame(frame); } }
    function loopOn(){ if(!raf&&vis&&phase==='play'){ last=0; raf=requestAnimationFrame(frame); } }
    function loopOff(){ if(raf) cancelAnimationFrame(raf); raf=0; }
    /* ---- input ---- */
    var KM={ArrowUp:'f',KeyW:'f',ArrowDown:'b',KeyS:'b',ArrowLeft:'l',KeyA:'l',ArrowRight:'r',KeyD:'r'};
    cv.addEventListener('keydown',function(e){ var k=KM[e.code]; if(!k) return; e.preventDefault(); if(AR&&(k==='l'||k==='r')&&false) k=k; keys[k]=1; });
    cv.addEventListener('keyup',function(e){ var k=KM[e.code]; if(k) keys[k]=0; });
    cv.addEventListener('blur',function(){ keys={}; });
    qa(el,'.vr-pad button').forEach(function(b){ var k=b.getAttribute('data-k');
      b.addEventListener('pointerdown',function(e){ e.preventDefault(); keys[k]=1; b.setPointerCapture&&b.setPointerCapture(e.pointerId); });
      ['pointerup','pointercancel','pointerleave'].forEach(function(ev){ b.addEventListener(ev,function(){ keys[k]=0; }); }); });
    var dragX=null;
    cv.addEventListener('pointerdown',function(e){ dragX=e.clientX; cv.setPointerCapture&&cv.setPointerCapture(e.pointerId); cv.focus(); });
    cv.addEventListener('pointermove',function(e){ if(dragX===null||phase!=='play') return; P.a+=(e.clientX-dragX)*.006; dragX=e.clientX; });
    ['pointerup','pointercancel'].forEach(function(ev){ cv.addEventListener(ev,function(){ dragX=null; }); });
    if('ResizeObserver' in window) new ResizeObserver(size).observe(view);
    reset(); size(); intro();
    onScreen(el,function(){ vis=true; size(); loopOn(); },function(){ vis=false; keys={}; loopOff(); });
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
  /* rakeez: a living focus field behind the computer */
  '.rk6-row.of{position:relative;align-items:end;padding:clamp(1.8rem,4vw,3.2rem) clamp(1rem,3vw,2.6rem) clamp(2rem,4vw,3rem);border-radius:22px;overflow:hidden;isolation:isolate;background:#06080b;box-shadow:0 0 0 1px var(--line2),0 40px 80px -40px rgba(0,0,0,.9)}'+
  '.fx-bg{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden}'+
  '.fx-bg::before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.09) 1px,transparent 1.4px);background-size:22px 22px;-webkit-mask:radial-gradient(ellipse at 50% 45%,#000 30%,transparent 80%);mask:radial-gradient(ellipse at 50% 45%,#000 30%,transparent 80%)}'+
  '.fx-au{position:absolute;top:-25%;inset-inline-start:-10%;width:65%;aspect-ratio:1;border-radius:50%;background:var(--lc);filter:blur(90px);opacity:.3;transition:background-color 1.2s;animation:fxA 18s ease-in-out infinite alternate}'+
  '.fx-au2{top:auto;bottom:-35%;inset-inline-start:auto;inset-inline-end:-15%;width:60%;background:#14c7be;opacity:.18;animation-duration:23s;animation-direction:alternate-reverse}'+
  '@keyframes fxA{to{transform:translate(18%,12%) scale(1.15)}}'+
  '.fx-rings{position:absolute;top:50%;inset-inline-end:clamp(40px,12%,140px);width:1400px;aspect-ratio:1;transform:translate(50%,-50%);border-radius:50%;background:repeating-radial-gradient(circle,transparent 0 56px,rgba(20,199,190,.07) 57px 58px);-webkit-mask:radial-gradient(circle,#000 10%,transparent 60%);mask:radial-gradient(circle,#000 10%,transparent 60%)}'+
  'html[dir=rtl] .fx-rings{transform:translate(-50%,-50%)}'+
  '.of .pc{position:relative;z-index:2}.of .pc::after{content:"";position:absolute;bottom:-16px;left:30%;right:30%;height:22px;border-radius:50%;background:radial-gradient(ellipse,rgba(0,0,0,.7),transparent 70%);z-index:-1}'+
  '.of .pc-stand{position:relative;height:38px}.of .pc-stand::after{position:absolute;bottom:-7px;left:-45%;right:-45%;height:9px;border-radius:5px 5px 2px 2px;background:linear-gradient(#e3e6e9,#9aa0a6)}'+
  '.of .rk6-side{position:relative;z-index:1;align-self:stretch;display:flex;flex-direction:column;justify-content:space-between;align-items:center}'+
  '.rk6-card{width:100%;background:rgba(255,255,255,.045);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:1rem 1rem .9rem;text-align:center}'+
  '.rk6-card .rk5-desc{margin-bottom:.8rem;font-size:.86rem}'+
  '.of .rk5-dev{width:150px;margin:1.6rem 0 0}'+
  '.fx-son{position:absolute;inset:0;z-index:-1;pointer-events:none}.fx-son i{position:absolute;inset:0;border-radius:50%;border:1.5px solid var(--lc);opacity:0;animation:fxS calc(var(--sp) * 2.2) cubic-bezier(.2,.6,.4,1) infinite}.fx-son i:nth-child(2){animation-delay:calc(var(--sp) * .73)}.fx-son i:nth-child(3){animation-delay:calc(var(--sp) * 1.46)}'+
  '@keyframes fxS{0%{transform:scale(1);opacity:.55}100%{transform:scale(4.2);opacity:0}}'+
  '@media (max-width:820px){.rk6-row.of{padding:1.2rem .7rem 1.6rem;border-radius:16px}.of .rk6-side{display:none}.of .pc-stand{height:24px}.fx-au{width:110%}}'+
  '@media (prefers-reduced-motion:reduce){.fx-au,.fx-son i{animation:none}}'+
  /* lock screen: the day starts when you press start */
  '.pc-lock{position:absolute;inset:0;z-index:30;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:54px 20px 60px;color:#fff;background:rgba(12,16,28,.28);backdrop-filter:blur(22px) saturate(1.3);transition:opacity .6s,transform .6s}'+
  '.pc-lock.off{opacity:0;transform:translateY(-30px);pointer-events:none}'+
  '.pc-lk-t{text-align:center}.pc-lk-t small{display:block;font-size:17px;font-weight:500;opacity:.9}.pc-lk-t b{display:block;font-size:84px;font-weight:600;line-height:1.05;letter-spacing:-.02em;text-shadow:0 2px 20px rgba(0,0,0,.2)}'+
  '.pc-lk-u{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;max-width:380px}'+
  '.pc-lk-av{width:66px;height:66px;border-radius:50%;background:linear-gradient(#cfd8e3,#8e9bb0);display:grid;place-items:center;box-shadow:0 8px 20px rgba(0,0,0,.3);overflow:hidden}.pc-lk-av svg{width:100%;height:100%}'+
  '.pc-lk-u>b{font-size:16px}.pc-lk-u>small{font-size:12px;opacity:.8;margin-top:-4px}.pc-lk-u p{margin:6px 0 4px;font-size:13.5px;line-height:1.6;background:rgba(0,0,0,.25);padding:8px 14px;border-radius:12px}'+
  '.pc-lk-go{margin-top:4px;border:0;border-radius:24px;padding:11px 26px;font-size:14px;font-weight:700;background:#fff;color:#111!important;box-shadow:0 10px 24px rgba(0,0,0,.3);animation:lkP 2s ease-in-out infinite}.pc-lk-go:hover{transform:scale(1.04)}@keyframes lkP{50%{box-shadow:0 0 0 8px rgba(255,255,255,.18),0 10px 24px rgba(0,0,0,.3)}}'+
  '.pc-m .pc-lk-t b{font-size:72px}'+
  /* chat: a familiar messenger */
  '.wa{display:grid;grid-template-columns:290px 1fr;min-height:0;background:#fff;color:#111b21}'+
  '.wa-side{display:flex;flex-direction:column;min-height:0;border-inline-end:1px solid #e9edef}'+
  '.wa-sh{display:flex;align-items:center;justify-content:space-between;padding:12px 16px 6px}.wa-sh b{font-size:19px;font-weight:700}.wa-sh span{display:flex;gap:16px;color:#54656f}'+
  '.wa-srch{margin:6px 12px;display:flex;align-items:center;gap:10px;background:#f0f2f5;border-radius:8px;padding:8px 12px;color:#667781;font-size:12.5px}'+
  '.wa-pills{display:flex;gap:6px;padding:4px 12px 8px}.wa-pills button{border:0;border-radius:16px;background:#f0f2f5;color:#54656f!important;font-size:12px;padding:5px 12px}.wa-pills button.on{background:#d9fdd3;color:#008069!important;font-weight:600}'+
  '.wa-list{flex:1;overflow:auto}'+
  '.wa-row{display:flex;gap:12px;align-items:center;width:100%;border:0;background:none;padding:0;padding-inline-start:12px;text-align:start;color:#111b21!important}.wa-row:hover{background:#f5f6f6}.wa-row.sel{background:#f0f2f5}'+
  '.wa-av{flex:none;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:600;font-size:17px;overflow:hidden}.wa-av svg{width:100%;height:100%;display:block}'+
  '.wa-rb{flex:1;min-width:0;display:grid;gap:2px;padding:12px 0;padding-inline-end:14px;border-bottom:1px solid #f0f2f5}'+
  '.wa-r1,.wa-r2{display:flex;align-items:center;gap:6px;min-width:0}.wa-r1 b{flex:1;min-width:0;font-size:14.5px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wa-r1 small{font-size:11px;color:#667781}.wa-row.un .wa-r1 small{color:#1fa855;font-weight:600}'+
  '.wa-r2>span{flex:1;min-width:0;font-size:12.5px;color:#667781;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wa-r2 em{flex:none;font-style:normal;background:#25d366;color:#fff;border-radius:10px;min-width:20px;height:20px;padding:0 6px;display:grid;place-items:center;font-size:11px;font-weight:700}'+
  '.wa-main{display:flex;flex-direction:column;min-height:0;min-width:0;background:#efeae2}'+
  '.wa-hd{display:flex;align-items:center;gap:12px;padding:8px 16px;background:#f0f2f5;border-bottom:1px solid #e9edef}.wa-hd .wa-av{width:40px;height:40px;font-size:15px}.wa-hd>div{flex:1;min-width:0;display:grid}.wa-hd b{font-size:15px;font-weight:500}.wa-hd small{font-size:12px;color:#667781;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wa-hd small.ty{color:#008069}.wa-hd>span{display:flex;gap:18px;color:#54656f}'+
  '.wa-msgs{flex:1;overflow:auto;padding:10px 7%;display:flex;flex-direction:column;gap:2px;background-color:#efeae2;background-size:160px;scroll-behavior:smooth}'+
  '.wa-day{align-self:center;background:#fff;color:#54656f;font-size:11.5px;padding:5px 12px;border-radius:8px;margin:2px 0 6px;box-shadow:0 1px .5px rgba(11,20,26,.13)}'+
  '.wa-m{display:flex;animation:qaIn .3s}.wa-m.out{justify-content:flex-end}.wa-m.first{margin-top:7px}'+
  '.wa-b{position:relative;max-width:68%;background:#fff;border-radius:8px;padding:6px 9px 7px;box-shadow:0 1px .5px rgba(11,20,26,.13);font-size:13.5px;line-height:1.42;color:#111b21}.wa-m.out .wa-b{background:#d9fdd3}'+
  '.wa-m.in.first .wa-b{border-start-start-radius:0}.wa-m.out.first .wa-b{border-start-end-radius:0}'+
  '.wa-m.first .wa-b::before{content:"";position:absolute;top:0;width:8px;height:13px;background:inherit}'+
  '.wa-m.in.first .wa-b::before{inset-inline-start:-8px;clip-path:polygon(0 0,100% 0,100% 100%)}.wa-m.out.first .wa-b::before{inset-inline-end:-8px;clip-path:polygon(0 0,100% 0,0 100%)}'+
  'html[dir=rtl] .wa-m.in.first .wa-b::before{clip-path:polygon(0 0,100% 0,0 100%)}html[dir=rtl] .wa-m.out.first .wa-b::before{clip-path:polygon(0 0,100% 0,100% 100%)}'+
  '.wa-n{display:block;font-size:12.5px;font-weight:600;margin-bottom:1px}'+
  '.wa-meta{float:right;display:inline-flex;align-items:center;gap:3px;margin:7px 0 -5px 12px;font-size:10.5px;color:#667781;line-height:1}html[dir=rtl] .wa-meta{float:left;margin:7px 12px -5px 0}'+
  '.wa-tk{width:16px;height:11px;flex:none;color:#8696a0}.wa-tk.read{color:#53bdeb}.wa-r2 .wa-tk{margin-inline-end:-2px}'+
  '.wa-b .tm-dots{margin:0;padding:4px 2px}'+
  '.wa-sug{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;padding:8px 12px 2px;background:#f0f2f5}.wa-sug button{border:1px solid #d1d7db;background:#fff;border-radius:18px;padding:6px 13px;font-size:12.5px;color:#008069!important;box-shadow:0 1px .5px rgba(11,20,26,.1);transition:.15s}.wa-sug button:hover{background:#d9fdd3;border-color:#25d366}'+
  '.wa-in{display:flex;align-items:center;gap:14px;padding:8px 16px 10px;background:#f0f2f5;color:#54656f}.wa-fld{flex:1;background:#fff;border-radius:8px;padding:9px 12px;color:#8696a0;font-size:13px}'+
  '.wa-lock{padding:13px;text-align:center;background:#f0f2f5;font-size:12.5px;color:#667781}'+
  '.pc-m .wa{display:flex;flex-direction:column}.pc-m .wa-side{flex:none;border:0;border-bottom:1px solid #e9edef}.pc-m .wa-sh,.pc-m .wa-srch,.pc-m .wa-pills{display:none}'+
  '.pc-m .wa-list{display:flex;overflow-x:auto;gap:2px;padding:6px 4px}.pc-m .wa-row{position:relative;flex:none;flex-direction:column;width:66px;padding:2px;gap:3px;border-radius:10px}.pc-m .wa-rb{padding:0;border:0;width:100%}.pc-m .wa-r1 small,.pc-m .wa-r2>span,.pc-m .wa-r2 .wa-tk{display:none}.pc-m .wa-r1 b{font-size:10.5px;text-align:center}.pc-m .wa-r2 em{position:absolute;top:0;right:6px}.pc-m .wa-msgs{padding:8px}.pc-m .wa-b{max-width:84%}.pc-m .wa-hd>span:last-child{display:none}'+
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
  '.pc-fit{position:relative;width:100%;aspect-ratio:16/10;border-radius:16px;border:11px solid #0e1012;border-bottom-width:26px;background:#000;overflow:hidden;box-shadow:0 0 0 1px #3a3f45,inset 0 0 0 1px #000,0 50px 80px -34px rgba(0,0,0,.95)}'+
  '.pc-fit::after{content:"";position:absolute;bottom:-19px;left:50%;width:7px;height:7px;margin-left:-3px;border-radius:50%;background:#2b2f33}'+
  '.pc-stand{width:20%;height:44px;background:linear-gradient(90deg,#9aa0a6,#e3e6e9 45%,#b6bbc0);clip-path:polygon(22% 0,78% 0,92% 100%,8% 100%);margin-top:-1px}'+
  '.pc-stand::after{content:"";display:block}'+
  '.pc-scr{position:absolute;top:0;left:0;width:1000px;height:625px;transform-origin:0 0;overflow:hidden;font-size:13px;color:#1d1d1f;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;text-align:start;-webkit-font-smoothing:antialiased}'+
  'html[dir=rtl] .pc-scr{left:auto;right:0;transform-origin:100% 0}'+
  'html[lang=ar] .pc-scr{font-family:"IBM Plex Sans Arabic",system-ui,sans-serif}'+
  '.pc-scr button{font-family:inherit;font-size:inherit;cursor:pointer}'+
  '.pc-bar{position:absolute;top:0;left:0;right:0;height:26px;display:flex;align-items:center;gap:16px;padding:0 14px;background:rgba(20,24,30,.42);backdrop-filter:blur(18px) saturate(1.6);color:#fff;font-size:12.5px;z-index:7}'+
  '.pc-logo{width:14px;height:14px;border-radius:50%;border:3px solid #fff;opacity:.95}.pc-bar>b{font-weight:700}'+
  '.pc-menus{display:flex;gap:16px;opacity:.92}.pc-r{margin-inline-start:auto;display:flex;align-items:center;gap:12px}'+
  '.pc-rkdot{width:9px;height:9px;border-radius:50%;background:var(--lc);box-shadow:0 0 8px var(--lc);transition:.7s}.pc-bat{display:flex;align-items:center;gap:4px}'+
  '.pc-desk{position:absolute;inset:0;overflow:hidden}'+
  '.pc-wp{position:absolute;inset:0;background:radial-gradient(90% 70% at 85% 10%,#3a7f8a,transparent 60%),radial-gradient(70% 60% at 10% 90%,#4b2a7a,transparent 60%),linear-gradient(160deg,#0f2a38,#0a1520 70%)}'+
  '.pc-wp i{position:absolute;border-radius:50%;filter:blur(40px);opacity:.55}.pc-wp i:nth-child(1){width:380px;height:380px;left:-60px;top:240px;background:#7d3cff}.pc-wp i:nth-child(2){width:420px;height:300px;right:-40px;top:-60px;background:#23a0ba}.pc-wp i:nth-child(3){width:260px;height:260px;left:45%;top:40%;background:#e8590c;opacity:.22}'+
  '.pc-widgets{position:absolute;top:44px;inset-inline-start:18px;display:grid;gap:12px;width:220px}'+
  '.pc-wcal,.pc-wnote{border-radius:18px;padding:14px;background:rgba(255,255,255,.14);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.18);color:#fff;box-shadow:0 10px 30px rgba(0,0,0,.2)}'+
  '.pc-wch{display:flex;align-items:baseline;gap:8px;margin-bottom:8px}.pc-wch small{color:#ff8787;font-weight:700;font-size:12px}.pc-wch b{font-size:30px;font-weight:300}'+
  '.pc-wcal ul{list-style:none;margin:0;padding:0;display:grid;gap:7px}.pc-wcal li{display:grid;padding-inline-start:9px;border-inline-start:3px solid var(--c);font-size:11.5px}.pc-wcal li small{opacity:.75}'+
  '.pc-wnote{background:rgba(255,224,102,.92);color:#5c4400;border:0}.pc-wnote b{font-size:12px}.pc-wnote p{margin:4px 0 0;font-size:12px;line-height:1.5}'+
  '.pc-files{position:absolute;top:40px;inset-inline-end:14px;display:grid;gap:10px;justify-items:center}'+
  '.pc-file{width:96px;display:grid;justify-items:center;gap:4px;background:none;border:0;border-radius:8px;padding:6px 4px;color:#fff!important}.pc-file span{width:46px;height:46px;display:grid;place-items:center}.pc-file svg{width:44px;height:44px;filter:drop-shadow(0 3px 5px rgba(0,0,0,.35))}'+
  '.pc-file small{font-size:11px;line-height:1.25;text-align:center;text-shadow:0 1px 3px rgba(0,0,0,.7);word-break:break-word;padding:1px 4px;border-radius:4px}.pc-file.sel small,.pc-file:focus small{background:#2f6fe4}.pc-file.sel span{background:rgba(255,255,255,.18);border-radius:6px}'+
  '.pc-win{position:absolute;top:44px;left:50px;right:50px;bottom:92px;border-radius:12px;background:#fff;box-shadow:0 0 0 .5px rgba(0,0,0,.25),0 30px 70px rgba(0,0,0,.55);overflow:hidden;display:flex;flex-direction:column;z-index:4;animation:pcIn .28s cubic-bezier(.2,.9,.3,1.1);transition:inset .3s}.pc-win[hidden]{display:none}'+
  '.pc-win.max{top:26px;left:0;right:0;bottom:80px;border-radius:0}'+
  '@keyframes pcIn{from{transform:scale(.92) translateY(14px);opacity:0}}'+
  '.pc-wt{position:relative;height:36px;flex:none;display:flex;align-items:center;justify-content:center;padding:0 12px;background:linear-gradient(#f6f6f7,#ebebed);border-bottom:1px solid #dcdcdf}'+
  '.pc-wt b{font-size:13px;color:#3a3a3c}'+
  '.pc-dots{position:absolute;left:12px;display:flex;gap:8px;direction:ltr}.pc-dots i{width:12px;height:12px;border-radius:50%;background:#ff5f57;box-shadow:inset 0 0 0 .5px rgba(0,0,0,.2);cursor:pointer}.pc-dots i:nth-child(2){background:#febc2e}.pc-dots i:nth-child(3){background:#28c840}'+
  '.pc-wb{flex:1;overflow:hidden;display:flex;min-height:0}.pc-wb>div{flex:1;min-width:0}'+
  '.pc-dock{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);display:flex;align-items:flex-end;gap:8px;padding:7px 10px;border-radius:22px;background:rgba(255,255,255,.2);backdrop-filter:blur(22px) saturate(1.5);border:1px solid rgba(255,255,255,.28);z-index:6;direction:ltr}'+
  '.pc-ico{position:relative;display:grid;justify-items:center;background:none;border:0;padding:0;color:#fff!important}.pc-ico small{position:absolute;bottom:72px;font-size:11px;white-space:nowrap;background:rgba(30,30,30,.85);padding:3px 8px;border-radius:6px;opacity:0;pointer-events:none;transition:.15s}.pc-ico:hover small{opacity:1}'+
  '.pc-i{width:52px;height:52px;display:block;transition:transform .2s cubic-bezier(.3,1.6,.5,1)}.pc-i svg{width:100%;height:100%;filter:drop-shadow(0 4px 6px rgba(0,0,0,.3))}.pc-ico:hover .pc-i{transform:translateY(-8px) scale(1.15)}'+
  '.pc-ico.on::after{content:"";position:absolute;bottom:-5px;width:4px;height:4px;border-radius:50%;background:#fff}'+
  '.pc-sep{width:1px;align-self:stretch;margin:4px 2px;background:rgba(255,255,255,.35)}.pc-trash{cursor:default}'+
  '.rk-ring6{stroke:var(--lc);transition:stroke .7s}'+
  '.pc-bdg{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;border-radius:10px;background:#ff3b30;color:#fff;font:700 11px/20px sans-serif;font-style:normal;text-align:center;padding:0 5px;box-shadow:0 1px 3px rgba(0,0,0,.3)}.pc-bdg[hidden]{display:none}'+
  /* notifications, call, intervention */
  '.pc-nots{position:absolute;top:34px;inset-inline-end:10px;width:330px;display:grid;gap:8px;z-index:8}'+
  '.pc-n{display:flex;gap:10px;align-items:flex-start;text-align:start;background:rgba(246,246,248,.9);backdrop-filter:blur(24px);border:0;border-radius:16px;padding:11px 12px;box-shadow:0 14px 34px rgba(0,0,0,.32),0 0 0 .5px rgba(0,0,0,.08);color:#1d1d1f!important;animation:pcN .5s cubic-bezier(.2,1.3,.4,1)}'+
  'html[dir=rtl] .pc-n{animation-name:pcNr}@keyframes pcN{from{transform:translateX(120%)}}@keyframes pcNr{from{transform:translateX(-120%)}}'+
  '.pc-n.out{opacity:0;transform:translateY(-6px);transition:.4s}.pc-ni{flex:none;width:34px;height:34px}.pc-ni svg{width:100%;height:100%}.pc-n div{flex:1;min-width:0}'+
  '.pc-nh{display:flex;justify-content:space-between;margin:0 0 1px;font-size:10.5px;color:#6e6e73;text-transform:uppercase;letter-spacing:.03em}.pc-nh b{font-weight:600}.pc-n>div>b{font-size:13px}.pc-n>div>p:last-child{margin:1px 0 0;font-size:12.5px;line-height:1.4;color:#3a3a3c}'+
  '.pc-call{position:absolute;top:36px;left:50%;transform:translateX(-50%);z-index:9;animation:pcIn .3s}.pc-call[hidden]{display:none}'+
  '.pc-callc{display:flex;align-items:center;gap:12px;background:rgba(28,28,30,.94);backdrop-filter:blur(20px);color:#fff;border-radius:18px;padding:12px 14px;box-shadow:0 20px 50px rgba(0,0,0,.5);min-width:400px}'+
  '.pc-cav{width:42px;height:42px;border-radius:50%;background:linear-gradient(#5c7cfa,#364fc7);display:grid;place-items:center;font-size:20px}.pc-callc div{flex:1}.pc-callc b{font-size:14px}.pc-callc p{margin:2px 0 0;font-size:12px;opacity:.7}'+
  '.pc-callc button{border:0;border-radius:10px;padding:8px 14px;font-weight:700;color:#fff!important}.pc-callc .dec{background:#ff3b30}.pc-callc .acc{background:#30d158;animation:rkSh .6s infinite}'+
  '.pc-int,.pc-done{position:absolute;inset:26px 0 0;z-index:10;display:grid;place-items:center;background:rgba(40,4,6,.72);backdrop-filter:blur(10px);animation:dmIn .4s}.pc-int[hidden],.pc-done[hidden]{display:none}.pc-done{background:rgba(4,30,20,.78)}'+
  '.pc-intc,.pc-donec{width:440px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;color:#fff}.pc-intc>b{font-size:20px;letter-spacing:.08em;color:#ff453a}.pc-intc p{margin:0;font-size:15px;line-height:1.7}.pc-intc>div{display:flex;gap:10px;width:100%}'+
  '.pc-donec>span{font-size:48px}.pc-donec>b{font-size:24px}'+
  '.pc-ib{flex:1;border:0;border-radius:12px;padding:12px 16px;font-weight:700;background:#fff;color:#000!important}.pc-ib.pc-ib2{background:rgba(255,255,255,.14);color:#fff!important}'+
  /* shared app bits */
  '.tm-av{flex:none;width:30px;height:30px;border-radius:8px;display:grid;place-items:center;color:#fff;font-weight:700;font-size:13px}'+
  '.ldg-search{display:flex;align-items:center;gap:6px;background:#f1f1f3;border-radius:8px;padding:6px 10px;color:#8e8e93;font-size:12px}'+
  '.iv-empty{color:#8e8e93;text-align:center;margin:30px 0}'+
  /* Ledger */
  '.lg{display:grid;grid-template-columns:170px 1fr 290px;min-height:0}'+
  '.ldg-side{background:#f7f7f9;border-inline-end:1px solid #e9e9ec;padding:12px 10px;display:flex;flex-direction:column;gap:2px}'+
  '.ldg-org{display:flex;gap:8px;align-items:center;padding:4px 6px 12px}.ldg-mark{width:30px;height:30px;border-radius:9px;background:linear-gradient(#51cf66,#2b8a3e);color:#fff;display:grid;place-items:center;font-weight:800}.ldg-org b{display:block;font-size:14px}.ldg-org small{font-size:10.5px;color:#8e8e93}'+
  '.ldg-nav{display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:8px;color:#3a3a3c}.ldg-nav i{font-style:normal;width:18px;text-align:center}.ldg-nav.on{background:#e3f7e8;color:#1e7e3a;font-weight:700}.ldg-nav em{margin-inline-start:auto;font-style:normal;font-size:11px;background:#2b8a3e;color:#fff;border-radius:9px;padding:0 7px}'+
  '.ldg-user{margin-top:auto;display:flex;gap:8px;align-items:center;padding:8px 6px;border-top:1px solid #e9e9ec}.ldg-user b{display:block;font-size:12px}.ldg-user small{font-size:10.5px;color:#8e8e93}'+
  '.ldg-main{display:flex;flex-direction:column;min-width:0;padding:12px 14px;gap:10px}'+
  '.ldg-tool{display:flex;align-items:center;justify-content:space-between;gap:10px}.ldg-tool h4{margin:0;font-size:17px}'+
  '.ldg-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.ldg-kpis div{border:1px solid #ececef;border-radius:10px;padding:8px 10px;display:grid;gap:2px}.ldg-kpis small{font-size:10.5px;color:#8e8e93}.ldg-kpis b{font-size:14px}.ldg-kpis .red b{color:#e03131}'+
  '.ldg-seg{display:flex;gap:4px;background:#f1f1f3;border-radius:8px;padding:3px;align-self:flex-start}.ldg-seg button{border:0;background:none;border-radius:6px;padding:4px 12px;font-size:12px;color:#3a3a3c!important}.ldg-seg button.on{background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12);font-weight:700}'+
  '.ldg-tab{flex:1;overflow:auto;border:1px solid #ececef;border-radius:10px}'+
  '.ldg-th,.ldg-row{display:grid;grid-template-columns:72px 1fr 56px 104px 64px;gap:8px;align-items:center;padding:8px 10px;font-size:12px}'+
  '.ldg-th{position:sticky;top:0;background:#fafafb;color:#8e8e93;font-size:10.5px;text-transform:uppercase;letter-spacing:.03em;border-bottom:1px solid #ececef}'+
  '.ldg-row{width:100%;background:none;border:0;border-bottom:1px solid #f3f3f5;text-align:start;color:#1d1d1f!important}.ldg-row:hover{background:#f8faf9}.ldg-row.sel{background:#e9f8ee}'+
  '.ldg-row .mono{color:#6e6e73;font-size:11px}.ldg-sup{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ldg-row b{font-weight:600}'+
  '.ldg-row em{font-style:normal;font-size:10.5px;text-align:center;padding:3px 6px;border-radius:20px;background:#fff4e0;color:#b25c00}.ldg-row em.closed{background:#e3f7e8;color:#1e9e45}'+
  '.ldg-foot{display:flex;align-items:center;gap:10px;font-size:11.5px;color:#6e6e73}.ldg-pb{flex:1;height:6px;border-radius:3px;background:#ececef;overflow:hidden}.ldg-pb i{display:block;height:100%;background:linear-gradient(90deg,#51cf66,#2b8a3e);transition:width .5s}'+
  '.ldg-det{border-inline-start:1px solid #e9e9ec;background:#f7f7f9;padding:12px;overflow:auto}'+
  '.ldg-paper{position:relative;background:#fff;border-radius:8px;padding:12px;box-shadow:0 2px 10px rgba(0,0,0,.08);font-size:11.5px;overflow:hidden}'+
  '.ldg-ph{display:flex;justify-content:space-between;gap:8px;border-bottom:2px solid #2b8a3e;padding-bottom:8px;margin-bottom:8px}.ldg-ph b{display:block;font-size:13px}.ldg-ph small{color:#8e8e93;font-size:10.5px}'+
  '.ldg-qr{flex:none;width:34px;height:34px;background:repeating-conic-gradient(#1d1d1f 0 25%,#fff 0 50%) 0 0/8px 8px;border:2px solid #1d1d1f;border-radius:3px}'+
  '.ldg-paper table{width:100%;border-collapse:collapse}.ldg-paper th{font-size:10px;color:#8e8e93;font-weight:500;text-align:start;padding:3px 0}.ldg-paper td{padding:4px 0;border-top:1px dashed #ececef}.ldg-paper td:nth-child(2){text-align:center}.ldg-paper th:last-child,.ldg-paper td:last-child{text-align:end}'+
  '.ldg-paper dl{display:grid;grid-template-columns:1fr auto;gap:3px 8px;margin:8px 0 0;padding-top:6px;border-top:1px solid #ececef}.ldg-paper dd{margin:0;text-align:end}'+
  '.ldg-stamp{position:absolute;top:44%;left:50%;transform:translate(-50%,-50%) rotate(-14deg) scale(1.6);border:3px solid #2b8a3e;color:#2b8a3e;font-weight:800;letter-spacing:.12em;padding:4px 12px;border-radius:6px;opacity:0;transition:.35s cubic-bezier(.3,1.6,.5,1)}.ldg-paper.is-closed .ldg-stamp{opacity:.85;transform:translate(-50%,-50%) rotate(-14deg) scale(1)}'+
  '.iv-h{margin:12px 0 4px;font-size:11px;color:#8e8e93}.iv-chk{width:100%;display:flex;gap:8px;align-items:center;background:none;border:0;padding:5px 0;font-size:12.5px;color:#1d1d1f!important;text-align:start}.iv-chk i{width:17px;height:17px;border-radius:5px;border:2px solid #c7c7cc;flex:none;transition:.2s}.iv-chk.on i{background:#34c759 url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3E%3Cpath d=%27M3.5 8.5l3 3 6-7%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272.4%27/%3E%3C/svg%3E") center/12px no-repeat;border-color:#34c759}'+
  '.iv-close{margin-top:10px;width:100%;border:0;border-radius:10px;padding:10px;background:#2b8a3e;color:#fff!important;font-weight:700}.iv-close:disabled{background:#d1d1d6;cursor:default}.iv-closed{color:#1e9e45;font-weight:700;margin-top:10px;text-align:center}'+
  /* Mail */
  '.ml2{display:grid;grid-template-columns:150px 290px 1fr;min-height:0}'+
  '.ml2-side{background:#f2f2f5;border-inline-end:1px solid #e5e5ea;padding:12px 8px;display:flex;flex-direction:column;gap:2px}.ml2-side span{display:flex;gap:6px;align-items:center;padding:6px 8px;border-radius:7px;color:#3a3a3c}.ml2-side span.on{background:#dbe7fb;color:#1864ab;font-weight:700}.ml2-side em{margin-inline-start:auto;font-style:normal;font-size:11px;color:#6e6e73}'+
  '.ml2-list{border-inline-end:1px solid #e5e5ea;overflow:auto;padding:10px 8px}.ml2-list .ldg-search{margin-bottom:6px}'+
  '.ml2-row{position:relative;width:100%;display:flex;gap:9px;text-align:start;background:none;border:0;border-radius:10px;padding:9px 8px;color:#1d1d1f!important}.ml2-row.sel{background:#1c7ed6;color:#fff!important}.ml2-row.sel small,.ml2-row.sel .ml2-p{color:rgba(255,255,255,.8)}'+
  '.ml2-row.un::before{content:"";position:absolute;inset-inline-start:-1px;top:20px;width:7px;height:7px;border-radius:50%;background:#1c7ed6}.ml2-row.sel.un::before{background:#fff}'+
  '.ml2-b{flex:1;min-width:0;display:grid;gap:1px}.ml2-top{display:flex;justify-content:space-between}.ml2-top small{font-size:11px;color:#8e8e93}.ml2-s{font-size:12.5px;font-weight:600}.ml2-p{font-size:12px;color:#6e6e73;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
  '.ml2-read{padding:20px 24px;overflow:auto}.ml2-read h5{margin:0 0 12px;font-size:19px}.ml2-from{display:flex;gap:10px;align-items:center;padding-bottom:12px;border-bottom:1px solid #eee}.ml2-from b{display:block}.ml2-from small{color:#8e8e93;font-size:11.5px}'+
  '.ml2-read>p{line-height:1.7;font-size:13.5px;margin:16px 0}.ml2-act{display:flex;gap:8px}.ml2-act span{border:1px solid #e5e5ea;border-radius:8px;padding:6px 12px;font-size:12px;color:#3a3a3c}'+
  /* Team chat */
  '.tm{display:grid;grid-template-columns:200px 1fr;min-height:0}'+
  '.tm-side{background:#3b1f6b;color:#e9defc;padding:10px 8px;display:flex;flex-direction:column;gap:1px;overflow:auto}'+
  '.tm-ws{padding:4px 8px 12px;border-bottom:1px solid rgba(255,255,255,.12);margin-bottom:6px}.tm-ws b{display:block;color:#fff;font-size:14px}.tm-ws small{color:#69db7c;font-size:11px}'+
  '.tm-sec{margin:8px 8px 3px;font-size:11px;opacity:.65}'+
  '.tm-row{display:flex;align-items:center;gap:7px;width:100%;background:none;border:0;border-radius:6px;padding:5px 8px;font-size:13px;color:#e9defc!important;text-align:start}.tm-row:hover{background:rgba(255,255,255,.08)}.tm-row.sel{background:#7d3cff;color:#fff!important}'+
  '.tm-on{width:8px;height:8px;border-radius:50%;background:#51cf66;flex:none}.tm-row em{margin-inline-start:auto;font-style:normal;background:#e03131;color:#fff;border-radius:9px;font-size:10.5px;padding:0 6px;font-weight:700}'+
  '.tm-main{display:flex;flex-direction:column;min-height:0}.tm-main header{display:flex;align-items:baseline;gap:10px;padding:10px 16px;border-bottom:1px solid #ececef}.tm-main header b{font-size:15px}.tm-main header small{color:#8e8e93;font-size:11.5px}'+
  '.tm-msgs{flex:1;overflow:auto;padding:12px 16px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}'+
  '.tm-msg{display:flex;gap:10px;animation:qaIn .3s}.tm-msg>div{min-width:0}.tm-msg p{margin:0;font-size:13.5px;line-height:1.45}.tm-h{display:flex;gap:8px;align-items:baseline}.tm-h b{font-size:13px}.tm-h small{font-size:11px;color:#8e8e93}'+
  '.tm-tick{font-style:normal;font-size:11px;color:#adb5bd;letter-spacing:-3px}.tm-tick.read{color:#1c7ed6}'+
  '.tm-msg.me>div>p:last-child{background:#f3edff;border-radius:4px 12px 12px 12px;padding:6px 10px;display:inline-block}'+
  '.tm-dots{display:flex;gap:4px;padding:6px 0}.tm-dots i{width:7px;height:7px;border-radius:50%;background:#adb5bd;animation:tmD 1s infinite}.tm-dots i:nth-child(2){animation-delay:.15s}.tm-dots i:nth-child(3){animation-delay:.3s}@keyframes tmD{30%{transform:translateY(-4px);background:#7d3cff}}'+
  '.tm-reply{border-top:1px solid #ececef;padding:10px 16px 12px;background:#fbfafe}.tm-lbl{margin:0 0 7px;font-size:11px;color:#8e8e93}'+
  '.tm-chips{display:flex;flex-wrap:wrap;gap:6px}.tm-chips button{border:1px solid #d0bfff;background:#fff;border-radius:18px;padding:7px 13px;font-size:12.5px;color:#5f3dc4!important;transition:.15s}.tm-chips button:hover{background:#7d3cff;color:#fff!important;border-color:#7d3cff}'+
  '.tm-note{margin:4px 0;font-size:12px;color:#8e8e93;text-align:center}'+
  /* Clips: a vertical feed */
  '.rl{position:relative;flex:1;display:grid;place-items:center;overflow:hidden;background:#000;isolation:isolate}'+
  '.rl-bg{position:absolute;inset:-20%;z-index:-1;background:linear-gradient(140deg,var(--a),var(--b));filter:blur(60px) saturate(1.2);opacity:.55;transition:background .6s}'+
  '.rl-top{position:absolute;top:10px;left:0;right:0;display:flex;justify-content:center;gap:18px;color:rgba(255,255,255,.65);font-size:13px;z-index:3}.rl-top b{color:#fff;border-bottom:2px solid #fff;padding-bottom:3px}'+
  '.rl-card{position:relative;height:calc(100% - 20px);aspect-ratio:9/16;border-radius:14px;overflow:hidden;background:#111;box-shadow:0 20px 50px rgba(0,0,0,.6)}'+
  '.rl-up{animation:rlUp .45s cubic-bezier(.2,.9,.3,1)}.rl-down{animation:rlDown .45s cubic-bezier(.2,.9,.3,1)}@keyframes rlUp{from{transform:translateY(60%);opacity:0}}@keyframes rlDown{from{transform:translateY(-60%);opacity:0}}'+
  '.rl-rail{position:absolute;right:8px;bottom:70px;display:grid;justify-items:center;gap:13px;z-index:3;direction:ltr}'+
  '.rl-av{position:relative;width:38px;height:38px;border-radius:50%;border:2px solid #fff;display:grid;place-items:center;color:#fff;font-weight:800;font-size:14px}.rl-av button{position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);width:18px;height:18px;border-radius:50%;border:0;background:#fe2c55;color:#fff!important;font-size:12px;line-height:1;padding:0}.rl-av button.on{background:#fff;color:#fe2c55!important}'+
  '.rl-b{display:grid;justify-items:center;gap:1px;border:0;background:none;padding:0;color:#fff!important;text-shadow:0 1px 4px rgba(0,0,0,.5)}.rl-b i{font-style:normal;font-size:24px;line-height:1;transition:transform .2s}.rl-b small{font-size:10.5px;font-weight:600}.rl-b.on i{color:#fe2c55;animation:rlPop .4s}@keyframes rlPop{50%{transform:scale(1.4)}}'+
  '.rl-disc{width:34px;height:34px;border-radius:50%;border:7px solid #222;animation:ptRot2 4s linear infinite}@keyframes ptRot2{to{transform:rotate(1turn)}}'+
  '.rl-cap{position:absolute;left:10px;right:58px;bottom:16px;z-index:3;color:#fff;font-size:12px;line-height:1.45;text-shadow:0 1px 5px rgba(0,0,0,.6);text-align:start}.rl-cap b{font-size:13px}.rl-cap p{margin:3px 0 0}.rl-cap span{font-weight:700}.rl-snd{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.9}'+
  '.rl-cap::before{content:"";position:absolute;left:-10px;right:-58px;bottom:-16px;height:140px;z-index:-1;background:linear-gradient(transparent,rgba(0,0,0,.55))}'+
  '.rl-tap{position:absolute;inset:40px 56px 90px 0;border:0;background:none;z-index:2;display:grid;place-items:center;cursor:pointer}.rl-tap span{width:60px;height:60px;border-radius:50%;background:rgba(0,0,0,.4);color:#fff;display:grid;place-items:center;font-size:24px}'+
  '.rl-prog{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.25);z-index:3}.rl-prog b{display:block;height:100%;width:0;background:#fff;transition:width 2s linear}'+
  '.rl-nav{position:absolute;right:16px;top:50%;transform:translateY(-50%);display:grid;gap:10px;z-index:4}.rl-nav button{width:40px;height:40px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff!important;font-size:13px;backdrop-filter:blur(6px)}.rl-nav button:hover{background:rgba(255,255,255,.28)}'+
  '.rl-count{position:absolute;left:14px;bottom:12px;margin:0;color:rgba(255,255,255,.75);font-size:12px;z-index:4}.rl-count b{color:#fe2c55;font-size:15px}html[dir=rtl] .rl-count{left:auto;right:14px}html[dir=rtl] .rl-nav{right:auto;left:16px}'+
  /* the clips themselves */
  '.sc{position:absolute;inset:0;overflow:hidden}.sc-meme{position:absolute;top:16%;left:8%;right:8%;text-align:center;font:900 22px/1.15 system-ui,sans-serif;color:#fff;-webkit-text-stroke:1px #000;paint-order:stroke;text-shadow:0 3px 0 #000;z-index:1}'+
  'html[lang=ar] .sc-meme{font-family:"Cairo","IBM Plex Sans Arabic",sans-serif;line-height:1.5}'+
  '.sc-cat{background:linear-gradient(#ffd6e7,#ffb3c7 60%,#e8a0b4)}.sc-floor{position:absolute;left:0;right:0;bottom:0;height:34%;background:repeating-linear-gradient(90deg,#c98b5e 0 40px,#b77a4f 40px 42px)}'+
  '.sc-kitty{position:absolute;left:28%;bottom:30%;font-size:86px;animation:scJump 3.2s ease-in-out infinite;transform-origin:bottom}.sc-cuke{position:absolute;bottom:31%;left:110%;font-size:40px;animation:scSlide 3.2s ease-in-out infinite}'+
  '@keyframes scSlide{0%,20%{left:110%}45%,100%{left:58%}}@keyframes scJump{0%,46%{transform:none}52%{transform:translateY(-90px) rotate(-18deg) scale(1.1)}62%{transform:translate(-30px,-40px) rotate(12deg)}72%,100%{transform:translateX(-40px)}}'+
  '.sc-pan{background:radial-gradient(circle at 50% 70%,#3b2a20,#120c08 70%)}.sc-pot{position:absolute;left:12%;right:12%;bottom:20%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#2b2b2b 55%,#111 56%,#3a3a3a 60%,#111 64%);display:grid;place-items:center}'+
  '.sc-pot>span{font-size:96px;animation:scSim 1.4s ease-in-out infinite}.sc-pot>i{position:absolute;width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,220,170,.6);animation:scBub 1.6s ease-in infinite}.sc-pot>i:nth-child(1){left:30%;top:40%}.sc-pot>i:nth-child(2){left:62%;top:58%;animation-delay:.5s}.sc-pot>i:nth-child(3){left:44%;top:68%;animation-delay:.9s}.sc-pot>i:nth-child(4){left:70%;top:34%;animation-delay:1.2s}'+
  '@keyframes scBub{from{transform:scale(.2);opacity:1}to{transform:scale(1.6);opacity:0}}@keyframes scSim{50%{transform:translateY(-4px) rotate(3deg)}}'+
  '.sc-steam{position:absolute;bottom:52%;left:40%;width:26px;height:120px;border-radius:50%;background:linear-gradient(transparent,rgba(255,255,255,.35));filter:blur(8px);animation:scSteam 3s ease-in infinite}.sc-steam.s2{left:55%;animation-delay:1s}.sc-steam.s3{left:30%;animation-delay:2s}@keyframes scSteam{from{transform:translateY(40px) scaleX(.6);opacity:0}40%{opacity:1}to{transform:translateY(-80px) scaleX(1.4);opacity:0}}'+
  '.sc-pitch{background:repeating-linear-gradient(0deg,#2f9e44 0 40px,#2b8a3e 40px 80px)}.sc-lines{position:absolute;inset:8% 10% 14%;border:2px solid rgba(255,255,255,.7);border-top:0}.sc-lines::before{content:"";position:absolute;left:25%;right:25%;bottom:-2px;height:22%;border:2px solid rgba(255,255,255,.7);border-bottom:0}'+
  '.sc-net{position:absolute;left:28%;right:28%;top:2%;height:12%;background:repeating-linear-gradient(90deg,rgba(255,255,255,.6) 0 1px,transparent 1px 8px),repeating-linear-gradient(0deg,rgba(255,255,255,.6) 0 1px,transparent 1px 8px);border:3px solid #fff;border-bottom:0}'+
  '.sc-ball{position:absolute;font-size:36px;animation:scShot 3s cubic-bezier(.4,0,.2,1) infinite}@keyframes scShot{0%{left:20%;top:80%}30%{left:30%;top:66%}70%{left:52%;top:4%;transform:rotate(540deg) scale(.7)}100%{left:52%;top:4%;transform:rotate(540deg) scale(.7)}}'+
  '.sc-goal{position:absolute;top:40%;left:0;right:0;text-align:center;font:900 44px/1 system-ui,sans-serif;color:#ffd43b;-webkit-text-stroke:2px #000;paint-order:stroke;animation:scGoal 3s infinite}@keyframes scGoal{0%,65%{transform:scale(0);opacity:0}75%{transform:scale(1.25) rotate(-6deg);opacity:1}85%,100%{transform:scale(1) rotate(-4deg);opacity:1}}'+
  '.sc-desk{background:#0b0b14}.sc-glow{position:absolute;left:10%;right:10%;top:30%;height:30%;filter:blur(30px);background:linear-gradient(90deg,#ff0080,#7928ca,#00d4ff,#00ff88,#ff0080);background-size:200%;animation:scRgb 3s linear infinite}@keyframes scRgb{to{background-position:200% 0}}'+
  '.sc-mon{position:absolute;left:14%;right:14%;top:34%;aspect-ratio:16/10;border:5px solid #222;border-radius:6px;background:linear-gradient(135deg,#1e1b4b,#7c3aed,#00d4ff);overflow:hidden}.sc-mon i{position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.25) 50%,transparent 70%);animation:lgShine2 3s infinite}@keyframes lgShine2{from{transform:translateX(-100%)}to{transform:translateX(100%)}}'+
  '.sc-kb{position:absolute;left:18%;right:18%;top:68%;height:5%;border-radius:4px;background:linear-gradient(90deg,#ff0080,#7928ca,#00d4ff,#00ff88);background-size:200%;animation:scRgb 2s linear infinite;box-shadow:0 0 20px #7928ca}.sc-plant{position:absolute;right:6%;top:52%;font-size:40px}'+
  '.sc-ula{background:linear-gradient(#ff9a5a,#ffcf8b 45%,#f8b26a)}.sc-sun{position:absolute;left:50%;top:30%;width:90px;height:90px;margin-left:-45px;border-radius:50%;background:radial-gradient(circle,#fff6d5,#ffd27a 60%,transparent 70%);animation:scSet 8s ease-in-out infinite alternate}@keyframes scSet{to{transform:translateY(60px)}}'+
  '.sc-rock{position:absolute;left:0;right:0;bottom:18%;width:100%;height:46%}.sc-rock path{fill:#6b2f1a}.sc-rock .sc-hole{fill:#f8b26a}'+
  '.sc-dune{position:absolute;left:-30%;right:-30%;height:30%;border-radius:50% 50% 0 0;animation:scDune 10s ease-in-out infinite alternate}.sc-dune.d1{bottom:-8%;background:#c9733b}.sc-dune.d2{bottom:-18%;background:#a85a2a;animation-delay:-5s}@keyframes scDune{to{transform:translateX(12%)}}'+
  '.sc-slime{background:#0b0f2a}.sc-slime>i{position:absolute;width:90%;aspect-ratio:1;left:5%;top:20%;border-radius:40% 60% 55% 45%/50% 40% 60% 50%;background:conic-gradient(from 0deg,#ff6ad5,#c774e8,#ad8cff,#8795e8,#94d0ff,#ff6ad5);filter:blur(2px);animation:scMorph 7s ease-in-out infinite,ptRot2 9s linear infinite;mix-blend-mode:screen;opacity:.85}'+
  '.sc-slime>i:nth-child(2){width:60%;left:30%;top:40%;animation-duration:5s,6s;animation-direction:reverse}.sc-slime>i:nth-child(3){width:46%;left:8%;top:52%;animation-duration:6s,12s}@keyframes scMorph{50%{border-radius:60% 40% 35% 65%/40% 65% 35% 60%}}'+
  '.rl-card.paused .sc *,.rl-card.paused .rl-disc{animation-play-state:paused}'+
  /* News */
  '.nw2{display:flex;flex-direction:column;min-height:0;background:#fbfaf7}.nw2 header{display:flex;align-items:baseline;justify-content:space-between;padding:12px 20px 6px}.nw2 header b{font:700 24px/1 Georgia,serif;letter-spacing:-.01em}.nw2 header small{color:#8e8e93}'+
  '.nw2-tabs{display:flex;gap:16px;padding:6px 20px;border-bottom:1px solid #e9e6df;font-size:12.5px;color:#6e6e73}.nw2-tabs .on{color:#e8590c;font-weight:700;border-bottom:2px solid #e8590c;padding-bottom:4px}'+
  '.nw2-body{flex:1;overflow:auto;display:grid;grid-template-columns:1.2fr 1fr;gap:18px;padding:14px 20px}'+
  '.nw2-hero span{display:grid;place-items:center;aspect-ratio:16/9;border-radius:10px;font-size:70px;margin-bottom:8px}.nw2-hero small{font-weight:700;font-size:11px;text-transform:uppercase}.nw2-hero b{display:block;font:700 19px/1.3 Georgia,serif;margin:2px 0 6px}html[lang=ar] .nw2-hero b,html[lang=ar] .nw2 header b{font-family:inherit}.nw2-hero p{margin:0;color:#495057;line-height:1.6}'+
  '.nw2-list>div{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid #eeebe4}.nw2-list span{flex:none;width:52px;height:52px;border-radius:8px;background:#f1efe9;display:grid;place-items:center;font-size:26px}.nw2-list p{margin:0;display:grid}.nw2-list small{font-weight:700;font-size:10.5px;text-transform:uppercase}.nw2-list b{font-size:13px;line-height:1.35}'+
  /* Rakeez app */
  '.rz2{background:radial-gradient(120% 80% at 80% 0%,#1b2b30,#0b0f11 60%);color:#fff;padding:14px 16px;overflow:auto;display:flex;flex-direction:column;gap:12px}'+
  '.rz2 header{display:flex;align-items:center;gap:10px}.rz2 header>b{font-size:17px;letter-spacing:.02em}.rz2-logo{width:30px;height:30px;display:block}.rz2-logo svg{width:100%;height:100%;display:block}.rz2-logo i{width:16px;height:16px;border-radius:50%;border:3px solid var(--lc);box-shadow:0 0 8px var(--lc)}'+
  '.rz2-dev{margin-inline-start:auto;display:flex;align-items:center;gap:6px;font-size:11.5px;color:#9aa5a8;background:rgba(255,255,255,.06);padding:5px 10px;border-radius:20px}.rz2-dev i{width:7px;height:7px;border-radius:50%;background:#30d158;box-shadow:0 0 6px #30d158}'+
  '.rz2-grid{display:grid;grid-template-columns:180px 1fr 1fr;grid-template-rows:auto auto;gap:10px}'+
  '.rz2-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:12px 14px}.rz2-h{margin:0 0 8px;font-size:11.5px;color:#9aa5a8;display:flex;justify-content:space-between}.rz2-h b{color:#fff}'+
  '.rz2-g{grid-row:1/3;display:grid;justify-items:center;align-content:center;position:relative;text-align:center}.rz2-g svg{width:140px;height:140px;transform:rotate(-90deg)}.rz2-trk,.rz2-val{fill:none;stroke-width:11}.rz2-trk{stroke:rgba(255,255,255,.08)}.rz2-val{stroke-linecap:round;transition:stroke-dasharray .9s,stroke .7s;filter:drop-shadow(0 0 6px var(--lc))}'+
  '.rz2-gt{position:absolute;top:50%;left:0;right:0;transform:translateY(-62%);display:grid}.rz2-gt b{font-size:30px;line-height:1}.rz2-gt small{font-size:11px;color:var(--lc);font-weight:700}.rz2-g p{margin:8px 0 0;font-size:11.5px;color:#9aa5a8}'+
  '.rz2-tr{display:grid;grid-template-columns:10px 92px 1fr 42px;align-items:center;gap:8px;font-size:11.5px;margin:6px 0}.rz2-tr>i{width:9px;height:9px;border-radius:50%}.rz2-tr em{height:6px;border-radius:3px;background:rgba(255,255,255,.08);overflow:hidden}.rz2-tr em b{display:block;height:100%;width:0;transition:width .9s}.rz2-tr small{color:#9aa5a8;text-align:end}'+
  '.rz2-c svg{width:100%;height:88px;display:block}.rz2-line{transition:stroke .7s}.rz2-ax{display:flex;justify-content:space-between;font-size:10.5px;color:#6c777a;margin-top:4px}'+
  '.rz2-l{grid-column:2}.rz2-log{list-style:none;margin:0;padding:0;display:grid;gap:5px;max-height:96px;overflow:auto}.rz2-log li{display:flex;align-items:center;gap:8px;font-size:11.5px}.rz2-log li i{width:7px;height:7px;border-radius:50%;background:#ff453a}.rz2-log li span{color:#9aa5a8}.rz2-log li.none{color:#30d158}'+
  '.rz2-s{grid-column:3;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;text-align:center}.rz2-s b{display:block;font-size:17px}.rz2-s small{font-size:10.5px;color:#9aa5a8}'+
  '.pc-done.late{background:rgba(60,8,10,.82)}.pc-donec>p{margin:0;font-size:14px;line-height:1.7;opacity:.9}'+
  '.pc-intc .rz-ring,.rz-ring{width:64px;height:64px;border-radius:50%;border:8px solid var(--lc);box-shadow:0 0 22px var(--lc);display:grid;place-items:center;transition:.7s}.rz-ring i{width:50%;height:50%;border-radius:50%;background:#000}'+
  '.rz-stats{align-self:stretch;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:6px;width:100%}.rz-stats div{background:rgba(255,255,255,.1);border-radius:12px;padding:10px;display:grid;text-align:center}.rz-stats b{font-size:18px}.rz-stats small{font-size:11px;color:#ddd}'+
  /* small screens: the computer becomes a portrait tablet */
  '.pc-m .pc-menus,.pc-m .pc-date,.pc-m .pc-widgets .pc-wnote,.pc-m .pc-bat{display:none}.pc-m .pc-widgets{width:200px}.pc-m .pc-files{top:auto;bottom:100px;inset-inline-end:auto;inset-inline-start:12px;grid-template-columns:repeat(3,96px)}'+
  '.pc-m .pc-win{left:8px;right:8px;top:34px;bottom:88px}.pc-m .pc-dock{gap:5px;padding:6px 8px}.pc-m .pc-i{width:44px;height:44px}.pc-m .pc-sep,.pc-m .pc-trash{display:none}'+
  '.pc-m .lg,.pc-m .ml2,.pc-m .tm,.pc-m .cl{grid-template-columns:1fr}.pc-m .lg{overflow:auto;display:block}.pc-m .ldg-side,.pc-m .ml2-side,.pc-m .cl-side{display:none}'+
  '.pc-m .ldg-det{border:0;border-top:1px solid #e9e9ec}.pc-m .ldg-tab{max-height:220px}.pc-m .ldg-th,.pc-m .ldg-row{grid-template-columns:62px 1fr 92px}.pc-m .ldg-th span:nth-child(3),.pc-m .ldg-th span:nth-child(5),.pc-m .ldg-row>span:nth-child(3),.pc-m .ldg-row em{display:none}'+
  '.pc-m .ml2{display:flex;flex-direction:column;overflow:auto}.pc-m .ml2-list{border:0;border-bottom:1px solid #e5e5ea;max-height:250px}'+
  '.pc-m .tm{display:flex;flex-direction:column}.pc-m .tm-side{flex-direction:row;flex:none;overflow-x:auto;padding:6px}.pc-m .tm-ws,.pc-m .tm-sec{display:none}.pc-m .tm-row{width:auto;white-space:nowrap}'+
  '.pc-m .rl-count{display:none}.pc-m .rl-nav{right:6px}.pc-m .cl-grid{grid-template-columns:1fr 1fr}.pc-m .cl-watch{grid-template-columns:1fr}.pc-m .cl-up{display:none}.pc-m .rz2-grid{grid-template-columns:1fr 1fr}.pc-m .rz2-g{grid-row:auto;grid-column:1/3}.pc-m .rz2-l,.pc-m .rz2-s{grid-column:1/3}.pc-m .rz2-t{grid-column:1/3}.pc-m .nw2-body{grid-template-columns:1fr}.pc-m .pc-nots{width:calc(100% - 20px)}.pc-m .pc-callc{min-width:0;width:410px}.pc-m .pc-intc,.pc-m .pc-donec{width:88%}.pc-m .pc-intc>div{flex-direction:column}.pc-m .rz{padding:20px}'+
  /* makani */
  '.vr-intro-t{text-align:center;max-width:68ch;margin:0 auto 1.4rem}.vr-intro-t h3{margin:0 0 .5rem;font-size:clamp(1.5rem,3vw,2.2rem);color:var(--fg)}.vr-intro-t p{margin:0;color:var(--body);line-height:1.8}'+
  '.vr-view{position:relative;height:clamp(420px,52vw,600px);border-radius:18px;overflow:hidden;background:#111a33;box-shadow:0 0 0 1px var(--line2),0 40px 80px -40px rgba(0,0,0,.9);touch-action:none;user-select:none;-webkit-user-select:none}'+
  '.vr-cv{position:absolute;inset:0;width:100%;height:100%;display:block;outline:none;cursor:grab}.vr-cv:active{cursor:grabbing}'+
  '.vr-view:has(.vr-cv:focus-visible){box-shadow:0 0 0 3px var(--a)}'+
  '.vr-vig{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 55%,transparent 50%,rgba(0,0,0,.5))}'+
  '.vr-top{position:absolute;top:12px;left:14px;right:14px;display:flex;justify-content:space-between;pointer-events:none;direction:ltr}'+
  '.vr-tag,.vr-tm{background:rgba(4,14,26,.6);backdrop-filter:blur(8px);color:#fff;border-radius:20px;padding:5px 12px;font-size:.78rem}.vr-tag{color:#ff6b6b;font-weight:700}'+
  '.vr-toast{position:absolute;top:52px;left:50%;transform:translate(-50%,-8px);margin:0;max-width:min(88%,520px);text-align:center;background:rgba(4,14,26,.78);backdrop-filter:blur(10px);color:#fff;border-radius:14px;padding:.6rem 1rem;font-size:.92rem;line-height:1.5;opacity:0;transition:.4s;pointer-events:none}.vr-toast.on{opacity:1;transform:translate(-50%,0)}'+
  '.vr-ph{position:absolute;bottom:14px;right:14px;width:168px;border-radius:26px;padding:7px;background:#10161c;box-shadow:0 20px 40px rgba(0,0,0,.5);transform:rotate(-3deg);transition:transform .3s}'+
  'html[dir=rtl] .vr-ph{transform:rotate(3deg)}.vr-ph.ping{animation:vrPing 1.2s ease-in-out 3}@keyframes vrPing{50%{box-shadow:0 0 0 8px rgba(77,182,255,.5),0 20px 40px rgba(0,0,0,.5)}}'+
  '.vr-ph-in{min-height:210px;border-radius:20px;background:#f5f8fb;color:#0d1b2a;padding:12px 10px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}'+
  '.vr-ph-h{align-self:stretch;display:flex;justify-content:space-between;align-items:center;margin:0}.vr-ph-h b{color:#1971c2;font-size:.95rem}.vr-ph-h i{width:8px;height:8px;border-radius:50%;background:#2fb36b}.vr-ph-h i.off{background:#adb5bd}'+
  '.vr-ph-c{display:grid;justify-items:center;gap:2px;margin:6px 0}.vr-kid{font-size:2.1rem}.vr-ph-c b{font-size:.85rem}.vr-ph-c small{font-size:.66rem;color:#5b6b7a}'+
  '.vr-ph-btn{margin-top:auto;width:100%;border:0;border-radius:12px;padding:.6rem;background:#e03151;color:#fff!important;font-weight:700!important;font-size:.8rem!important;animation:rkSh .8s ease-in-out 3}.vr-ph-btn:disabled{background:#ced4da;animation:none;cursor:default}'+
  '.vr-comp{width:96px;height:96px}.vr-comp svg{width:100%;height:100%}.vr-arrow{transition:transform .15s linear}'+
  '.vr-dist{margin:0;font-size:1.7rem;font-weight:800;line-height:1}.vr-ph-s{font-size:.62rem;color:#5b6b7a}'+
  '.vr-pad{position:absolute;bottom:16px;left:16px;display:grid;grid-template-columns:repeat(3,48px);grid-template-rows:repeat(2,48px);gap:6px;direction:ltr}'+
  '.vr-pad button{border:0;border-radius:14px;background:rgba(4,14,26,.55);backdrop-filter:blur(8px);color:#fff!important;font-size:1rem;touch-action:none}.vr-pad button:active{background:var(--a)}'+
  '.vr-pad [data-k=f]{grid-column:2;grid-row:1}.vr-pad [data-k=l]{grid-column:1;grid-row:2}.vr-pad [data-k=b]{grid-column:2;grid-row:2}.vr-pad [data-k=r]{grid-column:3;grid-row:2}'+
  '.vr-help{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);margin:0;font-size:.72rem;color:#fff;background:rgba(4,14,26,.55);padding:4px 10px;border-radius:10px;white-space:nowrap}'+
  '.vr-ov{position:absolute;inset:0;display:grid;place-items:center;background:rgba(4,14,26,.62);backdrop-filter:blur(6px);padding:1rem;z-index:5}.vr-ov[hidden]{display:none}'+
  '.vr-ovc{max-width:440px;text-align:center;color:#fff;display:grid;gap:.8rem;justify-items:center}.vr-ovi{font-size:3rem;animation:dmBob 2.4s ease-in-out infinite}.vr-ovc h4{margin:0;font-size:clamp(1.4rem,3vw,2rem)}.vr-ovc p{margin:0;line-height:1.7;color:rgba(255,255,255,.85)}'+
  '.vr-st{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;width:100%}.vr-st div{background:rgba(255,255,255,.1);border-radius:12px;padding:.7rem;display:grid}.vr-st b{font-size:1.3rem}.vr-st small{font-size:.75rem;opacity:.75}'+
  '@media (max-width:820px){.vr-ph,html[dir=rtl] .vr-ph{top:auto!important;bottom:10px!important;left:10px!important;right:10px!important;width:auto!important;transform:none!important;padding:4px;border-radius:18px}'+
  '.vr-ph-in{min-height:0!important;flex-direction:row;align-items:center;gap:10px;padding:7px 10px;border-radius:14px;text-align:start}.vr-ph-h{display:none}.vr-ph-c{display:flex;align-items:center;gap:8px;margin:0}.vr-ph-c>b,.vr-ph-c>small{display:block}.vr-kid{font-size:1.5rem!important}'+
  '.vr-ph-btn{width:auto;margin:0;margin-inline-start:auto;padding:.55rem .9rem}.vr-comp{width:46px!important;height:46px!important;flex:none}.vr-dist{font-size:1.15rem!important}.vr-ph-s{flex:1;font-size:.66rem}'+
  '.vr-pad{bottom:84px!important}.vr-toast{top:60px!important;bottom:auto!important}}'+
  '@media (max-width:820px){.vr-view{height:min(560px,calc(100svh - 160px))}.vr-ph{width:132px;bottom:auto;top:52px;right:10px}.vr-ph-in{min-height:170px}.vr-comp{width:70px;height:70px}.vr-dist{font-size:1.3rem}.vr-help{display:none}.vr-toast{top:auto;bottom:130px}}'+
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
  '@media (max-width:820px){.dm-ov{place-items:start center;padding-top:2.5rem}.rk6-row{grid-template-columns:1fr}.rk6-side{display:none}.rk5-mini{display:flex}.rk6-intro{margin-bottom:1rem}.rk6-intro p{font-size:.92rem}.pc-fit{border-width:6px;border-bottom-width:9px;border-radius:10px}.sn2-cards{grid-template-columns:1fr}.in3-path{grid-template-columns:1fr 1fr}.in3-star span{font-size:.64rem}.in3-sky{height:500px}.in3-hint{font-size:.82rem}.in3-star{padding:.2rem}}'+
  '@media (prefers-reduced-motion:reduce){.demo *{animation-duration:.01s!important;animation-iteration-count:1!important;transition:none!important}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
