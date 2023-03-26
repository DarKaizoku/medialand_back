import { ApiProperty } from '@nestjs/swagger';
import { Media } from 'src/medias/entities/media.entity';
import { Support } from 'src/supports/entities/support.entity';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';

@Entity()
export class Categorie extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column({ type: 'varchar' })
	nom: string;

	@ApiProperty()
	@ManyToOne(() => Support, (support) => support.id, { eager: true })
	support: Support;
}
