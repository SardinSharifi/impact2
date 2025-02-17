import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // فرض کنید که این کاربر به‌صورت ثابت و بدون اتصال به دیتابیس تعریف می‌شود
  private readonly user = { 
    username: 'admin', 
    password: '$2' 
  };

  async login(loginDto: { username: string, password: string }): Promise<{ access_token: string }> {
    const { username, password } = loginDto;

    // بررسی نام کاربری
    if (this.user.username !== username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // مقایسه رمز عبور ورودی با رمز عبور هش‌شده
    const isPasswordValid = await bcrypt.compare(password, this.user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // بارگذاری اطلاعات کاربر در Payload برای JWT
    const payload = { sub: this.user.username };

    return {
      access_token: this.jwtService.sign(payload), // ایجاد و ارسال توکن
    };
  }
}

