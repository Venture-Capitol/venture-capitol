FROM node:16-alpine as builder
WORKDIR /app
ENV NODE_ENV=production

# Install shared dependencies
COPY tsconfig.json tsconfig.build.json package.json package-lock.json lerna.json ./
RUN npm ci

# Install project dependencies
COPY apps/backend/package.json apps/backend/package-lock.json apps/backend/prisma ./apps/backend/
COPY packages ./packages
RUN npx lerna bootstrap

FROM node:16-alpine as runner
WORKDIR /app
COPY --from=builder /app/apps/backend ./
WORKDIR /app/backend

CMD npm run serve