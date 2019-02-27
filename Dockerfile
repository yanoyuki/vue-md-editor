FROM node:11.9.0-alpine
RUN apk update \
    && npm i -g npm @vue/cli
WORKDIR /src
