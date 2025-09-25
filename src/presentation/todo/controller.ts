import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';

let todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Buy bread', completedAt: null },
  { id: 3, text: 'Buy butter', completedAt: new Date() },
];

export class TodoController {
  //* DI
  constructor() {}

  async getTodos(req: Request, res: Response) {
    return res.json(todos);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id)))
      return res.status(400).json({ error: `${id} is not a number` });

    const todo = todos.find((todo) => todo.id == Number(id));

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id: ${id} not found` });
  }

  async createOne(req: Request, res: Response) {
    const { text } = req.body;

    if (!text)
      return res.status(400).json({ error: 'Text property is required' });

    const todo = await prisma.todo.create({
      data: {
        text,
      },
    });

    return res.status(201).json(todo);
  }

  async updateOne(req: Request, res: Response) {
    const idParam = req.params.id;
    const { text } = req.body;

    const id = Number(idParam);

    if (isNaN(Number(id)))
      return res.status(400).json({ error: `${id} is not a number` });

    const todo = todos.find((todo) => todo.id == Number(id));

    if (!todo)
      return res.status(404).json({ error: `TODO with id: ${id} not found` });

    todo.text = text;

    todos = todos.map((t) => {
      if (t.id == id) {
        return todo;
      }
      return t;
    });

    return res.json(todo);
  }

  async deleteOne(req: Request, res: Response) {
    const idParam = req.params.id;
    const id = Number(idParam);

    if (isNaN(Number(id)))
      return res.status(400).json({ error: `${id} is not a number` });

    const todo = todos.find((todo) => todo.id == Number(id));

    if (!todo)
      return res.status(404).json({ error: `TODO with id: ${id} not found` });

    todos = todos.filter((t) => {
      if (t.id !== id) {
        return todo;
      }
    });

    return res.json(todo);
  }
}
