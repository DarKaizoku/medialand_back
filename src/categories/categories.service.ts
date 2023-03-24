import { Injectable } from '@nestjs/common';
import { AutoCreate } from 'src/middleware/autoCreateFct';
import { CreateCategorieDto } from './dto/create-category.dto';
import { UpdateCategorieDto } from './dto/update-category.dto';
import { Categorie } from './entities/category.entity';

@Injectable()
export class CategoriesService {
	async create(
		createCategoryDto: CreateCategorieDto
	): Promise<Categorie | undefined> {
		let newCategorie = new Categorie();

		newCategorie = AutoCreate(createCategoryDto) as Categorie;

		await Categorie.save(newCategorie);

		const data = await Categorie.findOneBy({
			nom: createCategoryDto.nom,
		});

		if (data) {
			return data;
		}
		return undefined;
	}

	async findAll(): Promise<Categorie[] | undefined> {
		const data = await Categorie.find();

		if (data[0]) {
			return data;
		}
		return undefined;
	}

	async findOne(id: number): Promise<Categorie | undefined> {
		const data = await Categorie.findOneBy({ id });

		if (data) {
			return data;
		}
		return undefined;
	}

	async update(
		id: number,
		updateCategoryDto: UpdateCategorieDto
	): Promise<Categorie | undefined> {
		await Categorie.update(id, updateCategoryDto);

		const dataUpdated = await Categorie.findOneBy({ id });
		if (dataUpdated) {
			return dataUpdated;
		}
		return undefined;
	}

	async remove(data: Categorie): Promise<Categorie | undefined> {
		const datadeleted = await Categorie.remove(data);
		if (datadeleted) {
			return datadeleted;
		}
		return undefined;
	}
}
