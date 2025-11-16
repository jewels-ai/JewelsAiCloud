import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { folder = "JewelsAi", public_id } = req.body || {};
    const timestamp = Math.floor(Date.now() / 1000);

    const parts = [];
    if (folder) parts.push(`folder=${folder}`);
    if (public_id) parts.push(`public_id=${public_id}`);
    parts.push(`timestamp=${timestamp}`);
    const paramsToSign = parts.join("&");

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!apiSecret) return res.status(500).json({ error: "CLOUDINARY_API_SECRET not configured" });

    const signature = crypto.createHash("sha1").update(paramsToSign + apiSecret).digest("hex");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({
      signature,
      timestamp,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      folder
    });
  } catch (err) {
    console.error("sign error", err);
    res.status(500).json({ error: "Signing failed" });
  }
}
