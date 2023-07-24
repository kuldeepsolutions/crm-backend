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

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        example: 'John ',
        description: 'The first name of the User',
        format: 'string',
      })
      @IsString()
      readonly firstName : string;
    
      @ApiProperty({
        example: 'Doe',
        description: 'The last name of the User',
        format: 'string',
      })
      @IsString()
      readonly lastName : string;
    
      @ApiProperty({
        example: '<your>@<yourMailDomain>',
        description: 'The email of the User',
        format: 'string',
      })
      @IsEmail()
      @IsString()
      readonly email: string;
    
      @ApiProperty({
        example: '1234567890',
        description: 'The mobile number of the User',
        format: 'string',
      })
      @IsString()
      readonly mobileNumber: string;
    
      @ApiProperty({
        example: '+91',
        description: 'The country code of the User',
        format: 'string',
      })
      @IsString()
      readonly countryCode: string;
        
      @ApiProperty({
        example: 'admin',
        description: 'The role of the User',
        format: 'string',
      })
      @IsString()
      readonly role: 'admin' | 'user';
    
      @ApiProperty({
        example: 'active',
        description: 'The status of the User',
        format: 'string',
      })
      @IsString()
      readonly status: 'active' | 'inactive';
    

      readonly isDeleted: boolean;
      readonly deletedAt: Date;
    
      readonly updatedBy?: string;
    
}
