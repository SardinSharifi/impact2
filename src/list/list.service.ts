import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm'; // وارد کردن In از typeorm
import { List } from './list.entity'; // وارد کردن List entity
import { Journal } from '../journal/journal.entity'; // وارد کردن Journal entity

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>, // دسترسی به لیست‌ها
    @InjectRepository(Journal)
    private journalRepository: Repository<Journal>, // دسترسی به مجلات
  ) {}

  // ایجاد لیست جدید
  async createList(name: string, type: string, journalIds: number[] = []): Promise<List> {
    const list = this.listRepository.create({ name, type });

    // اگر آی‌دی‌های مجلات ارسال شد، ارتباط‌ها را نیز اضافه کنید
    if (journalIds.length > 0) {
      const journals = await this.journalRepository.find({
        where: { id: In(journalIds) }, // استفاده از In برای یافتن مجلات بر اساس آی‌دی
      });
      list.journals = journals;
    }

    return this.listRepository.save(list); // ذخیره لیست در پایگاه داده
  }

  // دریافت همه لیست‌ها
  async findAll(): Promise<List[]> {
    return this.listRepository.find({ relations: ['journals'] }); // بارگذاری ارتباطات مجلات
  }

  // پیدا کردن لیست با id
  async findOne(id: number): Promise<List | null> {
    return this.listRepository.findOne({ where: { id }, relations: ['journals'] });
  }

  // بروزرسانی لیست
  async update(id: number, body: { name: string; type: string; journalIds?: number[] }): Promise<List> {
    const list = await this.listRepository.findOne({ where: { id }, relations: ['journals'] });

    if (!list) {
      throw new Error('List not found');
    }

    list.name = body.name;
    list.type = body.type;

    // بروزرسانی ارتباطات با مجلات
    if (body.journalIds) {
      const journals = await this.journalRepository.find({
        where: { id: In(body.journalIds) }, // استفاده از In برای یافتن مجلات بر اساس آی‌دی
      });
      list.journals = journals;
    }

    return this.listRepository.save(list); // ذخیره لیست
  }

  // حذف لیست
  async remove(id: number): Promise<void> {
    const list = await this.findOne(id);
    if (!list) {
      throw new Error('List not found');
    }
    await this.listRepository.remove(list); // حذف لیست
  }
}
