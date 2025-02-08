import { Controller, Get, Post, Param, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ایجاد user
  @Post()
  create(@Body() body: { username: string; password: string; email?: string }): Promise<User> {
    return this.userService.createUser(body.username, body.password, body.email);
  }

  // گرفتن تمام users
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // گرفتن user با id خاص
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(Number(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // ویرایش user
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { username: string; password: string; email?: string }
  ): Promise<User> {
    return this.userService.update(Number(id), body.username, body.password, body.email);
  }

  // حذف user
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
