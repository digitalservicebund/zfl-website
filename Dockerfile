FROM node:26.8.1-alpine3.23 AS base

ENV PNPM_HOME="/pnpm"
ENV MISE_DATA_DIR="/mise"
ENV PATH="$PNPM_HOME:/mise/shims:$PATH"
# Alpine v3.23's own community repo ships mise 2025.8.20, which predates aqua
# libc-variant support (https://github.com/jdx/mise/pull/9652) and fails to
# install musl-aware tools like pnpm. Pull mise from edge instead, keeping the
# rest of the base image on v3.23.
RUN apk add --no-cache --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community mise

FROM base AS build
WORKDIR /app
COPY mise.toml ./
# Installs the exact pnpm version pinned in mise.toml
RUN mise trust && mise install pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /app/
RUN pnpm install --prod --ignore-scripts --frozen-lockfile

COPY tsconfig.json tsconfig.base.json astro.config.mjs /app/
COPY src/ /app/src/
COPY public/ /app/public/

RUN PUBLIC_STAGE=production pnpm run build --outDir dist_production
RUN PUBLIC_STAGE=staging    pnpm run build --outDir dist_staging

FROM nginx:1.31.4-alpine AS runtime
COPY ./nginx/nginx.template.conf /etc/nginx/nginx.template.conf
COPY --from=build /app/dist_production /usr/share/nginx/production
COPY --from=build /app/dist_staging /usr/share/nginx/staging

# assign privileges and switch to non-root user
RUN mkdir /etc/nginx/sites-enabled && \
		touch /run/nginx.pid && \
    chown -R nginx /etc/nginx/sites-enabled /var/cache/nginx /run/nginx.pid && \
 		echo 'include /etc/nginx/sites-enabled/*;' > /etc/nginx/nginx.conf

# replace variables in the NGINX configuration
ENV NGINX_DIR=production
ENV RESOLVER=1.1.1.1
USER nginx
CMD ["sh", "-c", "envsubst '$NGINX_DIR,$RESOLVER' < /etc/nginx/nginx.template.conf > /etc/nginx/sites-enabled/nginx.conf && nginx -g 'daemon off;'"]
EXPOSE 8080
