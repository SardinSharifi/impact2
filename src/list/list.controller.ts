
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ListService } from './list.service';
import { List } from './list.entity';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() body: { name: string; type: string }): Promise<List> {
    return this.listService.createList(body.name, body.type);
  }

  @Get()
  findAll(): Promise<List[]> {
    return this.listService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<List> {
    const list = await this.listService.findOne(Number(id));
    if (!list) {
      throw new Error('List not found');
    }
    return list;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; type: string }
  ): Promise<List> {
    return this.listService.update(Number(id), { name: body.name, type: body.type });

  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.listService.remove(Number(id));
  }
}
