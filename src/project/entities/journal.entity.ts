import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
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

  @ManyToMany(() => List, list => list.journals)
  @JoinTable() 
  lists: List[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
