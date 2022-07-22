import { Exercise } from '.prisma/client';
import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Get()
  async getExercises(): Promise<Exercise[]> {
    return await this.exerciseService.getExercises();
  }

  // @Get(':id')
  // async getExcercise(@Param() params): Promise<Exercise> {
  //   const id = Number(params.id);
  //   return await this.exerciseService.getExercise(id);
  // }

  @Get('multiple-by-ids')
  async getAllFromIds(@Request() req): Promise<Exercise[]> {
    if (!req.query.ids) {
      throw new BadRequestException('You need to provide at least one id');
    }

    const ids: string[] = Array.isArray(req.query.ids)
      ? req.query.ids
      : [req.query.ids];

    const numIds = ids.map((id) => Number(id));

    const exercises = await this.exerciseService.getAllFromIds(numIds);

    return exercises;
  }

  @Put()
  async createExercise(@Body() body): Promise<Exercise> {
    console.log(body);
    return this.exerciseService.createExercise({
      id: body.id,
      name: body.name,
    });
  }
}
