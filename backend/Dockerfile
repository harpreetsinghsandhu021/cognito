FROM node:18-alpine
WORKDIR /workspace


ENV DATABASE_URL=""
ENV GOOGLE_CLOUD_PROJECT=""
ENV GOOGLE_CLOUD_LOCATION=""
ENV GOOGLE_GENAI_USE_VERTEXAI=True

# Copy package files
COPY package*.json ./
COPY prisma/ ./prisma/

# Install ALL dependencies (including devDependencies for Prisma)
RUN npm ci

RUN npm install --save-dev typescript

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build your application (if using TypeScript)
RUN npm run build

# Remove devDependencies to reduce image size (optional)
RUN npm ci --only=production && npm cache clean --force

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "dist/server.js"]