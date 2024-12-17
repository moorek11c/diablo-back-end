# Use a lightweight Node image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port your backend listens on
EXPOSE 5000

# Command to start your backend server
CMD ["node", "server.js"]