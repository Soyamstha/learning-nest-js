import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }
    async login(data: LoginDto) {
        // Validate that data exists

        if (!data || !data.email || !data.password) {
            throw new UnauthorizedException('Email and password are required');
        }

        const user = await this.userService.findByEmail(data.email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(
            data.password,
            user.password,
        );

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.signToken(user);
    }
    private signToken(user: any) {
        const payload = {
            email: user.email,
            sub: user.id,
        };
        return this.jwtService.sign(payload);
    }
}
