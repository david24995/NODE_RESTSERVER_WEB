import { prisma } from "../../data/postgres-data";
import { TodoDataSource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    
    const todo = await prisma.todo.create({
      data: createTodoDto
    });

    return TodoEntity.fromObject(todo);
    
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(todo => TodoEntity.fromObject(todo));
  }
  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) throw `Todo with id ${id} not found`;

    return TodoEntity.fromObject(todo);
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);
    
    const todoUpdated = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values
    });

    return TodoEntity.fromObject(todoUpdated);

  }
  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const todoDeleted = await prisma.todo.delete({ where: { id } });

    return TodoEntity.fromObject(todoDeleted);

  }
  
}