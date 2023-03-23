import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate, IsNumber, IsOptional } from 'class-validator';
export class CreateEmpruntDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  proprietaire: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  emprunteur: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date_emprunt: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_rendu: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  media: number;
}
