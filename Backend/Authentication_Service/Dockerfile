FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN npm ci

COPY . ./app

ENV JWT_SECRET_KEY=be293c5cfb8042972e3ba418064c9a7c
ENV OPENAI_API_KEY=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

EXPOSE 9000

CMD ["node", "server.js"]
