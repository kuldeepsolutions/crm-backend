import mongoose from "mongoose";

export const ContactsSchema = new mongoose.Schema(
{
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: [true, 'Please enter your first name'],
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
    },
    company: {
        type: String,
        maxLength: 255
    },
    title: {
        type: String,
    },
    socialMediaProfiles:{
        type: Array,
    },
    address: {
        type: String,
        maxlength: 255,
    },
    notes: {
        type: String,
    },
    relationships: {
        type: Array
    },
    activityHistory: [


    ],
    verified: {
        type: Boolean,
        default: false,
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
},
    { timestamps: true },
)
