import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@app/shared/types';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(
    ConfigService,
  ) as ConfigService<EnvironmentVariables>;

  const user = configService.getOrThrow('RABBITMQ_USER');
  const password = configService.getOrThrow('RABBITMQ_PASS');
  const host = configService.getOrThrow('RABBITMQ_HOST');
  const queue = configService.getOrThrow('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      noAck: false,
      queue,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
