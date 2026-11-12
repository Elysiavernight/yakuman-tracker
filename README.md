# Yakuman Soul Frontend

a frontend website created to track the yakumans me and my friend gathered across the years of playing Riichi mahjong

featuring :
1. Personal Accounts
2. Profile Customization
3. Posting Yakumans including game link, image and winning hand

Build with React + vite and tailwind css

# Contributing
1. Clone this repository
```git clone https://github.com/Elysiavernight/yakuman-tracker.com```
2. Do ```bun install```
3. Run ```bun run dev```
4. Observe localhost:5173


Also you will need a backend server : (link to be updated)

## Production on Vercel

The frontend stays at `https://yakuman-tracker.vercel.app` and calls `https://yakuman.elysiavernight.com/api` directly from the browser. There is no Vercel API rewrite.

The public `VITE_API_URL` is defined in `.env.production` and embedded by Vite at build time. If a Vercel environment variable with the same name exists, set it to `https://yakuman.elysiavernight.com/api`, then redeploy. Use the Vite preset, `bun run build`, and output directory `dist`.

Requests include credentials. The backend must allow `https://yakuman-tracker.vercel.app` through credentialed CORS and use `SameSite=None; Secure` session cookies. Browsers that block third-party cookies may still prevent login sessions from persisting across these two sites.

Local development still uses `/api` through Vite's proxy to port 11000. `API_URL` controls that development proxy; `VITE_API_URL` controls the browser-facing API URL.
