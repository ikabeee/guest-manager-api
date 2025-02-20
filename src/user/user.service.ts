import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { name } = createUserDto;
      const user = await this.prisma.user.findFirst({
        where: { name },
        include: {
          guest: true,
        },
      });
      if (user) {
        throw new ConflictException('User already exist');
      }
      const createUser = this.prisma.user.create({
        data: { ...createUserDto },
      });
      return createUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Unexpected error', error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Unexpected error', error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { ...updateUserDto },
      });
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
        include: {
          guest: true,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.prisma.user.delete({ where: { id } });
      return 'User deleted';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }
}
