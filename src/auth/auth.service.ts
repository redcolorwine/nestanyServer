import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }

    //валидация
    async validateUser(dto: CreateUserDto) {
        const user = await this.usersService.findUserByEmail(dto);
        if (user) {
            const passwordEquals = await bcrypt.compare(dto.password, user.password);
            if (passwordEquals) {
                return user;
            }
        }
        throw new UnauthorizedException({ message: 'Неверный логин или пароль' })
    }
    //токен
    async generateToken(user: User) {
        const payload = { email: user.email, id: user.id };
        return {
            token: this.jwtService.sign(payload),
            userId: user.id,
            email: user.email
        }
    }
    //создание пользователя
    async register(dto: CreateUserDto) {
        const candidate = await this.usersService.findUserByEmail(dto);
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.FORBIDDEN)
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.usersService.createUser({ ...dto, password: hashPassword });
        return this.generateToken(user);

    }
    //аутентификация
    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }
}





