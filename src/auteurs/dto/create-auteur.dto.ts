import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateAuteurDto {
  static minLength: number = 1;

  @ApiProperty()
  @MinLength(CreateAuteurDto.minLength)
  @IsNotEmpty()
  @IsString()
  nom: string;
}
