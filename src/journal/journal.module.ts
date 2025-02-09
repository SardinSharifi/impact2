
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from './journal.entity';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { List } from '../list/list.entity'; // وارد کردن List

@Module({
  imports: [TypeOrmModule.forFeature([Journal, List])], // اضافه کردن List
  providers: [JournalService],
  controllers: [JournalController],
})
export class JournalModule {}
