# Use official Node image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Expose the Vite dev server port
EXPOSE 8044

# Start Vite dev server with host and port
CMD ["sh", "-c", "npm run dev -- --host --port 8044"]