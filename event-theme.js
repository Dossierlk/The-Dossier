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
   "10-22":["International Stuttering Awareness Day","🌍","Every voice deserves to be heard","Observed worldwide on October 22 to raise awareness, encourage understanding, and support people who stutter. Learn more from the International Stuttering Association: isastutter.org.","#12345a","#75c5ff","#d9f1ff"],
   "10-23":["International Snow Leopard Day","🐆","Ghost of the mountains","Meet one of the world's most elusive big cats.","#18354b","#8bd3e6","#e2faff"],
   "10-24":["United Nations Day","🌐","A world connected by stories","Explore the people, places and events that shape our shared history.","#12345a","#75c5ff","#d9f1ff"],
   "10-31":["Halloween","🎃","Tonight, the unknown feels closer","Haunted places, unexplained encounters and mysteries that refuse to rest.","#26123e","#ff8a3d","#ffd0a8"],
   "11-13":["World Kindness Day","💜","Small acts. Big stories.","Even the smallest act of kindness can change someone's day.","#3c1c3b","#ff91bd","#ffe0ed"],
   "12-10":["Human Rights Day","🕊️","Every voice has a story","A day to reflect on dignity, freedom and the stories behind human rights.","#12345a","#75c5ff","#d9f1ff"],
   "12-25":["Christmas Day","🎄","A day for wonder","May your day be full of warmth, kindness and stories worth remembering.","#143d35","#e46d7a","#ffe3e5"]
  };
  const e=events[key]||["No verified global observance today","✦","Curiosity has no calendar","We could not verify a worldwide special observance for today. Check a trusted international calendar before naming a day.","#102b5d","#53b8ff","#d9f3ff"];
  const [name,icon,title,copy,deep,accent,pale]=e;
  if(!document.getElementById("dossier-live-fixes")){
   const s=document.createElement("style");s.id="dossier-live-fixes";s.textContent=`
   /* Slim daily highlight bar */
   .event-highlight{display:grid!important;position:relative;z-index:1;grid-template-columns:27px minmax(0,1fr);align-items:center;gap:8px;width:min(1120px,calc(100% - 28px));margin:9px auto 12px;padding:7px 11px;border-radius:12px;overflow:hidden;border:1px solid rgba(101,181,255,.2);background:linear-gradient(120deg,#0a1428 0%,#102447 65%,#12365c 100%);box-shadow:inset 0 1px 0 #ffffff10,0 4px 12px #0002;color:#f2f7ff}
   .event-icon-box{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;font-size:15px;background:linear-gradient(145deg,#1b3a65,#10213e);border:1px solid rgba(101,181,255,.24)}
   .event-kicker,.event-copy,.event-meta,.event-cta{display:none!important}
   .event-title{margin:0;color:#f2f7ff;font:750 12px/1.2 system-ui,sans-serif;letter-spacing:-.01em}
   .event-mark{display:inline-grid;place-items:center;margin-left:7px;width:25px;height:25px;border-radius:8px;color:#b9e0ff;background:linear-gradient(145deg,#1b3a65,#10213e);border:1px solid rgba(101,181,255,.3);font-size:14px}
   .event-pill{font-size:10px;font-weight:700;padding:6px 9px;border-radius:999px;border:1px solid rgba(101,181,255,.28)!important;background:rgba(20,48,85,.7)!important;color:#b9e0ff!important;white-space:nowrap}
   .search-control{display:flex;align-items:center;gap:7px;min-width:0}
   .search-icon-button{display:inline-grid;place-items:center;flex:0 0 36px;width:36px;height:36px;border-radius:12px;border:1px solid rgba(101,181,255,.25);background:rgba(16,31,59,.78);color:#b9dcff;font-size:25px;line-height:1;cursor:pointer;transition:transform .2s ease,background .2s ease}
   .search-icon-button:active,.menu-toggle:active{transform:scale(.94)}
   .search-control .search{width:0;min-width:0;max-width:0;opacity:0;padding-left:0;padding-right:0;border-width:0;pointer-events:none;transition:max-width .28s ease,width .28s ease,opacity .2s ease,padding .28s ease}
   .search-control.search-open .search{width:min(280px,35vw);max-width:280px;opacity:1;padding:10px 13px;border-width:1px;pointer-events:auto}
   body.light-theme .search-icon-button{background:rgba(255,255,255,.72)!important;color:#315f9d!important;border-color:#bdcfe9!important}
   /* Shared iOS-like glass top bar on all pages */
   header.nav,.nav{position:relative!important;top:auto!important;z-index:1000!important;isolation:isolate;width:min(1120px,calc(100% - 24px));margin:8px auto 0!important;padding:10px 14px!important;min-height:54px;border-radius:19px!important;border:1px solid rgba(150,190,245,.22)!important;background:#0a1730!important;color:#f2f7ff;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:0 8px 20px #0002,inset 0 1px 0 #ffffff14!important;transition:none!important}
   .dossier-theme-toggle{position:static!important;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:6px;margin-left:auto;padding:8px 11px;border:1px solid rgba(101,181,255,.25);border-radius:999px;background:rgba(16,31,59,.88);backdrop-filter:blur(20px);color:#f2f7ff;font:650 11px system-ui,sans-serif;box-shadow:inset 0 1px 0 #ffffff18,0 4px 12px #0002;cursor:pointer;white-space:nowrap}
   body.light-theme{color-scheme:light!important;background:radial-gradient(ellipse at 15% 0%,#dceaff 0%,transparent 42%),radial-gradient(ellipse at 95% 20%,#f3e7ff 0%,transparent 38%),#f6f8fd!important;color:#18243b!important}
   body.light-theme header.nav,body.light-theme .nav{background:rgba(245,249,255,.72)!important;border-color:rgba(125,157,204,.3)!important;color:#18243b!important;box-shadow:0 8px 28px #29456a12,inset 0 1px 0 #fff!important}
   body.light-theme .nav a,body.light-theme .nav-links,body.light-theme .nav-links a,body.light-theme .brand,body.light-theme .back,body.light-theme .toolbar,body.light-theme footer,body.light-theme label,body.light-theme .small,body.light-theme .eyebrow,body.light-theme .category,body.light-theme .meta,body.light-theme .muted{color:#536581!important}
   body.light-theme h1,body.light-theme h2,body.light-theme h3,body.light-theme h4,body.light-theme h5,body.light-theme strong,body.light-theme b,body.light-theme .title,body.light-theme .section-head,body.light-theme .section-head *,body.light-theme .brand{color:#142443!important}
   body.light-theme p,body.light-theme li,body.light-theme .description,body.light-theme .excerpt,body.light-theme .content,body.light-theme .body-copy,body.light-theme .intro p,body.light-theme .label,body.light-theme .article-content,body.light-theme .article-content *{color:#33445f}
   body.light-theme .glass,body.light-theme .article,body.light-theme .about-card,body.light-theme .intro,body.light-theme .panel,body.light-theme .community,body.light-theme .related-card,body.light-theme .card,body.light-theme .category-card,body.light-theme .feature-card,body.light-theme .story-card,body.light-theme .content-card,body.light-theme .archive-card{background:linear-gradient(145deg,rgba(255,255,255,.97),rgba(237,243,253,.95))!important;color:#18243b!important;border:1px solid #d7e2f2!important;box-shadow:0 16px 44px #28476c12,inset 0 1px 0 #fff!important}
   body.light-theme input,body.light-theme textarea,body.light-theme select,body.light-theme .search{background:rgba(255,255,255,.8)!important;color:#17243b!important;border-color:#bdcde4!important}
   body.light-theme input::placeholder,body.light-theme textarea::placeholder{color:#7585a0!important;opacity:1}
   body.light-theme .event-highlight{background:linear-gradient(120deg,#e8f1ff 0%,#dceaff 62%,#e9e3ff 100%)!important;border-color:#c3d7f4!important;color:#18243b!important;box-shadow:inset 0 1px 0 #fff,0 8px 22px #385a8612!important}
   body.light-theme .event-highlight .event-title{color:#182d50!important}
   body.light-theme .event-highlight .event-copy{color:#435875!important}
   body.light-theme .event-highlight .event-kicker{color:#3569a8!important}
   body.light-theme .event-highlight .event-meta{color:#61799c!important}
   body.light-theme .event-icon-box,body.light-theme .event-mark{background:linear-gradient(145deg,#ffffff,#dceaff)!important;color:#315f9d!important;border-color:#c1d5f1!important}
   body.light-theme .event-pill{background:#e5efff!important;color:#315f9d!important;border-color:#c5d8f3!important}
   body.light-theme .dossier-theme-toggle{background:rgba(255,255,255,.68)!important;color:#19345b!important;border:1px solid #bdcfe9!important;box-shadow:0 5px 14px #23436a12,inset 0 1px 0 #fff!important}
   @media(max-width:760px){
     header.nav,.nav{top:6px!important;width:calc(100% - 16px)!important;margin:6px auto 0!important;padding:8px 10px!important;min-height:48px;border-radius:17px!important;gap:8px!important;flex-wrap:nowrap!important;background:rgba(7,17,36,.68)!important;backdrop-filter:blur(32px) saturate(190%)!important;-webkit-backdrop-filter:blur(32px) saturate(190%)!important}
     body.light-theme header.nav,body.light-theme .nav{background:rgba(245,249,255,.74)!important}
     .nav .brand{font-size:13px!important;letter-spacing:1.3px!important;white-space:nowrap;flex:0 1 auto;min-width:0}
     .nav .brand .logo{flex:0 0 auto}
     .search-control{margin-left:auto;flex:0 0 auto}
     .search-icon-button{width:34px;height:34px;flex-basis:34px;border-radius:11px}
     .search-control.search-open{position:absolute;left:8px;right:8px;top:calc(100% + 7px);padding:7px;border:1px solid rgba(150,190,245,.22);border-radius:15px;background:rgba(7,17,36,.94);backdrop-filter:blur(28px) saturate(180%);-webkit-backdrop-filter:blur(28px) saturate(180%);box-shadow:0 12px 30px #0003}
     .search-control.search-open .search{width:100%;max-width:none;flex:1;min-width:0;background:transparent!important;color:inherit!important;border:0!important;outline:none}
     body.light-theme .search-control.search-open{background:rgba(245,249,255,.96);border-color:#cbdaf0}
     .nav .logo{width:26px;height:26px}
     .nav-links{max-width:100%}
     .dossier-theme-toggle{width:34px!important;height:34px!important;padding:0!important;margin-left:0!important;flex:0 0 34px!important;font-size:0!important;gap:0!important;border-radius:12px!important}
     .nav .menu-toggle{display:flex!important;position:static!important;order:99!important;flex:0 0 34px!important;width:34px!important;height:34px!important;margin-left:0!important;padding:8px!important;align-items:center!important;justify-content:center!important;gap:4px!important;border:1px solid rgba(101,181,255,.25)!important;border-radius:11px!important;background:rgba(16,31,59,.78)!important;z-index:2}
     .nav .menu-toggle span{display:block!important;width:15px!important;height:1.5px!important;border-radius:4px!important;background:#b9dcff!important}
     body.light-theme .nav .menu-toggle{background:rgba(255,255,255,.72)!important;border-color:#bdcfe9!important}
     body.light-theme .nav .menu-toggle span{background:#315f9d!important}
     .dossier-theme-toggle::before{content:"☀️";font-size:16px;line-height:1}
     body.light-theme .dossier-theme-toggle::before{content:"🌙"}
     .event-highlight{grid-template-columns:36px minmax(0,1fr)!important;gap:9px!important;width:calc(100% - 24px)!important;margin:10px auto 15px!important;padding:10px 11px!important;border-radius:14px!important}
     .event-icon-box{width:34px;height:34px;font-size:19px;border-radius:11px}
     .event-title{font-size:16px!important}
     .event-copy{font-size:10px!important}
     .event-kicker{font-size:7px!important}
     .event-meta{font-size:8px!important}
     .event-cta{grid-column:2!important;justify-self:start;padding:7px 10px!important;font-size:9px!important;margin-top:2px}
     .event-pill{display:none!important}
   }
   @media(max-width:420px){
     .event-highlight{grid-template-columns:32px minmax(0,1fr)!important;padding:9px!important;gap:8px!important}
     .event-icon-box{width:31px;height:31px;font-size:17px}
     .event-cta{grid-column:2!important}
   }
   @keyframes dossierEventIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
   @media(max-width:720px){.event-highlight{grid-template-columns:60px minmax(0,1fr)!important;gap:13px!important;width:94%!important;margin:14px auto 22px!important;padding:16px!important;border-radius:21px!important}.event-icon-box{width:56px;height:56px;font-size:30px;border-radius:16px}.event-title{font-size:21px}.event-copy{font-size:12px}.event-cta{grid-column:1/-1;width:100%;padding:11px}.dossier-theme-toggle{right:12px;bottom:12px}}
   @media(max-width:420px){.event-highlight{grid-template-columns:1fr!important}.event-icon-box{width:54px;height:54px}.event-cta{grid-column:auto}}
   @media(prefers-reduced-motion:reduce){.event-highlight{animation:none}}
   `;document.head.appendChild(s);
  }
  document.body.classList.add("event-skinned");
  const nav=document.querySelector("header.nav, .nav");
  if(nav&&!nav.querySelector(".event-pill")){
    const p=document.createElement("span");p.className="event-pill";p.textContent=name;p.style.cssText="";nav.appendChild(p);
  }
  document.querySelectorAll(".brand").forEach(b=>{if(!b.querySelector(".event-mark")){const m=document.createElement("span");m.className="event-mark";m.textContent=icon;m.title=name;b.appendChild(m)}});
  if(!document.querySelector(".event-highlight")){
   const banner=document.createElement("section");banner.className="event-highlight";banner.setAttribute("aria-label","Today's special event");
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