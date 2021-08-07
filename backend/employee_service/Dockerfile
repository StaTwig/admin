FROM node:lts

WORKDIR /src/utils/event_logger

COPY /utils/event_logger .

RUN yarn install

WORKDIR /src/backend/service

COPY /backend/employee_service/ .

RUN yarn install

EXPOSE 3001

CMD yarn run start