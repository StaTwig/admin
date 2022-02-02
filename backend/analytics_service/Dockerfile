FROM node:lts-alpine3.13

WORKDIR /src

COPY . /src

RUN yarn install

EXPOSE 3014

CMD node analytics_service.js