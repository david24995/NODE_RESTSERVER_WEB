import { Router } from 'express';

import { TodoController } from './controller';
import { TodoRepositoryImpl } from '../../infraestructure/repositories/todo.repository.impl';
import { TodoDataSourceImpl } from '../../infraestructure/datasource/todo.datasource.impl';

export class TodoRoutes {
  static get todoRoutes(): Router {
    const router = Router();
    const datasource = new TodoDataSourceImpl()
    const repository = new TodoRepositoryImpl(datasource)
    const todoController = new TodoController(repository);

    router.get('/', todoController.getTodos.bind(todoController));
    router.post('/', todoController.createOne.bind(todoController));
    router.get('/:id', todoController.getOne.bind(todoController));
    router.put('/:id', todoController.updateOne.bind(todoController));
    router.delete('/:id', todoController.deleteOne.bind(todoController));

    return router;
  }
}
