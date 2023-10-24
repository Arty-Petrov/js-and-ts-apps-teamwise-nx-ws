import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuerySortDirection } from '@service/constants';
import { UserCreate, UserGetList, UserUpdate } from '@service/contracts';
import { ZodSerializerDto } from 'nestjs-zod';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @Post()
  @ApiOperation({description: 'Create new user'})
  @ApiBody({
    type: UserCreate.Request,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserCreate.Response,
    description: 'The new user has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The email is already exist.',
  })
  @ZodSerializerDto(UserCreate.Response)
  async createUser(
    @Body() dto: UserCreate.Request,
  ): Promise<UserCreate.Response> {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({description: 'Get list of users'})
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: QuerySortDirection,
  })
  @ApiQuery({
    name: 'limit',
    allowEmptyValue: false,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    allowEmptyValue: true,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserGetList.Response,
    isArray: true,
  })
  @ZodSerializerDto(UserGetList.Response)
  async getUserList(
    @Query() query: UserGetList.Request,
  ): Promise<UserGetList.Response[]> {
    return this.usersService.getList(query);
  }

  @Put(':id')
  @ApiOperation({description: 'Update user data'})
  @ApiParam({
    name: 'id',
    description: 'The user id',
    required: true,
  })
  @ApiBody({
    type: UserUpdate.Request,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserCreate.Response,
    description: 'The new user has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The email is already exist.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The the user id is not found.',
  })
  @ZodSerializerDto(UserUpdate.Response)
  async updateUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: UserUpdate.Request,
  ): Promise<UserUpdate.Response> {
    return this.usersService.update(userId, dto);
  }
}
