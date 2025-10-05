import { Request, Response } from 'express';

import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { GetTodos } from '../../domain/use-cases/todos/get-todos';
import { GetTodo } from '../../domain/use-cases/todos/get-todo';
import { CreateTodo } from '../../domain/use-cases/todos/create-todo';
import { UpdateTodo } from '../../domain/use-cases/todos/update-todo';
import { timeStamp } from 'console';
import { DeleteTodo } from '../../domain/use-cases/todos/delete-todo';

export class TodoController {
  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}

  getTodos(req: Request, res: Response) {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error }));
  }

  getOne(req: Request, res: Response) {
    const id = Number(req.params.id);

    new GetTodo(this.todoRepository)
      .execute(id)
      .then(res.json)
      .catch((error) => res.status(400).json({ error }));
  }

  createOne(req: Request, res: Response) {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then(res.json)
      .catch((error) => res.status(400).json({ error }));
  }

  updateOne(req: Request, res: Response) {
    const paramId = req.params.id;
    const id = Number(paramId);

    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then(res.json)
      .catch((error) => res.status(400).json({ error }));
  }

  deleteOne(req: Request, res: Response) {
    const idParam = req.params.id;
    const id = Number(idParam);

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then(res.json)
      .catch((error) => res.status(400).json({ error }));
  }
}
