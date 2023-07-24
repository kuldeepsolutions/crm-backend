import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';
import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsEmail,
    IsString,
  } from 'class-validator';


export class UpdateContactDto extends PartialType(CreateContactDto) {
   
    @ApiProperty({
        example: 'John ',
        description: 'The first name of the User',
        format: 'string',
        maxLength: 255,
    })
    @IsString()
    @MaxLength(255)
    readonly name: string;
    
    @ApiProperty({
        example: '<your>@<yourMailDomain>',
        description: 'The email of the User',
        format: 'string',
        maxLength: 255,
    })
    @IsEmail()
    @IsString()
    @MaxLength(255)
    readonly email: string;

}
