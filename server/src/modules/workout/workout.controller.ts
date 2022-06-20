/* eslint-disable prettier/prettier */
import { Workout } from '.prisma/client';
import { Controller, Get, Param } from '@nestjs/common';
import { WorkoutService } from './workout.service';
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}
  @Get(':userId')
  getWorkout(@Param() params) {
    console.log('xtrl');
    return this.workoutService.getByUser(params.nftId);
  }

  //   @Get("/count/:nftId")
  //   getCount(@Param() params): Promise<number> {
  //     return this.likesService.getCount(params.nftId);
  //   }
}
