import { CustomRouter } from './imports';
import { puppyRouter } from './puppies';

export class APIRouter extends CustomRouter {
  registerRoutes() {
    this.router.get('/', (_, res) => res.json('The API is working!'));
    this.router.use('/puppies', puppyRouter);
  }
}

export default new APIRouter().export();
