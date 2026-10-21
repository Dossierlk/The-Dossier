/* THE DOSSIER: visible daily highlight + working site-wide appearance toggle */
(function(){
 const run=()=>{
  const d=new Date(), key=String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  const events={
   "01-01":["New Year's Day","🎆","A brand-new chapter","A fresh year begins. What mysteries will the next 365 days reveal?","#102b5d","#53b8ff","#d9f3ff"],
   "02-14":["Valentine's Day","💗","Love is full of mysteries","Some questions about the heart never get old.","#4c123c","#ff6fae","#ffd1e5"],
   "03-08":["International Women's Day","🌷","Women who changed the world","Celebrating the discoveries, courage and stories that shaped history.","#381b5d","#c49aff","#f1ddff"],
   "03-14":["Pi Day","π","The beautiful mystery of numbers","An infinite number hiding inside one simple circle.","#102f50","#55d6be","#c8fff3"],
   "04-22":["Earth Day","🌎","One planet. Countless mysteries.","Explore the extraordinary world we call home.","#103c34","#58d68d","#d4ffe3"],
   "05-04":["Star Wars Day","🚀","May the curiosity be with you","Look beyond the stars and explore the mysteries of the universe.","#111b3e","#8b9dff","#e3e8ff"],
   "06-05":["World Environment Day","🌿","The world worth protecting","Discover the wonders of nature and the stories behind our changing planet.","#123e30","#66d68b","#d7ffe2"],
   "07-20":["Moon Day","🌕","One small step into the unknown","Our nearest cosmic neighbour still holds plenty of questions.","#172b50","#8ab8ff","#e0ecff"],
   "08-12":["Perseid Meteor Watch","🌠","Look up. Wonder more.","The night sky reminds us how much is still out there.","#10152f","#7c8dff","#e3e5ff"],
   "09-21":["International Day of Peace","🕊️","A world of stories, a hope for peace","Different lives, different stories—one shared world.","#12395a","#70d6ff","#d7f6ff"],
   "10-22":["National Color Day","🎨","A World Full of Colour","Today is a perfect excuse to notice the colours and details around you—and discover the stories behind them.","#38206d","#ff8b55","#ffe0a8"],
   "10-23":["International Snow Leopard Day","🐆","Ghost of the mountains","Meet one of the world's most elusive big cats.","#18354b","#8bd3e6","#e2faff"],
   "10-24":["United Nations Day","🌐","A world connected by stories","Explore the people, places and events that shape our shared history.","#12345a","#75c5ff","#d9f1ff"],
   "10-31":["Halloween","🎃","Tonight, the unknown feels closer","Haunted places, unexplained encounters and mysteries that refuse to rest.","#26123e","#ff8a3d","#ffd0a8"],
   "11-13":["World Kindness Day","💜","Small acts. Big stories.","Even the smallest act of kindness can change someone's day.","#3c1c3b","#ff91bd","#ffe0ed"],
   "12-10":["Human Rights Day","🕊️","Every voice has a story","A day to reflect on dignity, freedom and the stories behind human rights.","#12345a","#75c5ff","#d9f1ff"],
   "12-25":["Christmas Day","🎄","A day for wonder","May your day be full of warmth, kindness and stories worth remembering.","#143d35","#e46d7a","#ffe3e5"]
  };
  const e=events[key]||(d.getMonth()===9?["Mystery Season","🌙","Step into the unknown","Every day has a story. Today, follow your curiosity.","#20183d","#9a8cff","#e5e0ff"]:["Daily Discovery","✦","Every day holds a new mystery","Discover something unusual, surprising or unforgettable today.","#102b5d","#53b8ff","#d9f3ff"]);
  const [name,icon,title,copy,deep,accent,pale]=e;
  if(!document.getElementById("dossier-live-fixes")){
   const s=document.createElement("style");s.id="dossier-live-fixes";s.textContent=`
   /* Stable, non-flashing site-wide styles */
   .event-highlight{display:grid;position:relative;z-index:1;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:12px;width:min(1060px,92%);margin:13px auto 18px;padding:12px 16px;border-radius:16px;overflow:hidden;border:1px solid rgba(101,181,255,.22);background:linear-gradient(120deg,#0a1428,#102447 65%,#12365c);box-shadow:inset 0 1px 0 #ffffff18,0 8px 24px #0002;color:#f2f7ff}
   .event-icon-box{display:grid;place-items:center;width:40px;height:40px;border-radius:13px;font-size:22px;background:linear-gradient(145deg,#1b3a65,#10213e);border:1px solid rgba(101,181,255,.28)}
   .event-kicker{margin:0 0 3px;color:#79bcff;font-size:8px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
   .event-title{margin:0 0 3px;color:#f2f7ff;font:750 clamp(16px,2vw,20px)/1.18 system-ui,sans-serif;letter-spacing:-.02em}
   .event-copy{margin:0;max-width:650px;color:#c7d7ef;font-size:11px;line-height:1.45}
   .event-meta{margin-top:3px;color:#8da9ce;font-size:9px;font-weight:650}
   .event-cta{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:9px 11px;border-radius:999px;background:linear-gradient(135deg,#a8d8ff,#65b5ff);color:#07142b!important;font-size:10px;font-weight:800;white-space:nowrap;box-shadow:inset 0 1px 0 #ffffffaa,0 4px 10px #0002}
   .event-mark{display:inline-grid;place-items:center;margin-left:7px;width:25px;height:25px;border-radius:8px;color:#b9e0ff;background:linear-gradient(145deg,#1b3a65,#10213e);border:1px solid rgba(101,181,255,.3);font-size:14px}
   .event-pill{font-size:10px;font-weight:700;padding:6px 9px;border-radius:999px;border:1px solid rgba(101,181,255,.28);background:rgba(20,48,85,.7);color:#b9e0ff;white-space:nowrap}
   .search-control{display:flex;align-items:center;gap:7px;min-width:0;position:relative}
   .search-icon-button{display:inline-grid;place-items:center;flex:0 0 36px;width:36px;height:36px;border-radius:12px;border:1px solid rgba(101,181,255,.25);background:rgba(16,31,59,.78);color:#b9dcff;font-size:25px;line-height:1;cursor:pointer}
   .search-control .search{width:0;min-width:0;max-width:0;opacity:0;padding-left:0;padding-right:0;border-width:0;pointer-events:none}
   .search-control.search-open .search{width:min(280px,35vw);max-width:280px;opacity:1;padding:10px 13px;border-width:1px;pointer-events:auto}
   header.nav,.nav{position:sticky;top:8px;z-index:1000;isolation:isolate;width:min(1120px,calc(100% - 24px));margin:8px auto 0;padding:10px 14px;min-height:54px;border-radius:19px;border:1px solid rgba(150,190,245,.22);background:rgba(7,17,36,.88);color:#f2f7ff;box-shadow:0 8px 28px #0002,inset 0 1px 0 #ffffff14}
   .dossier-theme-toggle{position:static;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:6px;margin-left:auto;padding:8px 11px;border:1px solid rgba(101,181,255,.25);border-radius:999px;background:rgba(16,31,59,.88);color:#f2f7ff;font:650 11px system-ui,sans-serif;white-space:nowrap;cursor:pointer}
   body.light-theme{color-scheme:light;background:#f6f8fd!important;color:#18243b!important}
   body.light-theme header.nav,body.light-theme .nav{background:rgba(245,249,255,.96);border-color:rgba(125,157,204,.3);color:#18243b}
   body.light-theme .nav a,body.light-theme .nav-links,body.light-theme .nav-links a,body.light-theme .brand,body.light-theme .back,body.light-theme .toolbar,body.light-theme footer,body.light-theme label,body.light-theme .small,body.light-theme .eyebrow,body.light-theme .category,body.light-theme .meta,body.light-theme .muted{color:#536581}
   body.light-theme h1,body.light-theme h2,body.light-theme h3,body.light-theme h4,body.light-theme h5,body.light-theme strong,body.light-theme b,body.light-theme .title,body.light-theme .section-head,body.light-theme .section-head *,body.light-theme .brand{color:#142443}
   body.light-theme p,body.light-theme li,body.light-theme .description,body.light-theme .excerpt,body.light-theme .content,body.light-theme .body-copy,body.light-theme .intro p,body.light-theme .label,body.light-theme .article-content,body.light-theme .article-content *{color:#33445f}
   body.light-theme .search-icon-button{background:#fff;color:#315f9d;border-color:#bdcfe9}
   .dossier-drawer-backdrop{position:fixed;inset:0;z-index:1998;background:rgba(1,7,18,.48);opacity:0;visibility:hidden;transition:opacity .2s ease,visibility .2s ease}
   .dossier-drawer{position:fixed;z-index:1999;top:0;right:0;width:min(360px,88vw);height:100vh;height:100dvh;padding:26px 20px 28px;overflow-y:auto;transform:translateX(105%);transition:transform .25s ease;background:linear-gradient(155deg,#0f2344,#050d1d);border-left:1px solid rgba(120,180,255,.24);box-shadow:-22px 0 70px rgba(0,0,0,.35);color:#f2f7ff}
   .dossier-drawer.open{transform:translateX(0)}
   .dossier-drawer-backdrop.open{opacity:1;visibility:visible}
   .dossier-drawer-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:22px;border-bottom:1px solid rgba(150,190,245,.18)}
   .dossier-drawer-title{font:700 15px/1.3 system-ui,sans-serif;letter-spacing:2px}
   .dossier-drawer-title span{color:#65b5ff}
   .dossier-drawer-close{display:grid;place-items:center;width:38px;height:38px;border:1px solid rgba(120,180,255,.25);border-radius:12px;background:rgba(255,255,255,.06);color:inherit;font-size:23px}
   .dossier-drawer-label{margin:24px 8px 9px;color:#79bcff;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase}
   .dossier-drawer-links{display:grid;gap:7px}
   .dossier-drawer-links a{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 13px;border:1px solid transparent;border-radius:14px;color:#e5efff;text-decoration:none;background:rgba(255,255,255,.035);font:600 14px/1.3 system-ui,sans-serif}
   .dossier-drawer-links a:after{content:"↗";color:#75baff;font-size:15px}
   .dossier-drawer-links a:hover,.dossier-drawer-links a:focus-visible{background:rgba(65,140,255,.13);border-color:rgba(110,180,255,.25)}
   body.dossier-drawer-open{overflow:hidden}
   body.light-theme .dossier-drawer{background:linear-gradient(155deg,#fafcff,#e8f0fd);color:#182b4a;border-color:#cbdaf0}
   body.light-theme .dossier-drawer-head{border-color:#d5e0f0}
   body.light-theme .dossier-drawer-links a{color:#233b60;background:rgba(70,115,180,.06)}
   @media(max-width:760px){
     .nav .nav-links,.nav .nav-links.open{display:none}
     .search-control{margin-left:auto;flex:0 0 auto}
     .search-control.search-open{position:absolute;left:8px;right:8px;top:calc(100% + 7px);display:flex;z-index:20;padding:7px;border:1px solid rgba(150,190,245,.22);border-radius:15px;background:rgba(7,17,36,.98)}
     .search-control.search-open .search{width:100%;max-width:none;flex:1;min-width:0;background:transparent;color:inherit}
     .nav .menu-toggle{margin-left:0}
     .dossier-theme-toggle{width:34px;height:34px;padding:0;flex:0 0 34px;font-size:0;gap:0;border-radius:12px}
     .dossier-theme-toggle:before{content:"☀️";font-size:16px}
     body.light-theme .dossier-theme-toggle:before{content:"🌙"}
     .nav .menu-toggle{display:flex;position:static;order:99;flex:0 0 34px;width:34px;height:34px;margin-left:0;padding:8px;align-items:center;justify-content:center;gap:4px;border:1px solid rgba(101,181,255,.25);border-radius:11px;background:rgba(16,31,59,.78);z-index:2}
     .nav .menu-toggle span{display:block;width:15px;height:1.5px;border-radius:4px;background:#b9dcff}
     body.light-theme .nav .menu-toggle{background:#fff;border-color:#bdcfe9}
     body.light-theme .nav .menu-toggle span{background:#315f9d}
     .event-highlight{grid-template-columns:36px minmax(0,1fr);gap:9px;width:calc(100% - 24px);margin:10px auto 15px;padding:10px 11px;border-radius:14px}
     .event-icon-box{width:34px;height:34px;font-size:19px;border-radius:11px}
     .event-title{font-size:16px}
     .event-copy{font-size:10px}
     .event-kicker{font-size:7px}
     .event-meta{font-size:8px}
     .event-cta{grid-column:2;justify-self:start;padding:7px 10px;font-size:9px;margin-top:2px}
     .event-pill{display:none}
   }
   @media(max-width:420px){
     .event-highlight{grid-template-columns:32px minmax(0,1fr);padding:9px;gap:8px}
     .event-icon-box{width:31px;height:31px;font-size:17px}
   }
   @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto;transition:none!important;animation:none!important}}
   `;document.head.appendChild(s);
  }
  document.body.classList.add("event-skinned");
  document.documentElement.classList.add("dossier-theme-ready");

  // One consistent right-side navigation drawer with every category, on every page.
  const buildDossierDrawer=()=>{
    if(document.getElementById("dossier-drawer")) return;
    const backdrop=document.createElement("div");backdrop.className="dossier-drawer-backdrop";backdrop.id="dossier-drawer-backdrop";
    const drawer=document.createElement("aside");drawer.className="dossier-drawer";drawer.id="dossier-drawer";drawer.setAttribute("aria-label","Site navigation");drawer.setAttribute("aria-hidden","true");
    drawer.innerHTML='<div class="dossier-drawer-head"><div class="dossier-drawer-title"><span>THE</span> DOSSIER</div><button type="button" class="dossier-drawer-close" aria-label="Close menu">×</button></div><p class="dossier-drawer-label">Explore</p><nav class="dossier-drawer-links"><a href="index.html">Home</a><a href="index.html#latest">Discover latest stories</a><a href="category.html">All stories</a><a href="category.html?category=Astro">Astro &amp; Space</a><a href="category.html?category=Crime">Strange Crimes</a><a href="category.html?category=Paranormal">Paranormal</a><a href="category.html?category=Unexplained">Unexplained Mysteries</a><a href="category.html?category=Quick%20Flashes">Quick Flashes</a><a href="about.html">About The Dossier</a></nav>';
    document.body.append(backdrop,drawer);
    const close=()=>{drawer.classList.remove("open");backdrop.classList.remove("open");document.body.classList.remove("dossier-drawer-open");drawer.setAttribute("aria-hidden","true");document.querySelectorAll(".menu-toggle").forEach(b=>b.setAttribute("aria-expanded","false"));};
    const open=()=>{drawer.classList.add("open");backdrop.classList.add("open");document.body.classList.add("dossier-drawer-open");drawer.setAttribute("aria-hidden","false");document.querySelectorAll(".menu-toggle").forEach(b=>b.setAttribute("aria-expanded","true"));drawer.querySelector(".dossier-drawer-close").focus();};
    document.querySelectorAll(".menu-toggle").forEach(btn=>{btn.addEventListener("click",ev=>{ev.preventDefault();ev.stopImmediatePropagation();if(drawer.classList.contains("open"))close();else open();},true);});
    backdrop.addEventListener("click",close);drawer.querySelector(".dossier-drawer-close").addEventListener("click",close);
    document.addEventListener("keydown",ev=>{if(ev.key==="Escape")close();});
    drawer.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
  };
  buildDossierDrawer();

  const nav=document.querySelector("header.nav, .nav");
  if(nav&&!nav.querySelector(".event-pill")){
    const p=document.createElement("span");p.className="event-pill";p.textContent=name;p.style.cssText="";nav.appendChild(p);
  }
  document.querySelectorAll(".brand").forEach(b=>{if(!b.querySelector(".event-mark")){const m=document.createElement("span");m.className="event-mark";m.textContent=icon;m.title=name;b.appendChild(m)}});
  if(!document.querySelector(".event-highlight")){
   const banner=document.createElement("section");banner.className="event-highlight";banner.style.animation="none";banner.setAttribute("aria-label","Today's special event");
   banner.innerHTML='<div class="event-icon-box" aria-hidden="true"></div><div><p class="event-kicker"></p><h2 class="event-title"></h2><p class="event-copy"></p><div class="event-meta"></div></div><a class="event-cta" href="index.html#categories">Explore The Dossier <span aria-hidden="true">↗</span></a>';
   banner.querySelector(".event-icon-box").textContent=icon;banner.querySelector(".event-kicker").textContent="TODAY'S SPECIAL HIGHLIGHT";banner.querySelector(".event-title").textContent=title;banner.querySelector(".event-copy").textContent=copy;banner.querySelector(".event-meta").textContent=d.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"})+" · "+name;
   if(nav)nav.insertAdjacentElement("afterend",banner);else {const main=document.querySelector("main");if(main)main.insertAdjacentElement("afterbegin",banner);else document.body.prepend(banner)}
  }
  let toggle=document.getElementById("dossier-global-theme-toggle");
  if(!toggle){toggle=document.createElement("button");toggle.type="button";toggle.className="dossier-theme-toggle";toggle.id="dossier-global-theme-toggle";toggle.setAttribute("aria-label","Toggle light and dark appearance");const topbar=document.querySelector("header.nav, header");if(topbar)topbar.appendChild(toggle);else document.body.prepend(toggle)}
  const apply=()=>{let light=document.body.classList.contains("light-theme");toggle.textContent=light?"🌙 Dark":"☀️ Light";toggle.setAttribute("aria-pressed",String(light));const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=light?"#f3f6fc":deep};
  try{if(localStorage.getItem("dossier-theme-v2")==="light")document.body.classList.add("light-theme")}catch(_){}
  if(!toggle.dataset.dossierBound){toggle.addEventListener("click",()=>{document.body.classList.toggle("light-theme");try{localStorage.setItem("dossier-theme-v2",document.body.classList.contains("light-theme")?"light":"dark")}catch(_){}apply()});toggle.dataset.dossierBound="1"}
  apply();
  // Keep the article page's built-in theme control and this site-wide control in sync.
  document.addEventListener("click",ev=>{
    if(ev.target && ev.target.closest && ev.target.closest("#theme-toggle") && !ev.target.closest("#dossier-global-theme-toggle")){
      setTimeout(apply,0);
    }
  });
  document.documentElement.dataset.dossierEvent=key;
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run,{once:true});else run();
})();