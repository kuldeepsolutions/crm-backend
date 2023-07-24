import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsEmail,
    IsString,
    Length,
  } from 'class-validator';


export class ResetPasswordUserDto{
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(5)
  @MaxLength(255)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  readonly otp: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  readonly newPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  readonly confirmPassword: string;

}
