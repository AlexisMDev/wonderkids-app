# Étape 1 : Image de base officielle Node
FROM node:22-slim

# Étape 2 : Créer un dossier de travail
WORKDIR /app

# Étape 3 : Copier les fichiers de projet
COPY . .

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Exposer le port sur lequel Vite tourne
EXPOSE 5173

# Étape 6 : Lancer le serveur Vite
CMD ["npm", "run", "dev", "--", "--host"]
