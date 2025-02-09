
import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { Journal } from '../journal/journal.entity'; // وارد کردن موجودیت Journal
import { JournalModule } from '../journal/journal.module'; // وارد کردن JournalModule

@Module({
  imports: [
    TypeOrmModule.forFeature([List, Journal]), // اضافه کردن Journal به TypeOrmModule
    JournalModule, // وارد کردن JournalModule برای دسترسی به JournalRepository
  ],
  providers: [ListService],
  controllers: [ListController],
})
export class ListModule {}
