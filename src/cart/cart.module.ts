import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { User } from 'src/users/users.model';
import { Goods } from 'src/goods/goods.model';
import { UsersModule } from 'src/users/users.module';
import { GoodsModule } from 'src/goods/goods.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Cart]),
    UsersModule,
    GoodsModule,
    AuthModule
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule { }
