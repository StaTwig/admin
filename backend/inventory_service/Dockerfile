FROM node:lts-alpine3.13

ENV NODE_ENV=production

WORKDIR /src/utils/event_logger

COPY /utils/event_logger .

RUN yarn --production

WORKDIR /src/backend/service

COPY /backend/inventory_service/ .

RUN mkdir uploads

RUN yarn --production && yarn cache clean

EXPOSE 3007

CMD ["yarn", "start"]