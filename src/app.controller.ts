import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  @Render('home') // اطمینان حاصل کنید که به درستی home.ejs را رندر می‌کند
  renderHomePage() {
    return { message: 'Welcome to ifactor.ir' }; // داده‌ای که به ejs ارسال می‌شود
  }
}
