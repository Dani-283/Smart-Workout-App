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

  @Get(':userId')
  // getWorkouts(@Param() params, @Request() req) {
  //   const id = Number(params.userId);
  //   return this.workoutService.getManyByUser(id, req.query.range);
  // }
  getWorkouts(@Param() params, @Request() req) {
    const id = Number(params.userId);
    const begin = req.query.range;
    const end = req.query.rangeEnd;
    return this.workoutService.getManyByUser(id, begin, end);
  }

  @Get('workout/:workoutId')
  getWorkout(@Param() params) {
    const id = Number(params.workoutId);
    return this.workoutService.getById(id);
  }

  @Get('count/:userId')
  async getCount(@Param() params, @Request() req) {
    const id = Number(params.userId);
    const range = Number(req.query.range);
    const date = new Date();
    date.setDate(date.getDate() - range);
    console.log(date);
    console.log(range);
    const arr = [];
    let max = 0;

    for (let index = 0; index < 56; index += 7) {
      const a = await this.workoutService.getCountPerWeek(id, date);
      console.log('aaa', a);
      if (a > max) max = a;

      const obj = {};
      const end = new Date(date);
      const start = new Date(date);
      end.setDate(end.getDate() + 6);

      obj['start'] = start;
      obj['end'] = end;

      for (let i = 0; i < a; i++) {
        obj[`w${i + 1}`] = 1;
      }

      arr.push(obj);

      date.setDate(date.getDate() + 7);
    }

    return { data: arr, max: max };
  }

  @Put()
  async createWorkout(@Body() body): Promise<Workout> {
    const workout = await this.workoutService.createWorkout({
      id: body.id || 0,
      title: body.title,
      description: body.description,
      createdAt: new Date(),
      userId: body.userId,
    });
    const sets = await this.setService.getByWorkout(workout.id);

    let matches = sets.filter(
      (set) => !body.exercises.some((ex) => set.exerciseId === ex.id),
    );
    const matchIds = matches.reduce((res, u) => [...res, u.id], []);
    const exercisesToDelete = [...new Set(matchIds)];
    if (!!exercisesToDelete.length)
      exercisesToDelete.forEach(
        async (setId) => await this.setService.deleteById(setId),
      );

    body.exercises.forEach((ex, indexo) => {
      ex.sets.forEach(async (set, i) => {
        const weight = set.weight || null;

        const createSet = await this.setService.createSet({
          id: set.dbId || 0,
          createdAt: new Date(),
          description: '',
          exerciseId: ex.id,
          workoutId: workout.id,
          rir: set.rir,
          weight: weight,
          reps: set.reps,
          order: i + 1,
        });
      });

      const setsToDelete = sets.filter(
        ({ id: id1, exerciseId }) =>
          ex.id === exerciseId && !ex.sets.some(({ dbId: id2 }) => id2 === id1),
      );

      setsToDelete.forEach(async (set) => {
        const exists = await this.setService.getById(set.id);
        if (!exists) return;
        return await this.setService.deleteById(set.id);
      });
    });

    return workout;
  }

  @Delete('delete')
  async deleteWorkout(@Request() req) {
    const id = Number(req.query.workoutId);
    await this.setService.deleteByWorkoutId(id);
    return this.workoutService.deleteWorkout(id);
  }
}
