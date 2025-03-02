FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG PUBLIC_POCKETBASE_ENDPOINT=${PUBLIC_POCKETBASE_ENDPOINT}
ARG PUBLIC_POSTHOG_KEY=${PUBLIC_POSTHOG_KEY}
ARG PUBLIC_POSTHOG_HOST=${PUBLIC_POSTHOG_HOST}

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]