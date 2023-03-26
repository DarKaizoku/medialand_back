import { ApiProperty } from '@nestjs/swagger';
import { Auteur } from 'src/auteurs/entities/auteur.entity';
import { Categorie } from 'src/categories/entities/category.entity';
import { Support } from 'src/supports/entities/support.entity';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Media extends BaseEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column({ type: 'varchar' })
	titre: string;

	@ApiProperty()
	@Column({ type: 'integer', nullable: true })
	duree: number;

	@ApiProperty()
	@Column({ type: 'varchar', nullable: true })
	description: string;

	@ApiProperty()
	@Column({ type: 'integer', nullable: true })
	annee: number;

	@ApiProperty()
	@Column({ type: 'integer', default: 0 })
	format: number;

	@ApiProperty()
	@ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.id, {
		eager: true,
		cascade: true,
	})
	@JoinColumn()
	proprietaire: number[];

	@ManyToMany(() => Utilisateur, (utilisateur) => utilisateur.mediatheque)
	utilisateur: Utilisateur[];

	@ManyToOne(() => Support, {
		eager: true,
		cascade: true,
	})
	@JoinTable()
	support: Support;

	@ManyToMany(() => Categorie, {
		eager: true,
		cascade: true,
	})
	@JoinTable()
	categorie: Categorie[];

	@ManyToMany(() => Auteur, {
		eager: true,
		cascade: true,
	})
	@JoinTable()
	auteur: Auteur[];
}
