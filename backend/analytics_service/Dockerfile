FROM node:lts-alpine3.13

ENV NODE_ENV=production

WORKDIR /src

COPY . /src

RUN yarn --production

EXPOSE 3014

CMD ["yarn", "start"]