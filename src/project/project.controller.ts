import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // جستجو برای مجلات بر اساس ISSN یا عنوان
  @Post('search')
  async searchJournal(@Body('query') query: string) {
    try {
      const { journals, lists } = await this.projectService.searchJournal(query);
      return { journals, lists };
    } catch (error) {
      return { error: 'خطا در جستجو. لطفاً دوباره تلاش کنید.' };
    }
  }

  // دریافت مجله بر اساس ISSN
  @Get(':issn')
  async getJournalByIssn(@Param('issn') issn: string) {
    try {
      const journal = await this.projectService.getJournalByIssn(issn);
      return { journal };
    } catch (error) {
      return { error: 'خطا در دریافت مجله. لطفاً دوباره تلاش کنید.' };
    }
  }

  // افزودن مجله جدید
  @Post('add-journal')
  async addJournal(@Body() journalData: { title: string; issn: string; publisher: string; country: string }) {
    return await this.projectService.addJournal(journalData);
  }

  // افزودن لیست جدید
  @Post('add-list')
  async addList(@Body() listData: { name: string; type: 'blacklist' | 'index' }) {  // Updated type here
    return await this.projectService.addList(listData);
  }

  // افزودن مجله به لیست
  @Post('add-journal-to-list')
  async addJournalToList(@Body() { journalId, listId }: { journalId: number; listId: number }) {
    return await this.projectService.addJournalToList(journalId, listId);
  }

  // حذف مجله از لیست
  @Post('remove-journal-from-list')
  async removeJournalFromList(@Body() { journalId, listId }: { journalId: number; listId: number }) {
    return await this.projectService.removeJournalFromList(journalId, listId);
  }

  // ویرایش مجله
  @Post('edit-journal')
  async editJournal(@Body() { journalId, updatedData }: { journalId: number, updatedData: any }) {
    return await this.projectService.editJournal(journalId, updatedData);
  }

  // بارگذاری داده‌های اولیه به دیتابیس
  @Post('seed')
  async seedDatabase() {
    return await this.projectService.seedDatabase();
  }
}
