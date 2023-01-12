import { Module } from '@nestjs/common';
import { UserModelModule } from 'src/models/user-model/user-model.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserModelModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
