import {
  Controller,
  Body,
  Req,
  Res,
  HttpException,
  HttpStatus,
  HttpCode,
  Post,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/auth.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
