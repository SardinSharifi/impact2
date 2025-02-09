import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ListService } from './list.service';  // Import the ListService
import { List } from './list.entity';          // Import the List entity

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async create(@Body() body: { name: string; type: string; journalIds: number[] }): Promise<List> {
    return this.listService.create(body.name, body.type, body.journalIds);  // Call the ListService to create a list
  }

  @Get()
  async findAll(): Promise<List[]> {
    return this.listService.findAll();  // Call the ListService to get all lists
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<List> {
    const list = await this.listService.findOne(Number(id));  // Call the ListService to get a list by ID
    if (!list) {
      throw new NotFoundException('List not found');
    }
    return list;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; type?: string; journalIds?: number[] }
  ): Promise<List> {
    return this.listService.update(Number(id), body);  // Call the ListService to update a list
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.listService.remove(Number(id));  // Call the ListService to remove a list
  }
}

