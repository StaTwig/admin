FROM node:lts

WORKDIR /src/utils/event_logger

COPY /utils/event_logger .

RUN yarn install

WORKDIR /src/backend/service

COPY /backend/shipment_service/ .
 
RUN yarn install

EXPOSE 3002

CMD yarn run start