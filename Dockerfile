# Stage 1: Building the app
FROM node:21-alpine3.18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the app's source code
COPY . .

# Set the environment variable for production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Build the React application using Vite
RUN yarn build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/dist .

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Command to run the app
CMD ["nginx", "-g", "daemon off;"]
