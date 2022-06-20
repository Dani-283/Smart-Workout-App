import { Workout } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService) {}
  public getByUser(userId: number) {
    // return this.prisma.workout.findMany({ where: { userId } });
    return {};
  }

  //   getCount(nftId): Promise<number> {
  //     return this.prisma.like.count({ where: { nftId } });
  //   }

  //   create(like): Promise<Like> {
  //     return this.prisma.like.create({ data: like });
  //   }
  //   delete(id): Promise<Like> {
  //     return this.prisma.like.delete({ where: { id } });
  //   }
}
