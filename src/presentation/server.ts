import express, { Application, Router } from 'express';
import morgan from 'morgan';
import path from 'path';

interface Options {
  app: Application;
  PORT: number;
  PUBLIC_PATH?: string;
  routes: Router;
}

export class Server {
  private app: Application;
  private readonly port: number;
  private readonly staticPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    this.app = options.app;
    this.port = options.PORT;
    this.staticPath = options.PUBLIC_PATH || 'public';
    this.routes = options.routes;
  }

  async start() {
    this.app.use(morgan('tiny'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(`${this.staticPath}`));

    this.app.use(this.routes);

    this.app
      .listen(this.port)
      .on('listening', () => {
        console.log('Hola');
      })
      .on('error', (err) => {
        console.log(err);
      });
  }
}
