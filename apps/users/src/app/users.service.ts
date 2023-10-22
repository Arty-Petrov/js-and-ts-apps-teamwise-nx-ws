import { ConflictException, Injectable } from '@nestjs/common';
import { UsersActionStatus } from '@service/constants';
import { UserCreateDto, UserCreateRdo, UserGetListDto, UserGetListRdo } from '@service/contracts';
import { User } from '@service/shared-types';
import UserEntity from './users.entity';
import UsersRepository from './users.repository';


type Keys = keyof typeof UsersActionStatus;
type Status = typeof UsersActionStatus[Keys];

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {
  }

  async create(dto: UserCreateDto): Promise<UserCreateRdo> {
    const {email} = dto;
    const existUser = await this.getByEmail(email);
    if (existUser) {
      throw new ConflictException(`User with email: ${email} already exist`);
    }
    const entity = new UserEntity(dto);
    const user = await this.usersRepository.create(entity);
    return user;
  }

  async getList(query: UserGetListDto): Promise<UserGetListRdo[]> {
    return this.usersRepository.find(query);
  }

  private async getByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }
}
