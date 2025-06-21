FROM node:18

# Set working directory
WORKDIR /app

# Copy only the fetcher
COPY news-fetcher ./news-fetcher

# Move into fetcher folder
WORKDIR /app/news-fetcher

# Install axios (no need for full npm project)
RUN npm install axios

# Command to run when container starts
CMD ["node", "fetchNews.js"]
