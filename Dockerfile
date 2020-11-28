FROM node:14-alpine3.12

RUN apk update
RUN apk add --no-cache make g++ python3

WORKDIR /home/hbfl

COPY package*.json /home/hbfl/
RUN npm ci

COPY . /home/hbfl/

CMD [ "npm", "start" ]

EXPOSE 3000