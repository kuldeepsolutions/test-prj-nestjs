import { Injectable, UnauthorizedException,Inject,forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserModule } from 'src/user/user.module';
// import {  } from '@nestjs/common';
@Injectable()
export class AuthService {
    constructor(
        @Inject(
            forwardRef(() => UserService),
        )
        private userService: UserService,
        private jwtService: JwtService,
       

    ) { }
    async signIn(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if(user?.password !== password){
            throw new UnauthorizedException();
        }
        // if (user && user.password === password) {
        //     const { password, ...result } = user;
        //     return result;
        // }
        // throw new UnauthorizedException();
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
