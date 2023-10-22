import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreate } from '@service/contracts';
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
}
