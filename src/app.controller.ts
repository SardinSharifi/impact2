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
      console.log('🔎 جستجوی انجام شده برای:', query); 
  
      if (!query || query.trim() === '') {
        return res.json({ journals: [], lists: [], error: 'لطفاً مقدار جستجو را وارد کنید.' });
      }
  
      const result = await this.projectService.searchJournal(query.trim());
  
      console.log('📋 نتیجه جستجو:', result);
  
      if (!result.journals || result.journals.length === 0) {
        return res.json({ journals: [], lists: [], error: 'هیچ مجله‌ای با این معیار پیدا نشد.' });
      }
  
      return res.json({ 
        journals: result.journals, 
        lists: result.lists || [], 
        error: null 
      });
  
    } catch (error) {
      console.error('❌ خطا در جستجو:', error);
      return res.json({ journals: [], lists: [], error: 'خطایی در پردازش درخواست پیش آمده است. لطفاً دوباره تلاش کنید.' });
    }
  } 
}
