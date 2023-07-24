import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './schema/company.schema';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/multer-conf/multer-config.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  MulterModule.registerAsync({
    useClass: MulterConfigService,
  }),
],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
