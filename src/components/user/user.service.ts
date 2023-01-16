import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { User, UserDocument } from '../../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/security/authorization/roles';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(userData: UserDto) {
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
