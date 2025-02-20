import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Guest } from '@prisma/client';

@Injectable()
export class GuestService {
  constructor(private prisma: PrismaService) {}
  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
    try {
      const name = createGuestDto.name.toLowerCase();
      const checkGuestonguests = await this.prisma.guest.findFirst({
        where: { name },
      });
      const checkGuest = await this.prisma.guest.findFirst({
        where: { name },
      });
      if (checkGuestonguests) {
        throw new ConflictException('Guest already invited');
      }
      if (!checkGuest) {
        throw new NotFoundException('Guest already exist on the list');
      }
      const guest = await this.prisma.guest.create({
        data: { ...createGuestDto, name },
      });
      return guest;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Unexpected error', error);
    }
  }

  async findAll(): Promise<Guest[]> {
    try {
      const guests = await this.prisma.guest.findMany();
      return guests;
    } catch (error) {
      throw new InternalServerErrorException('Unexpected error', error);
    }
  }

  async findOne(id: number): Promise<Guest> {
    try {
      const guest = await this.prisma.guest.findFirst({
        where: { id },
      });
      if (!guest) {
        throw new NotFoundException('Guest not found');
      }
      return guest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async update(id: number, updateGuestDto: UpdateGuestDto): Promise<Guest> {
    try {
      const guest = await this.prisma.guest.findUnique({
        where: {
          id,
        },
      });
      if (!guest) {
        throw new NotFoundException('guest not found');
      }
      const name = updateGuestDto.name?.toLowerCase();
      const updatedguest = await this.prisma.guest.update({
        where: { id },
        data: { ...updateGuestDto, name },
      });
      return updatedguest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const guest = await this.prisma.guest.findUnique({ where: { id } });
      if (!guest) {
        throw new NotFoundException('Guest not found');
      }
      await this.prisma.guest.delete({ where: { id } });
      return 'guest deleted';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }
}
