# ---- base ----
FROM node:20-bullseye AS base
WORKDIR /app
COPY package*.json ./

# ---- deps ----
FROM base AS deps
RUN npm install


# ---- dev ----
FROM deps AS dev
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--proxy-config", "proxy.conf.json"]

# ---- build ----
FROM deps AS build
COPY . .
RUN npm run build -- --configuration production

# ---- prod ----
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
