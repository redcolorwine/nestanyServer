import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    JwtModule.register({
      secret:process.env.PRIVATE_KEY || 'SECRET',
      signOptions:{
        expiresIn:'24h'
      }
    }),
    forwardRef(()=>UsersModule)
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule, AuthService]
})
export class AuthModule {}
