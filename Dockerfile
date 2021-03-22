FROM node:12.20.0-alpine as builder

WORKDIR /opt/app
ARG API_URL
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
VOLUME [ "/opt/app/node_modules" ]
COPY . .
RUN npm run test
RUN API_URL=$API_URL npm run build

FROM nginx:stable-alpine
EXPOSE 8081
WORKDIR /usr/share/nginx/html
COPY --from=builder /opt/app/dist .