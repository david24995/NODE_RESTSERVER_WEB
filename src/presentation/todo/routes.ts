import { Router } from 'express';

import { TodoController } from './controller';

export class TodoRoutes {
  static get todoRoutes(): Router {
    const router = Router();
    const todoController = new TodoController();

    router.get('/', todoController.getTodos);
    router.post('/', todoController.createOne);
    router.get('/:id', todoController.getOne);
    router.put('/:id', todoController.updateOne);
    router.delete('/:id', todoController.deleteOne);

    return router;
  }
}
