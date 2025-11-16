import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    return res.status(200).end();
  }
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const folder = req.query.folder || "JewelsAi";
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) return res.status(500).json({ error: "Cloudinary credentials not configured" });

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;
    const body = { expression: `folder:${folder}`, max_results: 200 };
    const basicAuth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const r = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const j = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.json(j);
  } catch (err) {
    console.error("list error", err);
    res.status(500).json({ error: "Failed to fetch assets" });
  }
}
