---
name: Gemini model availability
description: Provider model names and quotas can change independently of application code.
---

Use server-side retries and a narrowly scoped fallback model for transient Gemini availability errors, while keeping the API key out of browser code and responses.

**Why:** A previously valid model name was retired, and a newer model intermittently returned high-demand or quota responses during live verification.

**How to apply:** Keep model selection in the API server, treat 429/5xx responses as transient when appropriate, and validate the final structured response before returning it to the client.