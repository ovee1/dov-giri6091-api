import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ItaskRepositoryToken } from "../domain/task.repository.interface";
import type { ItaskRepository } from "../domain/task.repository.interface";
import { Task } from "../domain/task.entity";


@Injectable()
export class GetTaskByIdUseCase{

    constructor(
        @Inject(ItaskRepositoryToken)
        private readonly taskRepository: ItaskRepository
    ) { } 

    async execute(id: number): Promise<Task> {
        const task = await this.taskRepository.findById(id);
        if (!task)
            throw new NotFoundException('La tarea ${id} no existe');
        return task;

    }


}