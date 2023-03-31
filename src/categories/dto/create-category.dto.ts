import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsString,
	IsNotEmpty,
	MinLength,
	IsLowercase,
	IsNumber,
} from 'class-validator';
import { Support } from 'src/supports/entities/support.entity';
export class CreateCategorieDto {
	static minLength: number = 2;
    
	@ApiProperty()
	@MinLength(CreateCategorieDto.minLength)
	@IsNotEmpty()
	@IsString()
	nom: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	support: number;
}
