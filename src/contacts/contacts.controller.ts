import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('/create')
  // @UsePipes(new ValidationPipe())
  async create(@Body() createContactDto: CreateContactDto) {
    return await this.contactsService.create(createContactDto);
  }

  // Get all the contacts
  @Get()
  async findAll(@Query('startDate') startDate:string|null, @Query('endDate') endDate:string|null) {
    if (endDate){
      const date = (parseInt(endDate.split('-')[2]) + 1).toString()
      let [year,month,day] = endDate.split('-')
      const modified = `${year}-${month}-${date}`
      return await this.contactsService.findAll(startDate, modified.toString()); 
    }
    return await this.contactsService.findAll(startDate, endDate); 
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return await this.contactsService.findOne(email);
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return await this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.contactsService.remove(id);
  }

  // File exporter
  @Get('data/export')
  async fileExporter(@Res() response){
    return await this.contactsService.fileExporter(response)
  }

  // Delete multiple contacts
  @Delete('/delete/multiple-contacts')
  async multipleRemove(@Body('deleteContacts') deleteContacts: string[]){
    return await this.contactsService.multipleRemove(deleteContacts)
  }
}
