import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@app/shared/types';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(
    ConfigService,
  ) as ConfigService<EnvironmentVariables>;
  const sharedService = app.get(SharedService);

  const queue = configService.getOrThrow('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice<MicroserviceOptions>(
    sharedService.getRmqOptions(queue),
  );
  await app.startAllMicroservices();
}
bootstrap();
