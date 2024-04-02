# Use an official Node.js runtime as the base image
FROM node:1u-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json tsconfig.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port (if your application listens on a specific port)
EXPOSE 4200

# Define the command to run your application
CMD [ "ng", "serve" ]