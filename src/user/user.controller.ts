import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JoiValidationPipe } from 'src/pipes/validation.pipe';
import schema from './user.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(schema.createUser))
  async createUser(@Body() user: any): Promise<UserDto> {
    console.log(user);
    return this.userService.createUser(user);
  }

  @Get('')
  async getUsers() {
    return this.userService.getUsers();
  }
}
