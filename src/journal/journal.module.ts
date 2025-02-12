import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { Journal } from './journal.entity';
import { List } from '../list/list.entity';  // Import List entity for TypeORM
import { ListModule } from '../list/list.module';  // Import ListModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Journal]),  // Ensure Journal is correctly imported
    TypeOrmModule.forFeature([List]),  // Ensure List is imported to make ListRepository available
    ListModule,  // Import ListModule to provide ListService
  ],
  providers: [JournalService],
  controllers: [JournalController],
})
export class JournalModule {}
