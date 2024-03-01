import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { where } from 'sequelize';
import { RoleService } from 'src/role/role.service';
import { AddRoleDto } from 'src/role/dto/add-role.dto';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RoleService) { }


  async getUsers() {
    const users = await this.userRepository.findAll()
    return users;
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }
  async findUserByEmail(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { email: dto.email }, include: { all: true } })
    return user;
  }


  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    const role = await this.roleService.getRoleByValue('ADMIN');

    await user.$set('roles', [role.id]);

    user.roles = [role];

    return user;

  }

  async findOne(userId) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    return user;
  }
  //выдача роли
  async addRole(dto: AddRoleDto) {

    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }



}
