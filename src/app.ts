import express from 'express'
import { Server } from "./presentation/server";
import { envs } from './config/envs';



(() => {

  main();

})()

async function main() {
  
  const PORT = envs.PORT || 3000;
  const app = express();
  const PUBLIC_PATH = envs.PUBLIC_PATH;

  const server = new Server({app, PORT, PUBLIC_PATH})
  await server.start()

}