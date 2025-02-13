import { Controller, Get, Post, Render, Body } from '@nestjs/common';
import { ProjectService } from './project/project.service';

@Controller()
export class AppController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('')
  @Render('home')
  homePage() {
    return {}; 
  }

  @Post('/search')
  async searchJournal(@Body('query') query: string) {
    const result = await this.projectService.searchJournal(query);
    return { journals: result.journals, lists: result.lists }; // بازگشت هر دو داده
  }
}
