FROM node:18-alpine

# Install Vercel CLI globally
RUN npm install -g vercel

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Keep container running for interactive deployment
CMD ["/bin/sh"]