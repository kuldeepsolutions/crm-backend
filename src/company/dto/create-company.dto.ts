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
import { CompanyInterface } from '../interfaces/company.interface';

export class CreateCompanyDto implements CompanyInterface {
  @ApiProperty({
    example: '<Enter a valid company name > ',
    description: 'The name of the company',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: '<Enter a valid company type > ',
    description: 'The type of the company',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  type: string;

  @ApiProperty({
    example: '<Enter a valid company Industry > ',
    description: 'The Industry of the company',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  industry: string;

  @ApiProperty({
    example: '<Enter a valid company billingAddress > ',
    description: 'The billingAddress of the company',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  billingAddress?: string;

  @ApiProperty({
    example: '<Enter a valid company shippingAddress > ',
    description: 'The shippingAddress of the company',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  shippingAddress?: string;
  
  @ApiProperty({
    example: '<Enter a valid company panNumber > ',
    description: 'The panNumber of the company',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  panNumber?: string;

  @ApiProperty({
    example: '<Enter a valid company tinNumber > ',
    description: 'The tinNumber of the company',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  tinNumber?: string;

  @ApiProperty({
    example: '<Enter a valid company contacts > ',
    description: 'The contacts of the company',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  contacts?: string[];
  website?: string;
  description?: string;
  tags?: string[];
  relationShips?: string[];
  revenue?: string;
  employees?: string[];
  documents?: string[];
  history?: string;
  opportunities?: string[];
  activities?: string[];
}
