# build environment
FROM node:14-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM socialengine/nginx-spa:latest
COPY ./build /app"
RUN chmod -R 777 /app"
# CMD ["nginx", "-g", "daemon off;"]