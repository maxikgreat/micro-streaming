import { DynamicModule, Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EnvironmentVariables } from '@app/shared/types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    const providers = [
      {
        provide: service,
        inject: [ConfigService],
        useFactory: (configService: ConfigService<EnvironmentVariables>) => {
          const user = configService.getOrThrow('RABBITMQ_USER');
          const password = configService.getOrThrow('RABBITMQ_PASS');
          const host = configService.getOrThrow('RABBITMQ_HOST');

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
    ];

    return {
      module: SharedModule,
      providers,
      exports: providers,
    };
  }
}
