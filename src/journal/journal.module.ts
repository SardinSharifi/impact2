import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from './journal.entity';  // وارد کردن مدل Journal
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Journal])], // دسترسی به Journal در این module
  providers: [JournalService],  // خدمات مربوط به Journal
  controllers: [JournalController],  // کنترلر مربوط به Journal
})
export class JournalModule {}
