import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@app/shared/types';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        const user = configService.getOrThrow('RABBITMQ_USER');
        const password = configService.getOrThrow('RABBITMQ_PASS');
        const host = configService.getOrThrow('RABBITMQ_HOST');
        const queue = configService.getOrThrow('RABBITMQ_AUTH_QUEUE');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
    {
      provide: 'PRESENCE_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        const user = configService.getOrThrow('RABBITMQ_USER');
        const password = configService.getOrThrow('RABBITMQ_PASS');
        const host = configService.getOrThrow('RABBITMQ_HOST');
        const queue = configService.getOrThrow('RABBITMQ_PRESENCE_QUEUE');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
  ],
})
export class AppModule {}
