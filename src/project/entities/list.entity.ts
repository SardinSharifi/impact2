import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Journal } from './journal.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // blacklist or index

  @ManyToOne(() => Journal, (journal) => journal.id)
  journal: Journal;
}
