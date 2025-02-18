import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('search')
  async searchJournal(@Body('query') query: string) {
    try {
      const { journals, lists } = await this.projectService.searchJournal(query);
      return { journals, lists };
    } catch (error) {
      return { error: 'خطا در جستجو. لطفاً دوباره تلاش کنید.' };
    }
  }

  @Get(':issn')
  async getJournalByIssn(@Param('issn') issn: string) {
    try {
      const journal = await this.projectService.getJournalByIssn(issn);
      return { journal };
    } catch (error) {
      return { error: 'خطا در دریافت مجله. لطفاً دوباره تلاش کنید.' };
    }
  }

  @Post('add-journal')
  async addJournal(@Body() journalData: { title: string; issn: string; publisher: string; country: string }) {
    return await this.projectService.addJournal(journalData);
  }

  @Post('add-list')
  async addList(@Body() listData: { name: string; type: 'blacklist' | 'index' }) {
    return await this.projectService.addList(listData);
  }

  @Post('add-journal-to-list')
  async addJournalToList(@Body() { journalId, listId }: { journalId: number; listId: number }) {
    return await this.projectService.addJournalToList(journalId, listId);
  }

  @Post('remove-journal-from-list')
  async removeJournalFromList(@Body() { journalId, listId }: { journalId: number; listId: number }) {
    return await this.projectService.removeJournalFromList(journalId, listId);
  }

  @Post('edit-journal')
  async editJournal(@Body() { journalId, updatedData }: { journalId: number, updatedData: any }) {
    return await this.projectService.editJournal(journalId, updatedData);
  }

  @Post('seed')
  async seedDatabase() {
    return await this.projectService.seedDatabase();
  }
}
