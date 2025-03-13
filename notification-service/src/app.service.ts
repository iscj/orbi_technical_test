import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService
  ) {}
  
  async sendNotification(userId: number) {
    console.log('gRCP: ')
    const userResponse = await lastValueFrom(
      this.httpService.get(`${process.env.URL_ENDPOINT}/user/${userId}`),
    );
    const user = userResponse.data;
    return {message: `Notificación enviada a ${user.email}` };
  }
}
