import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsString,
    IsDate,
    IsNumber,
    IsArray,
    IsEmail,
    IsMongoId,
  } from 'class-validator';

  
export class CreateTaskDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    title: String;

    description?: String;
    dueDate?: Date; 
    priority?: String;
    status?: String;
    remainders?: String;
    attachments?: String[];
    comments?: String;
    activityLog?: String[];
    followUp?: String;
    tags?: String[];
    isCompleted?: Boolean;
}