# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app's code
COPY . ./

# Expose the port the application runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
