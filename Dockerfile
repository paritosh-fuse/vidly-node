FROM node:16.14.0

COPY package*.json /app/

WORKDIR /app/

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]

