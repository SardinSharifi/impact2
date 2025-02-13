import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Journal } from './entities/journal.entity';
import { List } from './entities/list.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Journal)
    private journalRepository: Repository<Journal>,

    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  async getJournalByIssn(issn: string) {
    const journal = await this.journalRepository.findOne({ where: { issn } });
    if (!journal) {
      throw new NotFoundException('مجله مورد نظر یافت نشد');
    }

    const lists = await this.listRepository.find({ where: { journal } });
    return { journal, lists };
  }

  async searchJournal(query: string) {
    const journals = await this.journalRepository.find({
      where: [
        { issn: Like(`%${query}%`) },
        
      ],
      relations: ['lists'], 
    });

    if (!journals.length) {
      throw new NotFoundException('نتیجه‌ای برای جستجو یافت نشد');
    }

    return { journals };
  }
}
