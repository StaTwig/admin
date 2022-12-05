FROM node:lts

ENV NODE_ENV=production

WORKDIR /src/utils/event_logger

COPY /utils/event_logger .

RUN yarn --production

WORKDIR /src/backend/service

COPY /backend/po_service/ .

RUN yarn --production

EXPOSE 3012

CMD ["yarn", "start"]