import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { CreateUtilisateurDto } from './create-utilisateur.dto';

export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {
  @ApiProperty()
  @IsOptional()
  nom: string;

  @ApiProperty()
  @IsOptional()
  prenom: string;

  @ApiProperty()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;
}
