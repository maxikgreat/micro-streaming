import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@app/shared/types';
import { Ctx, RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class SharedService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  getRmqOptions(queue: string): RmqOptions {
    const user = this.configService.getOrThrow('RABBITMQ_USER');
    const password = this.configService.getOrThrow('RABBITMQ_PASS');
    const host = this.configService.getOrThrow('RABBITMQ_HOST');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}`],
        noAck: false,
        queue,
        queueOptions: {
          durable: true,
        },
      },
    };
  }

  acknowledgeMessage(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
