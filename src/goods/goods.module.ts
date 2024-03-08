import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Goods } from './goods.model';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/role.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Goods, User]),
    FilesModule,
    AuthModule
],
  controllers: [GoodsController],
  providers: [GoodsService],
  exports: [GoodsService]
})
export class GoodsModule { }
