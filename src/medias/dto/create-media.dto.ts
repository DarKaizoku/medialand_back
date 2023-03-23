import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  MinLength,
  Length,
  IsNumber,
} from 'class-validator';

export class CreateMediaDto {
  static minLength: number = 1;

  @ApiProperty()
  @MinLength(CreateMediaDto.minLength)
  @IsNotEmpty()
  @IsString()
  titre: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  duree: Date;

  @ApiProperty()
  @IsOptional()
  @Length(2, 255)
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  annee: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  format: number;
}
