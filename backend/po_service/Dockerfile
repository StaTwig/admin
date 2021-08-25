FROM node:lts-alpine3.13

WORKDIR /src/utils/event_logger

COPY /utils/event_logger .

RUN yarn install

WORKDIR /src/backend/service

COPY /backend/po_service/ .

RUN yarn install

EXPOSE 3012

CMD yarn run start