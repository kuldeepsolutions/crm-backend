import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TaskInterface } from './interface/tasks.interface';
import {Model} from 'mongoose'

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<TaskInterface>){}
  
  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = new this.taskModel(createTaskDto)
      await task.save()
      return 'Task has been created'
    } catch (error) {
      return error.message
    }
  }

  async findAll(startDate: String, endDate: String) {
    try {
      let startFrom
      let endAt
      if (startDate && endDate) {
        startFrom = new Date(startDate.slice(1, 11)).getTime()
        endAt = new Date(endDate.slice(1, 11)).getTime()
      } else if (startDate) {
        startFrom = new Date(startDate.slice(1, 11)).getTime()
        endAt = Date.now()
      } else if (endDate) {
        startFrom = new Date(endDate.slice(1, 11)).setMonth(new Date(endDate.slice(1, 11)).getMonth() - 1)
        endAt = new Date(endDate.slice(1, 11)).getTime()
      }else {
        startFrom = new Date(Date.now()).setMonth(new Date().getMonth() - 1)
        endAt = Date.now()
      }
      const tasks = await this.taskModel.find(
        {
          createdAt: {
            $gte: startFrom,
            $lte: endAt
          }
        },
        { __v: 0 },
      );
      return tasks; 
    } catch (error) {
      return error.message
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.taskModel.findById(id,{__v:0})
      if (!task){
        throw new NotFoundException('Task not found')
      }
      return task
    } catch (error) {
      return error.message
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskModel.findById(id)
      if (!task){
        throw new NotFoundException('Task not found')
      }
      for (let key in updateTaskDto){ 
        if (updateTaskDto[key]){
          task[key] = updateTaskDto[key]
        }
      }
      await task.save()
      return 'Task has been updated'
    } catch (error) {
      return error.message
    }
  }

  async remove(id: string) {
    try {
      await this.taskModel.findByIdAndDelete(id)
      return 'Task has been successfully deleted'
    } catch (error) {
      return error.message
    }
  }

  // Multiple deletes
  async multipleRemove(list: string[]){
    try {
      for(let index=0; index < list.length; index++){
        console.log(list[index]);
        const task = await this.taskModel.findById(list[index])
        if (!task){
          throw new NotFoundException(`Task of id ${list[index]} is not found`)
        }
        await this.taskModel.findByIdAndDelete(list[index])
      }
      return 'Required tasks are deleted'
    } catch (error) {
      return error.message
    }
  }
}
