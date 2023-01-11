import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('')
  async createUser(@Body() userData: UserDto) {
    return this.userService.createUser(userData);
  }

  @Get('')
  async getUsers() {
    return this.userService.getUsers();
  }
}
