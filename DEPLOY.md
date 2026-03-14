# Deploying to Vercel

## Required environment variables

In your Vercel project: **Settings → Environment Variables**, set:

| Variable    | Description |
|------------|-------------|
| `APP_KEY`  | **Required.** Run `php artisan key:generate --show` locally and paste the value (e.g. `base64:...`). |
| `APP_URL`  | Your Vercel URL, e.g. `https://janice-dev.vercel.app` |
| `APP_ENV`  | `production` |
| `APP_DEBUG` | `false` |

Without `APP_KEY`, the site will return **HTTP 500**.

Optional (already defaulted for Vercel in code):

- `VIEW_COMPILED_PATH` = `/tmp` (default when `VERCEL` is set)
- `SESSION_DRIVER` = `cookie` (default when `VERCEL` is set)
