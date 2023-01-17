/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import errors from 'src/config/errors';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('token.secret'),
      });
      return payload.user || payload;
    } catch {
      throw new UnauthorizedException(errors.unauthorized);
    }
  }
}
