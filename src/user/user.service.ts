import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // Injecting the repository
  ) {}

  // ایجاد یک user جدید
  async createUser(username: string, password: string, email?: string): Promise<User> {
    const user = this.userRepository.create({ username, password, email });
    return this.userRepository.save(user);
  }

  // گرفتن تمام users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // گرفتن user با id خاص
  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // حذف user با id خاص
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(user);
  }

  // ویرایش user با id خاص
  async update(id: number, username: string, password: string, email?: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    user.username = username;
    user.password = password;
    if (email) {
      user.email = email;
    }

    return this.userRepository.save(user);
  }
}
