import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { warn } from 'console';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OpportunityModule } from './opportunity/opportunity.module';
import { LeadsModule } from './leads/leads.module';
import { CompanyModule } from './company/company.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    // ,{logger:['error','warn','debug','verbose']}
  );
  // Use validation pipe
  app.useGlobalPipes(new ValidationPipe({}));

  // Swagger

  const options = new DocumentBuilder()
    .setTitle('CRM')
    .setDescription('The CRM API description')
    .setVersion('1.0')
    .addTag('CRM')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [UserModule, OpportunityModule, LeadsModule, CompanyModule],
  });

  SwaggerModule.setup('api', app, document);
  app.enableCors({ origin: '*' });
  await app.listen(3000);
}
bootstrap();
