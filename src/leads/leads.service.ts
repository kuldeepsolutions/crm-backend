import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeadInterface } from './interface/lead.interface';
import {Parser} from 'json2csv'
import { EmailsService } from 'src/emails/emails.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel('Lead') private readonly leadModel: Model<LeadInterface>, private readonly emailsService: EmailsService 
  ) {}

  async create(createLeadDto: CreateLeadDto) {
    try {
      let createdLead = new this.leadModel(createLeadDto);
      await createdLead.save();
      return `Lead Created Successfully`;
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
      const leads = await this.leadModel.find(
        {
          isDeleted: false,
          createdAt: {
            $gte: startFrom,
            $lte: endAt
          }
        },
        { __v: 0 },
      );
      return leads; 
    } catch (error) {
      return error.message
    }
  }

  async findOne(id: string) {
    try {
      let lead = await this.leadModel.findOne({ _id: id, isDeleted: false },{__v:0});
      return lead;
    } catch (error) {
      return error.message;
    }
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    try {
      let updatedLead = await this.leadModel.findByIdAndUpdate(id, updateLeadDto, {
        new: true,
      });
      return updatedLead;
    } catch (error) {
      return error.message;
    }
  }

  async createMany (data:any){
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
      for (let index = 0; index < data.length; index++) {
        const lead = await this.leadModel.findOne({email: data[index].email, isDeleted: false})
        if (!lead){
          await this.leadModel.create(data[index])
        }else{
          for (let key in data[index]) {
            if (typeof(data[index][key]) === 'object') {
              for (let ele in data[index][key]){
                // console.log(data[index][key][ele], company);
                lead[key].push(data[index][key][ele]);
                // console.log(company[key]);
              }
            }else{
              lead[key] = data[index][key];
            }
          }
          await lead.save();
        }
      }
      // await this.companyModel.insertMany(data);
      return data || 'All leads added successfully';
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: string) {

    return `This action removes a #${id} lead`;
  }

  // File exporter
  async getData(){
    return await this.leadModel.find({},{__v:0}).populate('company')
  }

  async fileExporter(response){
    try {
      const leads = await this.getData()

      // Create parser
      const leadsFields = ['ID', 'FirstName', 'LastName', 'Email', 'Phone', 'CountryCode', 'Source', 'Status', 'IsDeleted', 'DeleteAt', 'Company']
      const companyFileds = ['Name', 'Type', 'Industry', 'BillingAddress', 'ShippingAddress', 'PanNumber', 'TinNumber', 'Contacts', 'Website', 'Description', 'Tags', 'Relationships', 'Revenue', 'Employees', 'Documents', 'History', 'Opportunities', 'Activities', 'DeletedAt']
      const Fields = [...leadsFields]
      for(let key in companyFileds){
        Fields.push(`Company_${companyFileds[key]}`)
      }
      const parser = new Parser({
        fields: Fields
      });

      // Create array of objects
      const json = [];
      leads.forEach((lead) => {
        let leadObj = {ID:null, Company: null}
        leadObj.ID = lead._id
        for (let index=1; index < leadsFields.length; index++){
          const data = leadsFields[index][0].toLowerCase()+leadsFields[index].slice(1)
          if (leadsFields[index] === "Company" && lead[data]) {
            leadObj.Company = lead[data]._id 
            for (let key=0; key < companyFileds.length; key++){
              const compData = companyFileds[key][0].toLowerCase()+companyFileds[key].slice(1)
              leadObj[`Company_${companyFileds[key]}`] = lead[data][compData] || null
            }
          }else{
            leadObj[leadsFields[index]] = lead[data] || null
          }
        };
        json.push({...leadObj})
      })

      // Parse array of objects
      const csv = parser.parse(json);
      console.log(csv);
      response.header('Content-Type', 'text/csv');
      response.attachment('Leads.csv');
      return response.send(csv);

    } catch (error) {
      return error.message
    }
  }

  // Multiple deletes
  async multipleRemove(list: string[]){
    try {
      for(let index=0; index < list.length; index++){
        console.log(list[index]);
        const lead = await this.leadModel.findById(list[index])
        if (!lead || lead.isDeleted){
          throw new NotFoundException(`Lead of id ${list[index]} is not found`)
        }
        await this.leadModel.findByIdAndUpdate(list[index],
          {$set: {isDeleted: true, deletedAt: Date.now()}}
          ,{new: true})
      }
      return 'Required leads are deleted'
    } catch (error) {
      return error.message
    }
  }

  // // Send mail
  // async sendEmail(email: String){
  //   try {
  //     const leadExists = await this.leadModel.find({email, isDeleted:false});
  //     if (!leadExists || leadExists.length == 0){
  //       throw new NotFoundException('User not found')
  //     }
  //     const mailOptions = {
  //       email,
  //       subject: 'Leads email',
  //     }
  //     await this.emailsService.sendEmailWithHTML(mailOptions)
  //     return 'Mail has been sent successfully'
  //   } catch (error) {
  //     return error.message
  //   }
    
  // }

}
