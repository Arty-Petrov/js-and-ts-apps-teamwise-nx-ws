import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { HistoryModule } from './app/history.module';

async function bootstrap() {
    const app = await NestFactory.create(HistoryModule);
    const globalPrefix = 'api';
    app
        .setGlobalPrefix(globalPrefix)
        .enableShutdownHooks()
        .useGlobalPipes(new ZodValidationPipe())
    const port = process.env.HISTORY_APP_PORT || 3100;
    await app.listen(port);
    Logger.log(
        `🚀 Application History is running on: http://localhost:${port}/${globalPrefix}`,
    );
}

bootstrap();
