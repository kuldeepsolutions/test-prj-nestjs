import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { authProvider } from './auth.provider';
@Module({
  imports:[
  forwardRef(() => UserModule),
    JwtModule.register({
      secret: jwtConstants.secret,
      global: true,
      signOptions: { expiresIn: '60s' },
    }),

  ],
  providers: [AuthService,{
    provide: APP_GUARD,
    useClass: AuthGuard
  },],
  controllers: [AuthController]
})
export class AuthModule {}
