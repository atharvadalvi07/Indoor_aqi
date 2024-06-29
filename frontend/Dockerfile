FROM node:16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

RUN ln -s /app/node_modules /app/src/node_modules

CMD ["npm", "start"]
