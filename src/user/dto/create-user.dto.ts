import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto  {
 
  @ApiProperty({
    example: 'John ',
    description: 'The first name of the User',
    format: 'string',
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the User',
    format: 'string',
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  readonly lastName: string;

  @ApiProperty({
    example: '<your>@<yourMailDomain>',
    description: 'The email of the User',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The mobile number of the User',
    format: 'string',
  })
  readonly mobileNumber: string;

  @ApiProperty({
    example: '+91',
    description: 'The country code of the User',
    format: 'string',
    minLength: 2,
    maxLength: 4,
  })
  readonly countryCode?: string;

  @ApiProperty({
    example: '<YourPassword>',
    description: 'The password of the User',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  readonly password: string;

  @ApiProperty({
    example: 'admin',
    description: 'The role of the User',
    format: 'string',
    minLength: 4,
    required: false,
    maxLength: 6,
  })
  readonly role: 'admin' | 'user';

  @ApiProperty({
    example: 'active',
    description: 'The status of the User',
    format: 'string',
    minLength: 4,
    required: false,
    maxLength: 6,
  })
  readonly status: 'active' | 'inactive';


  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly isDeleted?: boolean;
  readonly deletedAt?: Date;
  readonly updatedBy?: string;
}
