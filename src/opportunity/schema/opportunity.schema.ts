
import { minLength } from 'class-validator';
import * as mongoose from 'mongoose';

export const OpportunitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'NAME_IS_BLANK'],
      minlength: 3,
      maxlength: 255,
    },
    description: {
      type: String,
    },
    contacts: {
      type: Array,
    },
    closeDate: {
      type: Date,
    },
    salesStage: {
      type: String,
    },
    amount: {
      type: String,
    },
    tags:{
      type: String
    },
    type:{
      type: String
    },
    notes:{
      type: String
    },
    stage:{
      type: String
    },
    source:{
      type: String
    },
    contact:{
      type: String,
      minLength: 12
    },
    history:{
      type: String
    },
    priority:{
      type: String
    },
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    probability:{
      type: Number
    },
    isDeleted:{
      type: Boolean,
      default: false
    },
    deletedAt:{
      type: Date
    },
    forecasting:{
      type: String
    },
    tasks:{
      type: Array
    },
    products:{
      type: Array
    },
    reminders:{
      type: Array
    },
    collaborators:{
      type: Array
    },
    notifications:{
      type: Array
    },
    conversations:{
      type: Array
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true },
);
