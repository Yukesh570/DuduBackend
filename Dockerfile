FROM node:18

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

# For development (comment for production)
# CMD ["npm", "run", "dev"]

# For production (build and start)
RUN npm run build
EXPOSE 3000
RUN apt-get update && apt-get install -y postgresql-client

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]
