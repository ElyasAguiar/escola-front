# build environment
FROM node:14-alpine as build

WORKDIR /app

COPY ./ /app

RUN npm install && npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
