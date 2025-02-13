import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Journal } from './journal.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Journal, journal => journal.lists)
  journals: Journal[];
}
