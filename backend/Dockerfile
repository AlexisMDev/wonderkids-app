# Étape 1 : Image de base
FROM node:22-slim

# Étape 2 : Créer un répertoire de travail
WORKDIR /app

# 🛠️ Fix OpenSSL
RUN apt-get update && apt-get install -y openssl

# Étape 3 : Copier tout le code
COPY . .

# Étape 5 : Installer les dépendances
RUN npm install

# Étape 6 : Exposer le port (doit corresponde à celui dans .env)
EXPOSE 3001

# Étape 7 : Commande de démarrage
CMD ["npm", "run", "dev"]