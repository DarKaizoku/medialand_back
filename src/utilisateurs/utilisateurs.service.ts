import { Injectable } from '@nestjs/common';
import { AutoCreate } from 'src/middleware/autoCreateFct';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';

@Injectable()
export class UtilisateursService {
  async create(
    createUtilisateurDto: CreateUtilisateurDto,
    passwordH: string,
  ): Promise<Utilisateur | undefined> {
    let newUser = new Utilisateur();

    /* newUser.nom = createUtilisateurDto.nom;
    newUser.prenom = createUtilisateurDto.prenom;
    newUser.username = createUtilisateurDto.username;
    newUser.password = passwordH;
    newUser.email = createUtilisateurDto.email;
    newUser.admin = createUtilisateurDto.admin; */

    newUser = AutoCreate(createUtilisateurDto) as Utilisateur;
    console.log(newUser);

    await Utilisateur.save(newUser);

    const dataSaved = await Utilisateur.findOneBy({
      username: newUser.username,
    });

    if (dataSaved) {
      return dataSaved;
    }
    return undefined;
  }

  async findAll(): Promise<Utilisateur[] | undefined> {
    const data = await Utilisateur.find();

    const list = Object.entries(data[0]);
    const list2 = Object.fromEntries(list);
    const listKeys = Object.keys(data[0]);
    const listValue = Object.values(data[0]);

    const newdata = Object.create(data[0]);
    newdata[listKeys[1]] = '44';

    console.log('entries', list);
    console.log('fromentries', list2);
    console.log('keys', listKeys);
    console.log('values', listValue);
    console.log('type', Object.keys(newdata));

    Object.create;

    if (data[0]) {
      return data;
    }
    return undefined;
  }

  async findOnebyUsername(username: string): Promise<Utilisateur | undefined> {
    const data = await Utilisateur.findOneBy({ username });

    if (!data) {
      return undefined;
    }
    return data;
  }

  async update(
    id: number,
    updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur | undefined> {
    await Utilisateur.update(id, updateUtilisateurDto);

    const dataUpdated = await Utilisateur.findOneBy({ id });

    if (!dataUpdated) {
      return undefined;
    }
    return dataUpdated;
  }

  async remove(dataUser: Utilisateur): Promise<Utilisateur | undefined> {
    const data = await Utilisateur.remove(dataUser);
    if (data) {
      return data;
    }
    return undefined;
  }
}
