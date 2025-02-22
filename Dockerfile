FROM node:23 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production


COPY . .

RUN npm run build

FROM node:23-slim AS runner
WORKDIR /app


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json .


EXPOSE 3000

CMD ["node", "dist/main"]
