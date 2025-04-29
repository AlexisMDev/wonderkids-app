# Étape 1 : Image de base
FROM node:22-slim

# Étape 2 : Dossier de travail
WORKDIR /app

# Étape 3 : Fix OpenSSL
RUN apt-get update && apt-get install -y openssl

# Étape 4 : Copier uniquement les fichiers nécessaires d'abord
COPY package*.json ./
COPY .env .env

# Étape 5 : Copier le dossier Prisma AVANT l'installation
COPY prisma ./prisma

# Étape 6 : Installer les dépendances
RUN npm install

# Étape 7 : Copier tout le reste (y compris le dossier prisma/)
COPY . .

# Étape 8 : Générer le client Prisma
RUN npx prisma generate

# Étape 9 : Exposer le port
EXPOSE 3001

# Étape 10 : Lancer l'app
CMD ["npm", "run", "dev"]
