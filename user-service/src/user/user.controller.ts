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
  ClientProxy,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotificationService } from '../interfaces/notification.interface';
import { User } from '../schemas/user.entity';


@ApiTags('user')
@Controller('user')
export class UserController implements OnModuleInit {
  private notificationService: NotificationService;

  constructor(
    @Inject('USER_PACKAGE') private client: ClientGrpc,
    @Inject('RABBITMQ_SERVICE') private readonly clientRMQ: ClientProxy,
    private readonly userService: UserService
  ) {}

  onModuleInit() {
    this.notificationService = this.client.getService<NotificationService>('UserService');
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'Create record', type: User })
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
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [User]
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by Id' }) 
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User
  })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 201, description: 'updated record' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.sendMessageQueue(updateUserDto, 'Informacion actualizada!')
    return this.userService.update(+id, updateUserDto);
  }

  async sendMessageQueue(userInfo: UpdateUserDto, message: string) {
    const payload = { userInfo, message };
    console.log(payload)
    this.clientRMQ.emit('notification_event', payload);
  }
}
