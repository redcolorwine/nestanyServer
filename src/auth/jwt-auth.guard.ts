import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtSerivce: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //получаем запрос
        const req = context.switchToHttp().getRequest();

        try {
            //получаем заголовок авторизации из запроса 
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
            }
            //раскодируем токен
            const user = this.jwtSerivce.verify(token);
            //после того как раскодировали юзера, помещаем его в request
            req.user = user;
            return true;

        } catch (error) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
        }

    }

}