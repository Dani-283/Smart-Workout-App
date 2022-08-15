import { Exercise } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  public async getExercises(): Promise<Exercise[]> {
    const data = await this.prisma.exercise.findMany();
    return data;
  }

  public async getExercise(id: string): Promise<Exercise> {
    const data = await this.prisma.exercise.findUnique({
      where: {
        id: id,
      },
    });
    return data;
  }

  public async getAllFromIds(ids): Promise<Exercise[]> {
    const b = await this.prisma.exercise.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return b;
  }

  public createExercise(exercise: Exercise): Promise<Exercise> {
    return this.prisma.exercise.create({
      data: {
        id: exercise.id,
        name: exercise.name,
      },
    });
  }
}
