import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsDate,
  IsNumber,
  IsArray,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { OpportunityInterface } from '../interfaces/opportunity.interface';

export class CreateOpportunityDto implements OpportunityInterface{
  @ApiProperty({
    example: '<Enter a valid name for Opportunity> ',
    description: 'The name of the opportunity',
    format: 'string',
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: '<Enter a valid description for Opportunity> ',
    description: 'This is the simple description about the Opportunity',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  description: string;

  @ApiProperty({
    example: '<Enter a valid Contact detail for Opportunity> ',
    description: 'The name of the Contact detail for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  contact?: string;

  @ApiProperty({
    example: '<Enter a valid date for Opportunity> ',
    description: 'The close date for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  closeDate?: Date;

  @ApiProperty({
    example: '<Enter a valid stage for Opportunity> ',
    description: 'The name of the User',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  salesStage?: string;

  @ApiProperty({
    example: '<Enter a valid stage for Opportunity> ',
    description: 'The name of the User',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  priority?: string;

  @ApiProperty({
    example: '<Enter a probability for Opportunity> ',
    description: 'The calculate the probability for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  probability?: number;

  @ApiProperty({
    example: '<Enter a Stage for Opportunity> ',
    description: 'The Stage for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  stage?: string;

  @ApiProperty({
    example: '<Enter a Tags for Opportunity> ',
    description: 'The tags for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  tags?: string;

  @ApiProperty({
    example: '<Enter a Tags for Opportunity> ',
    description: 'The tags for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  type?: string;

  @ApiProperty({
    example: '<Enter a Notes for Opportunity> ',
    description: 'The Notes for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  notes?: string;

  @ApiProperty({
    example: '<Enter a Source for Opportunity> ',
    description: 'The Source for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  source?: string;

  @ApiProperty({
    example: '<Enter a History for Opportunity> ',
    description: 'The History for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  history?: string;

  @ApiProperty({
    example: '<Enter a Forecasting for Opportunity> ',
    description: 'The Forecasting for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  forecasting?: string;

  @ApiProperty({
    example: '<Enter a Tasks for Opportunity> ',
    description: 'The Tasks for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  tasks?: string[];

  @ApiProperty({
    example: '<Enter a contacts for Opportunity> ',
    description: 'The contacts for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  contacts?: string[];

  @ApiProperty({
    example: '<Enter a products for Opportunity> ',
    description: 'The products for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  products?: string[];

  @ApiProperty({
    example: '<Enter a reminders for Opportunity> ',
    description: 'The reminders for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  reminders?: string[];

  @ApiProperty({
    example: '<Enter a collaborators for Opportunity> ',
    description: 'The collaborators for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  collaborators?: string[];

  @ApiProperty({
    example: '<Enter a notifications for Opportunity> ',
    description: 'The notifications for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  notifications?: string[];

  @ApiProperty({
    example: '<Enter a conversations for Opportunity> ',
    description: 'The conversations for the Opportunity',
    format: 'string',
    required: false,
    minLength: 6,
    maxLength: 255,
  })
  conversations?: string[];
}
