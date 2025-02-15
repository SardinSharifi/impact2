import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { List } from './list.entity';

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

  @CreateDateColumn()
  created_at: Date; 

  @ManyToMany(() => List, (list) => list.journals)
  @JoinTable({
    name: 'journal_list',  // نام جدول واسط
    joinColumn: { name: 'journal_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'list_id', referencedColumnName: 'id' },
  })
  lists: List[];
}
