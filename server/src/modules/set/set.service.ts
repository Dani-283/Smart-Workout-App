import { Set } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class SetService {
  constructor(private prisma: PrismaService) {}
  public getByWorkout(workoutId: number) {
    if (workoutId === undefined) return null;
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
  }

  public async getPreviousWeight(id: string, order: number) {
    const lastSet = await this.prisma.set.findFirst({
      orderBy: [{ createdAt: 'desc' }, { order: 'asc' }],
      where: {
        exerciseId: {
          contains: id,
        },
      },
    });
    return this.prisma.set.findFirst({
      where: {
        exerciseId: {
          contains: id,
        },
        workoutId: lastSet.workoutId,
        order: Number(order),
      },
    });
  }

  public createSet(set: Set): Promise<Set> {
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
