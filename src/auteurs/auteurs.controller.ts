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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EMessageStatus, EStatus } from 'src/constants/enum';
import { AuteursService } from './auteurs.service';
import { CreateAuteurDto } from './dto/create-auteur.dto';
import { UpdateAuteurDto } from './dto/update-auteur.dto';
import { Auteur } from './entities/auteur.entity';

@ApiTags('Auteurs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('auteurs')
export class AuteursController {
  constructor(private readonly auteursService: AuteursService) {}

  @Post()
  async create(@Body() createAuteurDto: CreateAuteurDto) {
    const dataCheck = await Auteur.findOneBy({ nom: createAuteurDto.nom });
    if (dataCheck) {
      return {
        status: EStatus.FAIL,
        message: EMessageStatus.x2,
        data: createAuteurDto.nom,
      };
    }
    const newData = await this.auteursService.create(createAuteurDto);
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
  findOne(@Param('id') id: string) {
    return this.auteursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuteurDto: UpdateAuteurDto) {
    return this.auteursService.update(+id, updateAuteurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auteursService.remove(+id);
  }
}
