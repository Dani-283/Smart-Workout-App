/* eslint-disable prettier/prettier */
import { Workout } from '.prisma/client';
import { Body, Controller, Get, Param, Put, Request } from '@nestjs/common';
import { WorkoutService } from './workout.service';
@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}
  // @Get('/workout:workoutId')
  // getWorkout(@Param() params) {
  //   console.log('here?');
  //   const id = Number(params.workoutId);
  //   return this.workoutService.getById(id);
  // }

  @Get(':userId')
  getWorkouts(@Param() params, @Request() req) {
    console.log('oor here?');
    const id = Number(params.userId);
    return this.workoutService.getManyByUser(id, req.query.range);
  }

  @Put()
  async createWorkout(@Body() body): Promise<Workout> {
    return this.workoutService.createWorkout({
      id: 0,
      title: body.title,
      description: body.description,
      createdAt: new Date(),
      userId: body.userId,
    });
  }
}
