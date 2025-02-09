import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journal } from './journal.entity';
import { List } from '../list/list.entity'; // وارد کردن List

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal)
    private journalRepository: Repository<Journal>, // دسترسی به ریپازیتوری مجله
    @InjectRepository(List)
    private listRepository: Repository<List>,  // دسترسی به ریپازیتوری لیست
  ) {}

  // ایجاد مجله جدید
  async createJournal(title: string, description: string, author?: string, listIds: number[] = []): Promise<Journal> {
    const journal = this.journalRepository.create({ title, description, author });

    // ارتباط با لیست‌ها در صورت ارسال
    if (listIds.length > 0) {
      const lists = await this.listRepository.findByIds(listIds);
      journal.lists = lists; // اضافه کردن لیست‌ها به مجله
    }

    return this.journalRepository.save(journal); // ذخیره مجله در پایگاه داده
  }

  // دریافت همه مجله‌ها
  async findAll(): Promise<Journal[]> {
    return this.journalRepository.find({ relations: ['lists'] }); // بارگذاری ارتباطات لیست‌ها
  }

  // پیدا کردن مجله بر اساس id
  async findOne(id: number): Promise<Journal | null> {
    return this.journalRepository.findOne({ where: { id }, relations: ['lists'] });
  }

  // بروزرسانی مجله
  async update(id: number, body: { title: string; description: string; author?: string; listIds?: number[] }): Promise<Journal> {
    const journal = await this.journalRepository.findOne({ where: { id }, relations: ['lists'] });
    
    if (!journal) {
      throw new Error('Journal not found');
    }

    journal.title = body.title;
    journal.description = body.description;
    if (body.author) {
      journal.author = body.author;
    }

    // بروزرسانی ارتباطات با لیست‌ها
    if (body.listIds) {
      const lists = await this.listRepository.findByIds(body.listIds);
      journal.lists = lists; // بروزرسانی لیست‌ها
    }

    return this.journalRepository.save(journal);
  }

  // حذف مجله
  async remove(id: number): Promise<void> {
    const journal = await this.findOne(id);
    if (!journal) {
      throw new Error('Journal not found');
    }
    await this.journalRepository.remove(journal);
  }
}
