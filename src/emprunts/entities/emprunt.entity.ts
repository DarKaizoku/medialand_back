import { ApiProperty } from '@nestjs/swagger';
import { Media } from 'src/medias/entities/media.entity';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Emprunt extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Media, (media) => media.proprietaire)
  @JoinColumn()
  proprietaire: number;

  @ApiProperty()
  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.id)
  @JoinColumn()
  emprunteur: number;

  @ApiProperty()
  @Column({ type: 'date', default: new Date() })
  date_emprunt: Date;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  date_rendu: Date;

  @ApiProperty()
  @ManyToOne(() => Media, (media) => media.id)
  @JoinColumn()
  media: number;
}
