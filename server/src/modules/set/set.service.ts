import { Set } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class SetService {
  constructor(private prisma: PrismaService) {}
  public getByWorkout(workoutId: number) {
    return this.prisma.set.findMany({ where: { workoutId } });
  }

  public getById(setId: number) {
    return this.prisma.set.findUnique({ where: { id: setId } });
  }

  public async getAllByWorkoutIds(ids: number[]) {
    return this.prisma.set.findMany({
      orderBy: [{ createdAt: 'asc' }, { order: 'asc' }],
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
    // return this.prisma.set.create({
    //   data: {
    //     createdAt: set.createdAt,
    //     description: set.description,
    //     exerciseId: set.exerciseId,
    //     workoutId: set.workoutId,
    //     rir: set.rir,
    //     weight: set.weight,
    //     reps: set.reps,
    //     order: set.order,
    //   },
    // });
    return this.prisma.set.upsert({
      create: {
        createdAt: set.createdAt,
        description: set.description,
        exerciseId: set.exerciseId,
        workoutId: set.workoutId,
        rir: set.rir,
        weight: set.weight,
        reps: set.reps,
        order: set.order,
      },
      update: {
        description: set.description,
        rir: set.rir,
        weight: set.weight,
        reps: set.reps,
        order: set.order,
      },
      where: { id: set.id },
    });
  }

  public deleteByWorkoutId(workoutId: number) {
    return this.prisma.set.deleteMany({
      where: { workoutId: workoutId },
    });
  }

  public deleteById(setId: number) {
    return this.prisma.set.delete({
      where: { id: setId },
    });
  }
}
