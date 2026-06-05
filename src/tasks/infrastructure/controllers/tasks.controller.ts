import { CreateTaskUseCase } from "@/tasks/application/create-task.use-case";
import {  ItaskRepositoryToken } from "@/tasks/domain/task.repository.interface";
import type { ItaskRepository } from "@/tasks/domain/task.repository.interface";
import { Controller, Get, Inject } from "@nestjs/common";

@Controller("tasks")
export class TasksController {

    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        @Inject(ItaskRepositoryToken) private readonly taskRepository: ItaskRepository
    ){}

    @Get()
    async find() {
        return this.taskRepository.findAll();
    }

}