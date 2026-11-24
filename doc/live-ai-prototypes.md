# Live-AI prototypes

Some KI-Prototypen (`visualisieren`, `potenziale`) can call a backend to work on texts users enter themselves. Without a backend they only show the preset examples.

Live AI is controlled by the `liveAi` feature flag (`src/config/features.ts`) and the build-time env var `PUBLIC_TOOL_API` (read in `src/pages/werkzeuge/ki-prototypen/_shared/apiBase.ts`):

| Stage                      | Live AI                                                    |
| -------------------------- | ---------------------------------------------------------- |
| `development` (`pnpm dev`) | always on; backend `PUBLIC_TOOL_API` or `localhost:8000`   |
| `preview`                  | only if the build got `PUBLIC_TOOL_API`, i.e. a manual run |
| `staging`, `production`    | always off                                                 |

The backend URL is fixed at build time.

## Local development

```sh
pnpm dev                                      # uses http://localhost:8000
PUBLIC_TOOL_API=https://example.org pnpm dev  # uses another backend
```

## Preview with live AI (e.g. for user tests)

1. Start the backend and expose it over HTTPS, e.g. with a tunnel.
2. On GitHub, open **Actions → Preview → Run workflow**, pick the branch under "Use workflow from", paste the tunnel URL into the `tool_api` field and run it.
3. The preview is deployed to `https://digitalservicebund.github.io/zfl-website/previews/<branch>` (the URL is also printed in the job log).

Things to keep in mind:

- **Pushes reset it.** Any later push to the branch's PR rebuilds the preview without `PUBLIC_TOOL_API`, which turns live AI off again. Re-run the workflow manually afterwards.
- **Tunnel URLs change.** A quick tunnel gets a new URL every time it restarts. Re-run the workflow with the new URL.
- **Previews are public.** Anyone with the preview link can use the backend through it. Only keep the tunnel up while it's needed.
- **Backend requirements.** The backend must be reachable over HTTPS and allow the `https://digitalservicebund.github.io` origin (CORS).
