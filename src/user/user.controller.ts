import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserCreateDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { PatchUserDto } from './dto/patchUser.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  async setNewUser(@Body() userData: UserCreateDto) {
    try {
      const user = await this.userService.setNewUser(userData);
      if (!user) {
        throw new HttpException(
          'Failed to create user',
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID',
    schema: { type: 'string' },
    example: '123e4567-e89b-12d3-a456',
  })
  async changeUserInfo(
    @Param() params: { id: number },
    @Body() userData: PatchUserDto,
  ) {
    try {
      const user = await this.userService.changeUserInfo(userData, params.id);
      if (user) {
        return user;
      } else {
        throw new HttpException('Failed to patch user', HttpStatus.BAD_REQUEST);
      }
    } catch {
      throw new HttpException('Failed to patch user', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID',
    schema: { type: 'string' },
    example: '123e4567-e89b-12d3-a456',
  })
  async deleteUser(@Param() params: { id: number }) {
    try {
      const users = await this.userService.deleteUser(params.id);
      if (users) {
        return users;
      }
      throw new HttpException('Cant delete user', HttpStatus.BAD_REQUEST);
    } catch {
      throw new HttpException('Cant delete user', HttpStatus.BAD_REQUEST);
    }
  }
}
