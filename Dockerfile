# --- Stage 1: Build Angular ---
FROM node:20 AS build-stage
WORKDIR /app/frontend

# Go into the subfolder where your package.json actually is
COPY frontend/mean-frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY frontend/mean-frontend/ .
ENV NG_BUILD_INLINE_OPTIMIZE=false
RUN npx ng build --configuration production  --external-dependencies bootstrap-icons

# --- Stage 2: Setup Node Server ---
FROM node:20
WORKDIR /app

# Setup Backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# THE "DIST" STEP:
# This copies the finished Angular website into a 'public' folder in your backend
# The '*' handles the project name automatically
COPY --from=build-stage /app/frontend/dist/mean-frontend/browser ./public
EXPOSE 3000
CMD ["node", "index.js"]
