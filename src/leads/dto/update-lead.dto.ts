import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLeadDto } from './create-lead.dto';
import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateLeadDto extends PartialType(CreateLeadDto) {
    
  @ApiProperty({
    example: '<Enter a valid source name !>',
    description: 'The source name of the Lead',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsBoolean()

  isDeleted?: boolean;

  

}
