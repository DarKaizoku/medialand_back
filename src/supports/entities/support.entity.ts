import { ApiProperty } from '@nestjs/swagger';
import { Media } from 'src/medias/entities/media.entity';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';

@Entity()
@Unique(['nom'])
export class Support extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column({ type: 'varchar' })
	nom: string;
}
