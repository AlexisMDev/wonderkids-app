# Étape de build
FROM node:22-slim AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Étape pour servir l'app
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# On écrase la config par défaut de nginx si besoin
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
