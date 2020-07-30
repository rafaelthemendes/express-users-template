import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.get('/', isAuthenticated, usersController.show);
usersRouter.put('/', isAuthenticated, usersController.update);

export default usersRouter;
