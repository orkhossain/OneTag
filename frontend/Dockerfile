FROM node:22-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build

CMD ["ng", "serve", "--host", "0.0.0.0"]
