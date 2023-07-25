import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Response} from 'express'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(res:Response):string {
    // return res.sendFile(__dirname + '/index.html');
    return this.appService.getHello();
  }
}
