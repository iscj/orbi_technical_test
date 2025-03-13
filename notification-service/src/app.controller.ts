import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

interface userById {
  id: number;
}

@Controller('protousers')
export class AppController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @GrpcMethod('UserService', 'GetUser')
  async getUser(data: userById) {
    const result = await this.sendNotification(data.id)
    return result;
  }

  async sendNotification(userId: number) {
    const userResponse = await lastValueFrom(
      this.httpService.get(`http://localhost:3000/user/${userId}`),
    );
    const user = userResponse.data;
    return {message: `Notificación enviada a ${user.email}` };
  }
}
