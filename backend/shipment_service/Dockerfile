FROM node:16-bullseye-slim

ENV NODE_ENV=production

WORKDIR /src/utils/event_logger

COPY /utils/event_logger .

RUN yarn --production

WORKDIR /src/backend/service

COPY /backend/shipment_service/ .

RUN mkdir uploads && yarn --production

EXPOSE 3002

CMD ["yarn", "start"]