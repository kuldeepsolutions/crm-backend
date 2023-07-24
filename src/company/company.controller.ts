import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipeBuilder,
  HttpStatus,
  Req,
  Res,
  Query
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('/create')
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  // Get all the companies
  @Get()
  async findAll(@Query('startDate') startDate:string|null, @Query('endDate') endDate:string|null) {
    if (endDate){
      const date = (parseInt(endDate.split('-')[2]) + 1).toString()
      let [year,month,day] = endDate.split('-')
      const modified = `${year}-${month}-${date}`
      return await this.companyService.findAll(startDate, modified.toString()); 
    }
    return await this.companyService.findAll(startDate, endDate); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Post('/upload-csv')
  @UseInterceptors(FilesInterceptor('file'))
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
      const msg = await this.companyService.createMany(data);
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

  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }

  // Delete multiple companies
  @Delete('/delete/multiple-companies')
  async multipleRemove(@Body('deleteCompanies') deleteCompanies: string[]){
    return await this.companyService.multipleRemove(deleteCompanies)
  }


}
