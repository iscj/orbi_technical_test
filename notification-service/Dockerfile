FROM node:20-alpine as notification_service

WORKDIR  /home/app

COPY . .

RUN npm install

EXPOSE 50052

CMD ["npm", "run", "start"]