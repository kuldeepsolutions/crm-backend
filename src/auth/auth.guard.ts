// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { jwtConstants } from './constants';
// import { IS_PUBLIC_KEY,  } from './decorator/auth.decorator';

// @Injectable()
// export class AuthGuard implements CanActivate {
  
//   constructor(private reflector: Reflector, private jwtService: JwtService) {}
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
      
//     ]);
//     if (isPublic) return true;

//     const request = context.switchToHttp().getRequest<Request>();
//     const authHeader = request.headers.authorization;
//     if (!authHeader) {
//       throw new UnauthorizedException();
//     }
//     const token = authHeader.replace('Bearer ', '');
//     try {
//       const decoded = await this.jwtService.verifyAsync(token, {
//         secret: jwtConstants.secret,
//       });
//       request['user'] = decoded;

//     } catch (error) {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.role);
  }
}
