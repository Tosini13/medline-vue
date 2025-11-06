# Production Dockerfile - Multi-stage build

# Stage 1: Build the application
FROM node:22-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Production image with nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional - uses default nginx config)
# If you need SPA routing support, uncomment and configure nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

