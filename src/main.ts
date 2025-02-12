import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; 
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  // تنظیم View Engine (EJS)
  app.setViewEngine('ejs');

  // تنظیم مسیر فایل‌های Views
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));

  // تنظیم مسیر فایل‌های استاتیک
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  // شروع به گوش دادن درخواست‌ها در پورت 3000
  await app.listen(3000);
}
bootstrap();
