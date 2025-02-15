
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { List } from './list.entity'; // فرض می‌کنیم لیست‌ها در این فایل موجود است

@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  issn: string;

  @Column()
  publisher: string;

  @Column()
  country: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToMany(() => List, list => list.journals) // فرض شده که List و روابط Many-to-Many درست تنظیم شده
  lists: List[];
}
