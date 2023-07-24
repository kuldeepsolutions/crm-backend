import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadSchema } from './schema/lead.schema';
import {MulterModule} from '@nestjs/platform-express'
import { MulterConfigService } from 'src/multer-conf/multer-config.service';
import { EmailsModule } from 'src/emails/emails.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Lead',
        schema: LeadSchema,
      },
    ]),

    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),

    EmailsModule
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
