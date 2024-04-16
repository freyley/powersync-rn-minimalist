This is a (currently non-working) minimalist PowerSync React Native todo app _without_ Supabase. The goal is
to understand and demonstrate the pieces of PowerSync absolutely necessary to get the app functional.

This app assumes:
1. You have a Postgres database somewhere on the internet that can be hooked up to PowerSync
2. You have a PowerSync account at JourneyApps, and have set up an instance there, connected to your Postgres database.
3. You have a publicly accessible (ngrok or otherwise) API url which can serve the `/api/get_token/` endpoint to deliver a PowerSync JWT token
    - For example, https://github.com/powersync-ja/powersync-django-backend-todolist-demo has an `/api/get_token` endpoint
    - You set that API in your .env file as API_BASE_URL

Additional notes:
- You may need to change the table names in AppSchema.ts
- This app currently does not write data back to the API, it is a read-only app so far.
