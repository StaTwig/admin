FROM node:lts-alpine3.13

ENV NODE_ENV=production

WORKDIR /src

COPY package.json .

RUN yarn --production && yarn cache clean

COPY . .

EXPOSE 3005

CMD ["yarn", "start"]