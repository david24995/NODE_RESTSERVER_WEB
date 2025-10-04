import { TodoDataSource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodoRepositoryImpl implements TodoRepository {

  constructor(
    private readonly datasource: TodoDataSource
  ){}

   create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }
   async getAll(): Promise<TodoEntity[]> {
    return await this.datasource.getAll();
  }
   findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }
   updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDto);
  }
   deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }

}