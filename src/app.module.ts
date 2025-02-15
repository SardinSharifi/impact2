import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';  // وارد کردن ماژول پروژه
import { User } from './project/entities/user.entity';  // اصلاح مسیر موجودیت‌ها
import { Journal } from './project/entities/journal.entity';  // اصلاح مسیر موجودیت‌ها
import { List } from './project/entities/list.entity';  // اصلاح مسیر موجودیت‌ها
import { AppController } from './app.controller'; // وارد کردن AppController
import { AppService } from './app.service'; // وارد کردن AppService

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'journaldb',
      entities: [User, Journal, List],
      synchronize: process.env.NODE_ENV === 'development',
      logging: true,
      migrations: ['src/migrations/*.ts'],
    }),
    TypeOrmModule.forFeature([User, Journal, List]),
    ProjectModule,  
  ],
  controllers: [AppController], 
  providers: [AppService], 
})
export class AppModule {}
