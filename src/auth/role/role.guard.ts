import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { ROLE_KEY } from './role.decorator';
import ROLE from './role.enum';

@Injectable()
class RolesGuard implements CanActivate {
  constructor(private refelctor: Reflector, private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.refelctor.getAllAndOverride<ROLE[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { auth } = context.switchToHttp().getRequest()['headers'];
    // try {
    this.authService
      .validateUser(auth)
      .then((user) => {
        return requiredRoles.some((role) => user.role === role);
      })
      .catch((_) => {
        return false;
      });
    return true;
  }
}

export default RolesGuard;
