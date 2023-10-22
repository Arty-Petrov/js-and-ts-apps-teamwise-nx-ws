import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
import { HistoryModule } from './app/history.module';

async function bootstrap() {
    const app = await NestFactory.create(HistoryModule);
    const globalPrefix = 'api';
    app
        .setGlobalPrefix(globalPrefix)
        .enableShutdownHooks()
        .useGlobalPipes(new ZodValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('History API')
        .setVersion('1.0')
        .build();
    patchNestJsSwagger();
    const document = SwaggerModule.createDocument(app, config,);
    SwaggerModule.setup('spec', app, document);

    const port = process.env.HISTORY_APP_PORT || 3100;
    await app.listen(port);
    Logger.log(
        `🚀 Application History is running on: http://localhost:${port}/${globalPrefix}`,
    );
}

bootstrap();
