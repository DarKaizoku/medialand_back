import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMediaDto } from './create-media.dto';
import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { Support } from 'src/supports/entities/support.entity';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
	@ApiProperty()
	@IsOptional()
	@IsString()
	titre: string;

	@ApiProperty()
	@IsOptional()
	format: number;

	@ApiProperty()
	@IsOptional()
	proprietaire: number[];

	@ApiProperty()
	@IsOptional()
	support: Support;
}
