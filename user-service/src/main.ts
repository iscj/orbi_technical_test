import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  const config = new DocumentBuilder()
    .setTitle('Microservices')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('micros')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
