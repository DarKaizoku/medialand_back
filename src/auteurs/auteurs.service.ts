import { Injectable } from '@nestjs/common';
import { CreateAuteurDto } from './dto/create-auteur.dto';
import { UpdateAuteurDto } from './dto/update-auteur.dto';
import { Auteur } from './entities/auteur.entity';

@Injectable()
export class AuteursService {
  async create(createAuteurDto: CreateAuteurDto) {
    const newData = new Auteur();
    newData.nom = createAuteurDto.nom;
    await Auteur.save(newData);
    const data = await Auteur.findOneBy({ nom: newData.nom });

    if (!data) {
      return undefined;
    }
    return data;
  }

  async findAll() {
    const data = await Auteur.find();
    if (data[0]) {
      return data;
    }
    return undefined;
  }

  async findOne(id: number) {
    return `This action returns a #${id} auteur`;
  }

  async update(id: number, updateAuteurDto: UpdateAuteurDto) {
    return `This action updates a #${id} auteur`;
  }

  async remove(id: number) {
    return `This action removes a #${id} auteur`;
  }
}
