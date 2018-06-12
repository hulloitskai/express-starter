import { CustomRouter } from './imports';
import { PuppyRouter } from './puppies';
import { Router } from 'express';

export class APIRouter extends CustomRouter {
  private puppyRouter = new PuppyRouter().export();

  constructor() {
    super();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.use('/puppies', this.puppyRouter);
    this.router.get('/', function(_, res) {
      res.header('Content-Type', 'text/plain');
      res.json('The API is working!');
    });
  }
}

export default APIRouter;
