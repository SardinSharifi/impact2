import { Injectable } from '@nestjs/common';
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

  async findOne(id: number): Promise<Journal | null> {
    return this.journalRepository.findOne({ where: { id } });
  }

  async update(id: number, body: { title: string; description: string; author?: string }): Promise<Journal> {
    const journal = await this.journalRepository.findOne({ where: { id } });
    if (!journal) {
      throw new Error('Journal not found');
    }
    journal.title = body.title;
    journal.description = body.description;
    if (body.author) {
      journal.author = body.author;
    }
    return this.journalRepository.save(journal);
  }

  async remove(id: number): Promise<void> {
    const journal = await this.findOne(id);
    if (!journal) {
      throw new Error('Journal not found');
    }
    await this.journalRepository.remove(journal);
  }
}
