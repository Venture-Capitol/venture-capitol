FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json lerna.json ./
RUN npm ci

COPY packages ./

COPY apps/frontend apps/frontend

RUN npx lerna bootstrap --no-hoist

CMD (npm run start:fe)



# COPY apps/frontend/package.json apps/frontend 
# COPY apps/frontend/package-lock.json apps/frontend 

# COPY packages/common/package.json packages/common 
# COPY packages/common/package-lock.json packages/common 

# RUN npm ci


# COPY apps/frontend apps/frontend
# COPY apps/frontend apps/frontend



# CMD (npm run start:fe)