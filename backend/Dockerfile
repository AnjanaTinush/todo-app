# Use Node 20 (matches your local version)
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start backend with nodemon in dev mode
CMD ["npm", "run", "dev"]
