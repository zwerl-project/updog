# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install PNPM package manager
RUN npm install -g pnpm

# Install the dependencies
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Start the application
CMD ["npm", "start"]
