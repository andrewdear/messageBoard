FROM node:12.19.0

WORKDIR /usr/src/app/dist

COPY package.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

RUN npm run build


EXPOSE 8080

CMD ["pm2-runtime","dist/index.js"]