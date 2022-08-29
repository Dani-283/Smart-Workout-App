import { User } from '.prisma/client';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('exists')
  getUser(@Request() req) {
    const email = req.query.email;
    return this.userService.getUser(email);
  }

  @Post('create')
  createUser(@Body() body) {
    const email = body.email;
    const name = body.name;
    return this.userService.createUser(email, name);
  }
}
