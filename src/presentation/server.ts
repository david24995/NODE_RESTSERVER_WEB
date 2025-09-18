import express, { Application } from "express";
import morgan from 'morgan';
import path from "path";

interface Options {
  app: Application
  PORT: number
  PUBLIC_PATH?: string
}


export class Server {

  private app: Application;
  private readonly port: number;
  private readonly staticPath: string;

  constructor(options: Options){
    this.app = options.app;
    this.port = options.PORT;
    this.staticPath = options.PUBLIC_PATH || "public";
  }

  async start() {

    this.app.use(morgan('tiny'))

    this.app.use(express.static(`${this.staticPath}`))

    this.app.get('/*splat', (req, res) => {
      const pathFile = path.join(__dirname + `../../../${this.staticPath}/index.html`)
      res.sendFile(pathFile)
      return
    })

    this.app.listen(this.port).on('listening', () => {
      console.log('Hola');
    }).on('error', (err) => {
      console.log(err);
    })
  }

}