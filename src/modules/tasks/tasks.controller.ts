import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { User } from 'src/modules/auth/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id', ParseUUIDPipe) id: string, @Body() newStatus: UpdateTaskStatusDto): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, newStatus.status);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
