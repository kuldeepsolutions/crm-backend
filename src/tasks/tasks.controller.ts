import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Create task
  @Post('create')
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  // Get all the tasks
  @Get()
  async findAll(@Query('startDate') startDate:string|null, @Query('endDate') endDate:string|null) {
    if (endDate){
      const date = (parseInt(endDate.split('-')[2]) + 1).toString()
      let [year,month,day] = endDate.split('-')
      const modified = `${year}-${month}-${date}`
      return await this.tasksService.findAll(startDate, modified.toString()); 
    }
    return await this.tasksService.findAll(startDate, endDate); 
  }

  // @Get()
  // async findAll() {
  //   return await this.tasksService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(id);
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tasksService.remove(id);
  }

  // Delete multiple tasks
  @Delete('/delete/multiple-tasks')
  async multipleRemove(@Body('deleteTasks') deleteTasks: string[]){
    return await this.tasksService.multipleRemove(deleteTasks)
  }
}
