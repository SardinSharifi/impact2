import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module'; // وارد کردن UserModule
import { JournalModule } from './journal/journal.module'; // وارد کردن JournalModule
import { ListModule } from './list/list.module'; // وارد کردن ListModule
import { User } from './user/user.entity'; // وارد کردن User entity
import { Journal } from './journal/journal.entity'; // وارد کردن Journal entity
import { List } from './list/list.entity'; // وارد کردن List entity

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
      entities: [User, Journal, List], // وارد کردن entityهای User، Journal و List
      synchronize: true, // برای توسعه می‌توانید true بگذارید
    }),
    UserModule,  // وارد کردن UserModule برای استفاده از User functionality
    JournalModule,  // وارد کردن JournalModule برای استفاده از Journal functionality
    ListModule,     // وارد کردن ListModule برای استفاده از List functionality
  ],
  providers: [],
})
export class AppModule {}
