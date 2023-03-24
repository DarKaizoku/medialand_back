import { Injectable } from '@nestjs/common';
import { time } from 'console';
import { TDuree } from 'src/constants/duree.type';
import { AutoCreate } from 'src/middleware/autoCreateFct';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';

@Injectable()
export class MediasService {
	async create(
		createMediaDto: CreateMediaDto
	): Promise<Media | undefined> {
		let newMedia = new Media();

		//permet de transformer l'objet "Durée" en Number
		if (typeof createMediaDto.duree === 'object') {
			createMediaDto.duree =
				(createMediaDto.duree as TDuree).heures * 3600 +
				(createMediaDto.duree as TDuree).minutes * 60 +
				(createMediaDto.duree as TDuree).secondes;
		}

		newMedia = AutoCreate(createMediaDto) as Media;

		const dataSaved = await Media.save(newMedia);

		const newdata = await Media.findOneBy({
			titre: createMediaDto.titre,
		});

		if (newdata) {
			return newdata;
		}
		return undefined;
	}

	async findAll(): Promise<Media[] | undefined> {
		const data = await Media.find();

		if (data[0]) {
			return data;
		}
		return undefined;
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
		if (typeof updateMediaDto.duree === 'object') {
			updateMediaDto.duree =
				(updateMediaDto.duree as TDuree).heures * 3600 +
				(updateMediaDto.duree as TDuree).minutes * 60 +
				(updateMediaDto.duree as TDuree).secondes;
		}

		await Media.update(id, updateMediaDto as unknown as Media);

		const dataUpdated = await Media.findOneBy({ id });
		if (dataUpdated) {
			return dataUpdated;
		}
		return undefined;
	}

	async remove(id: number): Promise<Media | undefined> {
		return undefined;
	}
}
