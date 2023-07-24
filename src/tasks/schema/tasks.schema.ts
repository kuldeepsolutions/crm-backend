import * as mongoose from 'mongoose';
// import * as validator from 'validator';
import * as bcrypt from 'bcrypt';

export const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: [true, 'Please enter title of the task'],
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    //   required: [true, 'Enter the due date'],
    },
    priority: {
      type: String,
    },
    status: {
      type: String,
    },
    reminders: {
      type: Date,
    },
    attachments:{
      type: Array<String>
    },
    comments: {
      type: String,
    },
    activityLog:{
      type: Array<String>
    },
    followUp: {
      type: String,
    },
    tags:{
      type: Array<String>,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdAt:{
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true },
);


