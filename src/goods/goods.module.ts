import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Goods } from './goods.model';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Goods, User]),
    FilesModule
],
  controllers: [GoodsController],
  providers: [GoodsService],
  exports: [GoodsService]
})
export class GoodsModule { }
