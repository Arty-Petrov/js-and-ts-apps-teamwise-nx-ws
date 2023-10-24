import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  UserCreateDto,
  UserCreateRdo,
  UserGetListDto,
  UserGetListRdo,
  UserUpdateDto,
  UserUpdateRdo,
} from '@service/contracts';
import { User } from '@service/shared-types';
import UserEntity from './users.entity';
import UsersRepository from './users.repository';

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
    if (!user) {
      throw new InternalServerErrorException(
        `User with email: ${email} isn't created`,
      );
    }
    return user;
  }

  async update(id: string, dto: UserUpdateDto): Promise<UserUpdateRdo> {
    const existUser = await this.getById(id);
    const existUserEntity = new UserEntity(existUser);
    const updatedEntityData = existUserEntity.getUpdatedFields(dto);
    const isNotUpdatedEntity = Object.keys(updatedEntityData).length === 0 && updatedEntityData.constructor === Object;
    if (isNotUpdatedEntity) {
      throw new HttpException(
        'No new data provided, nothing is changed.',
        HttpStatus.NOT_MODIFIED,
      );
    }
    const existEmail = updatedEntityData?.email ? await this.getByEmail(updatedEntityData.email) : null;
    if (existEmail) {
      throw new ConflictException(`The email field stores uniq data and provided address ${dto.email} is exist in the database already`);
    }
    const newUserEntity = new UserEntity({...existUser, ...dto});
    const user = await this.usersRepository.update(id, newUserEntity);
    return user;
  }

  async getList(query: UserGetListDto): Promise<UserGetListRdo[]> {
    return this.usersRepository.find(query);
  }

  private async getByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  private async getById(id: string): Promise<User> {
    const existUser = await this.usersRepository.findById(id);
    if (!existUser) {
      throw new NotFoundException(`The user with id:${id} doesn't exists`);
    }
    return existUser;
  }
}
