import { Set } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class SetService {
  createWorkout(arg0: {
    id: number;
    title: any;
    description: any;
    createdAt: Date;
    userId: any;
  }):
    | import('.prisma/client').Workout
    | PromiseLike<import('.prisma/client').Workout> {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}
  public getByWorkout(workoutId: number) {
    console.log('why are you ahere');
    return this.prisma.set.findMany({ where: { workoutId } });
  }

  public async getAllByWorkoutIds(ids: number[]): Promise<Set[]> {
    return this.prisma.set.findMany({
      where: {
        workoutId: {
          in: ids,
        },
      },
    });
  }

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
      },
    });
  }
}
