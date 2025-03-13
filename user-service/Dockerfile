FROM node:20 as notification_service

WORKDIR  /home/app

COPY . .

RUN npm install

RUN mkdir -p /database

EXPOSE 3000

CMD ["npm", "run", "start"]