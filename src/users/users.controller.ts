import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({ status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.getUsers();
  }


}
