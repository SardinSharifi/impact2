import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module'; // Import UserModule
import { JournalModule } from './journal/journal.module'; // Import JournalModule
import { ListModule } from './list/list.module'; // Import ListModule
import { User } from './user/user.entity'; // Import User entity
import { Journal } from './journal/journal.entity'; // Import Journal entity
import { List } from './list/list.entity'; // Import List entity
import { ConfigModule } from '@nestjs/config'; // To use .env files for environment variables

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Make config available globally
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost', // Use environment variable for host
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // Check for undefined and fall back to 5432
      username: process.env.DB_USERNAME || 'postgres', // Use environment variable for username
      password: process.env.DB_PASSWORD || '123456', // Use environment variable for password
      database: process.env.DB_NAME || 'journaldb', // Use environment variable for database name
      entities: [User, Journal, List], // Entities to be synchronized with the database
      synchronize: process.env.NODE_ENV === 'development', // Set to false in production
      logging: true,
      migrations: ['src/migrations/*.ts'], // Specify path for migrations
    }),
    TypeOrmModule.forFeature([Journal,User,List]),
    UserModule,  // Import UserModule
    JournalModule,  // Import JournalModule
    ListModule,  // Import ListModule
  ],
  providers: [],
})
export class AppModule {}
