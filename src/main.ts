import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';
const session = require('express-session');  // استفاده از require به جای import

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(session({
    secret: 'secret',  // کلید برای امضای session
    resave: false,
    saveUninitialized: false,
  }));

  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  await app.listen(3000);
}

bootstrap();
