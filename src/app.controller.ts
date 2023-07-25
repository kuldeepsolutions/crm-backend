import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Response} from 'express'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get')
  getHello(res:Response) {
    // return res.sendFile(__dirname + '/index.html');
    return this.appService.getHello();
  }
}
