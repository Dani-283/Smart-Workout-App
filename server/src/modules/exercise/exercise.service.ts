import { Exercise } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  public async getExercises(): Promise<Exercise[]> {
    const data = await this.prisma.exercise.findMany();
    console.log(data);
    return data;
  }

  public async getExercise(id): Promise<Exercise> {
    const data = await this.prisma.exercise.findUnique({
      where: {
        id: id,
      },
    });
    console.log(data);
    return data;
  }

  public createExercise(exercise: Exercise): Promise<Exercise> {
    return this.prisma.exercise.create({
      data: {
        id: exercise.id,
        name: exercise.name,
        rdfName: exercise.rdfName,
      },
    });
  }
}
