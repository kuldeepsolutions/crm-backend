import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OpportunityModule } from './opportunity/opportunity.module';
import { LeadsModule } from './leads/leads.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ContactsModule } from './contacts/contacts.module';
import { CompanyModule } from './company/company.module';
import { EmailsModule } from './emails/emails.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..',  'public'),
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    OpportunityModule,
    LeadsModule,
    ContactsModule,
    CompanyModule,
    EmailsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy, AppService],
})
export class AppModule {}
