import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../../dto/user.dto';
import { AuthenticationGuard } from 'src/security/authentication/authentication.guard';
import { AuthorizationGuard } from 'src/security/authorization/authorization.guard';
import { Role, Roles } from 'src/security/authorization/roles';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Roles(Role.Merchant, Role.Payer)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Post('')
  async createUser(@Body() userData: UserDto) {
    return this.userService.createUser(userData);
  }

  @Get('')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('/signin')
  async signIn(@Body() userData: any) {
    return this.userService.signIn(userData);
  }
}
