# Image de base Node.js
FROM node:18

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code
COPY . .

# Port exposé
EXPOSE 3000

# Démarrer le serveur
CMD ["node", "server.js"]