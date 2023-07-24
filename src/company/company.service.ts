import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createReadStream } from 'fs';
import * as readline from 'readline';
import * as csvParser from 'csv-parser';
import { CompanyInterface } from './interfaces/company.interface';
import {Parser} from "json2csv"

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<CompanyInterface>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.companyModel.create(createCompanyDto);
    } catch (error) {
      return error.message;
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
      const companies = await this.companyModel.find(
        {
          isDeleted: false,
          createdAt: {
            $gte: startFrom,
            $lte: endAt
          }
        },
        { __v: 0 },
      );
      return companies; 
    } catch (error) {
      return error.message
    }
  }

  async findOne(id: string) {
    try {
      let company = await this.companyModel.findOne({
        _id: id,
        isDeleted: false,
      });
      return company || `Company not found`;
    } catch (error) {
      return error.message;
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      let company = await this.companyModel.findById(id);
      if (!company) {
        return `Company not found`;
      }
      for (let key in updateCompanyDto) {
        if (typeof(updateCompanyDto[key]) === 'object') {
          for (let ele in updateCompanyDto[key]){
            // console.log(data[index][key][ele], company);
            company[key].push(updateCompanyDto[key][ele]);
          }
        }else{
          company[key] = updateCompanyDto[key];
        }
      }
      // company.deletedAt = updateCompanyDto.isDeleted ? new Date() : null;
      await company.save();
      return `Company Updated Successfully`;
    } catch (error) {
      return error.message;
    }
  }

  async createMany(data: any) {
    try {
      data = data.map((obj) => {
        for (let key in obj) {
          if (typeof(obj[key]) !== 'string'){
            continue
          }
          if (obj[key] === '') {
            delete obj[key];
          } else {
            let elements = obj[key].slice(1,-1).split(',');
            if (elements.length > 1) {
              obj[key] = elements;
            }
          }
        }
        return obj;
      });
      // console.log(data);
      for (let index = 0; index < data.length; index++) {
        const company = await this.companyModel.findOne({name: data[index].name, isDeleted: false})
        if (!company){
          await this.companyModel.create(data[index])
        }else{
          for (let key in data[index]) {
            if (typeof(data[index][key]) === 'object') {
              for (let ele in data[index][key]){
                // console.log(data[index][key][ele], company);
                company[key].push(data[index][key][ele]);
                console.log(company[key]);
              }
            }else{
              company[key] = data[index][key];
            }
          }
          await company.save();
        }
      }
      // await this.companyModel.insertMany(data);
      return data || 'All companies added successfully';
    } catch (error) {
      return error.message;
    }
  }
  
  
  async remove(id: string) {
    try {
      const company = await this.companyModel.findByIdAndUpdate(
        id,
        {
          isDeleted: true,
          deletedAt: new Date(),
        },
        { new: true },
      );
      return company; // 'Company Deleted Successfully';
    } catch (error) {
      return error.message;
    }
  }

  // Multiple deletes
  async multipleRemove(list: string[]){
    try {
      for(let index=0; index < list.length; index++){
        console.log(list[index]);
        const company = await this.companyModel.findById(list[index])
        if (!company || company.isDeleted){
          throw new NotFoundException(`Company of id ${list[index]} is not found`)
        }
        await this.companyModel.findByIdAndUpdate(list[index],
          {$set: {isDeleted: true, deletedAt: Date.now()}}
          ,{new: true})
      }
      return 'Required companies are deleted'
    } catch (error) {
      return error.message
    }
  }
  
  // File exporter
  async getData(){
    return await this.companyModel.find({},{__v:0})
  }

  async fileExporter(response){
    try {
      const companies = await this.getData()
      const Fields = ['ID', 'Name', 'Type', 'Industry', 'BillingAddress', 'ShippingAddress', 'PanNumber', 'TinNumber', 'Contacts', 'Website', 'Description', 'Tags', 'Relationships', 'Revenue', 'Employees', 'Documents', 'History', 'Opportunities', 'activities', 'DeletedAt', 'IsDeleted']
      const parser = new Parser({
        fields: Fields
      });
      const json = [];
      let companyObj = {ID:null}
      companies.forEach((company) => {
        companyObj.ID = company._id
        for (let index=1; index < Fields.length; index++){
          companyObj[Fields[index]] = company[Fields[index][0].toLowerCase()+Fields[index].slice(1)] || null
        };
        json.push({...companyObj})
      })
      const csv = parser.parse(json);
      response.header('Content-Type', 'text/csv');
      response.attachment('Companies.csv');
      return response.send(csv);
    } catch (error) {
      return error.message
    }
  }
}
