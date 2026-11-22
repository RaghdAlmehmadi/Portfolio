/* About page: from one question to a light.
   A cord hangs from the top of the section. As you scroll, a spark runs down it,
   lighting each skill it passes, until it reaches a great bulb that switches on and
   floods the section with light, revealing the drawings on the wall and the results. */
(function(){
  var t=function(s){ return (window.AR && window.AR[s]) || s; };
  var RM=window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  var PARTS=[
    {id:'edu', name:'Bachelor of Information Technology', d:'I graduated from the University of Jeddah in 2024 with a degree in Information Technology, with second-class honours and a GPA of 4.55 out of 5.', i:['University of Jeddah','Second-class honours','GPA 4.55 / 5','2024']},
    {id:'prog', name:'Programming & Development', d:'I then deepened my programming skills, building software and web applications that put ideas into practice.', i:['Python','Java','JavaScript','HTML','CSS','Flutter','Web Development']},
    {id:'hw', name:'Hardware & Prototyping', d:'Software alone was not enough, so I moved into electronics and built prototypes that can be held and tested.', i:['ESP32','Electronics','IoT','GPS','OLED/TFT Display','Prototyping']},
    {id:'it', name:'IT & Digital', d:'Professionally, I trained in the Cybersecurity Department at Saudi Airlines, then joined the Ministry of Energy as a Digital Strategy and Awareness Analyst.', i:['Digital Transformation','Digital Strategy','IT Enablement','IT Governance','Database Management','Cybersecurity','Governance, Risk & Compliance']},
    {id:'des', name:'Design & Productivity', d:'Along the way, I learned to give every idea a clear form, from interface design to well-structured documents and presentations.', i:['UI/UX Design','Excel','PowerPoint','Word']},
    {id:'inn', name:'Innovation', d:'All of this came together in innovation: hackathons, exhibitions, and a patent application for my own invention.', i:['Patent filing','Hackathons','Pitching & exhibitions','Problem Solving']}
  ];
  var AWARDS=[['Gold Medal','SGiE 2026','Rakeez','gold','★'],['First Place','DAFAH Competition','2026','gold','1'],['Third Place','EBDAATHON','2026','bronze','3'],['Third Place','Fifth Scientific Forum','2022','bronze','3'],['Second Place','Qur’an Kareem Competition','2022','silver','2'],['Top 5 Finalist','HASEEB SMART TAX','2024','fin','5']];
  function gear(r,teeth,hole){ var s='',n=teeth*2; for(var i=0;i<n;i++){ var a0=i/n*Math.PI*2, a1=(i+1)/n*Math.PI*2, R=i%2?r*.82:r;
      s+=(i?'L':'M')+(Math.cos(a0)*R).toFixed(1)+' '+(Math.sin(a0)*R).toFixed(1)+'L'+(Math.cos(a1)*R).toFixed(1)+' '+(Math.sin(a1)*R).toFixed(1); }
    return s+'Z M'+hole+' 0A'+hole+' '+hole+' 0 1 0 '+(-hole)+' 0A'+hole+' '+hole+' 0 1 0 '+hole+' 0Z'; }
  var DRAW={
    edu:'<path d="M-64 -12L0 -40L64 -12L0 16Z"/><path d="M-36 2v26c0 12 72 12 72 0V2"/><path d="M56 -8v36"/><circle cx="56" cy="32" r="5" class="fill"/>',
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
    var spots=[['prog',9,12,.55],['hw',90,9,.5],['inn',7,46,.6],['it',93,40,.5],['des',8,80,.5],['out',92,76,.5],['edu',6,28,.38],['hw',94,60,.38],['prog',5,64,.36],['des',95,92,.36]];
    return '<svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">'+spots.map(function(p,i){ return '<g transform="translate('+p[1]*10+' '+p[2]*10+') scale('+p[3]+') rotate('+((i%3-1)*8)+')">'+DRAW[p[0]]+'</g>'; }).join('')+'</svg>';
  }

  var MC={gold:['#fff1b8','#e8b923','#9a6b06'],silver:['#ffffff','#c4ccd4','#6f7a85'],bronze:['#ffd9b8','#cd7f3e','#7d4419'],fin:['#e6dbff','#8b5cf6','#4c1d95']};
  var MDEFS='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'+Object.keys(MC).map(function(k){ var c=MC[k]; return '<radialGradient id="md-'+k+'" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="'+c[0]+'"/><stop offset=".5" stop-color="'+c[1]+'"/><stop offset="1" stop-color="'+c[2]+'"/></radialGradient>'; }).join('')+'</defs></svg>';
  function medal(k,g){ var c=MC[k];
    return '<svg class="md-svg" viewBox="0 0 120 156" aria-hidden="true"><path class="md-rib" d="M34 0h22l16 52H50zM86 0H64L48 52h22z" fill="'+c[1]+'"/><path d="M45 0h6l14 52h-6zM69 0h6L61 52h-6z" fill="rgba(255,255,255,.35)"/>'+
      '<circle cx="60" cy="100" r="50" fill="url(#md-'+k+')"/><circle cx="60" cy="100" r="39" fill="none" stroke="'+c[2]+'" stroke-opacity=".45" stroke-width="2.5"/><circle cx="60" cy="100" r="44" fill="none" stroke="#fff" stroke-opacity=".25" stroke-dasharray="2 5"/>'+
      (g==='★'?'<path d="M60 74l7.6 15.4 17 2.5-12.3 12 2.9 16.9L60 112.8l-15.2 8 2.9-16.9-12.3-12 17-2.5z" fill="'+c[2]+'"/>':'<text x="60" y="117" text-anchor="middle" font-size="48" font-weight="800" fill="'+c[2]+'" font-family="Manrope,system-ui,sans-serif">'+g+'</text>')+
      '<ellipse class="md-shine" cx="44" cy="80" rx="22" ry="10" fill="#fff" opacity=".35" transform="rotate(-30 44 80)"/></svg>'; }
  window.WORLD=function(host){
    if(!host) return;
    var steps=PARTS;
    host.innerHTML=
      '<section class="lp" aria-label="'+esc(t('Who is Raghad?'))+'">'+
        '<div class="lp-wall" aria-hidden="true">'+wall()+'</div><div class="lp-glow" aria-hidden="true"></div>'+
        '<svg class="lp-cord" aria-hidden="true"><path class="lp-c0"/><path class="lp-c1"/></svg><i class="lp-spark" aria-hidden="true"></i>'+
        '<header class="lp-head"><h2>'+esc(t('Who is Raghad?'))+'</h2><p>'+esc(t('Academic path, skills and achievements, step by step.'))+'</p><span class="lp-rose" aria-hidden="true"></span></header>'+
        '<ol class="lp-steps">'+steps.map(function(p,i){
          var body='<ul>'+p.i.map(function(x){ return '<li>'+esc(t(x))+'</li>'; }).join('')+'</ul>';
          return '<li class="lp-st'+(i%2?' r':'')+'"><span class="lp-node">'+icon(p.id)+'</span><div class="lp-card"><h3>'+esc(t(p.name))+'</h3><p>'+esc(t(p.d))+'</p>'+body+'</div></li>'; }).join('')+'</ol>'+
        '<div class="lp-lamp">'+BULB+'</div>'+
        '<div class="lp-out"><p class="lp-kick">'+esc(t('The inventor'))+'</p><p class="lp-name">'+esc(t('Raghad Almihmadi'))+'</p>'+
          '<h3>'+esc(t('Achievements'))+'</h3><p class="lp-hint">'+esc(t('Select a medal to light it up.'))+'</p>'+MDEFS+
          '<ul class="lp-md">'+AWARDS.map(function(a,k){ return '<li style="--k:'+k+'"><button type="button" class="md md-'+a[3]+'" aria-pressed="false">'+medal(a[3],a[4])+'<b>'+esc(t(a[0]))+'</b><span>'+esc(t(a[1]))+' · '+esc(t(a[2]))+'</span></button></li>'; }).join('')+'</ul></div>'+
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
    [].forEach.call(root.querySelectorAll('.md'),function(b){ b.addEventListener('click',function(){ var on=b.getAttribute('aria-pressed')!=='true'; b.setAttribute('aria-pressed',on); b.classList.remove('pop'); void b.offsetWidth; if(on) b.classList.add('pop'); }); });
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
    '.lp-lamp{position:relative;z-index:2;width:clamp(170px,21vw,240px);margin:clamp(1.6rem,4vw,3rem) auto 0;transform-origin:50% 0;animation:lpSway 7s ease-in-out infinite}'+
  '@keyframes lpSway{0%,100%{transform:rotate(-.8deg)}50%{transform:rotate(.8deg)}}'+
  '.lp-lamp.pull{animation:lpSwing 1.6s cubic-bezier(.3,.6,.4,1)}@keyframes lpSwing{0%{transform:rotate(0)}15%{transform:rotate(-5deg)}40%{transform:rotate(3.4deg)}62%{transform:rotate(-1.8deg)}82%{transform:rotate(.8deg)}100%{transform:rotate(0)}}'+
  '.lp-bulb{display:block;width:100%;height:auto;overflow:visible}'+
  '.lp-glass{fill:url(#lpGlass);stroke:rgba(255,255,255,.34);stroke-width:2}.lp-wire{fill:none;stroke:rgba(255,255,255,.35);stroke-width:1.6}'+
  '.lp-fil{fill:none;stroke:#5c3b1b;stroke-width:2.4;stroke-linecap:round;transition:stroke .5s}.lp-core{opacity:0;transition:opacity 1s}'+
  '.lp.near .lp-fil{stroke:#b5541c}.lp.lit .lp-fil{stroke:#fff6d6;filter:drop-shadow(0 0 4px #ffb347) drop-shadow(0 0 12px #ff9a1f);animation:lpOn .9s}.lp.lit .lp-core{opacity:1}.lp.lit .lp-glass{stroke:rgba(255,236,190,.7)}'+
  '@keyframes lpOn{0%{opacity:0}15%{opacity:1}25%{opacity:.3}40%{opacity:1}52%{opacity:.6}64%,100%{opacity:1}}'+
  '.lp-ch{cursor:pointer;outline:none}.lp-ch:hover circle,.lp-ch:focus-visible circle{fill:#fff3c4}.lp-lamp.pull .lp-ch{animation:lpPull .5s}@keyframes lpPull{40%{transform:translateY(10px)}}'+
  /* the light comes on: the whole section turns to day */
  '.lp.lit{background:#f6eedf;color:#2a2116}.lp.lit .lp-head h2{color:#1f160a}.lp.lit .lp-head p{color:#6b5a42}.lp-head h2,.lp-head p{transition:color 1.2s}'+
  '.lp.lit .lp-c0{stroke:rgba(80,60,30,.18)}.lp.lit .lp-c1{stroke:#d18a17;filter:none}.lp.lit .lp-rose{background:linear-gradient(#6b5a42,#3d3122)}'+
  '.lp.lit .lp-node{background:#fffaf0;border-color:#d18a17;box-shadow:0 8px 22px -10px rgba(140,90,20,.5)}.lp.lit .lp-st.on .lp-node path,.lp.lit .lp-st.on .lp-node circle,.lp.lit .lp-st.on .lp-node rect{stroke:#b06f0c}.lp.lit .lp-st.on .lp-node .fill,.lp.lit .lp-st.on .lp-node text{fill:#b06f0c}'+
  '.lp-card h3,.lp-card>p,.lp-card li{transition:color 1.2s,border-color 1.2s}.lp.lit .lp-st.on .lp-card h3{color:#1f160a}.lp.lit .lp-card>p{color:#5e4e37}.lp.lit .lp-card li{color:#4a3a22;border-color:rgba(160,110,30,.35);background:rgba(255,255,255,.5)}'+
  '.lp.lit .lp-wall path,.lp.lit .lp-wall circle,.lp.lit .lp-wall rect{stroke:rgba(150,100,30,.28)}'+
  '.lp.lit .lp-glow{background:radial-gradient(circle,rgba(255,236,190,.95) 0,rgba(255,214,140,.45) 20%,rgba(255,200,120,.12) 45%,transparent 68%)}'+
  '.lp.lit .lp-glass{stroke:rgba(140,100,40,.55)}.lp.lit .lp-wire{stroke:rgba(120,90,40,.45)}'+
  '.lp-out{position:relative;z-index:2;text-align:center;margin-top:clamp(1.6rem,4vw,3rem);opacity:0;transform:translateY(16px);transition:opacity 1s .4s,transform 1s .4s}.lp.lit .lp-out{opacity:1;transform:none}'+
  '.lp-kick{margin:0;font:600 clamp(.95rem,1.6vw,1.1rem)/1.4 var(--f-body);color:#a0670b;letter-spacing:.04em}html[lang=ar] .lp-kick{letter-spacing:0}'+
  '.lp-name{margin:.2rem 0 0;font:800 clamp(2.6rem,7.5vw,6rem)/1.05 var(--f-head);letter-spacing:-.04em;color:#1f160a}html[lang=ar] .lp-name{letter-spacing:0;line-height:1.3}'+
  '.lp-out h3{margin:clamp(2.4rem,6vw,4rem) 0 0;font:800 clamp(1.4rem,3vw,2rem)/1.2 var(--f-head);color:#1f160a}.lp-hint{margin:.4rem 0 1.6rem;color:#7a6850;font-size:.92rem}'+
  '.lp-md{list-style:none;margin:0 auto;padding:0;max-width:960px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1rem,3vw,2.2rem) clamp(.6rem,2vw,1.4rem)}'+
  '.md{width:100%;display:grid;justify-items:center;gap:.25rem;background:none;border:0;padding:.4rem;cursor:pointer;font:inherit;color:inherit;border-radius:18px}'+
  '.md:focus-visible{outline:2px solid #d18a17;outline-offset:4px}'+
  '.md-svg{width:clamp(96px,12vw,136px);height:auto;overflow:visible;filter:grayscale(1) brightness(.92) contrast(.8);opacity:.42;transition:filter .6s,opacity .6s,transform .5s cubic-bezier(.3,1.5,.5,1)}'+
  '.md:hover .md-svg{opacity:.62;transform:translateY(-4px) rotate(-3deg)}'+
  '.md[aria-pressed=true] .md-svg{filter:drop-shadow(0 10px 18px rgba(160,100,10,.35)) drop-shadow(0 0 22px rgba(255,200,90,.55));opacity:1}'+
  '.md-silver[aria-pressed=true] .md-svg{filter:drop-shadow(0 10px 18px rgba(80,90,100,.3)) drop-shadow(0 0 22px rgba(200,210,220,.8))}'+
  '.md-fin[aria-pressed=true] .md-svg{filter:drop-shadow(0 10px 18px rgba(76,29,149,.3)) drop-shadow(0 0 22px rgba(139,92,246,.45))}'+
  '.md.pop .md-svg{animation:mdPop .9s cubic-bezier(.3,1.6,.5,1)}@keyframes mdPop{0%{transform:scale(.9) rotate(0)}40%{transform:scale(1.12) rotate(-8deg)}70%{transform:scale(.98) rotate(4deg)}100%{transform:none}}'+
  '.md-shine{opacity:0;transition:opacity .4s}.md[aria-pressed=true] .md-shine{animation:mdSh 2.8s ease-in-out infinite}@keyframes mdSh{0%,100%{opacity:.15}50%{opacity:.5}}'+
  '.md b{margin-top:.5rem;font:800 clamp(1rem,1.8vw,1.2rem)/1.3 var(--f-head);color:#9a8a72;transition:color .5s}.md span{font-size:.86rem;color:#a8987f;transition:color .5s}'+
  '.md[aria-pressed=true] b{color:#1f160a}.md[aria-pressed=true] span{color:#5e4e37}'+
  '@media (max-width:760px){.lp-st,.lp-st.r{grid-template-columns:54px minmax(0,1fr)}.lp-node{grid-column:1;width:54px;height:54px}.lp-card,.lp-st.r .lp-card{grid-column:2;justify-self:start;text-align:start;transform:none}.lp-st.r .lp-card ul{justify-content:flex-start}.lp-out ul{grid-template-columns:1fr 1fr}.lp-head{text-align:start;justify-items:start}.lp-rose{margin-inline-start:4px}}'+
  '@media (max-width:760px){.lp-md{grid-template-columns:1fr 1fr}}'+
  '@media (prefers-reduced-motion:reduce){.lp *,.lp{animation:none!important;transition:none!important}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
