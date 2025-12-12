# Stage 1: deps
FROM node:18-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Stage 2: runtime
FROM node:18-alpine AS runtime
WORKDIR /usr/src/app

# Crear usuario no root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copiar node_modules del stage anterior
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copiar el resto del código
COPY . .

# Instalar wget para healthcheck
RUN apk add --no-cache wget

ENV PORT=3000
EXPOSE 3000

USER appuser

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- --timeout=2 http://localhost:3000/ >/dev/null || exit 1

CMD ["npm", "start"]
