import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ItaskRepositoryToken } from "../domain/task.repository.interface";
import type { ItaskRepository } from "../domain/task.repository.interface";
import { Task } from "../domain/task.entity";
import { GetTaskByIdUseCase } from "./get-task-by-id.use-case";


@Injectable()
export class UpdateTaskUseCase {

    constructor(
        @Inject(ItaskRepositoryToken)
        private readonly taskRepository: ItaskRepository,
        private readonly getTaskByIdUseCase: GetTaskByIdUseCase
    ) { } 

    async execute(id: number, updateData: Partial<Pick<Task, 'title' | 'description' | 'status'>>): Promise<Task> {
       const task = await this.getTaskByIdUseCase.execute(id);

       if (updateData.title != undefined) task.title = updateData.title;
       if (updateData.description != undefined) task.description = updateData.description;
       if (updateData.status != undefined){
        if (updateData.status === 'COMPLETED')
            task.complete();
        else
            task.status = updateData.status;
       }
       return this.taskRepository.update(task);
    }


}