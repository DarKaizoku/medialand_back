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
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';
import { EMessageStatus, EStatus } from 'src/constants/enum';
import { Media } from 'src/medias/entities/media.entity';

@ApiTags('Emprunts')
/* @UseGuards(JwtAuthGuard)
@ApiBearerAuth() */
@Controller('emprunts')
export class EmpruntsController {
    constructor(private readonly empruntsService: EmpruntsService) { }

    @Post()
    async create(@Body() createEmpruntDto: CreateEmpruntDto) {
        const emprunteurCheck = await Utilisateur.findOneBy({
            id: createEmpruntDto.emprunteur,
        });
        if (emprunteurCheck) {
            return {
                status: EStatus.FAIL,
                message:
                    EMessageStatus.Unknown + ' emprunteur ',
            };
        }
        const dataMedia = await Media.findOneBy({
            id: createEmpruntDto.media,
        });

        /* const listProprietaire = dataMedia?.proprietaire!;
        if (listProprietaire.includes(createEmpruntDto.proprietaire)) {
            return {
                status: EStatus.FAIL,
                message:
                    EMessageStatus.Unknown +
                    ' propriétaire ',
            };
        } */

        return this.empruntsService.create(createEmpruntDto);
    }

    @Get()
    async findAll() {
        return this.empruntsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.empruntsService.findOne(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateEmpruntDto: UpdateEmpruntDto
    ) {
        return this.empruntsService.update(+id, updateEmpruntDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.empruntsService.remove(+id);
    }
}
