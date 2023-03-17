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
  @Column({ type: 'time', nullable: true })
  duree: Date;

  @ApiProperty()
  @Column({ type: 'varchar' })
  description: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  annee: Date;

  @ApiProperty()
  @Column({ type: 'boolean' })
  format: boolean;

  @ApiProperty()
  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.id)
  @JoinColumn()
  proprietaire: number[];

  @ManyToMany(() => Utilisateur, (utilisateur) => utilisateur.mediatheque)
  utilisateur: Utilisateur[];

  @ManyToMany(() => Support, (support) => support.nom)
  @JoinTable()
  support: string[];

  @ManyToMany(() => Categorie, (categorie) => categorie.nom)
  @JoinTable()
  categorie: string[];

  @ManyToMany(() => Auteur, (auteur) => auteur.nom)
  @JoinTable()
  auteur: string[];
}
