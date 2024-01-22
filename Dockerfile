FROM node:16-alpine AS node-base
WORKDIR /app
ARG VUE_ENV
COPY package*.json ./
RUN npm install --force
COPY . .

FROM node-base AS build
WORKDIR /app
ARG VUE_ENV
RUN cp .env.production .env && npm run build --force
ENTRYPOINT ["npm", "run", "dev"]
