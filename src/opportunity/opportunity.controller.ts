import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';

@Controller('opportunity')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  @Post('create')
  async create(@Body() createOpportunityDto: CreateOpportunityDto) {
    return await this.opportunityService.create(createOpportunityDto);
  }

  // Get all the opportunities
  @Get()
  async findAll(@Query('startDate') startDate:string|null, @Query('endDate') endDate:string|null) {
    if (endDate){
      const date = (parseInt(endDate.split('-')[2]) + 1).toString()
      let [year,month,day] = endDate.split('-')
      const modified = `${year}-${month}-${date}`
      return await this.opportunityService.findAll(startDate, modified.toString()); 
    }
    return await this.opportunityService.findAll(startDate, endDate); 
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.opportunityService.findOne(id);
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() updateOpportunityDto: UpdateOpportunityDto) {
    return await this.opportunityService.update(id, updateOpportunityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.opportunityService.remove(id);
  }

  // Delete multiple opportunities
  @Delete('/delete/multiple-opportunities')
  async multipleRemove(@Body('deleteOpportunities') deleteOpportunities: string[]){
    return await this.opportunityService.multipleRemove(deleteOpportunities)
  }
}
