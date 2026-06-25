import { Module } from "@nestjs/common";
import { TasksController } from "./controllers/tasks.controller";
import { CreateTaskUseCase } from "../application/create-task.use-case";
import { ItaskRepositoryToken } from "../domain/task.repository.interface";
import { TaskRepositoryImpl } from "./persistence/task.repository.impl";
import { GetTaskByIdUseCase } from "../application/get-task-by-id.use-case";
import { UpdateTaskUseCase } from "../application/update-task.use-case";
import { DeleteTaskUseCase } from "../application/delete-task.use-case";
import { TaskRepositoryPrismaImpl } from "./persistence/task.repository.prisma.impl";

@Module({
    controllers: [ TasksController],
    providers: [
        CreateTaskUseCase,
        GetTaskByIdUseCase,
        UpdateTaskUseCase,
        DeleteTaskUseCase,
        {
            provide: ItaskRepositoryToken,
            useClass: TaskRepositoryPrismaImpl  // Cambiar si la DB cambia
        }
    ],
    exports: [ CreateTaskUseCase],
})
export class TaskModule {}