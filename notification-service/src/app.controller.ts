import { Controller } from '@nestjs/common';
import { GrpcMethod, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

interface userById {
  id: number;
}

interface DataInfo {
  userInfo: {
    nombre: string;
    email: string;
    edad: string;
  };
  message: string; 
}

@Controller('protousers')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @GrpcMethod('UserService', 'GetUser')
  async getUser(data: userById) {
    const result = await this.appService.sendNotification(data.id)
    return result;
  }

  @EventPattern('notification_event')
  async handleNotification(data: DataInfo) {
    console.log(`📩 Notificación recibida para el usuario ${JSON.stringify(data.userInfo)}: ${data.message}`);
  }
}
