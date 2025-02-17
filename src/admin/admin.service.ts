import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  private readonly adminCredentials = {
    username: 'admin',  // نام کاربری
    password: 'password123',  // رمز عبور
  };

  // متد برای احراز هویت
  async authenticate(username: string, password: string) {
    if (
      username === this.adminCredentials.username &&
      password === this.adminCredentials.password
    ) {
      return { username };  // در صورت صحت اطلاعات، مدیر احراز هویت می‌شود
    }
    return null;  // در غیر این صورت، null برگشت داده می‌شود
  }
}
