import { Injectable } from '@nestjs/common';
import { CreateAuteurDto } from './dto/create-auteur.dto';
import { UpdateAuteurDto } from './dto/update-auteur.dto';
import { Auteur } from './entities/auteur.entity';

@Injectable()
export class AuteursService {
	async create(
		createAuteurDto: CreateAuteurDto
	): Promise<Auteur | undefined> {
		const newData = new Auteur();

		newData.nom = createAuteurDto.nom;


		const test = await Auteur.save(newData);
		console.log(test);

		const data = await Auteur.findOneBy({ nom: newData.nom });

		if (!data) {
			return undefined;
		}
		return data;
	}

	async findAll(): Promise<Auteur[]> {
		const data = await Auteur.find();

		return data;

	}

	async findOne(id: number): Promise<Auteur | undefined> {
		const data = await Auteur.findOneBy({ id });

		if (data) {
			return data;
		}
		return undefined;
	}

	async update(
		id: number,
		updateAuteurDto: UpdateAuteurDto
	): Promise<Auteur | undefined> {
		await Auteur.update(id, updateAuteurDto);

		const dataUpdated = await Auteur.findOneBy({ id });
		if (dataUpdated) {
			return dataUpdated;
		}
		return undefined;
	}

	async remove(data: Auteur): Promise<Auteur | undefined> {
		const dataDeleted = await Auteur.remove(data);
		if (dataDeleted) {
			return dataDeleted;
		}
		return undefined;
	}
}
