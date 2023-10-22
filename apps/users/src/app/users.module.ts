import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ENV_PATH } from '@service/constants';
import { rabbitMqOptions, RmqModule } from '@service/rmq-module';
import { UsersPrismaClientModule } from '@service/users-prisma-client';
import { validateEnvironments } from '@service/utils';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { UsersController } from './users.controller';
import UsersRepository from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_PATH,
      load: [rabbitMqOptions],
      validate: validateEnvironments,
    }),
    RmqModule,
    UsersPrismaClientModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    {provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor},
  ],
})
export class UsersModule {
}
