import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Journal } from './journal.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 'blacklist' | 'index';

  @ManyToMany(() => Journal, (journal) => journal.lists)
  journals: Journal[];
  

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
