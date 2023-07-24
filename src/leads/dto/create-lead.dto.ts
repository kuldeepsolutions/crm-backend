import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsDate,
  IsNumber,
  IsArray,
  IsEmail,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LeadInterface } from '../interface/lead.interface';
export class CreateLeadDto implements LeadInterface {
  @ApiProperty({
    example: '<Enter a valid First Name for Leads> ',
    description: 'The First Name of the Leads',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  firstName: string;

  @ApiProperty({
    example: '<Enter a valid Last Name for Leads> ',
    description: 'The First Name of the Leads',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  lastName: string;

  @ApiProperty({
    example: '<Enter a valid email for Leads> ',
    description: 'The email of the Leads',
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
    example: '<Enter a valid phone number for Lead> ',
    description: 'The phone number of the Lead',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  phone: string;

  @ApiProperty({
    example: '<Enter a valid Country Code for phone number> ',
    description: 'The country Code of the Lead',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  countryCode: string;


  @ApiProperty({
    example: '<Enter a valid company ID  ',
    description: 'The country Code of the Lead',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  // @IsString()
  // @IsMongoId()
  // @MinLength(5)
  // @MaxLength(255)
  company?: string;

  @ApiProperty({
    example: '<Enter a valid source name !>',
    description: 'The source name of the Lead',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  // @IsString()
  // @MinLength(5)
  // @MaxLength(255)
  source: string;

  

  @ApiProperty({
    example: '<Enter a valid status !>',
    description: 'The status of the Lead',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  // @IsString()
  // @MinLength(5)
  // @MaxLength(255)
  status: string;

  isDeleted?: boolean;

}
