import { Module } from '@nestjs/common';
import { UsersPrismaClientService } from './users-prisma-client.service';

@Module({
  providers: [UsersPrismaClientService],
  exports: [UsersPrismaClientService],
})
export class UsersPrismaClientModule {}
