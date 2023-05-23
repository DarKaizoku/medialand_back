import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UtilisateursModule } from 'src/utilisateurs/utilisateurs.module';
import { UtilisateursService } from 'src/utilisateurs/utilisateurs.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UtilisateursModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT,
      signOptions: { expiresIn: '12h' }
    }),
  ],
  providers: [AuthService, UtilisateursService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
