import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) { }
  
  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.create(createRoleDto);
    return role;
  }

  async getRoleByValue(value) {
    const role = await this.roleRepository.findOne({ where: {value} });
    return role;
  }

}
