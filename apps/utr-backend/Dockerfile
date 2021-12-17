FROM node:16-alpine as builder
WORKDIR /app
ENV NODE_ENV=production

# Install shared dependencies
COPY tsconfig.json tsconfig.build.json package.json package-lock.json lerna.json ./
RUN npm set-script prepare ""
RUN npm ci

# Install project dependencies
COPY apps/utr-backend/package.json apps/utr-backend/package-lock.json apps/utr-backend/prisma ./apps/utr-backend/
COPY packages ./packages 
RUN npx lerna bootstrap

# Copy source files
COPY apps/utr-backend/src ./apps/utr-backend/src
RUN npx lerna run build --scope @vc/utr-backend
RUN (cd apps/utr-backend && npx prisma generate)
RUN cp apps/utr-backend/node_modules/.prisma/client/libquery_engine-linux-musl.so.node /app/apps/utr-backend/dist
RUN cp apps/utr-backend/node_modules/.prisma/client/schema.prisma /app/apps/utr-backend/dist

# Run the app
FROM node:16-alpine as runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0

WORKDIR /app
COPY --from=builder /app/apps/utr-backend/dist ./

CMD node index.js