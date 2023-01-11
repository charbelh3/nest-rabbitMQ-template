import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { User, UserDocument } from '../../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userData: UserDto) {
    return this.userModel.create(userData);
  }

  async getUsers() {
    return this.userModel.find();
  }

  async getUser(id: string) {
    return this.userModel.findById(id);
  }
}
