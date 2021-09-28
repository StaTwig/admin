FROM node:lts as react_build 

WORKDIR /app

COPY package.json /app/

RUN yarn install

COPY . /app/
 
RUN yarn run build 

FROM nginx:stable-alpine

COPY --from=react_build /app /usr/share/nginx/html

# COPY . /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80 

CMD ["nginx","-g","daemon off;"]