import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { List } from '../list/list.entity'; // Importing List entity

@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // Add the missing 'title' field

  @Column()
  description: string; // Add the missing 'description' field

  @Column()
  author: string; // Add the missing 'author' field

  @Column()
  issn: string; // ISSN for the journal

  // Many-to-Many relationship with List entity (blacklists, indexes)
  @ManyToMany(() => List, (list) => list.journals)
  @JoinTable() // Creates a join table for the Many-to-Many relationship
  lists: List[];
}

