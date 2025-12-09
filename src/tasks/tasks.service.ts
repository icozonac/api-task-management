import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = this.tasksRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   let tasks = this.getAllTasks();
  //   if (filterDto.status) {
  //     tasks = tasks.filter((task) => task.status === filterDto.status);
  //   }
  //   if (filterDto.search) {
  //     tasks = tasks.filter((task) => task.title.includes(filterDto.search!) || task.description.includes(filterDto.search!));
  //   }
  //   return tasks;
  // }
  // getTaskById(id: string): Task | undefined {
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return task;
  // }

  // updateTaskStatus(id: string, status: ETaskStatus): Task | undefined {
  //   const task = this.getTaskById(id);
  //   if (task) {
  //     task.status = status;
  //     return task;
  //   }
  // }
}
