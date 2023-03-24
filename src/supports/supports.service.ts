import { Injectable } from '@nestjs/common';
import { AutoCreate } from 'src/middleware/autoCreateFct';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import { Support } from './entities/support.entity';

@Injectable()
export class SupportsService {
	async create(
		createSupportDto: CreateSupportDto
	): Promise<Support | undefined> {
		let newSupport = new Support();

		newSupport = AutoCreate(createSupportDto) as Support;

		await Support.save(newSupport);

		const data = await Support.findOneBy({
			nom: createSupportDto.nom,
		});

		if (data) {
			return data;
		}
		return undefined;
	}

	async findAll(): Promise<Support[] | undefined> {
		const data = await Support.find();

		if (data[0]) {
			return data;
		}
		return undefined;
	}

	async findOne(id: number): Promise<Support | undefined> {
		const data = await Support.findOneBy({ id });

		if (data) {
			return data;
		}
		return undefined;
	}

	async update(
		id: number,
		updateSupportDto: UpdateSupportDto
	): Promise<Support | undefined> {
		await Support.update(id, updateSupportDto);

		const dataUpdated = await Support.findOneBy({ id });
		if (dataUpdated) {
			return dataUpdated;
		}
		return undefined;
	}

	async remove(data: Support): Promise<Support | undefined> {
		const datadeleted = await Support.remove(data);
		if (datadeleted) {
			return datadeleted;
		}
		return undefined;
	}
}
