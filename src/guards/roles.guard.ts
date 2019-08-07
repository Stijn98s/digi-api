import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard  implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const controllerRoles = this.reflector.get<string[]>('roles', context.getClass()) || [];
    const methodRoles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
    const roles = [...methodRoles, ...controllerRoles];

    if (!roles) {
      return true;
    }

    const {user} = context.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException('Cannot access route because role is required but no user is detected, have you applied an AuthGuard?');
    }

    return user.role && roles.includes(user.role);
  }

}
