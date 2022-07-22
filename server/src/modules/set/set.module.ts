import { Module } from '@nestjs/common';
import { SetController } from './set.controller';
import { PrismaService } from '../../common/services/prisma.service';
import { SetService } from './set.service';
@Module({
  controllers: [SetController],
  providers: [SetService, PrismaService],
})
export class SetModule {}
