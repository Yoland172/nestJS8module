import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class PatchUserDto {
  @ApiProperty({
    description: 'user name',
    example: 'Jhon Deer',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({
    message: 'Name must be a valid string',
  })
  readonly name!: string;

  @ApiProperty({
    description: 'user email',
    example: 'gmail@mail.com',
    required: false,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address',
    },
  )
  readonly email!: string;

  @ApiProperty({
    description: 'active boolean state',
    example: true,
    required: false,
  })
  @IsNotEmpty({ message: 'isActive status is required' })
  @IsBoolean({
    message: 'isActive must be a boolean value (true/false)',
  })
  readonly isActive!: boolean;
}
