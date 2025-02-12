import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JournalModule } from './journal/journal.module';
import { ListModule } from './list/list.module';
import { User } from './user/user.entity';
import { Journal } from './journal/journal.entity';
import { List } from './list/list.entity';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    UserModule,
    JournalModule,
    ListModule,
  ],
  providers: [],
})
export class AppModule {}
