import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (_, response) => {
  response.send('Hello user!');
});

export default usersRouter;
