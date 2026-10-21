/* THE DOSSIER — daily event skin
   Deterministic local-calendar themes. The core brand stays recognizable. */
(() => {
  const themes = {
    "01-01": { name: "New Year", mark: "✦", line: "A new chapter begins", colors: ["#102b5d", "#53b8ff", "#d9f3ff"] },
    "02-14": { name: "Valentine's Day", mark: "♥", line: "Stories written in the stars", colors: ["#4c123c", "#ff6fae", "#ffd1e5"] },
    "03-08": { name: "International Women's Day", mark: "✿", line: "Celebrating women who changed the world", colors: ["#381b5d", "#c49aff", "#f1ddff"] },
    "03-14": { name: "Pi Day", mark: "π", line: "A little more mystery in the universe", colors: ["#102f50", "#55d6be", "#c8fff3"] },
    "03-20": { name: "Spring Equinox", mark: "❀", line: "A season of new discoveries", colors: ["#163c35", "#6de0a5", "#d6ffe8"] },
    "04-01": { name: "Curiosity Day", mark: "?", line: "Question everything", colors: ["#20214f", "#8c9bff", "#e0e5ff"] },
    "04-22": { name: "Earth Day", mark: "🌎", line: "One planet. Countless stories.", colors: ["#103c34", "#58d68d", "#d4ffe3"] },
    "05-04": { name: "Star Wars Day", mark: "✦", line: "Explore a galaxy of mysteries", colors: ["#111b3e", "#8b9dff", "#e3e8ff"] },
    "06-05": { name: "World Environment Day", mark: "🌿", line: "Discover the world worth protecting", colors: ["#123e30", "#66d68b", "#d7ffe2"] },
    "06-21": { name: "Solstice", mark: "☼", line: "Follow the light into the unknown", colors: ["#46300c", "#ffc857", "#fff0c4"] },
    "07-20": { name: "Moon Day", mark: "☾", line: "One small step into the unknown", colors: ["#172b50", "#8ab8ff", "#e0ecff"] },
    "08-12": { name: "Perseid Meteor Watch", mark: "✧", line: "Look up. Wonder more.", colors: ["#10152f", "#7c8dff", "#e3e5ff"] },
    "09-21": { name: "International Day of Peace", mark: "☮", line: "A world of stories, a hope for peace", colors: ["#12395a", "#70d6ff", "#d7f6ff"] },
    "10-31": { name: "Halloween", mark: "☠", line: "Tonight, the unknown feels closer", colors: ["#26123e", "#ff8a3d", "#ffd0a8"] },
    "11-13": { name: "World Kindness Day", mark: "♡", line: "Every story can leave a little light", colors: ["#3c1c3b", "#ff91bd", "#ffe0ed"] },
    "12-10": { name: "Human Rights Day", mark: "✧", line: "Every voice has a story", colors: ["#12345a", "#75c5ff", "#d9f1ff"] },
    "12-21": { name: "Winter Solstice", mark: "❄", line: "The longest night. A thousand mysteries.", colors: ["#10264b", "#83cfff", "#e3f7ff"] },
    "12-24": { name: "Christmas Eve", mark: "✦", line: "A little wonder for the season", colors: ["#153b35", "#e46d7a", "#ffe3e5"] },
    "12-25": { name: "Christmas", mark: "✦", line: "Wishing you a little wonder", colors: ["#143d35", "#e46d7a", "#ffe3e5"] },
    "12-31": { name: "New Year's Eve", mark: "✦", line: "The next mystery starts tomorrow", colors: ["#17244c", "#d3b4ff", "#f3eaff"] }
  };
  const date = new Date();
  const key = [String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  const theme = themes[key] || (
    date.getMonth() === 9 ? { name: "Mystery Season", mark: "☾", line: "Step into the unknown", colors: ["#20183d", "#9a8cff", "#e5e0ff"] } :
    date.getMonth() === 11 ? { name: "Winter Wonder", mark: "✧", line: "Find wonder in every story", colors: ["#10264b", "#83cfff", "#e3f7ff"] } :
    { name: "Daily Discovery", mark: "✦", line: "Every day holds a new mystery", colors: ["#102b5d", "#53b8ff", "#d9f3ff"] }
  );

  const [deep, accent, pale] = theme.colors;
  const style = document.createElement("style");
  style.id = "dossier-event-skin";
  style.textContent = `
    :root { --event-deep: ${deep}; --event-accent: ${accent}; --event-pale: ${pale}; }
    body.event-skinned { background-image: radial-gradient(ellipse at 50% -15%, ${deep} 0%, transparent 52%), radial-gradient(ellipse at 100% 0%, ${accent}16 0%, transparent 36%), var(--bg) !important; }
    .nav.event-skinned-nav, body.event-skinned .nav { border-color: ${accent}55 !important; box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 12px 40px ${deep}66, 0 0 26px ${accent}12 !important; }
    .event-mark { display:inline-grid; place-items:center; flex:0 0 auto; width:30px; height:30px; margin-left:8px; border-radius:11px; font-size:17px; color:${pale}; background:linear-gradient(145deg,${accent}66,${deep}cc); border:1px solid ${accent}99; box-shadow:inset 0 1px 0 #ffffff55,0 3px 12px ${deep}66; vertical-align:middle; }
    .event-pill { display:inline-flex; align-items:center; gap:7px; max-width:240px; padding:7px 11px; border-radius:999px; color:${pale}; background:linear-gradient(135deg,${accent}24,${deep}88); border:1px solid ${accent}55; font:600 11px/1.2 system-ui,sans-serif; letter-spacing:.035em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; box-shadow:inset 0 1px 0 #ffffff22; animation:eventAppear .65s cubic-bezier(.22,1,.36,1) both; }
    .event-pill .event-dot { width:6px; height:6px; border-radius:50%; background:${accent}; box-shadow:0 0 9px ${accent}; flex:0 0 auto; }
    .event-pill[title] { cursor:help; }
    .brand .event-mark { animation:eventGlow 4s ease-in-out infinite; }
    .brand img.logo { transition:filter .35s ease, transform .35s cubic-bezier(.34,1.56,.64,1); }
    .brand:hover img.logo { transform:rotate(-5deg) scale(1.06); filter:drop-shadow(0 0 8px ${accent}99); }
    .event-theme-line { margin:0 auto 14px; width:max-content; max-width:92%; padding:6px 12px; border-radius:999px; color:${pale}; border:1px solid ${accent}44; background:${deep}77; font-size:11px; letter-spacing:.045em; text-align:center; }
    @keyframes eventAppear { from { opacity:0; transform:translateY(-5px) scale(.97) } to { opacity:1; transform:translateY(0) scale(1) } }
    @keyframes eventGlow { 0%,100% { box-shadow:inset 0 1px 0 #ffffff55,0 3px 12px ${deep}66 } 50% { box-shadow:inset 0 1px 0 #ffffff77,0 0 16px ${accent}55 } }
    @media(max-width:720px) { .event-pill { font-size:10px; padding:6px 8px; max-width:145px; } .event-mark { width:26px;height:26px;font-size:15px;margin-left:5px; } }
    @media(prefers-reduced-motion:reduce) { .event-pill,.event-mark { animation:none !important; } }
  `;
  document.head.appendChild(style);
  document.body.classList.add("event-skinned");
  document.documentElement.style.setProperty("color-scheme", "dark");
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute("content", deep);

  document.querySelectorAll(".brand").forEach(brand => {
    if (brand.querySelector(".event-mark")) return;
    const mark = document.createElement("span");
    mark.className = "event-mark";
    mark.setAttribute("aria-label", theme.name);
    mark.title = theme.name;
    mark.textContent = theme.mark;
    brand.appendChild(mark);
  });

  const nav = document.querySelector(".nav");
  const header = nav || document.querySelector("body > main.wrap > header") || document.querySelector("body > header");
  if (header && !header.querySelector(".event-pill")) {
    const pill = document.createElement("span");
    pill.className = "event-pill";
    pill.title = theme.line;
    pill.innerHTML = '<span class="event-dot" aria-hidden="true"></span><span></span>';
    pill.lastElementChild.textContent = theme.name;
    if (nav) {
      const menu = nav.querySelector(".menu-toggle");
      const search = nav.querySelector(".search");
      if (menu) nav.insertBefore(pill, menu);
      else if (search) search.insertAdjacentElement("afterend", pill);
      else nav.appendChild(pill);
    } else {
      header.appendChild(pill);
    }
  }

  document.documentElement.dataset.dossierEvent = key;
  document.documentElement.dataset.dossierEventName = theme.name;
})();