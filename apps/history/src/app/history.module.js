import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ENV_PATH } from '@service/constants';
import { HistoryPrismaClientModule } from '@service/history-prisma-client';
import { rabbitMqOptions, RmqModule } from '@service/rmq-module';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { validateEnvironments } from '@service/utils';
import { HistoryRepository } from './history.repository';
import { HistoryCommand } from './history.command';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

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
        HistoryPrismaClientModule,
    ],
    controllers: [
        HistoryController,
        HistoryCommand,
    ],
    providers: [
        HistoryService,
        HistoryRepository,
        {provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor},
    ],
})
export class HistoryModule {
}
