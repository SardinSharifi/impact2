import { Controller, Get, Post, Render, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project/project.service';

@Controller()
export class AppController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @Render('home')
  async homePage() {
    console.log('Rendering homepage');
    return { journals: [], lists: [] };
  }

  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }

  @Post('/search')
  async searchJournal(@Body('query') query: string) {
    try {
      const result = await this.projectService.searchJournal(query);
      
      // اگر نتایج خالی بود، پیامی مبنی بر عدم پیدا شدن نتیجه ارسال کنیم
      if (!result.journals.length) {
        return { error: 'هیچ مجله‌ای با این معیار پیدا نشد.' };
      }
      
      return { journals: result.journals, lists: result.lists };
    } catch (error) {
      // پیامی برای خطاهای احتمالی از پروژه (مثلاً مشکلات دیتابیس)
      console.error(error);  // لاگ کردن خطا برای بررسی دقیق‌تر
      return { error: 'خطایی در پردازش درخواست پیش آمده است. لطفاً دوباره تلاش کنید.' };
    }
  }
  
}
