import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {ContactsIterface} from './interface/contacts.interface'
import {Parser} from "json2csv";

@Injectable()
export class ContactsService {
  constructor(@InjectModel('Contacts') private readonly contactsModel : Model<ContactsIterface>){}

  async create(createContactDto: CreateContactDto) {
    try {
      const newContact = new this.contactsModel(createContactDto)
      await newContact.save();
      return 'Contact has been created succesfully'
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
      const contacts = await this.contactsModel.find(
        {
          isDeleted: false,
          createdAt: {
            $gte: startFrom,
            $lte: endAt
          }
        },
        { __v: 0 },
      );
      return contacts; 
    } catch (error) {
      return error.message
    }
  }

  async findOne(email: string) {
    try {
      const contact = await this.contactsModel.find({email, isDeleted: false},{__v:0})
      if (!contact){
        throw new NotFoundException('Contact not found')
      }
      return contact
    } catch (error) {
      return error.message
    }
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    try {
      const contact = await this.contactsModel.findById(id)
      if (!contact || contact.isDeleted) throw new NotFoundException("Contact not found")
      for (let key in updateContactDto){
        if (updateContactDto[key]){
          contact[key] = updateContactDto[key]
        }
      }
      await contact.save()
      return 'Contact has been updated'
    } catch (error) {
      return error.message
    }
  }

  async remove(id: string) {
    try {
      const contact = await this.contactsModel.findById(id)
      if (!contact || contact.isDeleted) throw new NotFoundException("Contact not found")
      await this.contactsModel.findByIdAndUpdate(id,
        {$set: {isDeleted: true, deletedAt: Date.now()}}
        ,{new: true})
      return `Contact has been deleted`;
    } catch (error) {
      return error.message
    }
  }

  // Multiple deletes
  async multipleRemove(list: string[]){
    try {
      for(let index=0; index < list.length; index++){
        console.log(list[index]);
        const contact = await this.contactsModel.findById(list[index])
        if (!contact || contact.isDeleted){
          throw new NotFoundException(`Contact of id ${list[index]} is not found`)
        }
        await this.contactsModel.findByIdAndUpdate(list[index],
          {$set: {isDeleted: true, deletedAt: Date.now()}}
          ,{new: true})
      }
      return 'Required contacts are deleted'
    } catch (error) {
      return error.message
    }
  }

  //fie exporter
  async getData(){
    return await this.contactsModel.find({},{__v:0})
  }

  async fileExporter(response){
    try {
      const contacts = await this.getData()
      const Fields = ['ID', 'Name', 'Email', 'MobileNumber', 'CountryCode', 'Company', 'Title', 'SocialMediaProfiles', 'Address', 'Verification', 'Notes', 'Verified', 'relationships', 'activityHistory', 'Verified', 'IsDeleted', 'DeletedAt', 'UpdatedBy' ]
      const parser = new Parser({
        fields: Fields
      });
      const json = [];
      let contactObj = {ID:null}
      contacts.forEach((contact) => {
        contactObj.ID = contact._id
        for (let index=1; index < Fields.length; index++){
          contactObj[Fields[index]] = contact[Fields[index][0].toLowerCase()+Fields[index].slice(1)] || null
        };
        json.push({...contactObj})
      })
      const csv = parser.parse(json);
      response.header('Content-Type', 'text/csv');
      response.attachment('contacts.csv');
      return response.send(csv);
    } catch (error) {
      return error.message
    }
  }
}
