import { Injectable } from '@nestjs/common';
import { AutoCreate } from 'src/middleware/autoCreateFct';
import { CreateEmpruntDto } from './dto/create-emprunt.dto';
import { UpdateEmpruntDto } from './dto/update-emprunt.dto';
import { Emprunt } from './entities/emprunt.entity';

@Injectable()
export class EmpruntsService {
  create(createEmpruntDto: CreateEmpruntDto) {
    let newEmprunt = new Emprunt();

    newEmprunt = AutoCreate(createEmpruntDto) as Emprunt;
    console.log(newEmprunt);

    const save = Emprunt.save(newEmprunt);

    return 'This action adds a new emprunt';
  }

  findAll() {
    return `This action returns all emprunts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emprunt`;
  }

  update(id: number, updateEmpruntDto: UpdateEmpruntDto) {
    return `This action updates a #${id} emprunt`;
  }

  remove(id: number) {
    return `This action removes a #${id} emprunt`;
  }
}
