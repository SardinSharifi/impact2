import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { JournalService } from './journal.service';
import { Journal } from './journal.entity';

@Controller('journals')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  // Create a new journal
  @Post()
  async create(@Body() body: { title: string; description: string; issn: string; lists?: number[] }): Promise<Journal> {
    return this.journalService.create(body.title, body.description, body.issn, body.lists || []);
  }

  // Get all journals
  @Get()
  async findAll(): Promise<Journal[]> {
    return this.journalService.findAll();
  }

  // Get a journal by its ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Journal> {
    const journal = await this.journalService.findOne(Number(id));
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }
    return journal;
  }

  // Search journal by ISSN
  @Get('search/issn/:issn')
  async searchByIssn(@Param('issn') issn: string): Promise<Journal | null> {
    const journal = await this.journalService.findByIssn(issn);
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }
    return journal;
  }

  // Update a journal by its ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { title: string; description: string; author?: string; issn?: string }
  ): Promise<Journal> {
    return this.journalService.update(Number(id), body);
  }

  // Delete a journal by its ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.journalService.remove(Number(id));
  }
}
