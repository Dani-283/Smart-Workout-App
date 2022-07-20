/* eslint-disable prettier/prettier */
import { Workout } from '.prisma/client';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { WorkoutService } from './workout.service';
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}
  @Get(':userId')
  getWorkout(@Param() params) {
    const id = Number(params.userId);
    return this.workoutService.getByUser(id);
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
