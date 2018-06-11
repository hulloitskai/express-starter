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
    this.router.get('/', (_, res) => res.json('The API is working!'));
    this.router.use('/puppies', this.puppyRouter);
  }
}

export default APIRouter;
