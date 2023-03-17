import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { MediasModule } from './medias/medias.module';
import { SupportsModule } from './supports/supports.module';
import { CategoriesModule } from './categories/categories.module';
import { AuteursModule } from './auteurs/auteurs.module';
import { EmpruntsModule } from './emprunts/emprunts.module';
import { Auteur } from './auteurs/entities/auteur.entity';
import { Categorie } from './categories/entities/category.entity';
import { Emprunt } from './emprunts/entities/emprunt.entity';
import { Media } from './medias/entities/media.entity';
import { Support } from './supports/entities/support.entity';
import { Utilisateur } from './utilisateurs/entities/utilisateur.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Auteur, Categorie, Emprunt, Media, Support, Utilisateur],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    UtilisateursModule,
    MediasModule,
    SupportsModule,
    CategoriesModule,
    AuteursModule,
    EmpruntsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
