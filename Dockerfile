FROM node:21-alpine3.18

WORKDIR /app

# Copy package.json and yarn lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the your app's source code
COPY . .

# Ensure the production environment variable is set
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Copy your .env.production file to .env
COPY .env.production ./.env

# Build your React application using Vite
RUN yarn build

# Install serve to server your app
RUN yarn global add serve

# Command to run the app 
CMD ["serve", "-s", "dist", "-l", "8000"]

EXPOSE 8000
