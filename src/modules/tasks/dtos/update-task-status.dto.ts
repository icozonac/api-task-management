import { IsEnum } from 'class-validator';
import { ETaskStatus } from '../enums/task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(ETaskStatus)
  status: ETaskStatus;
}
