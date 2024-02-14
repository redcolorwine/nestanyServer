import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/users.model';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }


}
