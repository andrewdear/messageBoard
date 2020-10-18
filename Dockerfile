FROM node:12.19.0

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

RUN npm run build

COPY ./dist .

EXPOSE 8080

CMD ["pm2-runtime","index.js"]