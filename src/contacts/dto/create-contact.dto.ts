import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsEmail,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateContactDto  {
   
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
    readonly name: string;
  
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
    @MinLength(6)
    @MaxLength(255)
    readonly email: string;
  
    @ApiProperty({
      example: '1234567890',
      description: 'The mobile number of the User',
      format: 'string',
      maxLength: 10,
    })
    @IsString()
    @MaxLength(255)
    readonly mobileNumber: string;
  
    @ApiProperty({
      example: '+91',
      description: 'The country code of the User',
      format: 'string',
    })
    readonly countryCode: string;
  
    @ApiProperty({
      example: 'company name',
      description: 'company details',
      format: 'string',
      maxLength: 255,
    })
    readonly company: string;
  
    @ApiProperty({
      example: 'title',
      description: 'description',
      format: 'string',
      maxLength: 255,
    })
    readonly title: string;
  
    @ApiProperty({
      example: 'social media urls',
      description: 'social media urls',
    })
    readonly socialMediaProfiles: Array <string>;

    @ApiProperty({
        example: 'address',
        description: 'address',
        maxLength: 255
    })
    readonly address: Array <string>;

    @ApiProperty({
        example: 'notes',
        description: 'notes',
        maxLength: 255
    })
    readonly notes: string;

     
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly isDeleted: boolean;
    readonly deletedAt: Date;
  
    readonly updatedBy?: string;
  }
  