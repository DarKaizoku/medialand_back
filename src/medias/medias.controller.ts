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
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Media } from './entities/media.entity';
import { EMessageStatus, EStatus } from 'src/constants/enum';

@ApiTags('Medias')
/* @UseGuards(JwtAuthGuard)
@ApiBearerAuth() */
@Controller('medias')
export class MediasController {
	constructor(private readonly mediasService: MediasService) {}

	@Post()
	async create(@Body() createMediaDto: CreateMediaDto) {
		const dataAll = (await Media.find()).map((data) => data.titre);
		const test = dataAll
			.toString()
			.toLowerCase()
			.includes(createMediaDto.titre.toLowerCase());

		const newData = await this.mediasService.create(createMediaDto);
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
