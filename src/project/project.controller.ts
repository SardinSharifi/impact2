import { Controller, Get, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':issn')
  async getJournalByIssn(@Param('issn') issn: string) {
    const journal = await this.projectService.getJournalByIssn(issn);
    if (!journal) {
      throw new Error('مجله با این ISSN یافت نشد.');
    }
    return journal;
  }
}
