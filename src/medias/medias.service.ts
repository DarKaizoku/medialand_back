import { Injectable } from '@nestjs/common';
import { Auteur } from 'src/auteurs/entities/auteur.entity';
import { Categorie } from 'src/categories/entities/category.entity';
import { TDuree } from 'src/constants/duree.type';
import { AutoCreate } from 'src/middleware/autoCreateFct';
import { AutoUpdate } from 'src/middleware/autoUpdateFct';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';
import { In } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';

@Injectable()
export class MediasService {
    async create(
        createMediaDto: CreateMediaDto,
        auteurs: Auteur[],
        categories: Categorie[],
        user: Utilisateur
    ): Promise<Media | undefined> {
        //permet de transformer l'objet "Durée" en Number
        if (typeof createMediaDto.duree === 'object') {
            createMediaDto.duree =
                (createMediaDto.duree as TDuree).heures * 3600 +
                (createMediaDto.duree as TDuree).minutes * 60 +
                (createMediaDto.duree as TDuree).secondes;
        }

        let newMedia = AutoCreate(createMediaDto) as Media; // tester VS spread Operator avec referent !!
        /* let newMedia = new Media()
        newMedia = {...createMediaDto} */
        newMedia.proprietaire = [user]
        console.log('catserv', categories);

        if (categories[0]) { newMedia.categorie = categories }
        else { newMedia.categorie = [] }
        if (auteurs[0]) {
            newMedia.auteur = auteurs
        }
        else { newMedia.auteur = [] }
        console.log(newMedia);

        await Media.save(newMedia);

        const newdata = await Media.findOneBy({
            titre: createMediaDto.titre,
        });

        if (newdata) {
            return newdata;
        }
        return undefined;
    }

    async findAll(): Promise<Media[]> {
        const data = await Media.find({
            relations: { proprietaire: true },
        });

        return data;

    }

    async findAllbyUser(userId: number): Promise<Media[]> {
        const data = await Media.find({ relations: { proprietaire: true }, where: { proprietaire: { id: userId } } })

        return data
    }

    async findOne(id: number): Promise<Media | undefined> {
        const data = await Media.findOneBy({ id });

        if (data) {
            return data;
        }
        return undefined;
    }

    async update(
        id: number,
        updateMediaDto: UpdateMediaDto
    ): Promise<Media | undefined> {
        let listAuteurs = [new Auteur()];
        let listCategories = [new Categorie()];

        if (typeof updateMediaDto.duree === 'object') {
            updateMediaDto.duree =
                (updateMediaDto.duree as TDuree).heures * 3600 +
                (updateMediaDto.duree as TDuree).minutes * 60 +
                (updateMediaDto.duree as TDuree).secondes;
        }

        let mediaUpdate = AutoCreate(updateMediaDto) as Media;

        //En considerant que la donnée arrive deja en tableau a jour, pour catégorie et auteur
        if (updateMediaDto.categorie!) {
            listCategories = await Categorie.find({
                where: { id: In(updateMediaDto.categorie!) },
            });
            mediaUpdate.categorie = listCategories;
        }

        if (updateMediaDto.auteur!) {
            listAuteurs = await Auteur.find({
                where: { id: In(updateMediaDto.auteur!) },
            });
            mediaUpdate.auteur = listAuteurs;
        }

        const datatoUpdate = (await Media.findOneBy({ id })) as Media;

        //Utilisation d'un fct perso, où Assign sur 2 Objets: permet de transferer des valeurs là où les Keys sont identiques
        AutoUpdate(datatoUpdate, mediaUpdate);

        await Media.save(datatoUpdate);

        const dataUpdated = await Media.findOneBy({ id });
        console.log(dataUpdated);

        if (dataUpdated) {
            return dataUpdated;
        }
        return undefined;
    }

    async remove(id: number): Promise<Media | undefined> {
        const data = await Media.findOneBy({ id });
        if (!data) {
            return undefined;
        }
        await Media.remove(data);
        return data;
    }
}
