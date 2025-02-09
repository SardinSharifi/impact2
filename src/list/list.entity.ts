import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Journal } from '../journal/journal.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;  // e.g., 'blacklist', 'index'

  @ManyToMany(() => Journal)
  @JoinTable()
  journals: Journal[];  // Many-to-many relationship with the Journal entity
}
