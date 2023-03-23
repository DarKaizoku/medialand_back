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
@ApiTags('utilisateurs')
@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Post('register')
  async create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
    const checkUsername = await this.utilisateursService.findOnebyUsername(
      createUtilisateurDto.username,
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
    const hash = await bcrypt.hash(createUtilisateurDto.password, 10);
    const data = await this.utilisateursService.create(
      createUtilisateurDto,
      hash,
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
  @Get('byUsername')
  findOneUsername(@Body() username: string) {
    const data = this.utilisateursService.findOnebyUsername(username);
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
    @Request() req: any,
  ) {
    console.log(req.user);

    if (updateUtilisateurDto.username) {
      const checkUsername = await this.utilisateursService.findOnebyUsername(
        updateUtilisateurDto.username,
      );
      if (checkUsername) {
        return {
          status: EStatus.FAIL,
          message: EMessageStatus.x2,
          data: updateUtilisateurDto.username,
        };
      }
    }
    if (updateUtilisateurDto.email) {
      const checkEmail = await Utilisateur.findOneBy({
        email: updateUtilisateurDto.email,
      });
      if (checkEmail) {
        return {
          status: EStatus.FAIL,
          message: EMessageStatus.x2,
          data: updateUtilisateurDto.email,
        };
      }
    }
    if (updateUtilisateurDto.password) {
      updateUtilisateurDto.password = await bcrypt.hash(
        updateUtilisateurDto.password,
        10,
      );
    }
    const dataUpdated = await this.utilisateursService.update(
      req.user.user_id,
      updateUtilisateurDto,
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

    const data = await Utilisateur.findOneBy({ id });
    if (!data) {
      return {
        status: EStatus.FAIL,
        message: EMessageStatus.Unknown,
      };
    }

    await Utilisateur.remove(data);
    if (data) {
      return {
        status: EStatus.OK,
        message: EMessageStatus.DeletedOK,
        save: data,
      };
    }
  }
}
