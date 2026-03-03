# 6. Use NGINX as production server for Astro

## Status

- 2026-02-16: Accepted

## Context

We need a solution to serve the Astro application within a Kubernetes cluster. The application is currently configured for Static Site Generation (SSG). The Astro documentation mentions NGINX and Apache (httpd) as possible options for Docker deployments, there are also other options like node.js. We are looking for a solution that We need a solution that minimizes footprint in the K8s cluster and handles static routing (clean URLs) efficiently.

## Decision

We will use NGINX as production server for the Astro application due to its efficiency and maturity.

## Consequences

- We will spend some effort to configure NGINX and the Docker image to serve the Astro application in a production ready way (headers, caching, etc.).
- Should we need to add dynamic features in the future, we need to switch to a different server.
