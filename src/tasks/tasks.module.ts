import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {TaskSchema} from './schema/tasks.schema'

@Module({
  imports: [
  MongooseModule.forFeature([{name: 'Task', schema: TaskSchema}])],
  
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule {}
