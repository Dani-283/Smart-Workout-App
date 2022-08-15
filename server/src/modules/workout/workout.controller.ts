/* eslint-disable prettier/prettier */
import { Workout } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  Delete,
} from '@nestjs/common';
import { SetService } from '../set/set.service';
import { WorkoutService } from './workout.service';
@Controller('workouts')
export class WorkoutController {
  constructor(
    private readonly workoutService: WorkoutService,
    private readonly setService: SetService,
  ) {}
  // @Get('/workout:workoutId')
  // getWorkout(@Param() params) {
  //   console.log('here?');
  //   const id = Number(params.workoutId);
  //   return this.workoutService.getById(id);
  // }

  @Get(':userId')
  getWorkouts(@Param() params, @Request() req) {
    const id = Number(params.userId);
    return this.workoutService.getManyByUser(id, req.query.range);
  }

  @Put()
  async createWorkout(@Body() body): Promise<Workout> {
    const workout = await this.workoutService.createWorkout({
      id: 0,
      title: body.title,
      description: body.description,
      createdAt: new Date(),
      userId: body.userId,
    });

    body.exercises.forEach((ex) => {
      ex.sets.forEach(async (set, i) => {
        const weight = set.weight || null;
        console.log(weight);
        console.log(set.reps);
        const createSet = await this.setService.createSet({
          id: 0,
          createdAt: new Date(),
          description: '',
          exerciseId: ex.id,
          workoutId: workout.id,
          rir: set.rir,
          weight: weight,
          reps: set.reps,
          order: i,
        });
      });
    });

    return workout;
  }

  @Delete('delete')
  async deleteWorkout(@Request() req) {
    console.log('delete');
    const id = Number(req.query.workoutId);
    await this.setService.deleteByWorkoutId(id);
    return this.workoutService.deleteWorkout(id);
  }
}
