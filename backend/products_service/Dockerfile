FROM node:lts

ENV NODE_ENV=production

WORKDIR /src

COPY . /src

RUN mkdir images

RUN yarn --production && yarn cache clean

EXPOSE 3010

CMD ["yarn", "start"]