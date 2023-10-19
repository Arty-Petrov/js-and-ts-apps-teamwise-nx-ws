import { Module } from '@nestjs/common';
import { UsersPrismaClientModule } from '@service/users-prisma-client';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersPrismaClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
