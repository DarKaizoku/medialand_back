import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	IsOptional,
	MinLength,
	Length,
	IsNumber,
	IsObject,
} from 'class-validator';
import { Auteur } from 'src/auteurs/entities/auteur.entity';
import { Categorie } from 'src/categories/entities/category.entity';
import { DureeDto } from 'src/constants/duree.dto';
import { Support } from 'src/supports/entities/support.entity';

export class CreateMediaDto {
	static minLength: number = 1;

	@ApiProperty()
	@MinLength(CreateMediaDto.minLength)
	@IsNotEmpty()
	@IsString()
	titre: string;

	@ApiProperty()
	@IsOptional()
	duree: DureeDto | number;

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

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	proprietaire: number[];

	@ApiProperty()
	@IsNotEmpty()
	support: Support[];

	@ApiProperty()
	@IsOptional()
	categorie: Categorie[];

	@ApiProperty()
	@IsOptional()
	auteur: Auteur[];
}
