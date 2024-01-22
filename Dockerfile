# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=16.14.2
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Vite"

# Vite app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Copy the application files into the working directory
COPY . /app

# Define the entry point for the container
CMD ["npm", "start"]

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm install --include=dev

# Build application
RUN npm run build
