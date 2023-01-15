import { Injectable } from '@nestjs/common';
import { Mode } from 'fs';
import { Document, Model } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import UserModel, { User } from './entity/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<any>) {}

  async createUser(userData: UserDto) {
    console.log(userData);
    return this.userModel.create(userData);
  }

  async getUsers() {
    return this.userModel.find();
  }

  async getUser(id: string) {
    return this.userModel.findById(id);
  }
}
