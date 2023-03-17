import { Module } from '@nestjs/common';
import { AuteursService } from './auteurs.service';
import { AuteursController } from './auteurs.controller';

@Module({
  controllers: [AuteursController],
  providers: [AuteursService]
})
export class AuteursModule {}
