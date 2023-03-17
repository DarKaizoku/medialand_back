import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional, IsNumber } from 'class-validator';
import { CreateEmpruntDto } from './create-emprunt.dto';

export class UpdateEmpruntDto extends PartialType(CreateEmpruntDto) {
  @ApiProperty()
  @IsOptional()
  proprietaire: number;

  @ApiProperty()
  @IsOptional()
  emprunteur: number;

  @ApiProperty()
  @IsOptional()
  date_emprunt: Date;

  @ApiProperty()
  @IsOptional()
  media: number;
}
