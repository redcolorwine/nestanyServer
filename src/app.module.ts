import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { GoodsModule } from './goods/goods.module';
import { Goods } from './goods/goods.model';
import { Cart } from './cart/cart.model';
import { CartModule } from './cart/cart.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PaymentModule } from './payment/payment.module';
import * as path from 'path';


@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      models: [User, Goods, Cart]
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    AuthModule,
    GoodsModule,
    CartModule,
    FilesModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
