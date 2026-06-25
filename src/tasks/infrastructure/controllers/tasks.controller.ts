import { CreateTaskUseCase } from "@/tasks/application/create-task.use-case";
import { DeleteTaskUseCase } from "@/tasks/application/delete-task.use-case";
import { GetTaskByIdUseCase } from "@/tasks/application/get-task-by-id.use-case";
import { UpdateTaskUseCase } from "@/tasks/application/update-task.use-case";
import {  ItaskRepositoryToken } from "@/tasks/domain/task.repository.interface";
import type { ItaskRepository } from "@/tasks/domain/task.repository.interface";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { version } from "os";
import { UpdateExpression } from "typescript";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";

@ApiTags("Tasks")
@Controller( {path: "tasks", version: '1'})
export class TasksController {

    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly getTaskByIdUseCase: GetTaskByIdUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
        @Inject(ItaskRepositoryToken) private readonly taskRepository: ItaskRepository
    ){}

    @Get()
    @ApiOperation({ summary: 'Listar todas las tareas'})
    async find() {
        return this.taskRepository.findAll();
    }
    @Post()
    @ApiOperation({ summary: 'Crear una nueva tarea'})
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Creada correctamente'})
    async create(@Body() task: CreateTaskDto){
        return this.createTaskUseCase.execute(task.title, task.description)
    }

    @Get(":id")
    @ApiOperation({ summary: 'Obtener la tarea por ID'})
    @ApiParam({ name:'id', description: 'ID de la tarea (UUID)'})
    @ApiResponse({ status: HttpStatus.OK, description: 'Tarea encontrada'})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tarea no encontrada'})
    async findOne(@Param("id", ParseIntPipe) id: number) {
        return this.getTaskByIdUseCase.execute(id);
    }

    @Patch(":id")
    @ApiOperation({ summary: 'Actualoza la tarea por ID'})
    @ApiParam({ name:'id', description: 'ID de la tarea (UUID)'})
    async update(@Param("id", ParseIntPipe) id: number, @Body() updateTask: UpdateTaskDto){
        return this.updateTaskUseCase.execute(id, updateTask);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar la tarea por ID'})
    @ApiParam({name: 'id', description: 'ID de la tarea (UUID)'})
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: ' Tarea eliminada'})
    async delete(@Param("id", ParseIntPipe) id: number){
        return this.deleteTaskUseCase.execute(id);
    }

}

//! git commit -m "add: implementacion completa del CRUD de tareas"