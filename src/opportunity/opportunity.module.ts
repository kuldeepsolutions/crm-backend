import { Module } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { OpportunityController } from './opportunity.controller';
import { OpportunitySchema } from './schema/opportunity.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports :[
    MongooseModule.forFeature([{name:'Opportunity',schema:OpportunitySchema}])]
  ,
  controllers: [OpportunityController],
  providers: [OpportunityService,],
  exports:[OpportunityService],
})
export class OpportunityModule {}
