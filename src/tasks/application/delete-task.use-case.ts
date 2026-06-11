import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ItaskRepositoryToken } from "../domain/task.repository.interface";
import type { ItaskRepository } from "../domain/task.repository.interface";
import { Task } from "../domain/task.entity";


@Injectable()
export class DeleteTaskUseCase{

    constructor(
        @Inject(ItaskRepositoryToken)
        private readonly taskRepository: ItaskRepository
    ) { } 

    async execute(id: string): Promise<void> {
        const deleted = await this.taskRepository.delete(id);
        if (!deleted)
            throw new NotFoundException('La tarea ${id} no existe');

    }


}