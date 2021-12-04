FROM node:lts-alpine

ENV NODE_ENV=production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
COPY .env.prod .env
RUN npm install -g npm@latest
RUN npm install

EXPOSE 80

CMD ["npm", "start"]

LABEL org.opencontainers.image.source="https://github.com/SeptBlast/silver-happiness"
