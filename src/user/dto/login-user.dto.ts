import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto{
  @ApiProperty({
    example: '<YourEmail>@<YourMailDomain>',
    description: 'The Email of the User',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @IsEmail()
  @MaxLength(255)
  email: string;
  @ApiProperty({
    example: '<Your Password>',
    description: 'The Email of the User',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  password: string;
  @ApiProperty({
    example: '<Your Role>',
    description: 'The Role of the User',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  role: "admin" | "user";

}
