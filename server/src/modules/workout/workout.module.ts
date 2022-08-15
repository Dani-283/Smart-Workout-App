import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { PrismaService } from '../../common/services/prisma.service';
import { WorkoutService } from './workout.service';
import { SetService } from '../set/set.service';
@Module({
  //   imports: [UsersModule, NotificationsModule],
  controllers: [WorkoutController],
  providers: [WorkoutService, PrismaService, SetService],
  // exports: [WorkoutService],
})
export class WorkoutModule {}
