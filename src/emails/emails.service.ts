import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailsInterface } from './interface/emails.interface';
import {Model} from 'mongoose'

@Injectable()
export class EmailsService {
  constructor(@InjectModel('Emails') private readonly emailsModel: Model<EmailsInterface>,  private mailerService: MailerService) {}

  async sendEmail(options){
    try {
      let setup = {
        to: options.email,
        from: process.env.AUTH_EMAIL || 'update@techaronic.com',
        subject: options.subject,
        html: options.html && options.html,
        text: options.text && options.text
      }

      const info = await this.mailerService.sendMail(setup)
      
      await this.emailsModel.create({
        sentTo: options.email,
        sentBy: process.env.AUTH_EMAIL || 'update@techaronic.com',
        subject: options.subject,
        text: JSON.stringify(options.html),
        generatedAt: Date.now(),
        messageId: info.messageId
      })
      
      return 'Email has been sent successfully'

    } catch (error) {
      console.log(error.message);
      return error.message
    }
  }
}
