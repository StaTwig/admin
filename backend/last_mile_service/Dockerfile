FROM node:lts-alpine3.13

ENV NODE_ENV=production

WORKDIR /src

COPY . /src

RUN yarn --production

EXPOSE 3016

CMD ["yarn", "start"]