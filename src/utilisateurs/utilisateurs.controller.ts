import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ClassSerializerInterceptor,
	UseInterceptors,
	UseGuards,
	Request,
	ParseIntPipe,
} from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import * as bcrypt from 'bcrypt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EMessageStatus, EStatus } from 'src/constants/enum';
import { Utilisateur } from './entities/utilisateur.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Utilisateurs')
@Controller('utilisateurs')
export class UtilisateursController {
	constructor(
		private readonly utilisateursService: UtilisateursService
	) { }

	@Post('register')
	async create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
		const checkUsername =
			await this.utilisateursService.findOnebyUsername(
				createUtilisateurDto.username
			);
		if (checkUsername) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.x2,
				data: createUtilisateurDto.username,
			};
		}
		const checkEmail = await Utilisateur.findOneBy({
			email: createUtilisateurDto.email,
		});
		if (checkEmail) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.x2,
				data: createUtilisateurDto.email,
			};
		}
		const hash = await bcrypt.hash(
			createUtilisateurDto.password,
			10
		);
		const data = await this.utilisateursService.create(
			createUtilisateurDto,
			hash
		);

		if (data) {
			return {
				status: EStatus.OK,
				message: EMessageStatus.createdOK,
				data: data,
			};
		}
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	async findAll() {
		const data = await this.utilisateursService.findAll();

		return {
			status: EStatus.OK,
			message: EMessageStatus.dataOK,
			data: data,
		};
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get('moncompte')
	async findById(@Request() req: any) {
		const id = req.user.user_id

		const data =
			await this.utilisateursService.findbyId(id);
		if (!data) {
			return {
				status: EStatus.OK,
				message: EMessageStatus.NoData,
			};
		}

		return {
			status: EStatus.OK,
			message: EMessageStatus.dataOK,
			data: data,
		};
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Patch('update')
	async update(
		@Body() updateUtilisateurDto: UpdateUtilisateurDto,
		@Request() req: any
	) {
		const ID = req.user.user_id
		//Vérification de l'existant du nouveau pseudo saisi

		if (updateUtilisateurDto.username) {
			const checkUsername =
				await this.utilisateursService.findOnebyUsername(
					updateUtilisateurDto.username
				);
			if (checkUsername) {
				if (checkUsername.id !== ID) {
					return {
						status: EStatus.FAIL,
						message: EMessageStatus.x2,
						data: updateUtilisateurDto.username,
					};
				}

			}
		}

		//Vérification de l'existant du nouveau Email saisi

		if (updateUtilisateurDto.email) {
			const checkEmail = await Utilisateur.findOneBy({
				email: updateUtilisateurDto.email,
			});
			if (checkEmail) {
				if (checkEmail.id !== ID) {
					return {
						status: EStatus.FAIL,
						message: EMessageStatus.x2,
						data: updateUtilisateurDto.email,
					};
				}

			}
		}
		//hashage du nouveau password pour Version+

		/* if (updateUtilisateurDto.password) {
			updateUtilisateurDto.password = await bcrypt.hash(
				updateUtilisateurDto.password,
				10
			);
		} */

		const dataUpdated = await this.utilisateursService.update(
			ID,
			updateUtilisateurDto
		);

		if (dataUpdated) {
			return {
				status: EStatus.OK,
				message: EMessageStatus.updateOK,
				data: dataUpdated,
			};
		}
		return {
			status: EStatus.FAIL,
			message: EMessageStatus.updateKO,
		};
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete('eraser')
	async remove(@Request() req: any) {
		const id = req.user.user_id;

		const data = await Utilisateur.remove(id);
		if (!data) {
			return {
				status: EStatus.FAIL,
				message: EMessageStatus.Unknown,
			};
		}

		return {
			status: EStatus.OK,
			message: EMessageStatus.DeletedOK,
			save: data,
		};
	}
}
