# Étape de construction
FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape de production
FROM node:alpine
WORKDIR /app
# Copiez le dossier .next généré par Next.js
COPY --from=build /app/.next ./.next
COPY package*.json ./
RUN npm install --only=production
# Assurez-vous que les fichiers publics et tout autre nécessaire sont également copiés
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.mjs ./
EXPOSE 3000
CMD ["npm", "start"]
