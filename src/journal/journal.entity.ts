import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { List } from '../list/list.entity'; // وارد کردن entity مربوط به لیست‌ها

@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  author?: string; // فیلد author که اختیاری است

  @ManyToMany(() => List, (list) => list.journals)
  lists: List[]; // ارتباط Many-to-Many با لیست‌ها
}
