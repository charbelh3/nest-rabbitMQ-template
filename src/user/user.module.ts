import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import userModel, { User } from './entity/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from './entity/user.schema';
import { AuthenticationService } from 'src/security/authentication/authenticate';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthenticationService, JwtService],
})
export class UserModule {}
