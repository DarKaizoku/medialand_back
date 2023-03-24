import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { SupportsService } from './supports.service';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import { Support } from './entities/support.entity';
import { EMessageStatus, EStatus } from 'src/constants/enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Supports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('supports')
export class SupportsController {
	constructor(private readonly supportsService: SupportsService) {}

	@Post()
	async create(@Body() createSupportDto: CreateSupportDto) {
		//Teste si le support est déjà présent dans la BD, quelque soit son écriture

		const dataAll = (await Support.find()).map((data) => data.nom);
		const test = dataAll
			.toString()
			.toLowerCase()
			.includes(createSupportDto.nom.toLowerCase());

		if (test) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.x2,
				data: createSupportDto.nom,
			};
		}
		const newData = await this.supportsService.create(
			createSupportDto
		);
		return {
			status: EStatus.OK,
			message: EMessageStatus.createdOK,
			data: newData,
		};
	}

	@Get()
	async findAll() {
		const data = await this.supportsService.findAll();
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
		const data = await this.supportsService.findOne(id);
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
		@Body() updateSupportDto: UpdateSupportDto
	) {
		const dataCheck = await Support.findOneBy({ id });
		if (!dataCheck) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.Unknown,
			};
		}
		const data = await this.supportsService.update(
			id,
			updateSupportDto
		);

		return {
			status: EStatus.OK,
			message: EMessageStatus.updateOK,
			data: data,
		};
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		const data = await Support.findOneBy({ id });
		if (!data) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.Unknown,
			};
		}
		await this.supportsService.remove(data);

		return {
			status: EStatus.OK,
			message: EMessageStatus.DeletedOK,
			save: data,
		};
	}
}
