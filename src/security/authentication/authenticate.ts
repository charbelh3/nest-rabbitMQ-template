/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private jwtService: JwtService) {}

  authenticate(token: string) {
    const payload: any = this.jwtService.decode(token);

    if (payload) {
      return payload.user || payload;
    }

    return;
  }
}
