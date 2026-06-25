//! Dealer(contratador del repositorio)

import { Task } from "./task.entity";

export interface ItaskRepository {
    create(task: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: number): Promise<Task | null>;
    update(task:Task): Promise<Task>; 
    delete(id: number): Promise<boolean>;
}

// Token para la inyccion de dependencias
export const ItaskRepositoryToken = Symbol('ITaskRepository');