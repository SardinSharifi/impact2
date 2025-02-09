import { Controller, Get, Post, Param, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { JournalService } from './journal.service';
import { Journal } from './journal.entity';

@Controller('journals')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  create(@Body() body: { title: string, description: string, author?: string }): Promise<Journal> {
    return this.journalService.createJournal(body.title, body.description, body.author);
  }

  @Get()
  findAll(): Promise<Journal[]> {
    return this.journalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Journal> {
    return this.journalService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title: string, description: string, author?: string }
  ): Promise<Journal> {
    return this.journalService.update(Number(id), body.title, body.description, body.author);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.journalService.remove(Number(id));
  }
}

