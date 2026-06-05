//! Dealer(contratador del repositorio)

import { Task } from "./task.entity";

export interface ItaskRepository {
    create(task: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;

}

// Token para la inyccion de dependencias
export const ItaskRepositoryToken = Symbol('ITaskRepository');