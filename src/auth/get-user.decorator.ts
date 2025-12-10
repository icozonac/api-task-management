import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from './user.entity';

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const req: Request = ctx.switchToHttp().getRequest<Request>();
  return req.user as User;
});
