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

  // Create a new journal
  async create(title: string, description: string, issn: string, listIds: number[] = []): Promise<Journal> {
    const journal = this.journalRepository.create({ title, description, issn });
    if (listIds.length > 0) {
      // Handle the relationship here
    }
    return this.journalRepository.save(journal);
  }

  // Fetch all journals
  async findAll(): Promise<Journal[]> {
    return this.journalRepository.find();
  }

  // Fetch a journal by ID
  async findOne(id: number): Promise<Journal | null> {
    return this.journalRepository.findOne({ where: { id } });
  }

  // Search journal by ISSN
  async findByIssn(issn: string): Promise<Journal | null> {
    return this.journalRepository.findOne({ where: { issn } });
  }

  // Update a journal by ID
  async update(id: number, body: { title: string; description: string; author?: string; issn?: string }): Promise<Journal> {
    const journal = await this.journalRepository.findOne({ where: { id } });
    if (!journal) {
      throw new Error('Journal not found');
    }

    journal.title = body.title;
    journal.description = body.description;
    journal.author = body.author || ''; // Ensure default value for optional fields
    journal.issn = body.issn || ''; // Ensure default value for optional fields

    return this.journalRepository.save(journal);
  }

  // Remove a journal by ID
  async remove(id: number): Promise<void> {
    const journal = await this.findOne(id);
    if (!journal) {
      throw new Error('Journal not found');
    }
    await this.journalRepository.remove(journal);
  }
}
