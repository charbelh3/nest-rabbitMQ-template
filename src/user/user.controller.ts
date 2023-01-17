import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/security/authentication/authentication.guard';
import { AuthorizationGuard } from 'src/security/authorization/authorization.guard';
import { Role, Roles } from 'src/security/authorization/roles';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Roles(Role.Merchant, Role.Payer)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Post('')
  async createUser(@Body() userData: UserDto) {
    return this.userService.createUser(userData);
  }

  @Roles(Role.Merchant, Role.Payer)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Get('')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('/signin')
  async signIn(@Body() userData: any) {
    return this.userService.signIn(userData);
  }
}
