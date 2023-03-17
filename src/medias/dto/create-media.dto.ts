import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsBoolean,
  IsOptional,
  MinLength,
  Length,
} from 'class-validator';

export class CreateMediaDto {
  static minLength: number = 1;

  @ApiProperty()
  @MinLength(CreateMediaDto.minLength)
  @IsNotEmpty()
  @IsString()
  titre: string;

  @ApiProperty()
  @Optional()
  @IsDate()
  duree: Date;

  @ApiProperty()
  @Optional()
  @Length(2, 255)
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  annee: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  format: boolean;
}
