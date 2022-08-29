import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  public async getUser(email: string) {
    const a = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return a;
  }

  public createUser(email: string, name: string) {
    return this.prisma.user.create({
      data: {
        displayName: name,
        email: email,
      },
    });
  }
}
