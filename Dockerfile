FROM node:18-alpine

# Creare una directory di lavoro
WORKDIR /usr/src/app

# Copiare e installare le dipendenze
COPY package*.json ./
RUN npm install

# Copiare il codice sorgente
COPY . .

# Definire le variabili d'ambiente
ENV NODE_ENV production
ENV PORT 3000

# Esporre la porta
EXPOSE ${PORT}

# Comando per avviare l'applicazione
CMD ["node", "server.js"]