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
    return { journals: [], lists: [], error: null }; // ارسال error null به عنوان مقدار پیش‌فرض
  }

  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }

  @Post('/search')
  async searchJournal(@Body('query') query: string, @Res() res: Response) {
    try {
      const result = await this.projectService.searchJournal(query);

      if (!result.journals.length) {
        return res.render('home', { error: 'هیچ مجله‌ای با این معیار پیدا نشد.' });
      }

      return res.render('home', { journals: result.journals, lists: result.lists });
    } catch (error) {
      console.error(error);
      return res.render('home', { error: 'خطایی در پردازش درخواست پیش آمده است. لطفاً دوباره تلاش کنید.' });
    }
  }
}

