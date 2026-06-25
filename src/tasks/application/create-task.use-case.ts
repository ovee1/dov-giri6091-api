// Capa de aplicacion ( caso de uso)

import { Inject, Injectable } from "@nestjs/common";
import type { ItaskRepository } from "../domain/task.repository.interface";
import { ItaskRepositoryToken } from "../domain/task.repository.interface";
import { Task } from "../domain/task.entity";

@Injectable()
export class CreateTaskUseCase {
    constructor(
        @Inject(ItaskRepositoryToken)
        private readonly taskRepository: ItaskRepository,
    ){}
    async execute(title: string, description: string): Promise<Task>{
        const crypto = await import('crypto'); // Genera el ID
        const task = new Task(
            0,
            title,
            description,
            'PENDING',
            new Date(),
        );
        return this.taskRepository.create(task);

    }
}




//! git remote add origin git@github.com:ovee1/dov-giri6091-api.git


//! git commit -m "init: proyecto inicial y estructura limpia en el caso de uso Task"