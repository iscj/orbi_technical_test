import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'userproto',
          protoPath: join(__dirname, '../../../proto/user/user.proto'),//'../proto/user/user.proto',
          url: '0.0.0.0:50052',
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
