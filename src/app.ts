import express from 'express';
import { Server } from './presentation/server';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';

(() => {
  main();
})();

async function main() {
  const PORT = envs.PORT || 3000;
  const app = express();
  const PUBLIC_PATH = envs.PUBLIC_PATH;
  const routes = AppRoutes.routes;

  const server = new Server({ app, PORT, PUBLIC_PATH, routes });
  await server.start();
}
