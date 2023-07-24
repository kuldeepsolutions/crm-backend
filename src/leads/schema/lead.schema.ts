import * as mongoose from 'mongoose';

export const LeadSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'FIRST_NAME_IS_BLANK'],
      minlength: [3, 'FIRST_NAME_IS_TOO_SHORT'],
      maxlength: [255, 'FIRST_NAME_IS_TOO_LONG'],
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'LAST_NAME_IS_BLANK'],
      minlength: [3, 'LAST_NAME_IS_TOO_SHORT'],
      maxlength: [255, 'LAST_NAME_IS_TOO_LONG'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'LAST_NAME_IS_BLANK'],
      minlength: [3, 'LAST_NAME_IS_TOO_SHORT'],
      maxlength: [255, 'LAST_NAME_IS_TOO_LONG'],
    },
    phone: {
      type: String,
      maxlength: [12, 'PHONE_NUMBER_IS_TOO_LONG'],
      minlength: [10, 'PHONE_NUMBER_IS_TOO_SHORT'],
      trim: true,
    },
    countryCode:{
        type: String,
        maxlength: [5, 'COUNTRY_CODE_IS_TOO_LONG'],
        minlength: [2, 'COUNTRY_CODE_IS_TOO_SHORT'],
        trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    source: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);
