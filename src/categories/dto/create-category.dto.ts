import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateCategorieDto {
  static minLength: number = 2;
  @ApiProperty()
  @MinLength(CreateCategorieDto.minLength)
  @IsNotEmpty()
  @IsString()
  nom: string;
}
