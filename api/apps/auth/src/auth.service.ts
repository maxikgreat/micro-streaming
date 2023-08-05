import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getUsers() {
    return [
      {
        id: 1,
        name: 'Max',
      },
    ];
  }

  postUser() {
    return {
      id: 1,
      name: 'Max',
    };
  }
}
