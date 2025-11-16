# TryMyGold - Cloudinary Signed Upload Demo (Ready-to-Deploy)

This package contains a single-file front-end (`index.html`) with Cloudinary signed-upload client code and two Vercel serverless endpoints (`api/sign.js`, `api/list.js`).

> IMPORTANT: **Do NOT put your Cloudinary API SECRET in client-side code or in this repo.**
> Put it only in your serverless environment variables as described below.

## What's included
- `index.html` - your merged try-on app (video + overlay + screenshot modal) with integrated Cloudinary client upload code. Update `SIGN_ENDPOINT` and `LIST_ENDPOINT` if your serverless base path differs.
- `api/sign.js` - Vercel serverless function that generates signed params for Cloudinary uploads.
- `api/list.js` - Vercel serverless function that lists assets from Cloudinary (for gallery population).
- `README.md` - this file.

## How to deploy (Vercel) - quick steps
1. Create a GitHub repo and push these files (root of repo: `index.html`, `api/` folder).
2. Create a Vercel account and import the repo (use Vercel's GitHub integration).
3. In Vercel project settings → Environment Variables, add:
   - `CLOUDINARY_CLOUD_NAME` = your Cloudinary cloud name (e.g. dsqgfywvs)
   - `CLOUDINARY_API_KEY` = your Cloudinary API Key (visible in Cloudinary settings)
   - `CLOUDINARY_API_SECRET` = your Cloudinary API Secret (GENERATE/REGENERATE in Cloudinary if you exposed it earlier)

   > **Do NOT** paste the secret anywhere public. Add it only to Vercel env vars.
4. Deploy the project on Vercel. Vercel will expose the serverless endpoints:
   - `https://<your-vercel-domain>/api/sign`
   - `https://<your-vercel-domain>/api/list`

5. Update `index.html` if you host it elsewhere — set `SIGN_ENDPOINT` and `LIST_ENDPOINT` to point to your Vercel domain paths.
6. Test: open your try-on page and use the Upload/Screenshot flow. New uploads will appear in the gallery (fetched from Cloudinary via `/api/list`).

## Local testing (optional)
You can test `api/sign.js` locally with Vercel CLI or Node, but be sure to set environment variables locally when testing.

## Notes
- The package uses signed uploads to keep your Cloudinary secret safe on the server.
- The client code sets `img.crossOrigin = 'anonymous'` when loading Cloudinary-hosted images via the `loadImage` helper (already in your app) — this keeps the canvas exportable for screenshots.
- If you want me to add authentication to the `/api/sign` endpoint (so only your admin panel can request signatures), I can add a simple token check.

If you want, I can also generate a ZIP of this project for you to download now.
