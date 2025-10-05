import { CreateTodoDto } from '../../dtos/todos/create-todo.dto';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly reposotory: TodoRepository) {}

  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.reposotory.create(dto);
  }
}
