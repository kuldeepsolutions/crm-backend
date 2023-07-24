import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode,HttpException,HttpStatus, Res, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as express from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { ForgotPasswordUserDto } from './dto/forgotPassword-user.dto';
import { EmailsService } from 'src/emails/emails.service';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/auth/decorator/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/auth.guard';
import { ResetPasswordUserDto } from './dto/resetPassword-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly emailsService: EmailsService,
    private readonly authService: AuthService
    ) {}


  // Create user
  @HttpCode(HttpStatus.CREATED)

  @Roles('admin')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Post('create')
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Login
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    let {email,password} = loginUserDto
    return this.authService.signIn(email,password);
  }

  // Get all the users
  // @Get()
  // @Roles('admin')
  // // @UseGuards(AuthGuard('jwt'))
  // async findAll() {
  //   return await this.userService.findAll(); 
  // }
  @Post('/send-email')
  async sendEmail(@Body() body){
    try {
      const {email,subject,text,html} = body
      console.log(email,subject,text)
      // const sendmail= await this.emailsService.sendEmail(email, subject, text)
      // console.log(sendmail)
      console.log(process.env.AUTH_EMAIL,process.env.AUTH_PASSWORD,process.env.AUTH_HOST,process.env.AUTH_PORT)
      const options = {
        to: email,
        text: text,
        subject: subject,
        html: html
      }
      const sendmail = await this.emailsService.sendEmail(options);
      return sendmail
    } catch (error) {
      return error.message
    }
  }
  async findAll(@Query('startDate') startDate:string|null, @Query('endDate') endDate:string|null) {
    if (endDate){
      const date = (parseInt(endDate.split('-')[2]) + 1).toString()
      let [year,month,day] = endDate.split('-')
      const modified = `${year}-${month}-${date}`
      return await this.userService.findAll(startDate, modified.toString()); 
    }
    return await this.userService.findAll(startDate, endDate); 
  }

  // @Get('start-end')
  // async findALL(@Query('startDate') startDate:string, @Query('endDate') endDate:string, @Body('email') email: string){
  //   return await this.userService.findALL(startDate, endDate, email)
  // }

  // @Post('/send-email')
  // async sendEmail(@Body() body){
  //   try {
  //     const {email,subject,text,html} = body
  //     console.log(email,subject,text)
  //     // const sendmail= await this.emailsService.sendEmail(email, subject, text)
  //     // console.log(sendmail)
  //     const options = {
  //       to: email,
  //       text: text,
  //       subject: subject,
  //       html: html
  //     }
  //     const sendmail = await this.emailsService.sendEmailHTML(options);
  //     return sendmail
  //   } catch (error) {
  //     return error.message
  //   }
  // }

  // Get single user 
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  // Update user 
  @Post(':id')
  async update(@Param('id', new ValidationPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  // Delete user
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  // Delete multiple users
  @Delete('/delete/multiple-users')
  async multipleRemove(@Body('deleteUsers') deleteUsers: string[]){
    return await this.userService.multipleRemove(deleteUsers)
  }

  // Send OTP in mail
  @Post('forgotPassword/otp')
  async forgotPassword(@Body() forgotPasswordUserDto:ForgotPasswordUserDto){
    return await this.userService.forgotPassword(forgotPasswordUserDto.email)
  }

  // Reset password using OTP
  @Post('forgotPassword/verify')
  async verifyOTP(@Body() resetPasswordUserDto:ResetPasswordUserDto){
    const {email, otp, newPassword, confirmPassword} = resetPasswordUserDto
    return await this.userService.verifyOTP(email,otp,newPassword,confirmPassword)
  }

  //File exporter
  @Get('data/export')
  async fileExporter(@Res() response){
    return await this.userService.fileExporter(response)
  }

}
