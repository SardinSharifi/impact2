import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { List } from './list.entity';

@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  issn: string;

  @ManyToMany(() => List, list => list.journals)
  lists: List[];
}
