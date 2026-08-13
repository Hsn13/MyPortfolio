# Interactions API setup

This project supports sending chat requests to a Generative Interactions-style endpoint via the `INTERACTIONS_ENDPOINT` environment variable.

Recommended quick setup (local):

1. Create `.env.local` at the project root if it doesn't exist.
2. Add your API key and an interactions endpoint. Example values below — replace placeholders:

```
# .env.local
GEMINI_API_KEY=YOUR_API_KEY_HERE
# Example endpoint (replace MODEL with a supported model name):
INTERACTIONS_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/MODEL:predict
```

Notes:
- `INTERACTIONS_ENDPOINT` should be the full URL to your provider's interactions/predict endpoint (no `?key=`).
- The route at `app/api/chat/route.ts` will append `?key=${GEMINI_API_KEY}` automatically.
- If you don't provide `INTERACTIONS_ENDPOINT`, the code falls back to the legacy `generateContent` call using `GEMINI_MODEL`.

If you want, I can set a concrete example for Google Cloud when you provide the exact model name you plan to use (for example `text-bison-001` or a Gemini model name).