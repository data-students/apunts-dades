FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM alpine:latest

WORKDIR /app

COPY --from=build /app/build ./