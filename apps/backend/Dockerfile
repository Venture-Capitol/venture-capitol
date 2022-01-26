FROM node:16-alpine as builder
WORKDIR /app
ENV NODE_ENV=production

# Install shared dependencies
COPY tsconfig.json tsconfig.build.json package.json package-lock.json lerna.json ./
RUN npm set-script prepare ""
RUN npm ci

# Install project dependencies
COPY apps/backend/package.json apps/backend/package-lock.json apps/backend/prisma ./apps/backend/
COPY packages/api packages/api
RUN npx lerna bootstrap

# Copy source files
COPY apps/backend/src ./apps/backend/src/
RUN npx lerna run build --scope @vc/backend

# Copy OpenAPI definition
RUN cp packages/api/openapi.yaml ./apps/backend/dist

# Install Prisma
RUN (cd apps/backend && npx prisma generate)
RUN cp apps/backend/node_modules/.prisma/client/libquery_engine-linux-musl.so.node /app/apps/backend/dist
RUN cp apps/backend/node_modules/.prisma/client/schema.prisma /app/apps/backend/dist



# Create a step for preparing just prisma migrate to keep final image size small
FROM node:16-alpine as prisma
WORKDIR /app
ENV NODE_ENV=production
RUN npm i prisma --no-save

# Remove prisma files not neccessary for migrations
RUN rm node_modules/@prisma/engines/introspection-engine-linux-musl
RUN rm node_modules/@prisma/engines/libquery_engine-linux-musl.so.node
RUN rm node_modules/@prisma/engines/prisma-fmt-linux-musl
RUN rm -rf node_modules/prisma/build/public



# Run the app
FROM node:16-alpine as runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV API_DEFINITION_FILE="./openapi.yaml"

WORKDIR /app
COPY --from=builder /app/apps/backend/dist ./
COPY --from=prisma /app/node_modules/ ./node_modules/
COPY apps/backend/prisma/migrations ./migrations

CMD npx prisma migrate deploy && node index.js
