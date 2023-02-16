import { Module, NestModule, MiddlewareConsumer, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CustomWinstonLogger } from './helpers/logger.service';
import config from './config/config';
import { LoggingMiddlewareService } from './middlewares/logging-middleware.service';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('database').url,
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({}),
    UserModule,
    GlobalModule,
  ],
  controllers: [],
  providers: [LoggingMiddlewareService, CustomWinstonLogger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddlewareService).forRoutes('*');
  }
}
