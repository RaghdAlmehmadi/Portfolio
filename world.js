/* About page: Raghad drawn as an invention.
   A blueprint "patent sheet" (FIG. 1) of a system that turns ideas into inventions.
   Each part carries a reference numeral; selecting it shows the skills behind it. */
(function(){
  var t=function(s){ return (window.AR && window.AR[s]) || s; };
  var AR=!!window.AR;
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
  /* two layouts: wide (desktop) and tall (phones) */
  var L={
    wide:{w:1100,h:640,pos:{cur:[110,320],prog:[350,170],hw:[350,470],inn:[600,320],it:[850,170],des:[850,470],out:[1000,320]},dir:'h'},
    tall:{w:600,h:1180,pos:{cur:[300,90],prog:[150,310],hw:[450,310],inn:[300,560],it:[150,810],des:[450,810],out:[300,1060]},dir:'v'}
  };
  var WIRES=[['cur','prog'],['cur','hw'],['prog','inn'],['hw','inn'],['inn','it'],['inn','des'],['it','out'],['des','out']];

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
  var R=78;
  function wire(a,b,lay){ var A=lay.pos[a], B=lay.pos[b];
    if(lay.dir==='h'){ var x1=A[0]+R*(a==='cur'?.7:1), x2=B[0]-R*(b==='out'?.7:1), m=(x1+x2)/2; return 'M'+x1+' '+A[1]+'H'+m+'V'+B[1]+'H'+x2; }
    var y1=A[1]+R*(a==='cur'?.85:.8), y2=B[1]-R*(b==='out'?1:.8), mm=(y1+y2)/2; return 'M'+A[0]+' '+y1+'V'+mm+'H'+B[0]+'V'+y2; }
  function svg(kind){
    var lay=L[kind], s='<svg class="ps-svg ps-'+kind+'" viewBox="'+(kind==='wide'?'25 50 1060 580':'0 0 '+lay.w+' '+lay.h)+'" role="img" aria-label="'+esc(t('FIG. 1: a system that turns ideas into inventions'))+'">';
    s+='<g class="wires">'+WIRES.map(function(w){ return '<path pathLength="1" class="w" data-a="'+w[0]+'" data-b="'+w[1]+'" d="'+wire(w[0],w[1],lay)+'"/><path class="pulse" data-a="'+w[0]+'" data-b="'+w[1]+'" d="'+wire(w[0],w[1],lay)+'"/>'; }).join('')+'</g>';
    PARTS.forEach(function(p,i){ var c=lay.pos[p.id], lx=c[0]+(kind==='wide'?64:70), ly=c[1]-(kind==='wide'?92:84);
      if(kind==='tall' && (p.id==='prog'||p.id==='it')) lx=c[0]-70;
      s+='<g class="part" data-id="'+p.id+'" tabindex="0" role="button" aria-label="'+esc(p.n+' '+t(p.name))+'" style="--i:'+i+'">'+
        '<rect class="hit" x="'+(c[0]-90)+'" y="'+(c[1]-90)+'" width="180" height="180" rx="20"/>'+
        '<g class="body" transform="translate('+c[0]+' '+c[1]+')">'+DRAW[p.id].replace(/<(path|circle|rect)(?![^>]*pathLength)/g,'<$1 pathLength="1"')+'</g>'+
        '<path pathLength="1" class="lead" d="M'+(c[0]+(lx>c[0]?40:-40))+' '+(c[1]-50)+'Q'+((c[0]+lx)/2)+' '+(ly+4)+' '+lx+' '+(ly+12)+'"/>'+
        '<g class="num" transform="translate('+lx+' '+ly+')"><circle r="19"/><text y="7">'+p.n+'</text></g></g>';
    });
    return s+'</svg>';
  }
  function legend(p){
    var body = p.q ? '<p class="ps-q">“'+esc(t('What if there’s a better way?'))+'”</p>'
      : p.aw ? '<ul class="ps-aw">'+AWARDS.map(function(a){ return '<li><b>'+esc(t(a[0]))+'</b><span>'+esc(t(a[1]))+' · '+esc(t(a[2]))+'</span></li>'; }).join('')+'</ul>'
      : '<ul class="ps-sk">'+p.i.map(function(x,k){ return '<li style="--k:'+k+'">'+esc(t(x))+'</li>'; }).join('')+'</ul>';
    return '<p class="ps-ref"><b>'+p.n+'</b><span>'+esc(t(p.role))+'</span></p><h3>'+esc(t(p.name))+'</h3><p class="ps-d">'+esc(t(p.d))+'</p>'+body;
  }

  window.WORLD=function(host){
    if(!host) return;
    host.innerHTML=
      '<section class="pt" aria-label="'+esc(t('Raghad, drawn as an invention'))+'">'+
        '<div class="pt-head"><p class="pt-k mono">'+esc(t('FIG. 1'))+'</p><h2>'+esc(t('Raghad, drawn as an invention'))+'</h2><p>'+esc(t('A system that turns curiosity into inventions. Select any part of the drawing to see what powers it.'))+'</p></div>'+
        '<div class="pt-sheet">'+
          '<div class="pt-draw">'+svg('wide')+svg('tall')+'</div>'+
          '<aside class="pt-leg" aria-live="polite"></aside>'+
          '<div class="pt-tb mono"><span>'+esc(t('Inventor'))+': <b>'+esc(t('Raghad Almihmadi'))+'</b></span><span>'+esc(t('Sheet 1 of 1'))+'</span><span>'+esc(t('Jeddah · 2026'))+'</span></div>'+
        '</div>'+
        '<div class="pt-keys">'+PARTS.map(function(p){ return '<button type="button" data-id="'+p.id+'"><b>'+p.n+'</b>'+esc(t(p.name))+'</button>'; }).join('')+'</div>'+
      '</section>';
    var root=host.querySelector('.pt'), leg=host.querySelector('.pt-leg'), sel=null, auto=null, k=0;
    function pick(id,user){
      sel=id; var p=PARTS.filter(function(x){ return x.id===id; })[0];
      leg.innerHTML='<div class="pt-card">'+legend(p)+'</div>';
      [].forEach.call(root.querySelectorAll('.part'),function(g){ g.classList.toggle('on',g.getAttribute('data-id')===id); });
      [].forEach.call(root.querySelectorAll('.pulse'),function(w){ w.classList.toggle('on', w.getAttribute('data-a')===id||w.getAttribute('data-b')===id); });
      [].forEach.call(root.querySelectorAll('.pt-keys button'),function(b){ b.setAttribute('aria-pressed',b.getAttribute('data-id')===id); });
      if(user && auto){ clearInterval(auto); auto=null; }
    }
    root.addEventListener('click',function(e){ var g=e.target.closest('.part,[data-id]'); if(g) pick(g.getAttribute('data-id'),1); });
    root.addEventListener('keydown',function(e){ var g=e.target.closest('.part'); if(g&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); pick(g.getAttribute('data-id'),1); } });
    pick('cur');
    function start(){ root.classList.add('drawn'); if(!auto && !RM) auto=setInterval(function(){ k=(k+1)%PARTS.length; pick(PARTS[k].id); },4200); }
    function stop(){ if(auto){ clearInterval(auto); auto=null; } }
    if('IntersectionObserver' in window) new IntersectionObserver(function(es){ es.forEach(function(en){ en.isIntersecting?start():stop(); }); },{threshold:.3}).observe(root);
    else start();
  };

  var css=
  '.pt{--bp:#0b3b6f;--ink:#e8f1ff;--hi:#ffd166;position:relative;margin:clamp(1.2rem,3vw,2.2rem) 0 clamp(2.5rem,6vw,4rem);padding:clamp(1.4rem,3.5vw,2.6rem);border-radius:clamp(18px,2.6vw,28px);background:linear-gradient(180deg,#0e4580,#0b3b6f 40%,#09325f);color:var(--ink);overflow:hidden;isolation:isolate;box-shadow:0 50px 100px -50px rgba(11,59,111,.9)}'+
  '.pt::before{content:"";position:absolute;inset:0;z-index:-1;background-image:linear-gradient(rgba(232,241,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(232,241,255,.08) 1px,transparent 1px),linear-gradient(rgba(232,241,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(232,241,255,.04) 1px,transparent 1px);background-size:80px 80px,80px 80px,16px 16px,16px 16px}'+
  '.pt::after{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(80% 60% at 50% 0%,rgba(255,255,255,.08),transparent 60%)}'+
  '.pt-head{max-width:62ch}.pt-k{margin:0;color:var(--hi);font-size:.8rem;letter-spacing:.2em}html[lang=ar] .pt-k{letter-spacing:0}'+
  '.pt-head h2{margin:.35rem 0 .6rem;font:800 clamp(2rem,5vw,3.8rem)/1.05 var(--f-head);letter-spacing:-.03em;color:#fff}html[lang=ar] .pt-head h2{letter-spacing:0;line-height:1.35}'+
  '.pt-head>p:last-child{margin:0;color:rgba(232,241,255,.78);line-height:1.75}'+
  '.pt-sheet{position:relative;margin-top:clamp(1.2rem,3vw,2rem);display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:clamp(1rem,2.4vw,2rem);border:1.5px solid rgba(232,241,255,.55);padding:clamp(.8rem,2vw,1.4rem);box-shadow:inset 0 0 0 5px var(--bp),inset 0 0 0 6px rgba(232,241,255,.3)}'+
  '.pt-draw{min-width:0}.ps-svg{display:block;width:100%;height:auto;overflow:visible}.ps-tall{display:none}'+
  '.ps-svg path,.ps-svg circle,.ps-svg rect{fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}'+
  '.ps-svg .thin{stroke-width:1.2;opacity:.8}.ps-svg .dash{stroke-dasharray:.04 .04!important;opacity:.7}.ps-svg .fill{fill:var(--ink)}.ps-svg .hatch{fill:url(#none);fill:rgba(232,241,255,.12)}'+
  '.ps-svg .glyph{fill:var(--ink);font:700 26px ui-monospace,monospace;text-anchor:middle;stroke:none}'+
  '.ps-svg .hit{stroke:none;fill:transparent}.ps-svg .part{cursor:pointer;outline:none}'+
  '.ps-svg .num circle{fill:var(--bp);stroke:var(--ink)}.ps-svg .num text{fill:var(--ink);font:700 19px ui-monospace,monospace;text-anchor:middle}.ps-tall .num text{font-size:22px}.ps-tall .num circle{r:22}'+
  '.ps-svg .lead{stroke-width:1.2;stroke-dasharray:none}'+
  '.ps-svg .w{stroke-width:1.6;opacity:.65}.ps-svg .pulse{stroke:var(--hi);stroke-width:3;stroke-dasharray:6 22;opacity:0;transition:opacity .4s;animation:ptFlow 1.1s linear infinite}.ps-svg .pulse.on{opacity:1}'+
  '@keyframes ptFlow{to{stroke-dashoffset:-28}}'+
  /* line drawing on entry */
  '.pt .body *,.pt .lead,.pt .w{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.4s cubic-bezier(.6,0,.2,1)}.pt .num{opacity:0;transition:opacity .5s}'+
  '.pt.drawn .body *,.pt.drawn .lead,.pt.drawn .w{stroke-dashoffset:0}.pt.drawn .num{opacity:1}'+
  '.pt.drawn .part .body *{transition-delay:calc(var(--i) * .16s)}.pt.drawn .part .lead{transition-delay:calc(.6s + var(--i) * .16s)}.pt.drawn .part .num{transition-delay:calc(1.1s + var(--i) * .16s)}.pt.drawn .w{transition-delay:1.2s}'+
  '.pt .glyph{opacity:0;transition:opacity .6s 1s}.pt.drawn .glyph{opacity:1}.pt .fill{fill-opacity:0;transition:fill-opacity .6s 1.2s}.pt.drawn .fill{fill-opacity:1}'+
  '.ps-svg .g1,.ps-svg .g2>path{transform-box:fill-box;transform-origin:center}.pt.drawn .g1>path{animation:ptRot 14s linear infinite;transform-box:fill-box;transform-origin:center}.pt.drawn .g2>path{animation:ptRot 8.6s linear infinite reverse}'+
  '@keyframes ptRot{to{transform:rotate(1turn)}}'+
  '.ps-svg .part.on .body *,.ps-svg .part.on .lead{stroke:var(--hi)}.ps-svg .part.on .glyph,.ps-svg .part.on .fill{fill:var(--hi)}.ps-svg .part.on .num circle{fill:var(--hi);stroke:var(--hi)}.ps-svg .part.on .num text{fill:var(--bp)}'+
  '.ps-svg .part:hover .body *{stroke:#fff;stroke-width:2.6}.ps-svg .part:focus-visible .hit{stroke:var(--hi);stroke-dasharray:6 6}'+
  '.ps-svg .part.on .body{filter:drop-shadow(0 0 10px rgba(255,209,102,.55))}'+
  '.pt-leg{border-inline-start:1.5px dashed rgba(232,241,255,.35);padding-inline-start:clamp(1rem,2vw,1.6rem);align-self:stretch;display:flex;align-items:center}'+
  '.pt-card{animation:ptIn .45s cubic-bezier(.2,.8,.2,1)}@keyframes ptIn{from{opacity:0;transform:translateY(10px)}}'+
  '.ps-ref{display:flex;align-items:center;gap:.6rem;margin:0;font:600 .78rem/1 var(--f-mono);color:rgba(232,241,255,.7)}.ps-ref b{display:grid;place-items:center;width:2.2rem;height:2.2rem;border-radius:50%;background:var(--hi);color:var(--bp);font-size:.9rem}'+
  '.pt-card h3{margin:.8rem 0 .3rem;font:800 clamp(1.3rem,2.2vw,1.7rem)/1.2 var(--f-head);color:#fff}.ps-d{margin:0 0 .9rem;color:rgba(232,241,255,.75);line-height:1.6;font-size:.95rem}'+
  '.ps-sk{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.4rem}.ps-sk li{padding:.38rem .7rem;border:1px solid rgba(232,241,255,.5);border-radius:4px;font:500 .82rem/1.2 var(--f-mono);animation:ptIn .4s both;animation-delay:calc(var(--k) * .05s)}html[lang=ar] .ps-sk li{font-family:var(--f-body)}'+
  '.ps-aw{list-style:none;margin:0;padding:0;display:grid;gap:.45rem}.ps-aw li{display:grid;padding:.45rem .7rem;border-inline-start:3px solid var(--hi);background:rgba(232,241,255,.07)}.ps-aw b{color:var(--hi);font-size:.9rem}.ps-aw span{font-size:.8rem;color:rgba(232,241,255,.8)}'+
  '.ps-q{margin:0;font:700 clamp(1.2rem,2vw,1.5rem)/1.5 var(--f-head);color:var(--hi)}'+
  '.pt-tb{grid-column:1/-1;display:flex;flex-wrap:wrap;justify-content:space-between;gap:.4rem 1rem;border-top:1.5px solid rgba(232,241,255,.45);padding-top:.7rem;font-size:.72rem;letter-spacing:.06em;color:rgba(232,241,255,.75)}.pt-tb b{color:#fff}html[lang=ar] .pt-tb{letter-spacing:0}'+
  '.pt-keys{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:1rem}.pt-keys button{display:inline-flex;align-items:center;gap:.45rem;border:1px solid rgba(232,241,255,.35);background:rgba(232,241,255,.05);color:var(--ink);border-radius:999px;padding:.4rem .85rem .4rem .45rem;font:inherit;font-size:.84rem;cursor:pointer;transition:.25s}'+
  'html[dir=rtl] .pt-keys button{padding:.4rem .45rem .4rem .85rem}.pt-keys b{display:grid;place-items:center;width:1.7rem;height:1.7rem;border-radius:50%;border:1px solid currentColor;font:700 .72rem/1 var(--f-mono)}'+
  '.pt-keys button:hover{border-color:#fff}.pt-keys button[aria-pressed=true]{background:var(--hi);border-color:var(--hi);color:var(--bp)}'+
  '@media (max-width:860px){.pt-sheet{grid-template-columns:1fr}.ps-wide{display:none}.ps-tall{display:block;max-width:440px;margin:0 auto}.pt-leg{border-inline-start:0;border-top:1.5px dashed rgba(232,241,255,.35);padding:1rem 0 0;min-height:15rem;align-items:flex-start}.pt-keys{display:none}}'+
  '@media (prefers-reduced-motion:reduce){.pt *{animation:none!important;transition:none!important}.pt .body *,.pt .lead,.pt .w{stroke-dashoffset:0}.pt .num{opacity:1}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
})();
