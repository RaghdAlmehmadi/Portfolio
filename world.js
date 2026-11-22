/* About page: from one question to a light.
   A cord hangs from the top of the section. As you scroll, a spark runs down it,
   lighting each skill it passes, until it reaches a great bulb that switches on and
   floods the section with light, revealing the drawings on the wall and the results. */
(function(){
  var t=function(s){ return (window.AR && window.AR[s]) || s; };
  var RM=window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  var PARTS=[
    {id:'cur', n:'10', name:'Curiosity', role:'Input', d:'Every idea starts with one question.', q:1},
    {id:'prog', n:'20', name:'Programming & Development', role:'Processing unit', d:'Turns ideas into working software.', i:['Python','Java','JavaScript','HTML','CSS','Flutter','Web Development']},
    {id:'hw', n:'30', name:'Hardware & Prototyping', role:'Prototyping board', d:'Turns ideas into things you can hold.', i:['ESP32','Electronics','IoT','GPS','OLED/TFT Display','Prototyping']},
    {id:'inn', n:'40', name:'Innovation', role:'Innovation engine', d:'Where everything meshes together.', i:['Patent filing','Hackathons','Pitching & exhibitions','Problem Solving']},
    {id:'it', n:'50', name:'IT & Digital', role:'Network module', d:'Connects ideas to organisations.', i:['Digital Transformation','Digital Strategy','IT Enablement','IT Governance','Database Management','Cybersecurity','Governance, Risk & Compliance']},
    {id:'des', n:'60', name:'Design & Productivity', role:'Drafting tools', d:'Gives every idea a clear shape.', i:['UI/UX Design','Excel','PowerPoint','Word']},
    {id:'out', n:'70', name:'Results', role:'Output', d:'What the system has produced so far.', aw:1}
  ];
  var AWARDS=[['Gold Medal','SGiE 2026','Rakeez'],['First Place','DAFAH Competition','2026'],['Third Place','EBDAATHON','2026'],['Third Place','Fifth Scientific Forum','2022'],['Second Place','Qur’an Kareem Competition','2022'],['Top 5 Finalist','HASEEB SMART TAX','2024']];
  function gear(r,teeth,hole){ var s='',n=teeth*2; for(var i=0;i<n;i++){ var a0=i/n*Math.PI*2, a1=(i+1)/n*Math.PI*2, R=i%2?r*.82:r;
      s+=(i?'L':'M')+(Math.cos(a0)*R).toFixed(1)+' '+(Math.sin(a0)*R).toFixed(1)+'L'+(Math.cos(a1)*R).toFixed(1)+' '+(Math.sin(a1)*R).toFixed(1); }
    return s+'Z M'+hole+' 0A'+hole+' '+hole+' 0 1 0 '+(-hole)+' 0A'+hole+' '+hole+' 0 1 0 '+hole+' 0Z'; }
  var DRAW={
    cur:'<circle cx="0" cy="-14" r="36"/><path d="M-14 22h28v18h-28zM-14 29h28M-14 35h28"/><path d="M-10 -2c4-16 8-16 10 0c2-16 6-16 10 0" /><path class="dash" d="M-58 -14h-14M58 -14h14M0 -62v-14M-41 -55l-10-10M41 -55l10-10"/>',
    prog:'<rect x="-62" y="-46" width="124" height="92" rx="6"/><rect x="-40" y="-26" width="80" height="52" rx="3" class="hatch"/>'+
      [-45,-27,-9,9,27,45].map(function(x){ return '<path d="M'+x+' -46v-12M'+x+' 46v12"/>'; }).join('')+[-28,0,28].map(function(y){ return '<path d="M-62 '+y+'h-12M62 '+y+'h12"/>'; }).join('')+
      '<text x="0" y="6" class="glyph">&lt;/&gt;</text>',
    hw:'<rect x="-72" y="-50" width="144" height="100" rx="5"/><path class="thin" d="M-60 -30h30v20h40M-60 20h50v-30M30 -40v30h30M10 40v-20h50"/><rect x="-24" y="-20" width="34" height="26" class="hatch"/><circle cx="40" cy="-10" r="9"/><circle cx="-46" cy="34" r="4"/><circle cx="50" cy="30" r="4"/><path d="M-72 -10h-10M-72 10h-10"/>',
    inn:'<g class="g1"><path d="'+gear(54,12,14)+'"/></g><g class="g2" transform="translate(58 -50)"><path d="'+gear(32,8,8)+'"/></g><circle cx="0" cy="0" r="30" class="thin"/>',
    it:'<circle cx="0" cy="0" r="12" class="fill"/><circle cx="-48" cy="-30" r="8"/><circle cx="48" cy="-30" r="8"/><circle cx="-52" cy="28" r="8"/><circle cx="52" cy="28" r="8"/><circle cx="0" cy="-50" r="7"/><path class="thin" d="M0 0L-48 -30M0 0L48 -30M0 0L-52 28M0 0L52 28M0 0L0 -50M-48 -30L0 -50L48 -30M-52 28L52 28"/>',
    des:'<circle cx="0" cy="-44" r="9"/><path d="M-4 -36L-38 44M4 -36L38 44"/><path d="M-38 44l-4 10M38 44l2 10"/><path class="dash" d="M-42 54A60 60 0 0 0 40 54"/><path class="thin" d="M-26 18h52"/>',
    out:'<path d="M-22 -70l12 34M22 -70l-12 34" class="thin"/><path d="M-30 -72h20l14 36h-20zM30 -72h-20l-14 36h20z" class="hatch"/><circle cx="0" cy="0" r="40"/><circle cx="0" cy="0" r="30" class="thin"/><path d="M0 -18l5.3 11 12 1.7-8.7 8.4 2 12L0 9.5-10.6 15.1l2-12-8.7-8.4 12-1.7z" class="fill"/>'
  };
  function icon(id){ return '<svg viewBox="-82 -82 164 164" aria-hidden="true">'+DRAW[id]+'</svg>'; }
  var BULB='<svg class="lp-bulb" viewBox="0 0 200 330" aria-hidden="true"><defs>'+
      '<linearGradient id="lpBrass" x1="0" x2="1"><stop offset="0" stop-color="#6b5330"/><stop offset=".45" stop-color="#e6c88a"/><stop offset="1" stop-color="#5a4426"/></linearGradient>'+
      '<radialGradient id="lpCore" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="#fff6d8"/><stop offset=".35" stop-color="#ffc861" stop-opacity=".85"/><stop offset="1" stop-color="#ff9a1f" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="lpGlass" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#fff" stop-opacity=".03"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient></defs>'+
      '<rect x="78" y="0" width="44" height="16" rx="4" fill="#20232a"/>'+
      '<rect x="72" y="16" width="56" height="58" rx="6" fill="url(#lpBrass)"/>'+[26,36,46,56,66].map(function(y){ return '<path d="M72 '+y+'h56" stroke="rgba(40,28,10,.55)" stroke-width="2.4"/>'; }).join('')+
      '<circle class="lp-core" cx="100" cy="215" r="96" fill="url(#lpCore)"/>'+
      '<path class="lp-glass" d="M78 74C78 108 26 140 26 214a74 74 0 0 0 148 0C174 140 122 108 122 74z"/>'+
      '<path d="M48 176c-8 22-8 50 4 72" stroke="#fff" stroke-opacity=".28" stroke-width="5" stroke-linecap="round" fill="none"/>'+
      '<path d="M91 74l4 86h10l4-86" fill="rgba(255,255,255,.07)"/>'+
      '<path class="lp-wire" d="M96 160L76 200M104 160L124 200M100 160V250"/>'+
      '<path class="lp-fil" d="M76 200c2 34 12 34 14 0c2 34 12 34 14 0c2 34 12 34 14 0c2 34 4 30 6 0"/>'+
      '<g class="lp-ch" tabindex="0" role="button" aria-label="'+esc(t('Switch the light'))+'"><path d="M124 40C150 52 158 80 156 120" stroke="#cfd3d8" stroke-width="2.4" stroke-dasharray="3 3" fill="none"/><circle cx="156" cy="128" r="7" fill="#e6c88a"/><rect x="138" y="36" width="40" height="110" fill="transparent"/></g>'+
    '</svg>';
  /* faint drawings on the wall: only the light can show them */
  function wall(){
    var spots=[['prog',9,12,.55],['hw',90,9,.5],['inn',7,46,.6],['it',93,40,.5],['des',8,80,.5],['out',92,76,.5],['cur',6,28,.38],['hw',94,60,.38],['prog',5,64,.36],['des',95,92,.36]];
    return '<svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">'+spots.map(function(p,i){ return '<g transform="translate('+p[1]*10+' '+p[2]*10+') scale('+p[3]+') rotate('+((i%3-1)*8)+')">'+DRAW[p[0]]+'</g>'; }).join('')+'</svg>';
  }

  window.WORLD=function(host){
    if(!host) return;
    var steps=PARTS.filter(function(p){ return !p.aw; }), out=PARTS.filter(function(p){ return p.aw; })[0];
    host.innerHTML=
      '<section class="lp" aria-label="'+esc(t('From one question to a light.'))+'">'+
        '<div class="lp-wall" aria-hidden="true">'+wall()+'</div><div class="lp-glow" aria-hidden="true"></div>'+
        '<svg class="lp-cord" aria-hidden="true"><path class="lp-c0"/><path class="lp-c1"/></svg><i class="lp-spark" aria-hidden="true"></i>'+
        '<header class="lp-head"><h2>'+esc(t('From one question to a light.')).replace('، ','،<br>').replace(' to a light','<br>to a light')+'</h2><p>'+esc(t('As you scroll, the current runs down the line. Each skill it passes powers the next, until the light comes on.'))+'</p><span class="lp-rose" aria-hidden="true"></span></header>'+
        '<ol class="lp-steps">'+steps.map(function(p,i){
          var body=p.q ? '<p class="lp-q">“'+esc(t('What if there’s a better way?'))+'”</p>' : '<ul>'+p.i.map(function(x){ return '<li>'+esc(t(x))+'</li>'; }).join('')+'</ul>';
          return '<li class="lp-st'+(i%2?' r':'')+'"><span class="lp-node">'+icon(p.id)+'</span><div class="lp-card"><h3>'+esc(t(p.name))+'</h3><p>'+esc(t(p.d))+'</p>'+body+'</div></li>'; }).join('')+'</ol>'+
        '<div class="lp-lamp">'+BULB+'</div>'+
        '<div class="lp-out"><p class="lp-sig">'+esc(t('Raghad Almihmadi, inventor.'))+'</p><h3>'+esc(t(out.name))+'</h3><p>'+esc(t('What the light has revealed so far.'))+'</p>'+
          '<ul>'+AWARDS.map(function(a,k){ return '<li style="--k:'+k+'"><b>'+esc(t(a[0]))+'</b><span>'+esc(t(a[1]))+' · '+esc(t(a[2]))+'</span></li>'; }).join('')+'</ul></div>'+
      '</section>';
    var root=host.querySelector('.lp'), cord=root.querySelector('.lp-cord'), c0=root.querySelector('.lp-c0'), c1=root.querySelector('.lp-c1'), spark=root.querySelector('.lp-spark');
    var sts=[].slice.call(root.querySelectorAll('.lp-st')), lamp=root.querySelector('.lp-lamp'), bulb=root.querySelector('.lp-bulb');
    var total=0, smp=[], ys=[], off=false, raf=0;
    function rel(elm){ var r=elm.getBoundingClientRect(), R=root.getBoundingClientRect(); return {x:r.left-R.left+r.width/2, y:r.top-R.top+r.height/2, t:r.top-R.top, h:r.height}; }
    function build(){
      var R=root.getBoundingClientRect(); cord.setAttribute('viewBox','0 0 '+R.width+' '+R.height); cord.setAttribute('width',R.width); cord.setAttribute('height',R.height);
      var rose=rel(root.querySelector('.lp-rose')), b=rel(bulb), pts=[{x:rose.x,y:rose.y}];
      ys=sts.map(function(s){ var n=rel(s.querySelector('.lp-node')); pts.push({x:n.x,y:n.y}); return n.y; });
      var cap={x:b.x,y:b.t+2}; pts.push(cap);
      root.style.setProperty('--ly',(b.t+b.h*.65)+'px');
      var d='M'+pts[0].x+' '+pts[0].y;
      for(var i=1;i<pts.length;i++){ var A=pts[i-1], B=pts[i], dy=B.y-A.y, sag=(i%2?1:-1)*Math.min(34,R.width*.03);
        if(Math.abs(B.x-A.x)>4) d+='C'+A.x+' '+(A.y+dy*.55)+' '+B.x+' '+(A.y+dy*.45)+' '+B.x+' '+B.y;
        else d+='C'+(A.x+sag)+' '+(A.y+dy*.35)+' '+(B.x+sag)+' '+(A.y+dy*.65)+' '+B.x+' '+B.y; }
      c0.setAttribute('d',d); c1.setAttribute('d',d);
      total=c1.getTotalLength(); c1.style.strokeDasharray=total; smp=[];
      for(var l=0;l<=total;l+=5){ var p=c1.getPointAtLength(l); smp.push([l,p.x,p.y]); }
      var e=c1.getPointAtLength(total); smp.push([total,e.x,e.y]);
      update();
    }
    function update(){
      raf=0; if(!total) return;
      var R=root.getBoundingClientRect(), ty=(RM?1e9:innerHeight*.62-R.top), len=0, pt=smp[0];
      for(var i=0;i<smp.length;i++){ if(smp[i][2]>ty) break; pt=smp[i]; len=smp[i][0]; }
      if(ty>=smp[smp.length-1][2]){ len=total; pt=smp[smp.length-1]; }
      c1.style.strokeDashoffset=total-len;
      spark.style.transform='translate('+pt[1]+'px,'+pt[2]+'px)'; spark.classList.toggle('on',len>0&&len<total);
      sts.forEach(function(s,k){ s.classList.toggle('on',ty>=ys[k]-6); });
      var lit=len>=total-1; root.classList.toggle('lit',lit&&!off); root.classList.toggle('near',!lit&&len>total*.82);
    }
    function req(){ if(!raf) raf=requestAnimationFrame(update); }
    addEventListener('scroll',req,{passive:true});
    if('ResizeObserver' in window) new ResizeObserver(function(){ build(); }).observe(root); else addEventListener('resize',build);
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    setTimeout(build,60);
    function pull(){ off=!off; lamp.classList.remove('pull'); void lamp.offsetWidth; lamp.classList.add('pull'); update(); }
    var ch=root.querySelector('.lp-ch');
    ch.addEventListener('click',pull); ch.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pull(); } });
  };

  var A='#ffc45e';
  var css=
  '.lp{--ly:80%;position:relative;margin:clamp(1.2rem,3vw,2.2rem) 0 clamp(2.5rem,6vw,4rem);padding:clamp(2.6rem,6vw,4.6rem) clamp(1rem,4vw,3rem) clamp(2.6rem,6vw,4rem);border-radius:clamp(18px,2.6vw,28px);background:#0b0a0f;color:#ece6da;overflow:hidden;isolation:isolate;transition:background-color 1.4s;box-shadow:0 50px 100px -50px rgba(0,0,0,.8)}'+
  '.lp.lit{background:#16110a}'+
  '.lp-wall{position:absolute;inset:0;z-index:-2;opacity:0;transition:opacity 1.6s .2s;-webkit-mask:radial-gradient(circle at 50% var(--ly),#000 0,rgba(0,0,0,.55) 35%,transparent 78%);mask:radial-gradient(circle at 50% var(--ly),#000 0,rgba(0,0,0,.55) 35%,transparent 78%)}'+
  '.lp-wall svg{width:100%;height:100%;display:block}.lp-wall path,.lp-wall circle,.lp-wall rect{fill:none;stroke:rgba(255,206,130,.32);stroke-width:2;vector-effect:non-scaling-stroke}.lp-wall text{fill:rgba(255,206,130,.32);font:700 26px monospace;text-anchor:middle}'+
  '.lp.lit .lp-wall{opacity:1}'+
  '.lp-glow{position:absolute;left:50%;top:var(--ly);width:min(1500px,190vw);aspect-ratio:1;transform:translate(-50%,-50%) scale(.3);z-index:-1;border-radius:50%;background:radial-gradient(circle,rgba(255,214,140,.55) 0,rgba(255,170,60,.22) 22%,rgba(255,140,30,.07) 45%,transparent 68%);opacity:0;transition:opacity 1.2s,transform 1.6s cubic-bezier(.2,.8,.2,1);pointer-events:none}'+
  '.lp.near .lp-glow{opacity:.25;transform:translate(-50%,-50%) scale(.45)}.lp.lit .lp-glow{opacity:1;transform:translate(-50%,-50%) scale(1)}'+
  '.lp-cord{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:visible}.lp-cord path{fill:none;stroke-linecap:round}'+
  '.lp-c0{stroke:rgba(236,230,218,.16);stroke-width:2}.lp-c1{stroke:'+A+';stroke-width:2.6;filter:drop-shadow(0 0 6px rgba(255,180,70,.9))}'+
  '.lp-spark{position:absolute;left:0;top:0;z-index:3;width:0;height:0;opacity:0;transition:opacity .3s;pointer-events:none}.lp-spark.on{opacity:1}'+
  '.lp-spark::before{content:"";position:absolute;left:-9px;top:-9px;width:18px;height:18px;border-radius:50%;background:radial-gradient(circle,#fff 0 25%,#ffd58a 45%,transparent 70%);box-shadow:0 0 18px 6px rgba(255,190,80,.7),0 0 50px 14px rgba(255,150,40,.35);animation:lpFl .18s steps(2) infinite}'+
  '@keyframes lpFl{50%{transform:scale(.8) rotate(30deg)}}'+
  '.lp-head{position:relative;z-index:2;text-align:center;max-width:60ch;margin:0 auto;display:grid;justify-items:center}'+
  '.lp-head h2{margin:0;font:800 clamp(2.1rem,5.6vw,4.4rem)/1.04 var(--f-head);letter-spacing:-.035em;color:#fff;text-wrap:balance}html[lang=ar] .lp-head h2{letter-spacing:0;line-height:1.3}'+
  '.lp-head p{margin:.9rem 0 0;color:rgba(236,230,218,.72);line-height:1.8;text-wrap:pretty}'+
  '.lp-rose{display:block;width:46px;height:14px;margin-top:clamp(1.6rem,4vw,2.6rem);border-radius:50% 50% 6px 6px/80% 80% 6px 6px;background:linear-gradient(#3a3d45,#1c1e23);box-shadow:0 -1px 0 rgba(255,255,255,.12)}'+
  '.lp-steps{list-style:none;margin:0;padding:clamp(1.6rem,4vw,3rem) 0 0;display:grid;gap:clamp(1.4rem,3.4vw,2.6rem);position:relative;z-index:2}'+
  '.lp-st{display:grid;grid-template-columns:minmax(0,1fr) 76px minmax(0,1fr);column-gap:clamp(1rem,3vw,2.4rem);align-items:center}'+
  '.lp-node{grid-column:2;grid-row:1;width:76px;height:76px;border-radius:50%;display:grid;place-items:center;background:#121118;border:1.5px solid rgba(236,230,218,.18);transition:border-color .5s,box-shadow .5s,background .5s}'+
  '.lp-node svg{width:62%;height:62%;overflow:visible}.lp-node path,.lp-node circle,.lp-node rect{fill:none;stroke:rgba(236,230,218,.4);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;transition:stroke .5s}.lp-node .fill{fill:rgba(236,230,218,.4)}.lp-node .hatch{fill:rgba(236,230,218,.08)}.lp-node text{fill:rgba(236,230,218,.4);font:700 30px monospace;text-anchor:middle;stroke:none}.lp-node .dash{stroke-dasharray:4 5}'+
  '.lp-st.on .lp-node{border-color:'+A+';background:#21180b;box-shadow:0 0 0 6px rgba(255,196,94,.08),0 0 34px rgba(255,170,60,.45)}.lp-st.on .lp-node path,.lp-st.on .lp-node circle,.lp-st.on .lp-node rect{stroke:'+A+'}.lp-st.on .lp-node .fill,.lp-st.on .lp-node text{fill:'+A+'}'+
  '.lp-card{grid-column:3;grid-row:1;max-width:30rem;opacity:.22;transform:translateX(14px);transition:opacity .6s,transform .6s cubic-bezier(.2,.8,.2,1)}html[dir=rtl] .lp-card{transform:translateX(-14px)}'+
  '.lp-st.r .lp-card{grid-column:1;justify-self:end;text-align:end;transform:translateX(-14px)}html[dir=rtl] .lp-st.r .lp-card{transform:translateX(14px)}'+
  '.lp-st.on .lp-card{opacity:1;transform:none!important}'+
  '.lp-card h3{margin:0;font:800 clamp(1.25rem,2.4vw,1.7rem)/1.2 var(--f-head);color:#fff}.lp-st.on .lp-card h3{color:#ffe2ad}'+
  '.lp-card>p{margin:.35rem 0 .7rem;color:rgba(236,230,218,.72);line-height:1.65}'+
  '.lp-card ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.35rem}.lp-st.r .lp-card ul{justify-content:flex-end}'+
  '.lp-card li{padding:.3rem .65rem;border-radius:999px;border:1px solid rgba(236,230,218,.2);font-size:.82rem;color:rgba(236,230,218,.85)}.lp-st.on .lp-card li{border-color:rgba(255,196,94,.4)}'+
  '.lp-q{margin:0;font:700 clamp(1.2rem,2.2vw,1.55rem)/1.5 var(--f-head);color:'+A+'}'+
  '.lp-lamp{position:relative;z-index:2;width:clamp(170px,21vw,240px);margin:clamp(1.6rem,4vw,3rem) auto 0;transform-origin:50% 0;animation:lpSway 7s ease-in-out infinite}'+
  '@keyframes lpSway{0%,100%{transform:rotate(-.8deg)}50%{transform:rotate(.8deg)}}'+
  '.lp-lamp.pull{animation:lpSwing 1.6s cubic-bezier(.3,.6,.4,1)}@keyframes lpSwing{0%{transform:rotate(0)}15%{transform:rotate(-5deg)}40%{transform:rotate(3.4deg)}62%{transform:rotate(-1.8deg)}82%{transform:rotate(.8deg)}100%{transform:rotate(0)}}'+
  '.lp-bulb{display:block;width:100%;height:auto;overflow:visible}'+
  '.lp-glass{fill:url(#lpGlass);stroke:rgba(255,255,255,.34);stroke-width:2}.lp-wire{fill:none;stroke:rgba(255,255,255,.35);stroke-width:1.6}'+
  '.lp-fil{fill:none;stroke:#5c3b1b;stroke-width:2.4;stroke-linecap:round;transition:stroke .5s}.lp-core{opacity:0;transition:opacity 1s}'+
  '.lp.near .lp-fil{stroke:#b5541c}.lp.lit .lp-fil{stroke:#fff6d6;filter:drop-shadow(0 0 4px #ffb347) drop-shadow(0 0 12px #ff9a1f);animation:lpOn .9s}.lp.lit .lp-core{opacity:1}.lp.lit .lp-glass{stroke:rgba(255,236,190,.7)}'+
  '@keyframes lpOn{0%{opacity:0}15%{opacity:1}25%{opacity:.3}40%{opacity:1}52%{opacity:.6}64%,100%{opacity:1}}'+
  '.lp-ch{cursor:pointer;outline:none}.lp-ch:hover circle,.lp-ch:focus-visible circle{fill:#fff3c4}.lp-lamp.pull .lp-ch{animation:lpPull .5s}@keyframes lpPull{40%{transform:translateY(10px)}}'+
  '.lp-out{position:relative;z-index:2;text-align:center;margin-top:clamp(1.4rem,3vw,2.2rem);opacity:.12;transition:opacity 1s .3s}.lp.lit .lp-out{opacity:1}'+
  '.lp-sig{margin:0 0 1.4rem;font:800 clamp(1.4rem,3vw,2.1rem)/1.3 var(--f-head);color:#fff3d6;text-shadow:0 0 30px rgba(255,180,70,.55)}'+
  '.lp-out h3{margin:0;font:700 .95rem/1 var(--f-head);color:'+A+';letter-spacing:.06em}.lp-out>p:not(.lp-sig){margin:.5rem 0 1.2rem;color:rgba(236,230,218,.72)}'+
  '.lp-out ul{list-style:none;margin:0 auto;padding:0;max-width:880px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.7rem;text-align:start}'+
  '.lp-out li{display:grid;gap:.15rem;padding:.85rem 1rem;border-radius:14px;background:rgba(255,214,140,.06);border:1px solid rgba(255,196,94,.22);opacity:0;transform:translateY(10px);transition:opacity .6s,transform .6s;transition-delay:calc(.5s + var(--k) * .09s)}'+
  '.lp.lit .lp-out li{opacity:1;transform:none}.lp-out li b{color:#ffe2ad}.lp-out li span{font-size:.84rem;color:rgba(236,230,218,.75)}'+
  '@media (max-width:760px){.lp-st,.lp-st.r{grid-template-columns:54px minmax(0,1fr)}.lp-node{grid-column:1;width:54px;height:54px}.lp-card,.lp-st.r .lp-card{grid-column:2;justify-self:start;text-align:start;transform:none}.lp-st.r .lp-card ul{justify-content:flex-start}.lp-out ul{grid-template-columns:1fr 1fr}.lp-head{text-align:start;justify-items:start}.lp-rose{margin-inline-start:4px}}'+
  '@media (max-width:420px){.lp-out ul{grid-template-columns:1fr}}'+
  '@media (prefers-reduced-motion:reduce){.lp *,.lp{animation:none!important;transition:none!important}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
