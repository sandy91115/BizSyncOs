# BizSyncOS Marketing Frontend

Standalone React/Vite marketing site for BizSyncOS. It is intentionally independent of the Laravel application so the public website can deploy separately from the product backend.

## Local development

```powershell
npm install
npm run dev
```

Build the static deployment bundle with:

```powershell
npm run build
```

For local development, run `npm.cmd run dev` inside this directory and open the Vite URL shown in the terminal. Vite and Laravel run separately.

## Public URL configuration

Copy `.env.example` to `.env` and configure only public URLs:

```text
VITE_BACKEND_URL=http://127.0.0.1:9000
VITE_CONTACT_EMAIL=hello@bizsyncos.com
```

The public website keeps visitors in the local `/demo` flow first. Login and Start Free Trial hand off to the local Laravel backend through `VITE_BACKEND_URL`. Authentication remains server-side.

## OAuth security

Do **not** add Google OAuth client secrets to this app or any `VITE_*` variable; Vite embeds those variables into the browser bundle. Google OAuth belongs in the backend/CRM service and must use an authorization-code flow with server-side token exchange. Any secret previously pasted into chat should be rotated in Google Cloud Console before use.
