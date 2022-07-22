import { Workout } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService) {}
  public getById(workoutId: number) {
    return this.prisma.workout.findUnique({ where: { id: workoutId } });
  }

  public getManyByUser(userId: number, range: number) {
    const date = new Date();

    date.setDate(date.getDate() - range);
    console.log('ayyyyyyo', date);
    return this.prisma.workout.findMany({
      where: {
        userId,
        createdAt: {
          gte: date,
        },
      },
    });
  }

  public createWorkout(workout: Workout): Promise<Workout> {
    return this.prisma.workout.create({
      data: {
        title: workout.title,
        description: workout.description,
        createdAt: workout.createdAt,
        userId: workout.userId,
      },
    });
  }
}
