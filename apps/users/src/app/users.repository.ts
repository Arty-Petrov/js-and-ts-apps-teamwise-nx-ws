import { Injectable } from '@nestjs/common';
import { User } from '@service/shared-types';
import { UsersPrismaClientService } from '@service/users-prisma-client';
import UserEntity from './users.entity';

@Injectable()
export default class UsersRepository {
  constructor(private readonly prisma: UsersPrismaClientService) {
  }

  async create(entity: UserEntity): Promise<Required<User>> {
    return this.prisma.user.create({
      data: {...entity.toObject()},
    }) as unknown as Required<User>;
  }

  async findByEmail(email: string): Promise<Required<User> | null> {
    return this.prisma.user.findFirst({
      where: {email},
    }) as unknown as Required<User>;
  }
}
