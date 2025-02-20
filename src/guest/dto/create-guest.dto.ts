import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGuestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  tel: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
