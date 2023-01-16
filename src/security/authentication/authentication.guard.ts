/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthenticationService } from './authenticate';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthenticationService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false;

    const userData = this.authService.authenticate(token);
    request.user = userData;
    return Boolean(userData);
  }
}

