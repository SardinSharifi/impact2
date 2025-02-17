import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')  // مسیر پایه را تنظیم می‌کند
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/search')
  async searchJournal(@Body('query') query: string) {
    try {
        // جستجو برای query
        const result = await this.projectService.searchJournal(query.trim());
        
        // نتیجه جستجو
        return { 
            journals: result.journals || [], 
            lists: result.lists || [], 
            error: result.journals.length > 0 ? null : 'هیچ مجله‌ای با این مشخصات پیدا نشد.'  // پیام خطای دقیق‌تر
        };
    } catch (error) {
        // در صورت بروز خطا
        return { 
            journals: [], 
            lists: [], 
            error: 'خطایی در پردازش درخواست پیش آمده است. لطفاً دوباره تلاش کنید.'  // پیام خطای عمومی‌تر
        };
    }
  }

  @Get(':issn')
  async getJournalByIssn(@Param('issn') issn: string) {
    try {
      // جستجو برای مجله با ISSN مشخص
      const journal = await this.projectService.getJournalByIssn(issn);
      
      // بررسی وجود مجله
      if (!journal) {
        return { error: 'مجله‌ای با این ISSN پیدا نشد.' };
      }
      
      return { journal };
    } catch (error) {
      // در صورت بروز خطا
      return { error: 'خطا در دریافت مجله. لطفاً دوباره تلاش کنید.' };
    }
  }
}
