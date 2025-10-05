import { UpdateTodoDto } from '../../dtos/todos/update-todo.dto';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface GetsTodoUseCase {
  execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements GetsTodoUseCase {
  constructor(private readonly reposotory: TodoRepository) {}

  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this.reposotory.updateById(dto);
  }
}
