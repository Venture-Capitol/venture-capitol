# Create a step for preparing just prisma migrate to keep final image size small
FROM node:16-alpine as prisma
WORKDIR /app
ENV NODE_ENV=production
RUN npm i prisma --no-save

# Remove unused prisma files
RUN rm node_modules/@prisma/engines/introspection-engine-linux-musl
RUN rm node_modules/@prisma/engines/prisma-fmt-linux-musl
RUN rm -rf node_modules/prisma/build/public


# Run the app
FROM node:16-alpine as runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV API_DEFINITION_FILE="./openapi.yaml"

WORKDIR /app
COPY apps/utr-backend/dist ./
COPY --from=prisma /app/node_modules/ ./node_modules/
COPY apps/utr-backend/prisma/migrations ./migrations

RUN ln -s node_modules/@prisma/engines/libquery_engine-linux-musl.so.node libquery_engine-linux-musl.so.node
CMD npx prisma migrate deploy && node index.js