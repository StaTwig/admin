FROM node:16-bullseye-slim

WORKDIR /src

COPY . /src

RUN mkdir images

RUN yarn install

EXPOSE 3010

CMD yarn run start