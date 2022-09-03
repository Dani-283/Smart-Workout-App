import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { PrismaService } from '../../common/services/prisma.service';
import { WorkoutService } from './workout.service';
import { SetService } from '../set/set.service';
@Module({
  controllers: [WorkoutController],
  providers: [WorkoutService, PrismaService, SetService],
})
export class WorkoutModule {}
