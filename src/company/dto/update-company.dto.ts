import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiProperty({
    example: 'delete or retrieve deleted company',
    description: 'To delete or retrieve deleted company',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  isDeleted?: boolean;
}
