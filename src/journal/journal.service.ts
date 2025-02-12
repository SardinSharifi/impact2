import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journal } from './journal.entity';
import { List } from '../list/list.entity'; // Import the List entity

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal)
    private journalRepository: Repository<Journal>,

    @InjectRepository(List)
    private listRepository: Repository<List>, // Inject the List repository
  ) {}

  // Create a new journal
  async create(title: string, description: string, issn: string, listIds: number[] = []): Promise<Journal> {
    const journal = this.journalRepository.create({ title, description, issn });

    // If there are list IDs, associate the journal with the lists
    if (listIds.length > 0) {
      const lists = await this.listRepository.findByIds(listIds); // Find the lists by IDs
      journal.lists = lists; // Associate the lists with the journal
    }

    return this.journalRepository.save(journal);
  }

  // Fetch all journals
  async findAll(): Promise<Journal[]> {
    return this.journalRepository.find({ relations: ['lists'] }); // Load related lists with journals
  }

  // Fetch a journal by ID
  async findOne(id: number): Promise<Journal | null> {
    return this.journalRepository.findOne({ where: { id }, relations: ['lists'] }); // Include lists in the result
  }

  // Search journal by ISSN
  async findByIssn(issn: string): Promise<Journal | null> {
    return this.journalRepository.findOne({ where: { issn }, relations: ['lists'] }); // Include lists in the result
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
