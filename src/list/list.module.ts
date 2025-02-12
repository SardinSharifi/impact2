import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List } from './list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List])],  // Import List entity for TypeORM
  providers: [ListService],
  controllers: [ListController],
  exports: [ListService],  // Export ListService to be used in other modules
})
export class ListModule {}
