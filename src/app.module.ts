import { Module, NestModule, MiddlewareConsumer, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './components/user/user.module';
import config from './config/env.config';
import { LoggingMiddlewareService } from './helpers/logging-middleware/logging-middleware.service';

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
  ],
  controllers: [AppController],
  providers: [AppService, LoggingMiddlewareService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddlewareService).forRoutes('*');
  }
}
