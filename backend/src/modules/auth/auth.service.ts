import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async signup(data: { name: string; email: string; password: string }) {
    const user = await this.users.createUser(data);
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { user, token };
  }

  async login(data: { email: string; password: string }) {
    const existing = await this.users.findByEmail(data.email);
    if (!existing) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(data.password, existing.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwt.signAsync({ sub: existing.id, email: existing.email });
    return {
      user: { id: existing.id, name: existing.name, email: existing.email, createdAt: existing.createdAt },
      token,
    };
  }
}
