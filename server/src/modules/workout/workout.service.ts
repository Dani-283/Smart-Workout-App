import { Workout } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService) {}
  public getByUser(userId: number) {
    return this.prisma.workout.findMany({ where: { userId } });
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
