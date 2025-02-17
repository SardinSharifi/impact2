import { Controller, Post, Get, Body, Redirect, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // نمایش صفحه ورود
  @Get('login')
  @Render('login')  // رندر کردن صفحه ورود
  loginPage() {
    return {};
  }

  // ورود به سیستم
  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Res() res: Response) {
    const { username, password } = body;
    
    const admin = await this.adminService.authenticate(username, password);
    if (admin) {
      res.redirect('/admin/dashboard');  // بعد از ورود، هدایت به داشبورد ادمین
    } else {
      res.redirect('/admin/login');  // در صورت اشتباه بودن نام کاربری یا رمز عبور، هدایت به صفحه ورود
    }
  }

  // نمایش داشبورد ادمین
  @Get('dashboard')
  @Render('admin-dashboard')  // رندر کردن داشبورد
  dashboard(@Req() req: Request, @Res() res: Response) {
    if (!req.session.admin) {
      return res.redirect('/admin/login');  // اگر مدیر وارد نشده باشد، هدایت به صفحه ورود
    }
    return {};
  }

  // خروج از سیستم
  @Get('logout')
  @Redirect('/admin/login')
  logout(@Req() req: Request) {
    req.session.admin =false;  // حذف session
    return {};
  }
}
