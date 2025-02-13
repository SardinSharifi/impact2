import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Journal } from './journal.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => Journal, (journal) => journal.id)
  journals: Journal[];
}
