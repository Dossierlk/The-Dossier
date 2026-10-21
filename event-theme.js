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
   .event-highlight{display:grid!important;position:relative;z-index:1;grid-template-columns:84px minmax(0,1fr) auto;align-items:center;gap:20px;width:min(1180px,92%);margin:22px auto 30px;padding:26px;border-radius:26px;overflow:hidden;border:1px solid ${accent}99;background:linear-gradient(115deg,${deep} 0%,${deep}ee 55%,${accent}55 100%);box-shadow:inset 0 1px 0 #ffffff35,0 18px 55px #0005,0 0 38px ${accent}22;color:#fff;animation:dossierEventIn .65s ease both}
   .event-icon-box{display:grid;place-items:center;width:78px;height:78px;border-radius:22px;font-size:42px;background:linear-gradient(145deg,${accent}88,${deep});border:1px solid ${pale}88;box-shadow:inset 0 1px 0 #ffffff55,0 8px 24px #0004}
   .event-kicker{margin:0 0 7px;color:${pale};font-size:10px;font-weight:800;letter-spacing:.17em;text-transform:uppercase}
   .event-title{margin:0 0 7px;color:#fff;font:750 clamp(21px,3vw,30px)/1.15 system-ui,sans-serif;letter-spacing:-.03em}
   .event-copy{margin:0;max-width:680px;color:#fffde4;font-size:14px;line-height:1.65}
   .event-meta{margin-top:10px;color:${pale};font-size:11px;font-weight:700}
   .event-cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 17px;border-radius:999px;background:linear-gradient(135deg,${pale},${accent});color:#20142a!important;font-size:12px;font-weight:800;white-space:nowrap;box-shadow:inset 0 1px 0 #ffffffaa,0 8px 20px #0003}
   .event-mark{display:inline-grid;place-items:center;margin-left:8px;width:30px;height:30px;border-radius:10px;color:${pale};background:linear-gradient(145deg,${accent},${deep});border:1px solid ${pale}77;font-size:17px}
   .dossier-theme-toggle{position:fixed;right:18px;bottom:18px;z-index:9999;display:inline-flex;align-items:center;gap:8px;padding:11px 15px;border:1px solid #ffffff35;border-radius:999px;background:rgba(16,31,59,.88);backdrop-filter:blur(20px);color:#f2f7ff;font:650 12px system-ui,sans-serif;box-shadow:inset 0 1px 0 #ffffff22,0 8px 28px #0004;cursor:pointer}
   /* Optional light theme: warm porcelain + ink + electric blue, with readable contrast */
   html{color-scheme:dark}
   body.light-theme{color-scheme:light!important;background:radial-gradient(ellipse at 15% 0%,#dceaff 0%,transparent 42%),radial-gradient(ellipse at 95% 20%,#f3e7ff 0%,transparent 38%),#f6f8fd!important;color:#18243b!important}
   body.light-theme *{scrollbar-color:#b7c8e2 #edf2fa}
   body.light-theme .nav,body.light-theme header.nav,body.light-theme header:not(.event-highlight){color:#18243b}
   body.light-theme .nav{background:rgba(248,250,255,.9)!important;border-color:#d5e0f1!important;box-shadow:0 8px 30px #203f6a12!important}
   body.light-theme .nav a,body.light-theme .nav-links,body.light-theme .nav-links a,body.light-theme .brand,body.light-theme .back,body.light-theme .toolbar,body.light-theme footer,body.light-theme label,body.light-theme .small,body.light-theme .eyebrow,body.light-theme .category,body.light-theme .meta,body.light-theme .muted{color:#536581!important}
   body.light-theme h1,body.light-theme h2,body.light-theme h3,body.light-theme h4,body.light-theme h5,body.light-theme strong,body.light-theme b,body.light-theme .title,body.light-theme .section-head,body.light-theme .section-head *,body.light-theme .brand{color:#142443!important}
   body.light-theme p,body.light-theme li,body.light-theme .description,body.light-theme .excerpt,body.light-theme .content,body.light-theme .body-copy,body.light-theme .intro p,body.light-theme .label,body.light-theme .article-content,body.light-theme .article-content *{color:#33445f}
   body.light-theme .glass,body.light-theme .article,body.light-theme .about-card,body.light-theme .intro,body.light-theme .panel,body.light-theme .community,body.light-theme .related-card,body.light-theme .card,body.light-theme .category-card,body.light-theme .feature-card,body.light-theme .story-card,body.light-theme .content-card,body.light-theme .wrap>section,body.light-theme .archive-card{background:linear-gradient(145deg,rgba(255,255,255,.96),rgba(237,243,253,.94))!important;color:#18243b!important;border:1px solid #d7e2f2!important;box-shadow:0 16px 44px #28476c12,inset 0 1px 0 #fff!important}
   body.light-theme .glass *,body.light-theme .article *,body.light-theme .about-card *,body.light-theme .intro *,body.light-theme .panel *,body.light-theme .community *,body.light-theme .related-card *,body.light-theme .card *,body.light-theme .category-card *,body.light-theme .feature-card *,body.light-theme .story-card *,body.light-theme .content-card *{text-shadow:none}
   body.light-theme input,body.light-theme textarea,body.light-theme select,body.light-theme .search{background:#fff!important;color:#17243b!important;border-color:#bdcde4!important}
   body.light-theme input::placeholder,body.light-theme textarea::placeholder{color:#7585a0!important;opacity:1}
   body.light-theme button:not(.event-cta):not(.dossier-theme-toggle),body.light-theme .button,body.light-theme .btn{color:#18365f}
   body.light-theme .event-highlight{color:#fff!important}
   body.light-theme .event-highlight h2,body.light-theme .event-highlight p{color:#fff!important}
   body.light-theme .dossier-theme-toggle{background:linear-gradient(135deg,#ffffff,#e8efff)!important;color:#19345b!important;border:1px solid #bdcfe9!important;box-shadow:0 10px 30px #23436a20,inset 0 1px 0 #fff!important}
   @keyframes dossierEventIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
   @media(max-width:720px){.event-highlight{grid-template-columns:60px minmax(0,1fr)!important;gap:13px!important;width:94%!important;margin:14px auto 22px!important;padding:16px!important;border-radius:21px!important}.event-icon-box{width:56px;height:56px;font-size:30px;border-radius:16px}.event-title{font-size:21px}.event-copy{font-size:12px}.event-cta{grid-column:1/-1;width:100%;padding:11px}.dossier-theme-toggle{right:12px;bottom:12px}}
   @media(max-width:420px){.event-highlight{grid-template-columns:1fr!important}.event-icon-box{width:54px;height:54px}.event-cta{grid-column:auto}}
   @media(prefers-reduced-motion:reduce){.event-highlight{animation:none}}
   `;document.head.appendChild(s);
  }
  document.body.classList.add("event-skinned");
  const nav=document.querySelector("header.nav, .nav");
  if(nav&&!nav.querySelector(".event-pill")){
    const p=document.createElement("span");p.className="event-pill";p.textContent=name;p.style.cssText="font-size:11px;font-weight:700;padding:7px 10px;border-radius:999px;border:1px solid "+accent+"88;background:"+deep+";color:"+pale+";white-space:nowrap";nav.appendChild(p);
  }
  document.querySelectorAll(".brand").forEach(b=>{if(!b.querySelector(".event-mark")){const m=document.createElement("span");m.className="event-mark";m.textContent=icon;m.title=name;b.appendChild(m)}});
  if(!document.querySelector(".event-highlight")){
   const banner=document.createElement("section");banner.className="event-highlight";banner.setAttribute("aria-label","Today's special event");
   banner.innerHTML='<div class="event-icon-box" aria-hidden="true"></div><div><p class="event-kicker"></p><h2 class="event-title"></h2><p class="event-copy"></p><div class="event-meta"></div></div><a class="event-cta" href="index.html#categories">Explore The Dossier <span aria-hidden="true">↗</span></a>';
   banner.querySelector(".event-icon-box").textContent=icon;banner.querySelector(".event-kicker").textContent="TODAY'S SPECIAL HIGHLIGHT";banner.querySelector(".event-title").textContent=title;banner.querySelector(".event-copy").textContent=copy;banner.querySelector(".event-meta").textContent=d.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"})+" · "+name;
   if(nav)nav.insertAdjacentElement("afterend",banner);else {const main=document.querySelector("main");if(main)main.insertAdjacentElement("afterbegin",banner);else document.body.prepend(banner)}
  }
  let toggle=document.getElementById("dossier-global-theme-toggle");
  if(!toggle){toggle=document.createElement("button");toggle.type="button";toggle.className="dossier-theme-toggle";toggle.id="dossier-global-theme-toggle";toggle.setAttribute("aria-label","Toggle light and dark appearance");document.body.appendChild(toggle)}
  const apply=()=>{let light=document.body.classList.contains("light-theme");toggle.textContent=light?"🌙 Switch to Dark":"☀️ Switch to Light";toggle.setAttribute("aria-pressed",String(light));const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=light?"#f3f6fc":deep};
  try{if(localStorage.getItem("dossier-theme")==="light")document.body.classList.add("light-theme")}catch(_){}
  if(!toggle.dataset.dossierBound){toggle.addEventListener("click",()=>{document.body.classList.toggle("light-theme");try{localStorage.setItem("dossier-theme",document.body.classList.contains("light-theme")?"light":"dark")}catch(_){}apply()});toggle.dataset.dossierBound="1"}
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