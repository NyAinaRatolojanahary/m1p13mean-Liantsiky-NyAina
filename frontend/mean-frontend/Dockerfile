# ---- base ----
FROM node:18-bullseye AS base
WORKDIR /app
COPY package*.json ./

# ---- deps ----
FROM base AS deps
RUN npm install


# ---- dev ----
FROM deps AS dev
COPY . .
EXPOSE 4200
CMD ["npm", "start"]

# ---- build ----
FROM deps AS build
COPY . .
RUN npm run build -- --configuration production

# ---- prod ----
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
