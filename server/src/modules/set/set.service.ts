import { Set } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class SetService {
  constructor(private prisma: PrismaService) {}
  public getByWorkout(workoutId: number) {
    return this.prisma.set.findMany({ where: { workoutId } });
  }

  public async getAllByWorkoutIds(ids: number[]) {
    return this.prisma.set.findMany({
      orderBy: { order: 'asc' },
      where: {
        workoutId: {
          in: ids,
        },
      },
    });
    // return this.prisma.set.groupBy({
    //   by: ['exerciseId'],
    //   where: {
    //     workoutId: {
    //       in: ids,
    //     },
    //   },
    // });
  }

  // public async group(workoutId) {
  //   const groupUsers = await this.prisma.set.groupBy({
  //     by: ['exerciseId'],
  //     where: {
  //       workoutId,
  //     },
  //   });
  // }

  public createSet(set: Set): Promise<Set> {
    return this.prisma.set.create({
      data: {
        createdAt: set.createdAt,
        description: set.description,
        exerciseId: set.exerciseId,
        workoutId: set.workoutId,
        rir: set.rir,
        weight: set.weight,
        reps: set.reps,
        order: set.order,
      },
    });
  }

  public deleteByWorkoutId(workoutId: number) {
    return this.prisma.set.deleteMany({
      where: { workoutId: workoutId },
    });
  }
}
