import { Exercise } from '.prisma/client';
import { Controller, Get, Param, Body, Put } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Get()
  async getExercises(): Promise<Exercise[]> {
    return await this.exerciseService.getExercises();
  }

  @Get(':id')
  async getExcercise(@Param() params): Promise<Exercise> {
    return await this.exerciseService.getExercise(params.id);
  }

  @Put()
  async createExercise(@Body() body): Promise<Exercise> {
    return this.exerciseService.createExercise({
      id: body.id,
      name: body.name,
      rdfName: body.rdfName,
    });
  }
}
