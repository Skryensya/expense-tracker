# Dockerfile

# Step 1: Use Node.js image as the base
FROM node:16-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the NestJS application
RUN npm run build

# Step 7: Expose port (same as NestJS default port)
EXPOSE 3000

# Step 8: Start the NestJS application
CMD ["npm", "run", "start:prod"]
