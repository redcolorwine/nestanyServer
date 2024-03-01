import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/role/role.model';
import { UserRoles } from 'src/role/user-roles.model';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    forwardRef(() => AuthModule),
    RoleModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
