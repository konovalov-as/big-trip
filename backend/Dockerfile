#FROM node:18.4.0-alpine3.16
#FROM node:23.1.0-alpine3.19
#FROM node:22.11.0-alpine3.19
FROM node:20.13.1

WORKDIR /app

COPY package.json .
COPY config ./config
COPY server ./server
COPY uploads ./uploads
COPY .env .
COPY tsconfig.json tsconfig.json

RUN npm install