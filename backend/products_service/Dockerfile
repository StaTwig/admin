FROM node:lts

WORKDIR /src

COPY . /src

RUN mkdir images

RUN yarn install

EXPOSE 3010

CMD yarn run start