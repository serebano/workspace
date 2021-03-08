FROM node:15-alpine as installer
RUN apk update && apk upgrade
#RUN apk add --no-cache ffmpeg
RUN apk add python make g++ nano curl
RUN yarn global add nodemon

WORKDIR /app
COPY package.json ./
RUN yarn

FROM installer as build

COPY . .

EXPOSE 7733

CMD [ "yarn", "start" ]