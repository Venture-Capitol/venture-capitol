FROM node:16-alpine as builder
WORKDIR /app
ENV NODE_ENV=production

# Install shared dependencies
COPY tsconfig.json tsconfig.build.json package.json package-lock.json lerna.json ./
RUN npm set-script prepare ""
RUN npm ci

# Install project dependencies
COPY apps/backend/package.json apps/backend/package-lock.json apps/backend/prisma ./apps/backend/
COPY packages ./packages
RUN npx lerna bootstrap

# Copy source files
COPY apps/backend/src ./apps/backend/src/

RUN npx lerna run build --scope @vc/backend

# Run the app
FROM node:16-alpine as runner
ENV NODE_ENV=production
ENV GQL_SCHEMA_DIR=./schema/**/*.gql
ENV HOST=0.0.0.0

WORKDIR /app
COPY --from=builder /app/apps/backend/dist ./

CMD node index.js