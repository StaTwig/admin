FROM node:14.16.1

WORKDIR /src/utils/event_logger

COPY /utils/event_logger .

RUN npm install

WORKDIR /src/backend/service

COPY /backend/inventory_service/ .
 
RUN npm install

EXPOSE 3007

CMD npm start