FROM node:14.18 as base

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3001

CMD [ "yarn", "dev" ]

FROM base as production

ENV NODE_PATH=./build

RUN yarn build
