import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;  // عنوان مقاله یا ژورنال

  @Column()
  description: string;  // توضیحات یا خلاصه مقاله

  @CreateDateColumn()
  createdAt: Date;  // تاریخ ایجاد مقاله

  @Column({ default: true })
  isActive: boolean;  // وضعیت فعال بودن ژورنال (مقاله)

  @Column({ nullable: true })
  author: string;  // نویسنده مقاله (اختیاری)
}
