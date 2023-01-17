import { Injectable } from '@nestjs/common';
import UserModel, { User } from './entity/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/security/authorization/roles';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<any>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(userData: UserDto) {
    console.log(userData);
    return this.userModel.create(userData);
  }

  async getUsers() {
    return this.userModel.find();
  }

  async signIn(userData: any) {
    const userDataWithRole = { ...userData, role: Role.Admin };
    return this.jwtService.sign(userDataWithRole, {
      secret: this.configService.get('secret'),
    });
  }
}
