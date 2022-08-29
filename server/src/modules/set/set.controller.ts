import { Set } from '.prisma/client';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
} from '@nestjs/common';
import { SetService } from './set.service';
@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Get()
  getSetsByWorkout(@Request() req) {
    const id = Number(req.query.workoutId);
    return this.setService.getByWorkout(id);
  }

  @Get('prev')
  async getPreviousWeight(@Request() req) {
    const name = req.query.name;
    const order = req.query.order;

    return this.setService.getPreviousWeight(name, order);
  }

  @Get('multiple-by-workoutIds')
  async getSetsByWorkoutIds(@Request() req) {
    if (!req.query.ids) {
      throw new BadRequestException(
        'You need to provide at least one workout id',
      );
    }

    const ids: string[] = Array.isArray(req.query.ids)
      ? req.query.ids
      : [req.query.ids];

    const numIds = ids.map((id) => Number(id));

    const sets = await this.setService.getAllByWorkoutIds(numIds);

    return sets;
  }

  @Put()
  async createSet(@Body() body): Promise<Set> {
    return this.setService.createSet({
      id: body.dbId || 0,
      createdAt: new Date(),
      description: body.description,
      exerciseId: body.exerciseId,
      workoutId: body.workoutId,
      rir: body.rir,
      weight: body.weight,
      reps: body.reps,
      order: 0,
    });
  }

  @Delete('delete')
  deleteByWorkoutId(@Body() body) {
    const id = Number(body.workoutId);
    return this.setService.deleteByWorkoutId(id);
  }
}
