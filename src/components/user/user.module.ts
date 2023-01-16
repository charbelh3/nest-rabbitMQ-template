import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModelModule } from 'src/models/user-model/user-model.module';
import { AuthenticationService } from 'src/security/authentication/authenticate';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserModelModule],
  controllers: [UserController],
  providers: [UserService, AuthenticationService, JwtService],
})
export class UserModule {}
