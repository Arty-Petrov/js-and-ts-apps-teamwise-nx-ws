import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';

import { UsersModule } from './app/users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const globalPrefix = 'api';
  app
    .setGlobalPrefix(globalPrefix)
    .enableShutdownHooks()
    .useGlobalPipes(new ZodValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setVersion('1.0')
    .build();
  patchNestJsSwagger();
  const document = SwaggerModule.createDocument(app, config,);
  SwaggerModule.setup('spec', app, document);

  const port = process.env.USERS_APP_PORT || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application Users is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
