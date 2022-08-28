import { Workout } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { start } from 'repl';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService) {}
  public getById(workoutId: number) {
    return this.prisma.workout.findUnique({ where: { id: workoutId } });
  }

  public getCountPerWeek(userId: number, startDate: Date) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    return this.prisma.workout.count({
      where: { createdAt: { gte: startDate, lte: endDate } },
    });

    // console.log('start', startDate);
    // console.log('end', endDate);
  }

  // public getManyByUser(userId: number, range: number) {
  //   const date = new Date();

  //   date.setDate(date.getDate() - range);
  //   return this.prisma.workout.findMany({
  //     where: {
  //       userId,
  //       createdAt: {
  //         gte: date,
  //       },
  //     },
  //     orderBy: { createdAt: 'desc' },
  //   });
  // }

  public getManyByUser(userId: number, begin: number, end: number) {
    const beginDate = new Date();
    const endDate = new Date();

    beginDate.setDate(beginDate.getDate() - begin);
    endDate.setDate(endDate.getDate() - end);

    beginDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(0, 0, 0, 0);

    console.log(beginDate);

    return this.prisma.workout.findMany({
      where: {
        userId,
        createdAt: {
          gte: beginDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  public createWorkout(workout: Workout): Promise<Workout> {
    // return this.prisma.workout.create({
    //   data: {
    //     title: workout.title,
    //     description: workout.description,
    //     createdAt: workout.createdAt,
    //     userId: workout.userId,
    //   },
    // });
    return this.prisma.workout.upsert({
      create: {
        title: workout.title,
        description: workout.description,
        createdAt: workout.createdAt,
        userId: workout.userId,
      },
      update: {
        title: workout.title,
        description: workout.description,
      },

      where: { id: workout.id },
    });
  }

  public deleteWorkout(workoutId: number) {
    return this.prisma.workout.delete({
      where: { id: workoutId },
    });
  }
}
