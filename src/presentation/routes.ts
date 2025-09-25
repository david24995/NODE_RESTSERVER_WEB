import { Router } from 'express';
import { TodoRoutes } from './todo/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/todos', TodoRoutes.todoRoutes);

    return router;
  }
}
