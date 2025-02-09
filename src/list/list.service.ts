import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';  // Added 'In' import here
import { List } from './list.entity';
import { Journal } from '../journal/journal.entity';  // Ensure Journal is correctly imported

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  // Create a new list
  async create(name: string, type: string, journalIds: number[]): Promise<List> {
    const list = this.listRepository.create({ name, type, journals: [] });

    // Find journals by their IDs using the correct method
    const journals = await this.listRepository.manager.getRepository(Journal).find({
      where: { id: In(journalIds) }, // Ensure you import 'In' from 'typeorm'
    });
    
    list.journals = journals; // Assign the journals to the list
    return await this.listRepository.save(list);
  }

  // Get all lists
  async findAll(): Promise<List[]> {
    return this.listRepository.find({ relations: ['journals'] });  // Including related journals
  }

  // Get a list by its ID
  async findOne(id: number): Promise<List> {
    const list = await this.listRepository.findOne({ where: { id }, relations: ['journals'] });
    if (!list) {
      throw new NotFoundException('List not found');
    }
    return list;  // Return list directly as 'List' is already ensured
  }

  // Update a list by its ID
  async update(id: number, updateData: Partial<List>): Promise<List> {
    const list = await this.listRepository.findOne({ where: { id }, relations: ['journals'] });
    if (!list) {
      throw new NotFoundException('List not found');
    }

    await this.listRepository.update(id, updateData);  // Update the list
    const updatedList = await this.listRepository.findOne({ where: { id }, relations: ['journals'] });
    if (!updatedList) {
      throw new NotFoundException('List not found after update');
    }
    return updatedList;  // Return the updated list
  }

  // Remove a list by its ID
  async remove(id: number): Promise<void> {
    const list = await this.findOne(id);  // Using findOne to ensure the list exists
    await this.listRepository.remove(list);  // Remove the list
  }
}
