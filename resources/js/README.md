# Frontend (React + Vite)

## File structure

- **entry.jsx** — Vite entry point. Mounts React into `#root`. Do not rename.
- **Welcome.jsx** — Welcome page component.
- **bootstrap.js** — Axios and other global setup.

On Windows, `app.jsx` and `App.jsx` are the same file (case-insensitive), so we use `entry.jsx` and `Welcome.jsx` to avoid overwrites.

## Run the app

1. **Development:** In one terminal run `npm run dev` (Vite). Visit your Laravel URL (e.g. http://janice.dev.local).
2. **Production:** Run `npm run build`, then serve the Laravel app as usual. Assets are in `public/build/`.
