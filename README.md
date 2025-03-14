## Description
Prueba técnica microservicios


## Project setup
Para cada servicio crear un archivo .env, con las siguientes varaibles

```bash
URL_RABBITMQ=""
PORT_RABBITMQ=""
URL_GRPC=""
PORT_GRPC=""
URL_ENDPOINT=""
```

Para ejecutar de manera local con docker

```bash
$ docker-compose up --build
```

## Compile and run the project
Para ejecutar de manera independiente cada servicio, ingresar a notification-service y user-service en terminales separadas y ejecutar
```bash
# install depencies
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentation

