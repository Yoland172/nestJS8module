import { IsBoolean, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({
    message: 'Name must be a valid string',
  })
  readonly name!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address',
    },
  )
  readonly email!: string;

  @IsNotEmpty({ message: 'isActive status is required' })
  @IsBoolean({
    message: 'isActive must be a boolean value (true/false)',
  })
  readonly isActive!: boolean;
}
