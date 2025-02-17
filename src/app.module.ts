import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';  // وارد کردن ماژول پروژه
import { User } from './project/entities/user.entity';  // اصلاح مسیر موجودیت‌ها
import { Journal } from './project/entities/journal.entity';  // اصلاح مسیر موجودیت‌ها
import { List } from './project/entities/list.entity';  // اصلاح مسیر موجودیت‌ها
import { AppController } from './app.controller'; // وارد کردن AppController
import { AppService } from './app.service'; // وارد کردن AppService
import { AdminModule } from './admin/admin.module'; // وارد کردن ماژول ادمین

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // باعث می‌شود که تنظیمات از هرجا در پروژه قابل دسترسی باشند
      envFilePath: '.env', // مسیر فایل پیکربندی
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost', // استفاده از متغیر محیطی برای تنظیمات دیتابیس
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'journaldb',
      entities: [User, Journal, List],  // اضافه کردن موجودیت‌ها
      synchronize: process.env.NODE_ENV === 'development',  // فقط در محیط توسعه جداول به‌روز می‌شوند
      logging: true,  // برای لاگ کردن کوئری‌ها
      migrations: ['src/migrations/*.ts'],  // مسیر مایگریشن‌ها
    }),
    TypeOrmModule.forFeature([User, Journal, List]), // برای استفاده از موجودیت‌ها در پروژه
    ProjectModule,  // ماژول پروژه
    AdminModule,   // اضافه کردن ماژول ادمین
  ],
  controllers: [AppController],  // در صورتی که نیاز به استفاده از کنترلر اصلی دارید
  providers: [AppService],  // در صورتی که نیاز به استفاده از سرویس اصلی دارید
})
export class AppModule {}
