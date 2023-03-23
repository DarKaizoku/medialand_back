import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMediaDto } from './create-media.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  titre: string;

  @ApiProperty()
  @IsOptional()
  format: number;
}
