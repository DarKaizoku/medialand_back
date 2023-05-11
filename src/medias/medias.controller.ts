import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    ParseIntPipe,
    ClassSerializerInterceptor,
    UseInterceptors,
    UseGuards,
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
import { Support } from 'src/supports/entities/support.entity';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Medias')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('medias')
export class MediasController {
    constructor(private readonly mediasService: MediasService) { }

    @Post()
    async create(@Body() createMediaDto: CreateMediaDto, @Request() req: any) {

        let listAuteurs = [new Auteur()];
        let listCategories = [new Categorie()];

        const allData = await this.mediasService.findAll();

        const listTitre = allData.filter(
            (data) =>
                (data.support.id ===
                    createMediaDto.support) && (data.proprietaire[0]?.id === req.user.user_id)
        ).map((data) => data.titre);

        /* const checkTitre = listTitre
            .toString()
            .toLowerCase()
            .includes(createMediaDto.titre.toLowerCase()); */

        const checkTitre = listTitre.filter(data => data.toLowerCase() === createMediaDto.titre.toLowerCase())

        if (checkTitre) {
            return {
                status: EStatus.FAIL,
                message: 'Ce média existe déjà !!',
                data: createMediaDto,
            };

        }
        // extraction des données Auteurs via leurs Ids
        if (createMediaDto.auteur) {
            listAuteurs = await Auteur.find({
                where: { id: In(createMediaDto.auteur) },
            });
        }

        // extraction des données Utilisateurs via userid
        const user = await Utilisateur.findOneBy({ id: req.user.user_id })

        // extraction des données Categories via leurs Ids
        if (createMediaDto.categorie) {
            listCategories = await Categorie.find({
                where: { id: In(createMediaDto.categorie) },
            });

        }

        const newData = await this.mediasService.create(
            createMediaDto,
            listAuteurs,
            listCategories,
            user!
        );
        return {
            status: EStatus.OK,
            message: EMessageStatus.createdOK,
            data: newData,
        };
    }

    @Get()
    async findAll() {
        const data = await this.mediasService.findAll()
        return {
            status: EStatus.OK,
            message: EMessageStatus.dataOK,
            data: data,
        };
    }

    @Get('user')
    async findOnebyUser(@Request() req: any) {
        const userId = req.user.user_id

        const listData = await this.mediasService.findAllbyUser(userId)

        return {
            status: EStatus.OK,
            message: EMessageStatus.dataOK,
            data: listData,
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
        //Multi requete ou une requete puis tri en JS ??? !!!! ici multi requete
        const dataAll = await Media.find();
        const dataCheck = dataAll.map((data) => data.id).includes(id);
        if (!dataCheck) {
            return {
                status: EStatus.FAIL,
                message: EMessageStatus.Unknown,
            };
        }
        if (updateMediaDto.titre) {
            //Vérification du No de Support et nom de Media sur même Support : Non Accepté
            if (updateMediaDto.support) {
                const supportExist = await Support.findOneBy({
                    id: updateMediaDto.support,
                });
                if (!supportExist) {
                    return {
                        status: EStatus.FAIL,
                        message: EMessageStatus.Unknown,
                        data:
                            'Vérifiez le Support : ' +
                            updateMediaDto.support,
                    };
                }
                const listTitre = dataAll.filter(
                    (data) =>
                        data.support.id ===
                        updateMediaDto.support
                ).map(data => data.titre);

                const checkTitre = listTitre
                    .toString()
                    .toLowerCase()
                    .includes(updateMediaDto.titre.toLowerCase());

                if (checkTitre) {
                    return {
                        status: EStatus.FAIL,
                        message: `Ce Média (${updateMediaDto.titre}) sur ce Support (${updateMediaDto.support}) existe déjà !!`,
                    };
                }
            }
        }

        //Verification du no de Support proposé
        if (updateMediaDto.support) {
            const checkSupport = await Support.findOneBy({
                id: updateMediaDto.support,
            });
            if (!checkSupport) {
                return {
                    status: EStatus.FAIL,
                    message: EMessageStatus.Unknown,
                    data:
                        'Vérifiez le Support : ' +
                        updateMediaDto.support,
                };
            }
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
        const dataDeleted = await this.mediasService.remove(id);

        if (!dataDeleted) {
            return {
                status: EStatus.FAIL,
                message: EMessageStatus.Unknown,
            };
        }
        return {
            status: EStatus.OK,
            message: EMessageStatus.DeletedOK,
            save: dataDeleted,
        };
    }
}
