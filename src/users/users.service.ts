import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { where } from 'sequelize';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User) { }


  async getUsers() {
    const users = await this.userRepository.findAll()
    return users;
  }

  async findUserByEmail(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { email: dto.email } })
    return user;
  }


  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async findOne(userId) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    return user;
  }

}
