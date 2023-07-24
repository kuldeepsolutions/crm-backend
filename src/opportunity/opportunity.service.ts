import { Injectable,Inject, NotFoundException } from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpportunityInterface } from './interfaces/opportunity.interface';
@Injectable()
export class OpportunityService {
  
  constructor(@InjectModel('Opportunity') private readonly opportunityModel : Model<OpportunityInterface>){}
  
 
  async create(createOpportunityDto: CreateOpportunityDto) {
    try {
      await this.opportunityModel.create(createOpportunityDto)
      return 'Opportunity has been created'
    } catch (error) {
      return error.message
    }
  }

  async findAll(startDate: String, endDate: String) {
    try {
      let startFrom
      let endAt
      if (startDate && endDate) {
        startFrom = new Date(startDate.slice(1, 11)).getTime()
        endAt = new Date(endDate.slice(1, 11)).getTime()
      } else if (startDate) {
        startFrom = new Date(startDate.slice(1, 11)).getTime()
        endAt = Date.now()
      } else if (endDate) {
        startFrom = new Date(endDate.slice(1, 11)).setMonth(new Date(endDate.slice(1, 11)).getMonth() - 1)
        endAt = new Date(endDate.slice(1, 11)).getTime()
      }else {
        startFrom = new Date(Date.now()).setMonth(new Date().getMonth() - 1)
        endAt = Date.now()
      }
      const opportunities = await this.opportunityModel.find(
        {
          isDeleted: false,
          createdAt: {
            $gte: startFrom,
            $lte: endAt
          }
        },
        { __v: 0 },
      );
      return opportunities; 
    } catch (error) {
      return error.message
    }
  }
  

  async findOne(id: string) {
    try {
      const opportunity = await this.opportunityModel.findById(id);
      if (!opportunity || opportunity.isDeleted){
        throw new NotFoundException('Opportunity not found')
      }
      return opportunity
    } catch (error) {
      return error.message
    }
  }

  async update(id: string, updateOpportunityDto: UpdateOpportunityDto) {
    try {
      const opportunity = await this.opportunityModel.findById(id);
      if (!opportunity || opportunity.isDeleted){
        throw new NotFoundException('Opportunity not found')
      }
      for (let key in updateOpportunityDto){
        if (typeof(updateOpportunityDto[key]) === 'object'){
          for(let index in updateOpportunityDto[key]){
            opportunity[key].push(updateOpportunityDto[key][index])
          }
        }else{
          opportunity[key] = (updateOpportunityDto[key])
        }
      }
      await opportunity.save()
      return `Opportunity has been updated`;
    } catch (error) {
      return error.message
    }
  }

  async remove(id: string) {
    try {
      const opportunity = await this.opportunityModel.findById(id);
      if (!opportunity || opportunity.isDeleted){
        throw new NotFoundException('Opportunity not found')
      }
      opportunity.isDeleted = true
      await opportunity.save()
      return `Opportunity has been deleted`;
    } catch (error) {
      return error.message
    }
  }

  // Multiple deletes
  async multipleRemove(list: string[]){
    try {
      for(let index=0; index < list.length; index++){
        console.log(list[index]);
        const opportunity = await this.opportunityModel.findById(list[index])
        if (!opportunity || opportunity.isDeleted){
          throw new NotFoundException(`Opportunity of id ${list[index]} is not found`)
        }
        await this.opportunityModel.findByIdAndUpdate(list[index],
          {$set: {isDeleted: true, deletedAt: Date.now()}}
          ,{new: true})
      }
      return 'Required opportunities are deleted'
    } catch (error) {
      return error.message
    }
  }
}
