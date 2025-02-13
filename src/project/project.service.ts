import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      throw new NotFoundException('Journal not found');
    }

    const lists = await this.listRepository.find({ where: { journal: journal } });
    return { journal, lists };
  }
}

