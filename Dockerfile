FROM node

WORKDIR /app

COPY . /app

EXPOSE 3333

RUN npm install

RUN npm run build

CMD ["node", "server.js"]

