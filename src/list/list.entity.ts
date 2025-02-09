
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Journal } from '../journal/journal.entity'; // وارد کردن Journal entity

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // نام لیست (مثل "Blacklist" یا "Index")

  @Column()
  type: string;  // نوع لیست (Blacklist یا Index)

  @ManyToMany(() => Journal, (journal) => journal.lists)
  @JoinTable() // برای ایجاد جدول Join بین Journal و List
  journals: Journal[]; // لیستی از مجلات که در این لیست قرار دارند
}
