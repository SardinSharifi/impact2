import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // توکن JWT در هدر قرار دارد

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: 'your_secret_key' }); // بررسی اعتبار توکن

      request.user = payload;  // قرار دادن اطلاعات کاربر در درخواست
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
