import { Controller, Get, Post, Render, Body, Res } from '@nestjs/common';
import { ProjectService } from './project/project.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @Render('home')
  async homePage() {
    console.log('Rendering homepage');
    return { journals: [], lists: [], error: null };
  }

  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }

  @Post('/search')
  async searchJournal(@Body('query') query: string, @Res() res: Response) {
    try {
      console.log('🔎 جستجوی انجام شده برای:', query); // بررسی مقدار query ورودی
  
      if (!query || query.trim() === '') {
        return res.render('home', { journals: [], lists: [], error: 'لطفاً مقدار جستجو را وارد کنید.' });
      }
  
      const result = await this.projectService.searchJournal(query.trim());
  
      console.log('📋 نتیجه جستجو:', result); // بررسی مقدار خروجی result
  
      if (!result.journals || result.journals.length === 0) {
        return res.render('home', { journals: [], lists: [], error: 'هیچ مجله‌ای با این معیار پیدا نشد.' });
      }
  
      return res.render('home', { 
        journals: result.journals, 
        lists: result.lists || [],  // اگر lists مقدار null یا undefined داشت، یک آرایه خالی بفرستیم
        error: null 
      });
  
    } catch (error) {
      console.error('❌ خطا در جستجو:', error);
      return res.render('home', { journals: [], lists: [], error: 'خطایی در پردازش درخواست پیش آمده است. لطفاً دوباره تلاش کنید.' });
    }
  }
  
}

