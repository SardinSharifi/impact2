import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { JournalService } from './journal.service';
import { Journal } from './journal.entity';

@Controller('journals')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  async create(@Body() body: { title: string; description: string; issn: string; lists?: number[] }): Promise<Journal> {
    return this.journalService.create(body.title, body.description, body.issn, body.lists || []);
  }

  @Get()
  async findAll(): Promise<Journal[]> {
    return this.journalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Journal> {
    const journal = await this.journalService.findOne(Number(id));
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }
    return journal;
  }

  @Get('search/issn/:issn')
  async searchByIssn(@Param('issn') issn: string): Promise<Journal | null> {
    return this.journalService.findByIssn(issn);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { title: string; description: string; author?: string; issn?: string }
  ): Promise<Journal> {
    return this.journalService.update(Number(id), body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.journalService.remove(Number(id));
  }
}
