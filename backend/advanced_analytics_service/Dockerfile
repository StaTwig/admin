FROM node:lts-alpine3.13

WORKDIR /src

COPY . /src

RUN yarn --production

EXPOSE 3015

CMD ["yarn", "start"]