import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {ContactsSchema} from "./schema/contacts.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Contacts', schema: ContactsSchema}])
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService]
})
export class ContactsModule {}
