import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateSupportDto {
  static minLength: number = 2;

  @ApiProperty()
  @MinLength(CreateSupportDto.minLength)
  @IsNotEmpty()
  @IsString()
  nom: string;
}
