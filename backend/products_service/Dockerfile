FROM node:lts-alpine3.13

WORKDIR /src

COPY . /src

RUN mkdir images

RUN yarn install

EXPOSE 3010

CMD yarn run start