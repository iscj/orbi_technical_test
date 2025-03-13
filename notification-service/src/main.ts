import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'userproto',
      protoPath: '../proto/user/user.proto',
      url: `${process.env.URL_GRPC}:${process.env.PORT_GRPC}`,
    },
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.URL_RABBITMQ}:${process.env.PORT_RABBITMQ}`],
      queue: 'notifications_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
