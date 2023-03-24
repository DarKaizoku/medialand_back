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
export class Auteur extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column({ type: 'varchar' })
	nom: string;

	@ManyToMany(() => Media, (media) => media.auteur)
	media: Media[];
}
