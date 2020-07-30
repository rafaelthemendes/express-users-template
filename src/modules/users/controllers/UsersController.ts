import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../services/CreateUserService';
import GetUserService from '../services/GetUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({ name, email, password });
    delete user.password;
    return response.json(user);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const getUserService = container.resolve(GetUserService);
    const user = await getUserService.execute({ user_id });
    delete user.password;
    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const updateUserService = container.resolve(UpdateUserService);
    const user = await updateUserService.execute({
      user_id,
      ...request.body,
    });
    delete user.password;
    return response.json(user);
  }
}
