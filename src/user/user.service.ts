import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Parser } from 'json2csv';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Model } from 'mongoose';
import { UserInterface } from './interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { EmailsService } from 'src/emails/emails.service';

@Injectable()
export class UserService {
  // constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    private emailsService: EmailsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      let checkUser = await this.userModel.findOne(
        { email: createUserDto.email.trim().toLowerCase() },
        { isDeleted: false },
      );
      if (checkUser) {
        throw new ConflictException('User already exists');
      }
      let createdUser = new this.userModel(createUserDto);
      await createdUser.save();
      return `User Account Created Successfully`;
    } catch (error) {
      return error.message;
    }
  }

  async findByEmail(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    console.log("Hi There at user.service.ts")
   
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // if (user?.password !== password) {
    //   console.log("I am here",user?.password,password)
    //   throw new UnauthorizedException();
    // }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }

  // Get all users
  async findAll(startDate: String, endDate: String) {
    try {
      let startFrom;
      let endAt;
      if (startDate && endDate) {
        startFrom = new Date(startDate.slice(1, 11)).getTime();
        endAt = new Date(endDate.slice(1, 11)).getTime();
      } else if (startDate) {
        startFrom = new Date(startDate.slice(1, 11)).getTime();
        endAt = Date.now();
      } else if (endDate) {
        startFrom = new Date(endDate.slice(1, 11)).setMonth(
          new Date(endDate.slice(1, 11)).getMonth() - 1,
        );
        endAt = new Date(endDate.slice(1, 11)).getTime();
      } else {
        startFrom = new Date(Date.now()).setMonth(new Date().getMonth() - 1);
        endAt = Date.now();
      }
      const users = await this.userModel.find(
        {
          isDeleted: false,
          createdAt: {
            $gte: startFrom,
            $lte: endAt,
          },
        },
        { password: 0, __v: 0, otp: 0, otpGenerated: 0 },
      );
      return users;
    } catch (error) {
      return error.message;
    }
  }

  // Get user
  async findOne(id: string) {
    try {
      const user = await this.userModel.find(
        { id, isDeleted: false },
        { password: 0, __v: 0, otp: 0, otpGeneratedAt: 0 },
      );
      if (user.length == 0) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      return error.message;
    }
  }

  // Update user
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findById(id);
      if (!user || user.isDeleted) {
        throw new NotFoundException('User not found');
      }
      for (let key in updateUserDto) {
        if (updateUserDto[key]) {
          user[key] = updateUserDto[key];
        }
      }
      await user.save();
      return 'User has been updated';
    } catch (error) {
      return error.message;
    }
  }

  // Delete user
  async remove(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user || user.isDeleted) {
        throw new NotFoundException('User not found');
      }
      await this.userModel.findByIdAndUpdate(
        id,
        { $set: { isDeleted: true, deletedAt: Date.now() } },
        { new: true },
      );
      return `User has been deleted`;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  // Multiple deletes
  async multipleRemove(list: string[]) {
    try {
      for (let index = 0; index < list.length; index++) {
        // console.log(list[index]);
        const user = await this.userModel.findById(list[index]);
        if (!user || user.isDeleted) {
          throw new NotFoundException(`User of id ${list[index]} is not found`);
        }
        await this.userModel.findByIdAndUpdate(
          list[index],
          { $set: { isDeleted: true, deletedAt: Date.now() } },
          { new: true },
        );
      }
      return 'Required users are deleted';
    } catch (error) {
      return error.message;
    }
  }

  // Send mail with OTP
  async forgotPassword(email: string) {
    try {
      const userExists = await this.userModel.find({ email, isDeleted: false });
      if (!userExists || userExists.length == 0) {
        throw new NotFoundException('User not found');
      }
      const OTP = Math.floor(Math.random() * 900000) + 100000;
      const message = `\nThank you for signing up with our platform. To complete your account verification, please use the following One-Time Password (OTP):\n\n OTP: ${OTP}\n\n Please enter this OTP in the designated field on our website to verify your account. Please note that this OTP is valid for a 5 miniutes only.\nIf you did not sign up for an account or have any concerns, please disregard this email.
      \n\nThank you,\n[Your Company Name]`;

      const mailOptions = {
        email,
        subject: 'One-Time Password (OTP) Verification',
        // html:`<h1>Hello, this is a test email!</h1>
        // <p>This is the content of the email.</p>`,
        text: message,
      };
      try {
        await this.emailsService.sendEmail(mailOptions);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(OTP.toString(), salt);
        await this.userModel.findOneAndUpdate(
          { email },
          {
            $set: { otp: hash, otpGenerated: Date.now() },
          },
          { new: true },
        );
        return 'Mail has been sent';
      } catch (error) {
        return error.message;
      }
    } catch (error) {
      return error.message;
    }
  }

  // Reset password with OTP
  async verifyOTP(
    email: string,
    OTP: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    try {
      const user = await this.userModel.findOne({ email });
      if ((Date.now() - new Date(user.otpGenerated).getTime()) / 60000 > 5) {
        throw new HttpException('OTP Expired', HttpStatus.UNAUTHORIZED);
      }
      if (!(await bcrypt.compare(OTP, user.otp.toString()))) {
        throw new HttpException(
          'Invalid OTP. Please double-check the code you entered and try again.',
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (newPassword !== confirmPassword) {
        throw new HttpException(
          `Passwords don't match`,
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = newPassword;
      await user.save();
      return 'Password set successfully';
    } catch (error) {
      return error.message;
    }
  }

  //file exporter
  async getData() {
    return await this.userModel.find(
      {},
      { password: 0, __v: 0, otp: 0, otpGeneratedAt: 0 },
    );
  }

  async fileExporter(response) {
    try {
      const users = await this.getData();
      const Fields = [
        'ID',
        'FirstName',
        'LastName',
        'Email',
        'MobileNumber',
        'CountryCode',
        'Role',
        'Status',
        'Verification',
        'Verified',
        'VerificationExpires',
        'LoginAttempts',
        'BlockExpires',
        'IsDeleted',
        'DeletedAt',
        'UpdatedBy',
      ];
      const parser = new Parser({
        fields: Fields,
      });
      const json = [];
      let userObj = { ID: null };
      users.forEach((user) => {
        userObj.ID = user._id;
        for (let index = 1; index < Fields.length; index++) {
          userObj[Fields[index]] =
            user[Fields[index][0].toLowerCase() + Fields[index].slice(1)] ||
            null;
        }
        json.push({ ...userObj });
      });
      const csv = parser.parse(json);
      response.header('Content-Type', 'text/csv');
      response.attachment('users.csv');
      return response.send(csv);
    } catch (error) {
      return error.message;
    }
  }
}
