import { Injectable } from '@nestjs/common';
import { AutoCreate } from 'src/middleware/autoCreateFct';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';

@Injectable()
export class UtilisateursService {
    async create(
        createUtilisateurDto: CreateUtilisateurDto,
        passwordH: string
    ): Promise<Utilisateur | undefined> {
        let newUser = new Utilisateur();

        /* newUser.nom = createUtilisateurDto.nom;
    newUser.prenom = createUtilisateurDto.prenom;
    newUser.username = createUtilisateurDto.username;
    newUser.password = passwordH;
    newUser.email = createUtilisateurDto.email;
    newUser.admin = createUtilisateurDto.admin; */

        newUser = AutoCreate(createUtilisateurDto) as Utilisateur;
        newUser.password = passwordH;
        await Utilisateur.save(newUser);

        const dataSaved = await Utilisateur.findOneBy({
            username: newUser.username,
        });

        if (dataSaved) {
            return dataSaved;
        }
        return undefined;
    }

    async findAll(): Promise<Utilisateur[]> {
        const data = await Utilisateur.find({ relations: { mediatheque: true } });

        //lignes de test pour contruction autocreate
        /* const list = Object.entries(data[0]);
        const list2 = Object.fromEntries(list);
        const listKeys = Object.keys(data[0]);
        const listValue = Object.values(data[0]);
        const test = listValue.indexOf;

        console.log('entries', list);
        console.log('fromentries', list2);
        console.log('keys', listKeys);
        console.log('values', listValue); */

        return data;

    }

    async findbyId(id: number): Promise<Utilisateur | undefined> {
        const data = await Utilisateur.findOneBy({ id })

        if (!data) {
            return undefined;
        }
        return data;
    }

    async findOnebyUsername(
        username: string
    ): Promise<Utilisateur | undefined> {
        const data = await Utilisateur.findOneBy({ username });

        if (!data) {
            return undefined;
        }
        return data;
    }

    async update(
        id: number,
        updateUtilisateurDto: UpdateUtilisateurDto
    ): Promise<Utilisateur | undefined> {
        await Utilisateur.update(id, updateUtilisateurDto);

        const dataUpdated = await Utilisateur.findOneBy({ id });

        if (!dataUpdated) {
            return undefined;
        }
        return dataUpdated;
    }

    async updateStatus(id: number, newStatus: boolean) {
        const data = await Utilisateur.update(id, { admin: newStatus })!

        return data
    }

    async remove(id: number): Promise<Utilisateur | undefined> {
        const data = await Utilisateur.findOneBy({ id });
        if (data) {
            await Utilisateur.remove(data);
            return data;
        }
        return undefined;
    }
}
