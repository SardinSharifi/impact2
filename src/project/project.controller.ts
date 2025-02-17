import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/search')
  async searchJournal(@Body('query') query: string) {
    try {
      console.log(' جستجو برای:', query);  // چاپ مقدار query

      const result = await this.projectService.searchJournal(query.trim());
      console.log('📋 نتیجه جستجو:', result);  // چاپ نتیجه کامل

      return { 
        journals: result.journals || [], 
        lists: result.lists || [], 
        error: result.journals.length > 0 ? null : 'هیچ مجله‌ای پیدا نشد.' 
      };
    } catch (error) {
      return { 
        journals: [], 
        lists: [], 
        error: 'خطایی در پردازش درخواست پیش آمده است. لطفاً دوباره تلاش کنید.' 
      };
    }
  }

  @Get(':issn')
  async getJournalByIssn(@Param('issn') issn: string) {
    try {
      const journal = await this.projectService.getJournalByIssn(issn);
      
      if (!journal) {
        return { error: 'مجله‌ای با این ISSN پیدا نشد.' };
      }
      
      return { journal };
    } catch (error) {
      return { error: 'خطا در دریافت مجله. لطفاً دوباره تلاش کنید.' };
    }
  }
}
