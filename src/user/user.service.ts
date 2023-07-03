import { Injectable,Inject,forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import {Model}  from 'mongoose';
import { User } from './interfaces/user.interface';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UserService {
  constructor(@Inject(['USER_MODEL',
  forwardRef(() => AuthService),

])  private readonly userModel: Model<User>,
 
 ) {}
  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ email: email });
      return user;
    } catch (error) {
      return error;
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
