import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

//Création d'un Dto pour faciliter la controle et le remplissage de données, de type TDuree
export class DureeDto {
	@ApiProperty()
	@IsOptional()
	@IsNumber()
	heures: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	minutes: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	secondes: number;
}
