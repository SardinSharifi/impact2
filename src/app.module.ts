import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module'; // وارد کردن UserModule
import { JournalModule } from './journal/journal.module'; // وارد کردن JournalModule
import { User } from './user/user.entity'; // وارد کردن User entity
import { Journal } from './journal/journal.entity'; // وارد کردن Journal entity

@Module({
  imports: [
    // تنظیمات TypeORM برای اتصال به دیتابیس PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD || '123456', // استفاده از متغیر محیطی برای پسورد
      database: 'journaldb', // نام پایگاه داده
      entities: [User, Journal], // وارد کردن entityهای User و Journal
      synchronize: true, // برای توسعه می‌توانید true بگذارید
    }),
    UserModule,  // وارد کردن UserModule برای استفاده از User functionality
    JournalModule,  // وارد کردن JournalModule برای استفاده از Journal functionality
  ],
  providers: [],
})
export class AppModule {}
