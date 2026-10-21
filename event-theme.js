/* THE DOSSIER — prominent daily Search Highlight, inspired by Windows Search */
(() => {
  const date = new Date();
  const key = [String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-");
  const events = {
    "01-01": { name:"New Year's Day", kicker:"TODAY'S HIGHLIGHT", icon:"🎆", title:"A brand-new chapter", text:"A fresh year begins. What mysteries will the next 365 days reveal?", colors:["#102b5d","#53b8ff","#d9f3ff"] },
    "02-14": { name:"Valentine's Day", kicker:"TODAY'S HIGHLIGHT", icon:"💗", title:"Love is full of mysteries", text:"From love stories to the science of the heart, some questions never get old.", colors:["#4c123c","#ff6fae","#ffd1e5"] },
    "03-08": { name:"International Women's Day", kicker:"TODAY'S HIGHLIGHT", icon:"🌷", title:"Women who changed the world", text:"Celebrating the discoveries, courage and stories that shaped history.", colors:["#381b5d","#c49aff","#f1ddff"] },
    "03-14": { name:"Pi Day", kicker:"TODAY'S HIGHLIGHT", icon:"π", title:"The beautiful mystery of numbers", text:"An infinite number hiding inside one simple circle.", colors:["#102f50","#55d6be","#c8fff3"] },
    "03-20": { name:"Spring Equinox", kicker:"TODAY'S HIGHLIGHT", icon:"🌱", title:"A world changing seasons", text:"A moment of balance as the natural world begins a new chapter.", colors:["#163c35","#6de0a5","#d6ffe8"] },
    "04-01": { name:"Curiosity Day", kicker:"TODAY'S HIGHLIGHT", icon:"🧩", title:"Question everything", text:"The best discoveries often start with one strange question.", colors:["#20214f","#8c9bff","#e0e5ff"] },
    "04-22": { name:"Earth Day", kicker:"TODAY'S HIGHLIGHT", icon:"🌎", title:"One planet. Countless mysteries.", text:"Explore the extraordinary world we call home—and the secrets still waiting to be found.", colors:["#103c34","#58d68d","#d4ffe3"] },
    "05-04": { name:"Star Wars Day", kicker:"TODAY'S HIGHLIGHT", icon:"🚀", title:"May the curiosity be with you", text:"Look beyond the stars and explore the mysteries of the universe.", colors:["#111b3e","#8b9dff","#e3e8ff"] },
    "06-05": { name:"World Environment Day", kicker:"TODAY'S HIGHLIGHT", icon:"🌿", title:"The world worth protecting", text:"Discover the wonders of nature and the stories behind our changing planet.", colors:["#123e30","#66d68b","#d7ffe2"] },
    "06-21": { name:"Solstice", kicker:"TODAY'S HIGHLIGHT", icon:"☀️", title:"Follow the light", text:"The changing sky has inspired mysteries and legends for thousands of years.", colors:["#46300c","#ffc857","#fff0c4"] },
    "07-20": { name:"Moon Day", kicker:"TODAY'S HIGHLIGHT", icon:"🌕", title:"One small step into the unknown", text:"Our nearest cosmic neighbour still holds plenty of questions.", colors:["#172b50","#8ab8ff","#e0ecff"] },
    "08-12": { name:"Perseid Meteor Watch", kicker:"TONIGHT'S HIGHLIGHT", icon:"🌠", title:"Look up. Wonder more.", text:"The night sky becomes a reminder of how much is still out there.", colors:["#10152f","#7c8dff","#e3e5ff"] },
    "09-21": { name:"International Day of Peace", kicker:"TODAY'S HIGHLIGHT", icon:"🕊️", title:"A world of stories, a hope for peace", text:"Different lives, different stories—one shared world.", colors:["#12395a","#70d6ff","#d7f6ff"] },
    "10-22": { name:"National Color Day", kicker:"TODAY'S HIGHLIGHT", icon:"🎨", title:"A world full of colour", text:"Today celebrates the colours that shape how we see and experience the world. Take a moment to notice the shades around you.", source:"https://nationaldaycalendar.com/october/22/", colors:["#38206d","#ff8b55","#ffe0a8"], secondary:"International Stuttering Awareness Day" },
    "10-23": { name:"International Snow Leopard Day", kicker:"TOMORROW'S HIGHLIGHT", icon:"🐆", title:"Ghost of the mountains", text:"Meet one of the world's most elusive big cats and learn why protecting its habitat matters.", colors:["#18354b","#8bd3e6","#e2faff"] },
    "10-24": { name:"United Nations Day", kicker:"UPCOMING HIGHLIGHT", icon:"🌐", title:"A world connected by stories", text:"Explore the people, places and events that bring our shared history to life.", colors:["#12345a","#75c5ff","#d9f1ff"] },
    "10-31": { name:"Halloween", kicker:"TODAY'S HIGHLIGHT", icon:"🎃", title:"Tonight, the unknown feels closer", text:"Haunted places, unexplained encounters and mysteries that refuse to rest.", colors:["#26123e","#ff8a3d","#ffd0a8"] },
    "11-13": { name:"World Kindness Day", kicker:"TODAY'S HIGHLIGHT", icon:"💜", title:"Small acts. Big stories.", text:"A reminder that even the smallest act of kindness can change someone's day.", colors:["#3c1c3b","#ff91bd","#ffe0ed"] },
    "12-10": { name:"Human Rights Day", kicker:"TODAY'S HIGHLIGHT", icon:"🕊️", title:"Every voice has a story", text:"A day to reflect on dignity, freedom and the stories behind human rights.", colors:["#12345a","#75c5ff","#d9f1ff"] },
    "12-21": { name:"Winter Solstice", kicker:"TODAY'S HIGHLIGHT", icon:"❄️", title:"The longest night", text:"Across the world, the turning of the seasons has inspired wonder and legend.", colors:["#10264b","#83cfff","#e3f7ff"] },
    "12-24": { name:"Christmas Eve", kicker:"TODAY'S HIGHLIGHT", icon:"✨", title:"A little wonder for the season", text:"Wishing you a night filled with warmth, wonder and good stories.", colors:["#153b35","#e46d7a","#ffe3e5"] },
    "12-25": { name:"Christmas Day", kicker:"TODAY'S HIGHLIGHT", icon:"🎄", title:"A day for wonder", text:"May your day be full of warmth, kindness and stories worth remembering.", colors:["#143d35","#e46d7a","#ffe3e5"] },
    "12-31": { name:"New Year's Eve", kicker:"TODAY'S HIGHLIGHT", icon:"✨", title:"The next mystery starts tomorrow", text:"One chapter closes. Another waits to be discovered.", colors:["#17244c","#d3b4ff","#f3eaff"] }
  };
  const theme = events[key] || (date.getMonth()===9
    ? {name:"Mystery Season",kicker:"THE DOSSIER DAILY HIGHLIGHT",icon:"🌙",title:"Step into the unknown",text:"Every day has a story. Today, follow your curiosity.",colors:["#20183d","#9a8cff","#e5e0ff"]}
    : date.getMonth()===11
    ? {name:"Winter Wonder",kicker:"THE DOSSIER DAILY HIGHLIGHT",icon:"❄️",title:"Find wonder in every story",text:"A little seasonal magic, a little mystery, and a world to explore.",colors:["#10264b","#83cfff","#e3f7ff"]}
    : {name:"Daily Discovery",kicker:"THE DOSSIER DAILY HIGHLIGHT",icon:"✦",title:"Every day holds a new mystery",text:"Discover something unusual, surprising or unforgettable today.",colors:["#102b5d","#53b8ff","#d9f3ff"]});
  const [deep,accent,pale]=theme.colors;
  const style=document.createElement("style");
  style.id="dossier-event-skin";
  style.textContent=`
    :root{--event-deep:${deep};--event-accent:${accent};--event-pale:${pale}}
    body.event-skinned{background-image:radial-gradient(ellipse at 50% -15%,${deep} 0%,transparent 52%),radial-gradient(ellipse at 100% 0%,${accent}16 0%,transparent 36%),var(--bg)!important}
    body.event-skinned .nav{border-color:${accent}66!important;box-shadow:inset 0 1px 0 #ffffff33,0 12px 40px ${deep}66,0 0 26px ${accent}18!important}
    .event-mark{display:inline-grid;place-items:center;flex:0 0 auto;width:30px;height:30px;margin-left:8px;border-radius:11px;font-size:17px;color:${pale};background:linear-gradient(145deg,${accent}66,${deep}cc);border:1px solid ${accent}99;box-shadow:inset 0 1px 0 #ffffff55,0 3px 12px ${deep}66;vertical-align:middle}
    .event-highlight{position:relative;isolation:isolate;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:20px;width:min(1180px,92%);margin:22px auto 30px;padding:clamp(18px,3vw,30px);overflow:hidden;border-radius:26px;border:1px solid ${accent}88;background:linear-gradient(115deg,${deep}f2 0%,${deep}d9 52%,${accent}35 100%);box-shadow:inset 0 1px 0 #ffffff30,0 18px 55px ${deep}55,0 0 38px ${accent}1c;animation:eventSlide .75s cubic-bezier(.22,1,.36,1) both}
    .event-highlight:before{content:"";position:absolute;z-index:-1;width:280px;height:280px;right:8%;top:-180px;border-radius:50%;background:${accent};filter:blur(90px);opacity:.35}
    .event-highlight:after{content:"";position:absolute;z-index:-1;inset:0;background:linear-gradient(125deg,#ffffff12,transparent 42%,#ffffff08);pointer-events:none}
    .event-icon-box{display:grid;place-items:center;width:clamp(64px,8vw,88px);height:clamp(64px,8vw,88px);border-radius:23px;font-size:clamp(32px,4vw,46px);color:${pale};background:linear-gradient(145deg,${accent}66,${deep}bb);border:1px solid ${accent}99;box-shadow:inset 0 1px 0 #ffffff55,0 10px 28px ${deep}88;animation:eventFloat 5s ease-in-out infinite}
    .event-kicker{display:flex;align-items:center;gap:8px;margin:0 0 8px;color:${pale};font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
    .event-kicker:before{content:"";width:18px;height:2px;border-radius:9px;background:${accent};box-shadow:0 0 10px ${accent}}
    .event-title{margin:0 0 7px;color:#fff;font-family:"DM Sans",system-ui,sans-serif;font-size:clamp(21px,3vw,31px);line-height:1.12;letter-spacing:-.035em;font-weight:750}
    .event-copy{max-width:660px;margin:0;color:#f3f4ffcc;font-size:clamp(12px,1.4vw,14px);line-height:1.65}
    .event-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:12px}
    .event-date{color:${pale};font-size:11px;font-weight:650;opacity:.9}
    .event-secondary{padding:5px 9px;border-radius:999px;color:#fff;background:#ffffff0d;border:1px solid #ffffff25;font-size:10px}
    .event-cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:43px;padding:0 16px;border-radius:999px;color:#111827!important;background:linear-gradient(135deg,${pale},${accent});border:1px solid #ffffff77;font-size:12px;font-weight:800;white-space:nowrap;box-shadow:inset 0 1px 0 #ffffff99,0 8px 20px ${deep}88;transition:transform .25s cubic-bezier(.34,1.56,.64,1),filter .25s}
    .event-cta:hover{transform:translateY(-2px);filter:brightness(1.08)}
    .event-pill{display:inline-flex;align-items:center;gap:7px;max-width:230px;padding:7px 11px;border-radius:999px;color:${pale};background:linear-gradient(135deg,${accent}24,${deep}88);border:1px solid ${accent}66;font:700 11px/1.2 system-ui,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:inset 0 1px 0 #ffffff22}
    .event-dot{width:6px;height:6px;border-radius:50%;background:${accent};box-shadow:0 0 9px ${accent};flex:0 0 auto}
    .brand img.logo{transition:filter .35s ease,transform .35s cubic-bezier(.34,1.56,.64,1)}
    .brand:hover img.logo{transform:rotate(-5deg) scale(1.06);filter:drop-shadow(0 0 8px ${accent}99)}
    @keyframes eventSlide{from{opacity:0;transform:translateY(12px) scale(.99)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes eventFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
    @media(max-width:720px){.event-highlight{grid-template-columns:auto minmax(0,1fr);gap:14px;width:94%;margin:14px auto 22px;padding:17px;border-radius:22px}.event-icon-box{width:58px;height:58px;border-radius:17px;font-size:30px}.event-title{font-size:21px}.event-cta{grid-column:1/-1;width:100%;min-height:40px}.event-copy{font-size:12px}.event-pill{font-size:10px;padding:6px 8px;max-width:135px}}
    @media(max-width:420px){.event-highlight{grid-template-columns:1fr;text-align:left}.event-icon-box{width:54px;height:54px}.event-cta{grid-column:auto}.event-meta{margin-top:9px}}
    @media(prefers-reduced-motion:reduce){.event-highlight,.event-icon-box{animation:none!important;transition:none!important}}
  `;
  document.head.appendChild(style);
  document.body.classList.add("event-skinned");
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=deep;
  document.querySelectorAll(".brand").forEach(brand=>{
    if(brand.querySelector(".event-mark"))return;
    const mark=document.createElement("span");mark.className="event-mark";mark.title=theme.name;mark.setAttribute("aria-label",theme.name);mark.textContent=theme.icon;brand.appendChild(mark);
  });
  const nav=document.querySelector(".nav");
  if(nav&&!nav.querySelector(".event-pill")){
    const pill=document.createElement("span");pill.className="event-pill";pill.innerHTML='<span class="event-dot" aria-hidden="true"></span><span></span>';pill.lastElementChild.textContent=theme.name;pill.title=theme.name;
    const menu=nav.querySelector(".menu-toggle"),search=nav.querySelector(".search");
    if(menu)nav.insertBefore(pill,menu);else if(search)search.insertAdjacentElement("afterend",pill);else nav.appendChild(pill);
  }
  const insertAfter=nav||document.querySelector("body > header")||document.querySelector("body > main.wrap > header");
  if(insertAfter&&!document.querySelector(".event-highlight")){
    const banner=document.createElement("section");banner.className="event-highlight";banner.setAttribute("aria-label","Today's special event");
    const dateLabel=date.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});
    const cta=theme.source?'<a class="event-cta" href="'+theme.source+'" target="_blank" rel="noopener noreferrer">Explore today's highlight <span aria-hidden="true">↗</span></a>':'<a class="event-cta" href="index.html#categories">Explore The Dossier <span aria-hidden="true">↗</span></a>';
    banner.innerHTML='<div class="event-icon-box" aria-hidden="true"></div><div class="event-content"><p class="event-kicker"></p><h2 class="event-title"></h2><p class="event-copy"></p><div class="event-meta"><span class="event-date"></span></div></div>'+cta;
    banner.querySelector(".event-icon-box").textContent=theme.icon;
    banner.querySelector(".event-kicker").textContent=theme.kicker;
    banner.querySelector(".event-title").textContent=theme.title;
    banner.querySelector(".event-copy").textContent=theme.text;
    banner.querySelector(".event-date").textContent=dateLabel+" · "+theme.name;
    if(theme.secondary){const badge=document.createElement("span");badge.className="event-secondary";badge.textContent="Also today: "+theme.secondary;banner.querySelector(".event-meta").appendChild(badge)}
    if(nav)nav.insertAdjacentElement("afterend",banner);else insertAfter.insertAdjacentElement("afterend",banner);
  }
  document.documentElement.dataset.dossierEvent=key;
  document.documentElement.dataset.dossierEventName=theme.name;
})();