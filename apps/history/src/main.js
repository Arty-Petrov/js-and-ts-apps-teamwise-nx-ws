import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(3100);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.HISTORY_APP_PORT || 3100;

  Logger.log(
    `🚀 Application History is running on: http://localhost:${port}/${globalPrefix}`
  );
}
bootstrap();
