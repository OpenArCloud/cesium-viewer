# Use official Node image
FROM node:latest

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Vite reads env vars at request time in dev mode, so it can be a runtime env var
ARG VITE_CESIUM_TOKEN
ENV VITE_CESIUM_TOKEN=$VITE_CESIUM_TOKEN

# Port the dev server listens on, overridable via the PORT env var
ENV PORT=8044

# Expose the dev server port
EXPOSE $PORT

# Serve via the Vite dev server
CMD ["sh", "-c", "npm run dev -- --host --port ${PORT}"]