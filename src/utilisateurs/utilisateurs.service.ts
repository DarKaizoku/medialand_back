import { Injectable } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';

@Injectable()
export class UtilisateursService {
  async create(
    createUtilisateurDto: CreateUtilisateurDto,
    passwordH: string,
  ): Promise<Utilisateur | undefined> {
    const newUser = new Utilisateur();

    newUser.nom = createUtilisateurDto.nom;
    newUser.prenom = createUtilisateurDto.prenom;
    newUser.username = createUtilisateurDto.username;
    newUser.password = passwordH;
    newUser.email = createUtilisateurDto.email;
    newUser.admin = createUtilisateurDto.admin;

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
