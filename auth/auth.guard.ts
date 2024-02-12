import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request as NestRequest } from '@nestjs/common';
import { Request } from 'express';
const db = require('../../src/db');

//Κλάση τύπου guard που ελεγχεί αν το jwt είναι έγκυρο
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new ForbiddenException("Operation not allowed, No auth token provided");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: 'secret', });
      let id = payload['id'];
      if (!id) throw new ForbiddenException("Operation not allowed, Invalid auth token");
      const user = await db.query("SELECT id, username, displayName, email, role FROM users WHERE id = ?", [id]);
      if(user.length == 0) throw new ForbiddenException("No user found for the jwt token. Was your user deleted?");
      context.switchToHttp().getRequest().user = user[0];
      context.switchToHttp().getRequest().userId = id;
    } catch {
      throw new ForbiddenException("Operation not allowed, Invalid auth token");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    let header = (request.headers['authorization'] || request.headers['Authorization'] || '') as string;
    const [type, token] = header.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

import { Reflector } from '@nestjs/core';
import { EUserType } from 'src/user/user.schema';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<EUserType[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {

      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (user && user?.role) return requiredRoles.some((role) => user?.role == role);
    return false;
  }
}
import { SetMetadata } from '@nestjs/common';

export const Role = (roles: EUserType[]) => SetMetadata('role', roles);
