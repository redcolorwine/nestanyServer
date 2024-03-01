import { SetMetadata } from "@nestjs/common";

//ключ по которому будем получать метаданные
export const ROLES_KEY = 'roles';
//Функция roles которая будет декоратором и параметром будем принимать массив ролей
//после setMetadata мы сможем получить эти роли в roles Guard
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);