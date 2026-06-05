import { Task } from "@/tasks/domain/task.entity";
import { ItaskRepository } from "@/tasks/domain/task.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepositoryImpl implements ItaskRepository{
    private tasks : Task[] = [];

    async create(task: Task): Promise<Task> {
       this.tasks.push(task);
       return task
    }
    async findAll(): Promise<Task[]> {
        return this.tasks;
    }
    async findById(id: string): Promise<Task | null> {
        return this.tasks.find( t => t,id == id) || null;
    }

}

//! npm i --save class-validator class-transformer