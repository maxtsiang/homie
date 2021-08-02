FROM node:14.15.4-alpine
WORKDIR /homie
COPY . .
RUN apk update
RUN apk add git
RUN yarn install
CMD ["yarn", "start"]