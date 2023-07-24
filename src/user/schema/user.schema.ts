import * as mongoose from 'mongoose';
// import * as validator from 'validator';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 4,
      maxlength: 255,
      required: [true, 'Please enter your first name'],
    },
    lastName: {
      type: String,
      minlength: 4,
      maxlength: 255,
      required: [true, 'Please enter your last name'],
    },
    email: {
      type: String,
      lowercase: true,
      // validate: validator.isEmail,
      maxlength: 255,
      minlength: 6,
      required: [true, 'EMAIL_IS_BLANK'],
    },
    mobileNumber: {
      type: String,
      maxlength: 12,
      // minlength: 6,
      // required: [true, 'MOBILE_NUMBER_IS_BLANK'],
    },
    countryCode: {
      type: String,
      maxlength: 4,
      // minlength: 2,
    },
    password: {
      type: String,
      maxlength: 1024,
      minlength: 6,
      required: [true, 'PASSWORD_IS_BLANK'],
     
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    verification: {
      type: String,
      // validate: validator.isUUID,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationExpires: {
      type: Date,
      default: Date.now,
    },
    otp:{
      type: String,
    },
    otpGeneratedAt:{
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    blockExpires: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    updatedBy: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next: Function) {
  const user: any = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return next();
});
