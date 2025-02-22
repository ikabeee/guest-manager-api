import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GuestController],
  providers: [GuestService],
  imports: [PrismaModule],
})
export class GuestModule {}
