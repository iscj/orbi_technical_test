import { 
  Controller, 
  Get,
  Post, 
  Body,
  Patch,
  Param, 
  OnModuleInit,
  Inject
} from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotificationService } from '../interfaces/notification.interface';

@Controller('user')
export class UserController implements OnModuleInit {
  private notificationService: NotificationService;

  constructor(
    @Inject('USER_PACKAGE') private client: ClientGrpc,
    private readonly userService: UserService
  ) {}

  onModuleInit() {
    this.notificationService = this.client.getService<NotificationService>('UserService');
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result =  await this.userService.create(createUserDto);
    const notificacion = this.notificationService.GetUser({id: result.id});
    notificacion.subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Error:', err),
      complete: () => console.log('Finish!'),
    });
    return result
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
