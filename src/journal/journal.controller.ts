import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { JournalService } from './journal.service';
import { Journal } from './journal.entity';

@Controller('journals')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  create(
    @Body() body: { title: string; description: string; author?: string }
  ): Promise<Journal> {
    return this.journalService.createJournal(
      body.title,
      body.description,
      body.author
    );
  }

  @Get()
  findAll(): Promise<Journal[]> {
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

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { title: string; description: string; author?: string }
  ): Promise<Journal> {
    return this.journalService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.journalService.remove(id);
  }
}
