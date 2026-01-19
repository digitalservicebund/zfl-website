FROM node:lts AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --prod --ignore-scripts

COPY . /app
RUN pnpm run build

RUN PUBLIC_STAGE=staging pnpm run build --outDir dist_staging

FROM nginx:alpine AS runtime
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/nginx.template.conf /etc/nginx/nginx.template.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/dist_staging /usr/share/nginx/html_staging

ENV NGINX_DIR=html
ENV RESOLVER=1.1.1.1
RUN mkdir /etc/nginx/sites-enabled
CMD ["sh", "-c", "envsubst '$NGINX_DIR,$RESOLVER' < /etc/nginx/nginx.template.conf > /etc/nginx/sites-enabled/nginx.conf && nginx -g 'daemon off;'"]
EXPOSE 8080
