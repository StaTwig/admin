FROM node:14.16.1-alpine3.13

WORKDIR /src

COPY . /src

RUN yarn install

EXPOSE 3006

CMD yarn run start