import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { User, UserDocument } from '../../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
    return this.jwtService.sign(userData, {
      secret: this.configService.get('secret'),
    });
  }
}
