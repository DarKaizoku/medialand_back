import { ApiProperty } from '@nestjs/swagger';
import {
	IsString,
	IsNotEmpty,
	MinLength,
	IsNumber,
} from 'class-validator';
export class CreateCategorieDto {
	static minLength: number = 2;

	@ApiProperty() // intégration de lapropriété à Zwagger
	@MinLength(CreateCategorieDto.minLength) // controle de la longueur de la chaine de caractère, ici minimum 2 caractères
	@IsNotEmpty() // controle de l'obligation de la présence d'un donnée
	@IsString() // controle du type de donnée, ici chaine de caractère
	nom: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	support: number;
}
