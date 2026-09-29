# Use official Node image
FROM node:latest

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Vite bakes env vars into the production bundle at build time, so it must be
# supplied as a build arg rather than a runtime environment variable
ARG VITE_CESIUM_TOKEN
ENV VITE_CESIUM_TOKEN=$VITE_CESIUM_TOKEN
RUN npm run build

# Port the production server listens on, overridable via the PORT env var
ENV PORT=8044

# Expose the production server port
EXPOSE $PORT

# Serve the production build
CMD ["sh", "-c", "npm run preview -- --host --port ${PORT}"]