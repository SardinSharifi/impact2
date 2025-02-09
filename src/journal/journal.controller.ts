import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { JournalService } from './journal.service';
import { Journal } from './journal.entity';

@Controller('journals')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  create(@Body() body: { title: string; description: string; author?: string }): Promise<Journal> {
    return this.journalService.createJournal(body.title, body.description, body.author);
  }

  @Get()
  findAll(): Promise<Journal[]> {
    return this.journalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Journal> {
    const journal = await this.journalService.findOne(Number(id));
    if (!journal) {
      throw new Error('Journal not found');
    }
    return journal;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { title: string; description: string; author?: string }
  ): Promise<Journal> {
    return this.journalService.update(Number(id), body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.journalService.remove(Number(id));
  }
}
