import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ProjectService } from './project/project.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly projectService: ProjectService) {}

  // رندر صفحه اصلی
  @Get()
  async homePage() {
    console.log('Rendering homepage');
    // بازگشت داده‌های اولیه صفحه به صورت JSON
    return { journals: [], lists: [], error: null };
  }

  // جستجوی مجله
  @Post('/search')
  async searchJournal(@Body('query') query: string, @Res() res: Response) {
    try {
      console.log(' جستجوی انجام شده برای:', query);

      // اگر query خالی یا نادرست باشد، بازگشت خطا به صورت JSON
      if (!query || query.trim() === '') {
        return res.json({
          journals: [],
          lists: [],
          error: 'لطفاً مقدار جستجو را وارد کنید.',
        });
      }

      // جستجو در پایگاه داده
      const result = await this.projectService.searchJournal(query.trim());

      console.log(' نتیجه جستجو:', result);

      // اگر نتایج جستجو خالی بود، بازگشت خطا به صورت JSON
      if (!result.journals || result.journals.length === 0) {
        return res.json({
          journals: [],
          lists: [],
          error: 'هیچ مجله‌ای با این معیار پیدا نشد.',
        });
      }

      // در صورت وجود نتایج، ارسال داده‌ها به صورت JSON
      return res.json({
        journals: result.journals,
        lists: result.lists || [],
        error: null,
      });

    } catch (error) {
      console.error('خطا در جستجو:', error);
      // در صورت بروز خطا در پردازش درخواست، ارسال خطا به صورت JSON
      return res.json({
        journals: [],
        lists: [],
        error: 'خطایی در پردازش درخواست پیش آمده است. لطفاً دوباره تلاش کنید.',
      });
    }
  }
}
