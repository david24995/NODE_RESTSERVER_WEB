import { Request, Response } from 'express';
import { prisma } from '../../data/postgres-data';

let todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Buy bread', completedAt: null },
  { id: 3, text: 'Buy butter', completedAt: new Date() },
];

export class TodoController {
  //* DI
  constructor() {}

  async getTodos(req: Request, res: Response) {
    const todos = await prisma.todo.findMany();

    return res.json(todos);
  }

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: `${id} is not a number` });

    const todo = await prisma.todo.findFirst({ where: { id } });

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

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo)
      return res.status(404).json({ error: `TODO with id: ${id} not found` });

    const todoUpdated = await prisma.todo.update({
      where: { id },
      data: { text },
    });

    return res.json(todoUpdated);
  }

  async deleteOne(req: Request, res: Response) {
    const idParam = req.params.id;
    const id = Number(idParam);

    if (isNaN(Number(id)))
      return res.status(400).json({ error: `${id} is not a number` });

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo)
      return res.status(404).json({ error: `TODO with id: ${id} not found` });

    const todoDeleted = await prisma.todo.delete({ where: { id } });

    return res.json(todoDeleted);
  }

  private async findFirstTodo(id: number) {
    return prisma.todo.findFirst({ where: { id } });
  }
}
