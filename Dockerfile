FROM node:20-alpine

WORKDIR /app

# Install deps (cached)
COPY package*.json ./
RUN npm install

# Copy code (in dev we’ll override with a volume too)
COPY . .

EXPOSE 6969

CMD ["npm", "run", "dev"]
