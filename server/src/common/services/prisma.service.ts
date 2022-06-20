import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // USE THIS IF YOU WANT TO LOG GENERATED SQL QUERY
  // constructor() {
  //   super({ log: [{ emit: 'stdout', level: 'query' }] });
  // }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
