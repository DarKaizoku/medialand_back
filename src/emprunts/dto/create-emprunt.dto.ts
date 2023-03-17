import { ApiProperty } from '@nestjs/swagger';
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
  date_emprunt: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  date_rendu: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  media: number;
}
