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

  async createJournal(title: string, issn: string, publisher: string, country: string) {
    try {
      const journal = this.journalRepository.create({
        title,
        issn,
        publisher,
        country,
        created_at: new Date(),
      });

      await this.journalRepository.save(journal);
      return journal;
    } catch (error) {
      throw new Error('خطا در ایجاد مجله: ' + error.message);
    }
  }

  async getJournalByIssn(issn: string) {
    try {
      const journal = await this.journalRepository.findOne({
        where: { issn },
        relations: ['lists'],
        select: ['id', 'title', 'issn', 'publisher', 'country'],
      });

      if (!journal) {
        throw new NotFoundException('مجله مورد نظر یافت نشد');
      }

      return { journal, lists: journal.lists };
    } catch (error) {
      throw new Error('خطا در دریافت مجله: ' + error.message);
    }
  }

  async addJournal(journalData: { title: string; issn: string; publisher: string; country: string }) {
    const journal = this.journalRepository.create(journalData);
    return this.journalRepository.save(journal);
  }

  async addList(listData: { name: string; type: 'blacklist' | 'index' }) {
    try {
      const list = this.listRepository.create(listData);
      return await this.listRepository.save(list);
    } catch (error) {
      throw new Error('خطا در ایجاد لیست: ' + error.message);
    }
  }

  async searchJournal(query: string) {
    try {
      const journals = await this.journalRepository.find({
        where: [
          { issn: Like(`%${query}%`) },
          { title: Like(`%${query}%`) },
        ],
        relations: ['lists'],
      });

      const lists = journals.flatMap(journal => journal.lists);
      return { journals, lists };
    } catch (error) {
      throw new Error('خطا در جستجوی مجله: ' + error.message);
    }
  }

  async createList(name: string, type: 'blacklist' | 'index') {
    try {
      const list = this.listRepository.create({ name, type });
      await this.listRepository.save(list);
      return list;
    } catch (error) {
      throw new Error('خطا در ایجاد لیست: ' + error.message);
    }
  }

  async addJournalToList(journalId: number, listId: number) {
    try {
      const journal = await this.journalRepository.findOne({ where: { id: journalId }, relations: ['lists'] });
      const list = await this.listRepository.findOne({ where: { id: listId } });

      if (!journal || !list) {
        throw new NotFoundException('مجله یا لیست یافت نشد');
      }

      journal.lists = [...(journal.lists || []), list];
      await this.journalRepository.save(journal);

      return { journal, list };
    } catch (error) {
      throw new Error('خطا در افزودن مجله به لیست: ' + error.message);
    }
  }

  async removeJournalFromList(journalId: number, listId: number) {
    try {
      const journal = await this.journalRepository.findOne({ where: { id: journalId }, relations: ['lists'] });
      const list = await this.listRepository.findOne({ where: { id: listId } });

      if (!journal || !list) {
        throw new NotFoundException('مجله یا لیست یافت نشد');
      }

      journal.lists = journal.lists.filter(l => l.id !== listId);
      await this.journalRepository.save(journal);

      return { journal, list };
    } catch (error) {
      throw new Error('خطا در حذف مجله از لیست: ' + error.message);
    }
  }

  async editJournal(journalId: number, updateData: Partial<Journal>) {
    try {
      const journal = await this.journalRepository.findOne({ where: { id: journalId } });

      if (!journal) {
        throw new NotFoundException('مجله یافت نشد');
      }

      Object.assign(journal, updateData);
      await this.journalRepository.save(journal);
      return journal;
    } catch (error) {
      throw new Error('خطا در ویرایش مجله: ' + error.message);
    }
  }

  async seedDatabase() {
    try {
      const blacklist = await this.createList("Beall's List", 'blacklist');
      const index1 = await this.createList("Scopus", 'index');
      const index2 = await this.createList("ISI", 'index');

      const journal1 = await this.createJournal("Nature", "1476-4687", "Springer", "United Kingdom");
      const journal2 = await this.createJournal("Science", "0036-8075", "AAAS", "United States");
      const journal3 = await this.createJournal("PLOS ONE", "1932-6203", "PLOS", "United States");

      await this.addJournalToList(journal1.id, index1.id);
      await this.addJournalToList(journal2.id, index2.id);
      await this.addJournalToList(journal3.id, blacklist.id);

      console.log("✅ Database seeded successfully!");
    } catch (error) {
      console.error('خطا در بارگذاری داده‌های اولیه:', error.message);
    }
  }
}
