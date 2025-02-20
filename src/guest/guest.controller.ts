import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post('create')
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestService.create(createGuestDto);
  }

  @Get('all')
  findAll() {
    return this.guestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.guestService.findOne(+id);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateGuestDto: UpdateGuestDto,
  ) {
    return this.guestService.update(+id, updateGuestDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.guestService.remove(+id);
  }
}
