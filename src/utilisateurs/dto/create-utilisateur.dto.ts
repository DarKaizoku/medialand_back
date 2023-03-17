import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUtilisateurDto {
  static passwordMinLength: number = 8;
  static minLength: number = 2;

  @ApiProperty()
  @IsString()
  @MinLength(CreateUtilisateurDto.minLength)
  @IsNotEmpty()
  nom: string;

  @ApiProperty()
  @IsString()
  @MinLength(CreateUtilisateurDto.minLength)
  @IsNotEmpty()
  prenom: string;

  @ApiProperty()
  @IsString()
  @MinLength(CreateUtilisateurDto.minLength)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(CreateUtilisateurDto.passwordMinLength)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  admin: boolean;
}
