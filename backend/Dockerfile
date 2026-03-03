# ---- base ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- deps ----
FROM base AS deps
RUN npm install
RUN npm install -g nodemon

# ---- dev ----
FROM deps AS dev
COPY . .
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# ---- build ----
FROM deps AS build
COPY . .
RUN npm run build

# ---- prod ----
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
