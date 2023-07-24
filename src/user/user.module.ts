import { Module, RequestMethod, Scope, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { EmailsModule } from 'src/emails/emails.module';
import { AuthModule } from 'src/auth/auth.module';

import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
// import { isAuthenticated } from 'src/app.middleware';
import { Exclude } from 'class-transformer';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    EmailsModule,
    forwardRef(() => AuthModule),
    JwtModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(isAuthenticated)
  //   // .forRoutes({
  //   //   path: 'user/update/:id',
  //   //   method: RequestMethod.POST,
  //   // })
  //   .exclude({
  //     path:'user/login', method: RequestMethod.POST
  //   })
   
      
    
  // }
}
