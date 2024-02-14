import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Goods } from './goods.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Goods]),
    // FilesModule
],
  controllers: [GoodsController],
  providers: [GoodsService],
  exports: [GoodsService]
})
export class GoodsModule { }
