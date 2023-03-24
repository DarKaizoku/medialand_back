import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength, IsLowercase } from 'class-validator';
export class CreateCategorieDto {
	static minLength: number = 2;
	@ApiProperty()
	@MinLength(CreateCategorieDto.minLength)
	@IsNotEmpty()
	@IsString()
	nom: string;
}
