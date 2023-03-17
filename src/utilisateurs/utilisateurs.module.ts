import { Module } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursController } from './utilisateurs.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [UtilisateursController],

  providers: [UtilisateursService, AuthService, JwtService],
})
export class UtilisateursModule {}
