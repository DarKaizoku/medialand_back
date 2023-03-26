import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	ClassSerializerInterceptor,
	UseInterceptors,
} from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Media } from './entities/media.entity';
import { EMessageStatus, EStatus } from 'src/constants/enum';
import { Auteur } from 'src/auteurs/entities/auteur.entity';
import { In } from 'typeorm';
import { Categorie } from 'src/categories/entities/category.entity';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Medias')
/* @UseGuards(JwtAuthGuard)
@ApiBearerAuth() */
@Controller('medias')
export class MediasController {
	constructor(private readonly mediasService: MediasService) {}

	@Post()
	async create(@Body() createMediaDto: CreateMediaDto) {
		let listAuteurs = [new Auteur()];

		let listCategories = [new Categorie()];

		const allData = await Media.find();

		const listTitre = allData.map((data) => data.titre);

		const checkTitre = listTitre
			.toString()
			.toLowerCase()
			.includes(createMediaDto.titre.toLowerCase());

		if (checkTitre) {
			const checkSupport = allData.filter(
				(data) =>
					data.support === createMediaDto.support
			);
			if (checkSupport) {
				return {
					status: EStatus.FAIL,
					message: 'Ce média existe déjà !!',
					data: createMediaDto,
				};
			}
		}
		// extraction des données Auteurs via leurs Ids
		if (createMediaDto.auteur) {
			listAuteurs = await Auteur.find({
				where: { id: In(createMediaDto.auteur) },
			});
		}
		console.log(listAuteurs);

		// extraction des données Categories via leurs Ids
		if (createMediaDto.categorie) {
			listCategories = await Categorie.find({
				where: { id: In(createMediaDto.categorie) },
			});
		}
		console.log(listCategories);

		const newData = await this.mediasService.create(
			createMediaDto,
			listAuteurs,
			listCategories
		);
		return {
			status: EStatus.OK,
			message: EMessageStatus.createdOK,
			data: newData,
		};
	}

	@Get()
	async findAll() {
		const data = await this.mediasService.findAll();
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
		const data = await this.mediasService.findOne(id);
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
		@Body() updateMediaDto: UpdateMediaDto
	) {
		const dataCheck = await Media.findOneBy({ id });
		if (!dataCheck) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.Unknown,
			};
		}
		const data = await this.mediasService.update(
			id,
			updateMediaDto
		);

		return {
			status: EStatus.OK,
			message: EMessageStatus.updateOK,
			data: data,
		};
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return this.mediasService.remove(+id);
	}
}
