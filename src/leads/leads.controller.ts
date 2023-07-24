import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  ParseFilePipeBuilder,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpStatus,
  Res,
  Query
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import * as fs from 'fs'

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('create')
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }
  
  @Post('/upload-leads')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'text/csv',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files,
    @Req() req,
    @Res() res,
  ) {
    try {
      const csvFile = fs.readFileSync(files[0].path, 'utf8');
      const csvHeader = csvFile.split(/\r\n|\n/)[0].split(',');
      const csvData = csvFile.split(/\r\n|\n/).slice(1);
       let data=[];
      csvData.forEach((element) => {
        let obj = {};
        let reg = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/g;
        let currentline = element.split(reg);
        for (let j = 0; j < csvHeader.length-1; j++) {
          obj[csvHeader[j]] = currentline[j];
          if(j==csvHeader.length-2){
            obj['isDeleted']=false;
          }
        }
        data.push(obj);
      });
      data.pop()
      const msg = await this.leadsService.createMany(data);
      // console.log(msg);
      return res.status(HttpStatus.OK).json({
        message: msg,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
  // @UseInterceptors(FileInterceptor('files'))
  // uploadLeads(
  //   @UploadedFiles(
  //     // new ParseFilePipe({
  //     //   validators: [
  //     //     // new MaxFileSizeValidator({ maxSize: 10000 }),
  //     //     new FileTypeValidator({ fileType: 'image/*' }),
  //     //   ],
  //     // }),
  //   )
  //   files: Express.Multer.File[],@Req() req:Request
  // ) {
  //  console.log( req.files,req.file)
  //   console.log(files);
  // }

  // Get all the leads
  @Get()
  async findAll(@Query('startDate') startDate:string|null, @Query('endDate') endDate:string|null) {
    if (endDate){
      const date = (parseInt(endDate.split('-')[2]) + 1).toString()
      let [year,month,day] = endDate.split('-')
      const modified = `${year}-${month}-${date}`
      return await this.leadsService.findAll(startDate, modified.toString()); 
    }
    return await this.leadsService.findAll(startDate, endDate); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Post(':id')
  remove(@Param('id') id: string) {
    return this.leadsService.remove(id);
  }

   //File exporter
   @Get('data/export')
   async fileExporter(@Res() response){
     return await this.leadsService.fileExporter(response)
   }

  // Delete multiple leads
  @Delete('/delete/multiple-leads')
  async multipleRemove(@Body('deleteLeads') deleteLeads: string[]){
    return await this.leadsService.multipleRemove(deleteLeads)
  }

   // Send mail
  //  @Post('send/mail')
  //  async sendEmail(@Body('email') email: string){
  //   console.log(email);
  //     return await this.leadsService.sendEmail(email)
  //  }
}
