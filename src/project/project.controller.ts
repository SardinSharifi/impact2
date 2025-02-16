import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')  // مسیر پایه را تنظیم می‌کند
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/search')
async searchJournal(@Body('query') query: string) {
    try {
        console.log('🔎 جستجوی انجام شده برای:', query);

        if (!query || query.trim() === '') {
            return { journals: [], lists: [], error: 'لطفاً مقدار جستجو را وارد کنید.' };
        }

        const result = await this.projectService.searchJournal(query.trim());
        console.log('📋 نتیجه جستجو:', result);

        return { 
            journals: result.journals || [], 
            lists: result.lists || [], 
            error: result.journals.length > 0 ? null : 'هیچ مجله‌ای با این معیار پیدا نشد.'
        };
    } catch (error) {
        console.error('❌ خطا در جستجو:', error);
        return { journals: [], lists: [], error: 'خطایی در پردازش درخواست پیش آمده است.' };
    }
}
  @Get(':issn')
  async getJournalByIssn(@Param('issn') issn: string) {
    try {
      const journal = await this.projectService.getJournalByIssn(issn);
      if (!journal) {
        return { error: 'مجله با این ISSN یافت نشد.' };
      }
      return { journal };
    } catch (error) {
      console.error('خطا در دریافت مجله:', error);
      return { error: 'خطا در دریافت مجله' };
    }
  }
}
