import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ETaskStatus } from '../enums/task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(ETaskStatus)
  status?: ETaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
