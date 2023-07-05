FROM node:18-alpine

LABEL maintainer="luis.portanel@distillery.com"
ADD . /data
WORKDIR /data
RUN node -v
RUN apk add g++ make py3-pip
RUN yarn install
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "-c" , "yarn prisma migrate deploy; yarn build && yarn start"]
