import https from 'https';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    https.get(url, (response) => {
      const redirectedURL = response.headers.location || url;

      // চেক করো id= আছে কিনা
      const match = redirectedURL.match(/id=(\d{6,})/);
      if (match && match[1]) {
        res.json({ uid: match[1] });
      } else {
        res.status(404).json({ error: "UID not found in redirect." });
      }
    }).on("error", (err) => {
      res.status(500).json({ error: "Request failed", details: err.message });
    });
  } catch (err) {
    res.status(500).json({ error: "Unexpected error", details: err.message });
  }
}
