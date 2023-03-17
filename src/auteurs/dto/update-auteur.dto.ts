import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateAuteurDto } from './create-auteur.dto';

export class UpdateAuteurDto extends PartialType(CreateAuteurDto) {}
