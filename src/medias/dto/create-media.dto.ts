import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	IsOptional,
	MinLength,
	Length,
	IsNumber,
	IsArray,
} from 'class-validator';

import { DureeDto } from 'src/constants/duree.dto';

export class CreateMediaDto {
	static minLength: number = 1;

	@ApiProperty()
	@IsString()
	@MinLength(CreateMediaDto.minLength)
	@IsNotEmpty()
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
	support: number;

	@ApiProperty()
	@IsOptional()
	@IsArray()
	categorie: number[];

	@ApiProperty()
	@IsOptional()
	@IsArray()
	auteur: number[];
}
