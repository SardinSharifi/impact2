import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Journal } from './entities/journal.entity';
import { List } from './entities/list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Journal, List]),  // وارد کردن موجودیت‌ها
  ],
  controllers: [ProjectController],  
  providers: [ProjectService],  
})
export class ProjectModule {}
