#!/bin/sh
set -e

# Wait for Postgres
until pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER; do
  echo "Waiting for Postgres..."
  sleep 2
done

# Run migrations
npm run migration:prod:run

# Start the app
npm start
