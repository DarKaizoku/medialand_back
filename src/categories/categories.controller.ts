import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EMessageStatus, EStatus } from 'src/constants/enum';
import { CategoriesService } from './categories.service';
import { CreateCategorieDto } from './dto/create-category.dto';
import { UpdateCategorieDto } from './dto/update-category.dto';
import { Categorie } from './entities/category.entity';

@ApiTags('Categories')
/* @UseGuards(JwtAuthGuard)
@ApiBearerAuth() */
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	async create(@Body() createCategorieDto: CreateCategorieDto) {
		//Teste si la catégorie est déjà présente dans la BD, quelque soit son écriture
		const dataAll = await await Categorie.find();

		const listCategoriesbyNom = dataAll.map((data) => data.nom);

		const listSupport = dataAll.map((data) => data.support.id);

		const CheckNom = listCategoriesbyNom
			.map((data) => data)
			.toString()
			.toLowerCase()
			.includes(createCategorieDto.nom.toLowerCase());

		if (!listSupport.includes(createCategorieDto.support)) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.Unknown,
				data:
					'La référence de support ' +
					createCategorieDto.support +
					' est inconnue !!',
			};
		}

		if (CheckNom) {
			const checkSupport = dataAll
				.filter(
					(data) =>
						data.nom ===
						createCategorieDto.nom
				)
				.map((data) => data.support.id)
				.includes(createCategorieDto.support);

			if (checkSupport) {
				return {
					status: EStatus.FAIL,
					message: 'Cette catégorie, avec ce Support, existe déjà !!',
					data: createCategorieDto,
				};
			}
		}
		const newData = await this.categoriesService.create(
			createCategorieDto
		);
		return {
			status: EStatus.OK,
			message: EMessageStatus.createdOK,
			data: newData,
		};
	}

	@Get()
	async findAll() {
		const data = await this.categoriesService.findAll();
		if (!data) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.NoData,
			};
		}
		return {
			status: EStatus.OK,
			message: EMessageStatus.dataOK,
			data: data,
		};
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const data = await this.categoriesService.findOne(id);
		if (!data) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.Unknown,
			};
		}
		return {
			status: EStatus.OK,
			message: EMessageStatus.dataOK,
			data: data,
		};
	}

	@Get('support/:id')
	async searchbySupport(@Param('id', ParseIntPipe) id: number) {
		const data = await this.categoriesService.findbySupport(id);

		if (!data) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.Unknown,
			};
		}
		return {
			status: EStatus.OK,
			message: EMessageStatus.dataOK,
			data: data,
		};
	}

	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateCategorieDto: UpdateCategorieDto
	) {
		const dataCheck = await Categorie.findOneBy({ id });
		if (!dataCheck) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.Unknown,
			};
		}
		const data = await this.categoriesService.update(
			id,
			updateCategorieDto
		);

		return {
			status: EStatus.OK,
			message: EMessageStatus.updateOK,
			data: data,
		};
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		const data = await Categorie.findOneBy({ id });
		if (!data) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.Unknown,
			};
		}
		await this.categoriesService.remove(data);

		return {
			status: EStatus.OK,
			message: EMessageStatus.DeletedOK,
			save: data,
		};
	}
}
