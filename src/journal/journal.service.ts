import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journal } from './journal.entity';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal)
    private journalRepository: Repository<Journal>,
  ) {}

  async createJournal(title: string, description: string, author?: string): Promise<Journal> {
    const journal = this.journalRepository.create({ title, description, author });
    return this.journalRepository.save(journal);
  }

  async findAll(): Promise<Journal[]> {
    return this.journalRepository.find();
  }

  async findOne(id: number): Promise<Journal> {
    const journal = await this.journalRepository.findOne({ where: { id } });
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }
    return journal;
  }

  async update(id: number, title: string, description: string, author?: string): Promise<Journal> {
    const journal = await this.journalRepository.findOne({ where: { id } });
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }
    journal.title = title;
    journal.description = description;
    if (author) journal.author = author;
    return this.journalRepository.save(journal);
  }

  async remove(id: number): Promise<void> {
    const journal = await this.journalRepository.findOne({ where: { id } });
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }
    await this.journalRepository.remove(journal);
  }
}
