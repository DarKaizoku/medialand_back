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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EMessageStatus, EStatus } from 'src/constants/enum';
import { AuteursService } from './auteurs.service';
import { CreateAuteurDto } from './dto/create-auteur.dto';
import { UpdateAuteurDto } from './dto/update-auteur.dto';
import { Auteur } from './entities/auteur.entity';

@ApiTags('Auteurs')
/* @UseGuards(JwtAuthGuard)
@ApiBearerAuth() */
@Controller('auteurs')
export class AuteursController {
	constructor(private readonly auteursService: AuteursService) {}

	@Post()
	async create(@Body() createAuteurDto: CreateAuteurDto) {
		//Teste si l'auteur est déjà présent dans la BD, quelque soit son écriture
		const dataAll = await (
			await Auteur.find()
		).map((data) => data.nom);
		const test = dataAll
			.toString()
			.toLowerCase()
			.includes(createAuteurDto.nom.toLowerCase());

		if (test) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.x2,
				data: createAuteurDto.nom,
			};
		}
		const newData = await this.auteursService.create(
			createAuteurDto
		);
		return {
			status: EStatus.OK,
			message: EMessageStatus.createdOK,
			data: newData,
		};
	}

	@Get()
	async findAll() {
		const data = await this.auteursService.findAll();
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
	async findOneId(@Param('id', ParseIntPipe) id: number) {
		const data = await this.auteursService.findOne(id);
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
		@Body() updateAuteurDto: UpdateAuteurDto
	) {
		const dataCheck = await Auteur.findOneBy({ id });
		if (!dataCheck) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.Unknown,
			};
		}
		const data = await this.auteursService.update(
			id,
			updateAuteurDto
		);

		return {
			status: EStatus.OK,
			message: EMessageStatus.updateOK,
			data: data,
		};
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		const data = await Auteur.findOneBy({ id });
		if (!data) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.Unknown,
			};
		}
		await this.auteursService.remove(data);

		return {
			status: EStatus.OK,
			message: EMessageStatus.DeletedOK,
			save: data,
		};
	}
}
