import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  issn: string;

  @Column()
  description: string;
}
