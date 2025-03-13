import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private productRepository: typeof User,
  ){}

  create(createUserDto: CreateUserDto) {
    return this.productRepository.create(createUserDto as any);
  }

  findAll() {
    return this.productRepository.findAll();
  }

  findOne(id: number) {
    return this.productRepository.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.productRepository.update(
      updateUserDto,
      {
        where:{
          id: id
        }
      });
  }
}
