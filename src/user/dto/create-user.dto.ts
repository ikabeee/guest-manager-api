import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/common/enums/Role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  tel: string;

  @IsNumber()
  @IsNotEmpty()
  sites: number;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
