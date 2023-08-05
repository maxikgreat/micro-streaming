import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUsers(@Ctx() context: RmqContext): Promise<unknown[]> {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    channel.ack(message);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'post-user' })
  async postUser(@Ctx() context: RmqContext): Promise<unknown> {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    channel.ack(message);

    return this.authService.postUser();
  }
}
