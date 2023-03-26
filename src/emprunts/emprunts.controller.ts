import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { EmpruntsService } from './emprunts.service';
import { CreateEmpruntDto } from './dto/create-emprunt.dto';
import { UpdateEmpruntDto } from './dto/update-emprunt.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Emprunts')
/* @UseGuards(JwtAuthGuard)
@ApiBearerAuth() */
@Controller('emprunts')
export class EmpruntsController {
	constructor(private readonly empruntsService: EmpruntsService) {}

	@Post()
	create(@Body() createEmpruntDto: CreateEmpruntDto) {
		return this.empruntsService.create(createEmpruntDto);
	}

	@Get()
	findAll() {
		return this.empruntsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.empruntsService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateEmpruntDto: UpdateEmpruntDto
	) {
		return this.empruntsService.update(+id, updateEmpruntDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.empruntsService.remove(+id);
	}
}
