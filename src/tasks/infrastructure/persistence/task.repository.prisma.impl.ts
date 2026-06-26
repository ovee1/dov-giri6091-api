import { PrismaService } from "@/prisma/prisma.service";
import { Task } from "@/tasks/domain/task.entity";
import { ItaskRepository } from "@/tasks/domain/task.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepositoryPrismaImpl implements ItaskRepository{
    
    constructor(private readonly prisma: PrismaService) { }
    
    async create(task: Task): Promise<Task> {
        const { id, ...data } = task;

        const createdTask = await this.prisma.task.create({
            data:data
        }) as Task;

        return createdTask;
    }
    async findAll(): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany({
            orderBy: { createdAt: 'desc'}
        }) as Task[];

        return tasks;
    }
     async findById(id: number): Promise<Task | null> {
        const task = await this.prisma.task.findUnique({
            where: { id }

        }) as Task | null;

        return task;
    }
    async update(task: Task): Promise<Task> {
        const update = await this.prisma.task.update({
            where: { id: task.id },
            data: {
                title: task.title,
                description: task.description,
                status: task.status
            }
        }) as Task;
        return update;
    }
    async delete(id: number): Promise<boolean> {
        try {
            await this.prisma.task.delete({ where: { id} });
            return true;
        } catch (error) {
            return false;
            
        }
    }
    
}