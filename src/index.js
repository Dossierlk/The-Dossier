const FEEDS = [
  ["BBC", "https://feeds.bbci.co.uk/news/world/rss.xml"],
  ["The Guardian", "https://www.theguardian.com/world/rss"],
  ["Al Jazeera", "https://www.aljazeera.com/xml/rss/all.xml"],
  ["Sky News", "https://feeds.skynews.com/feeds/rss/world.xml"],
  ["DW", "https://rss.dw.com/rdf/rss-en-top"],
  ["NPR", "https://feeds.npr.org/1001/rss.xml"],
  ["Bloomberg", "https://news.google.com/rss/search?q=site%3Abloomberg.com+when%3A2d&hl=en-US&gl=US&ceid=US%3Aen"],
  ["CNN", "https://news.google.com/rss/search?q=site%3Acnn.com+when%3A2d&hl=en-US&gl=US&ceid=US%3Aen"],
  ["Reuters", "https://news.google.com/rss/search?q=site%3Areuters.com+when%3A2d&hl=en-US&gl=US&ceid=US%3Aen"]
];
const HEADERS = { "User-Agent": "TheDossierNews/1.0 (+https://github.com/Dossierlk/The-Dossier)", "Accept": "application/rss+xml, application/xml, text/xml, */*" };
const decode = (s) => (s || "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n,16))).replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();
function tag(block, name) {
  const re = new RegExp("<(?:[\\w.-]+:)?"+name+"(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:[\\w.-]+:)?"+name+"\\s*>", "i");
  const m = block.match(re);
  return m ? decode(m[1]) : "";
}
function parseFeed(xml, source) {
  const blocks = xml.match(/<(?:item|entry)(?:\s[^>]*)?>[\s\S]*?<\/(?:item|entry)\s*>/gi) || [];
  return blocks.map(b => {
    const title = tag(b, "title");
    let link = "";
    const linkTag = b.match(/<(?:[\w.-]+:)?link\b([^>]*)\/?\s*>/i);
    if (linkTag) {
      const href = linkTag[1].match(/\bhref=["']([^"']+)["']/i);
      link = href ? href[1] : "";
    }
    if (!link) link = tag(b, "link");
    if (!/^https?:\/\//i.test(link)) return null;
    const dateText = tag(b, "pubDate") || tag(b, "published") || tag(b, "updated") || tag(b, "date");
    const published = dateText ? Date.parse(dateText) : 0;
    if (!title || !published || !Number.isFinite(published)) return null;
    return { title, url: link, source, published: new Date(published).toISOString() };
  }).filter(Boolean);
}
function normalize(title) {
  return title.toLowerCase().replace(/\b(video|live|watch|update|breaking|analysis|opinion)\b/g," ").replace(/[^a-z0-9]+/g," ").trim().split(/\s+/).filter(w => w.length > 2).join(" ");
}
function overlap(a,b) {
  const aa = new Set(normalize(a).split(" "));
  const bb = new Set(normalize(b).split(" "));
  if (!aa.size || !bb.size) return false;
  let common = 0;
  for (const word of aa) if (bb.has(word)) common++;
  return common / Math.min(aa.size,bb.size) >= 0.82;
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/news") {
      if (request.method !== "GET") return new Response("Method not allowed", { status: 405 });
      const results = await Promise.allSettled(FEEDS.map(async ([source, feedUrl]) => {
        const response = await fetch(feedUrl, { headers: HEADERS, signal: AbortSignal.timeout(7000) });
        if (!response.ok) throw new Error("Feed unavailable");
        return parseFeed(await response.text(), source);
      }));
      const cutoff = Date.now() - 36 * 60 * 60 * 1000;
      const all = results.flatMap(r => r.status === "fulfilled" ? r.value : [])
        .filter(item => Date.parse(item.published) >= cutoff && Date.parse(item.published) <= Date.now() + 5 * 60 * 1000)
        .sort((a,b) => Date.parse(b.published) - Date.parse(a.published));
      const unique = [];
      for (const item of all) {
        if (unique.some(existing => normalize(existing.title) === normalize(item.title) || overlap(existing.title, item.title))) continue;
        unique.push(item);
        if (unique.length >= 30) break;
      }
      return Response.json({ articles: unique, updatedAt: new Date().toISOString(), sources: [...new Set(unique.map(x=>x.source))] }, {
        headers: { "Cache-Control": "public, max-age=180", "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" }
      });
    }
    return env.ASSETS.fetch(request);
  }
};
