import { Injectable } from '@nestjs/common';
import { UserGetListDto } from '@service/contracts';
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

  async findById(id: string): Promise<Required<User> | null> {
    return this.prisma.user.findFirst({
      where: {id},
    }) as unknown as Required<User>;
  }

  async find({sort, limit, page}: UserGetListDto): Promise<Required<User>[]> {
    return this.prisma.user.findMany({
      orderBy: [
        {
          createdAt: sort,
        },
      ],
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  async update(id: string, entity: UserEntity): Promise<Required<User>> {
    return this.prisma.user.update({
      where: {id},
      data: {...entity},
    }) as unknown as Required<User>;
  }
}
