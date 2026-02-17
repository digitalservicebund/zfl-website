# 6. Use NGINX as production server for Astro

## Status

- 2026-02-17: Accepted

## Context

Our application benefits from product analytics to understand user behavior, which drives product decisions. However, we want to minimize the amount of Personally Identifiable Information (PII) shared with third-party sub-processors. Specifically, we aim to prevent the transmission of client IP addresses to PostHog's infrastructure.

We have already decided not to use cookies for tracking to simplify our compliance posture and respect user privacy at the browser level.

## Decision

We will implement a Reverse Proxy for all PostHog traffic. Instead of the client browser communicating directly with *.posthog.com, all analytics events will be sent to a sub-path on our own domain (`/ph-relay`), which will then forward the data to PostHog.

We will implement the Reverse Proxy based on the Nginx snippet provided in the PostHog documentation.

### Implementation details

- IP Masking: The proxy will be configured to drop unnecessary headers, including `X-Forwarded-For`, before passing the request to PostHog. An allowlist of headers is used in the configutaion. This ensures PostHog only sees the IP address of our proxy server, not the end user.

- Cookie-less Configuration: The PostHog JavaScript SDK will be initialized with `persistence: "memory",
cookieless_mode: "always"` to ensure no cookies are used by Posthog.


## Consequences

- We will configure and maintain NGINX reverse proxy functionality to forward analytics traffic, thereby preventing the disclosure of client IP addresses to Posthog.
