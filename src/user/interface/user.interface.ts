export interface UserInterface  {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  password: string;
  role: 'admin' | 'user';
  status?: 'active' | 'inactive';
  otp:String;
  otpGenerated: Date,
  verification?: string;
  verified?: boolean;
  verificationExpires?: Date;
  loginAttempts?: number;
  blockExpires?: Date;
  isDeleted: Boolean;
  updatedBy?: String;
  updatedAt?: Date;
  createdAt?:Date
}
