import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateCategorieDto } from './create-category.dto';

export class UpdateCategorieDto extends PartialType(CreateCategorieDto) {}
