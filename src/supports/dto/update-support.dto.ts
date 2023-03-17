import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateSupportDto } from './create-support.dto';

export class UpdateSupportDto extends PartialType(CreateSupportDto) {}
