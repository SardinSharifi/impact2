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

  // ایجاد یک مجله جدید
  async createJournal() {
    const journal = this.journalRepository.create({
      title: 'عنوان مجله',
      issn: '1234-5678',
    });

    await this.journalRepository.save(journal);
    return journal;
  }

  // دریافت مجله بر اساس ISSN
  async getJournalByIssn(issn: string) {
    const journal = await this.journalRepository.findOne({
      where: { issn },
      relations: ['lists'], // بارگذاری لیست‌ها همراه با مجله
    });

    if (!journal) {
      throw new NotFoundException('مجله مورد نظر یافت نشد');
    }

    return { journal, lists: journal.lists }; // برگرداندن لیست‌ها به عنوان بخش از جواب
  }

  // جستجو برای مجلات بر اساس ISSN یا عنوان
  async searchJournal(query: string) {
    const journals = await this.journalRepository.find({
      where: [
        { issn: Like(`%${query}%`) },
        { title: Like(`%${query}%`) },
      ],
      relations: ['lists'],
    });
  
    if (!journals.length) {
      throw new NotFoundException('نتیجه‌ای برای جستجو یافت نشد');
    }
  
    const lists = journals.flatMap(journal => journal.lists); // استخراج همه لیست‌ها از مجلات
  
    return { journals, lists }; // حالا هم مجلات و هم لیست‌ها را باز می‌گردانیم
  }
  
  
}
