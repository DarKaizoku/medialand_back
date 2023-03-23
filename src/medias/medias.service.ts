import { Injectable } from '@nestjs/common';
import { AutoCreate } from 'src/middleware/autoCreateFct';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';

@Injectable()
export class MediasService {
  async create(createMediaDto: CreateMediaDto) {
    let newMedia = new Media();

    newMedia = AutoCreate(createMediaDto) as Media;

    const dataSaved = await Media.save(newMedia);
    console.log(dataSaved);

    //const dataSaved = await Media.findOneBy(newMedia)

    return 'tadaaaa';
  }

  findAll() {
    return `This action returns all medias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
