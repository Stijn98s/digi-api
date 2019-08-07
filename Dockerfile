FROM node:11.9-alpine
WORKDIR /usr/src/app
ENV SSL_ENABLED=true
COPY . .
RUN npm install --production
RUN npm run build:prod
RUN npm prune --production
CMD [ "npm", "run", "start:prod"]
