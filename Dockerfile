FROM node:latest

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 8080

# FROM base as production

ENV NODE_PATH=./build

RUN yarn build

CMD ["yarn", "dev"]
