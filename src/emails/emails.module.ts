import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailsSchema } from './schema/emails.schema';

@Module({

  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.AUTH_HOST,
        port: +process.env.AUTH_PORT,
        auth: {
          user: process.env.AUTH_EMAIL,
          pass: process.env.AUTH_PASSWORD,
        },
      },
    }),

    MongooseModule.forFeature([{name: 'Emails', schema: EmailsSchema}])
  ],
  providers: [EmailsService],
  exports: [EmailsService],
})

export class EmailsModule {}

