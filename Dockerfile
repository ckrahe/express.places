FROM node:latest

MAINTAINER Chris Krahe

ARG PORT_ARG=3000
ARG DB_USER_ARG=appUser
ARG DB_PWD_ARG=******
ARG DB_HOST_ARG=placesdb
ARG DB_PORT_ARG=27017

ENV NODE_ENV=development
ENV PORT=$PORT_ARG
ENV DB_USER=$DB_USER_ARG
ENV DB_PWD=$DB_PWD_ARG
ENV DB_HOST=$DB_HOST_ARG
ENV DB_PORT=$DB_PORT_ARG

COPY    . /var/www
WORKDIR /var/www

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]