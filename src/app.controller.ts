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
    return this.projectService.searchJournal(query); // جستجو در سرویس
  }
}
