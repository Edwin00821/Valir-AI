# Usar una imagen ligera basada en Alpine
FROM node:18-alpine AS base

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo los archivos necesarios para instalar las dependencias
COPY package.json package-lock.json ./

# Instalar dependencias de producción
RUN npm i

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Usar una imagen mínima para producción
FROM node:18-alpine AS production

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar las dependencias instaladas desde la etapa anterior
COPY --from=base /app/node_modules ./node_modules

# Copiar el código de la aplicación y el build generado
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./

# Exponer el puerto en el que correrá la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
