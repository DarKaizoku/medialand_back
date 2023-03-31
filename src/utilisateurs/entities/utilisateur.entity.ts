import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Media } from 'src/medias/entities/media.entity';
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['email', 'username'])
export class Utilisateur extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ type: 'varchar' })
    nom: string;

    @ApiProperty()
    @Column({ type: 'varchar' })
    prenom: string;

    @ApiProperty()
    @Column({ type: 'varchar' })
    username: string;

    @ApiProperty()
    @Exclude()
    @Column({ type: 'varchar' })
    password: string;

    @ApiProperty()
    @Column({ type: 'varchar' })
    email: string;

    @ApiProperty()
    @Column({ type: 'boolean', default: false })
    admin: boolean;

    @ManyToMany(() => Media, (media) => media.proprietaire)
    @JoinTable()
    mediatheque: Media[];
}
