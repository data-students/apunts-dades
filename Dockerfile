FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_POCKETBASE_ENDPOINT=${VITE_POCKETBASE_ENDPOINT}

RUN npm run build

FROM node:alpine

COPY --from=build /app/build ./

ENV NODE_ENV=production PORT=3000

EXPOSE 3000

CMD ["node", "index.js"]