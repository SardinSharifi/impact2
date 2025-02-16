import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ProjectService } from './project/project.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async homePage() {
    console.log('Rendering homepage');
    return { journals: [], lists: [], error: null };
  }

  @Post('/projects/search')
  async searchJournal(@Body('query') query: string, @Res() res: Response) {
    try {
      console.log(' جستجوی انجام شده برای:', query);

      // اگر query خالی بود، پاسخ به صورت JSON برگشت داده می‌شود.
      if (!query || query.trim() === '') {
        return res.json({
          journals: [],
          lists: [],
          error: 'لطفاً مقدار جستجو را وارد کنید.',
        });
      }

      // فراخوانی متد جستجو
      const result = await this.projectService.searchJournal(query.trim());

      console.log(' نتیجه جستجو:', result);

      // اگر نتایج وجود نداشت، پاسخ به صورت JSON با پیام خطا ارسال می‌شود.
      if (!result.journals || result.journals.length === 0) {
        return res.json({
          journals: [],
          lists: [],
          error: 'هیچ مجله‌ای با این معیار پیدا نشد.',
        });
      }

      // ارسال داده‌ها به صورت JSON
      return res.json({
        journals: result.journals,
        lists: result.lists || [],
        error: null,
      });

    } catch (error) {
      console.error('خطا در جستجو:', error);
      return res.json({
        journals: [],
        lists: [],
        error: 'خطایی در پردازش درخواست پیش آمده است. لطفاً دوباره تلاش کنید.',
      });
    }
  }
}
