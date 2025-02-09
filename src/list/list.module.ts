import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { JournalModule } from '../journal/journal.module';  // Correctly import JournalModule

@Module({
  imports: [TypeOrmModule.forFeature([List]), JournalModule],  // Include JournalModule here
  providers: [ListService],
  controllers: [ListController],
})
export class ListModule {}
