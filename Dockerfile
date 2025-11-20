FROM node:18

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

# For development (comment for production)
# CMD ["npm", "run", "dev"]

# For production (build and start)
RUN npm run build
CMD ["npm", "start"]
