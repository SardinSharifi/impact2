import { Controller, Get, Post, Param, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: { username: string, password: string, email?: string }): Promise<User> {
    return this.userService.createUser(body.username, body.password, body.email);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(Number(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { username: string, password: string, email?: string }
  ): Promise<User> {
    return this.userService.update(Number(id), body.username, body.password, body.email);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(Number(id));
  }
}
