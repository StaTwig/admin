FROM node:lts

ENV NODE_ENV=production

WORKDIR /src/utils/event_logger

COPY /utils/event_logger .

RUN yarn --production

WORKDIR /src/backend/service

COPY /backend/employee_service/package.json .

RUN npm install --platform=linux --arch=arm64 --arm-version=8 sharp

RUN yarn --production

COPY /backend/employee_service/ .

RUN mkdir uploads

EXPOSE 3001

CMD yarn run start