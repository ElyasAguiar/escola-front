# build environment
FROM node:14-alpine as build

WORKDIR /app

COPY ./ /app

RUN npm install && npm run build

FROM --platform=linux/amd64 socialengine/nginx-spa:latest

COPY --from=build /app/build /app

RUN chmod -R 777 /app
