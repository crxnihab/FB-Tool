export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0" // emulate browser
      }
    });

    const html = await response.text();
    const match = html.match(/entity_id":"(\d{6,})"/);

    if (match && match[1]) {
      return res.json({ uid: match[1] });
    } else {
      return res.status(404).json({ error: "UID not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Fetch failed", details: err.message });
  }
}
