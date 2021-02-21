# FROM node as react_build 
# #also say 
# WORKDIR /app
# #copy the react app to the container
# COPY . /app/ 

# # #prepare the contiainer for building react 
# # RUN npm install --silent
# RUN yarn
# # RUN npm install
# # RUN npm install react-scripts@3.0.1 -g --silent 
# RUN npm run build 
# # RUN npm prune --production
#prepare nginx
FROM nginx:1.19-alpine

# COPY --from=react_build /app /usr/share/nginx/html
COPY . /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d



#fire up nginx
EXPOSE 80 
CMD ["nginx","-g","daemon off;"]


# Doc from NodeJS Officail documentation
# FROM node

# # Create app directory
# WORKDIR /app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# # RUN npm install
# # If you are building your code for production
# RUN npm ci --only=production

# # Bundle app source
# COPY . .

# EXPOSE 8080
# CMD [ "node", "server.js" ]