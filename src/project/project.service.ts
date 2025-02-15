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

  // ایجاد یک مجله جدید با استفاده از پارامترها
  async createJournal(title: string, issn: string, publisher: string, country: string) {
    const journal = this.journalRepository.create({
      title,
      issn,
      publisher,
      country,
      created_at: new Date(),
    });
  
    await this.journalRepository.save(journal);
    return journal;
  }
  

  // دریافت مجله بر اساس ISSN و نمایش لیست‌ها
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

  // جستجو برای مجلات بر اساس ISSN یا عنوان و نمایش لیست‌ها
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

    // استخراج همه لیست‌ها از مجلات
    const lists = journals.flatMap(journal => journal.lists); 

    return { journals, lists }; // بازگشت همزمان مجلات و لیست‌ها
  }

  // ایجاد لیست‌های blacklist و index
  async createList(name: string, type: 'blacklist' | 'index') {
    const list = this.listRepository.create({
      name,
      type,
    });

    await this.listRepository.save(list);
    return list;
  }

  // ارتباط یک مجله با لیست‌ها
  async addJournalToList(journalId: number, listId: number) {
    const journal = await this.journalRepository.findOne({ where: { id: journalId } });
    const list = await this.listRepository.findOne({ where: { id: listId } });

    if (!journal || !list) {
      throw new NotFoundException('مجله یا لیست یافت نشد');
    }

    journal.lists = [...(journal.lists || []), list];
    await this.journalRepository.save(journal);

    return { journal, list }; // برگرداندن مجله و لیست به روز شده
  }
}
