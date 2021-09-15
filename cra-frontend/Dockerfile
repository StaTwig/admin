FROM node:lts as react_build 

WORKDIR /app

COPY package.json /app/

RUN yarn install

COPY . /app/

ENV ENVIRONMENT=test

ENV NODE_ENV=production
 
RUN yarn run build 

FROM nginx:stable-alpine

COPY --from=react_build /app/build/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80 

CMD ["nginx","-g","daemon off;"]
