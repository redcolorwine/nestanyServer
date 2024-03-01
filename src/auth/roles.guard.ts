import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from "./roles-auth.decorator";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {
            //Получим роли, чтобы роли получить требуется еще заинжектить класс Reflector
            //в него передаем созданный нами ключ ROLES_KEY (в Roles), во втором параметре массив с целями из контекста. Указываем что именно нужно взять
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            //если ролей нет то эта функция будет доступна всем пользователям
            if (!requiredRoles) {
                return true;
            }
            //получим req из контекста
            const req = context.switchToHttp().getRequest();
            //Теперь есть доступ к запросу, к телу запроса и так далее
            //достаем заголовок авторизации
            const authHeader = req.headers.authorization;
            //тип bearer
            const bearer = authHeader.split(' ')[0];
            //токен
            const token = authHeader.split(' ')[1];
            //если bearer не равен bearer или нет токена 
            if (bearer != 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован!' });
            }
            //раскодируем токен
            const user = this.jwtService.verify(token);
            //помещаем его в req
            req.user = user;
            //обращаемся к ролям внутри токена и с помощью some() проверяем есть ли у пользователя такая роль которая ялвяется необходимой для этого ендпоинта(роута)
            return user.roles.some(role => requiredRoles.includes(role.value));

        } catch (e) {
            throw new HttpException('Пользователь имеет недостаточные права', HttpStatus.FORBIDDEN);
        }
    }
}