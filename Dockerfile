FROM node:latest

MAINTAINER Chris Krahe

ENV NODE_ENV=development
ENV PORT=3000
ENV DB_HOST=placesdb
ENV DB_PORT=20717

COPY    . /var/www
WORKDIR /var/www

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]