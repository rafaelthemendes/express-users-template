import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../entities/User';
import IHashProvider from '../providers/HashProvider/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    user_id,
    name,
    email,
    oldPassword,
    newPassword,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Unauthorized', 401);
    }

    const anotherUser = await this.usersRepository.findByEmail(email);
    if (anotherUser && anotherUser.id !== user_id) {
      throw new AppError('This email is already used by another user', 400);
    }

    user.name = name;
    user.email = email;

    if (newPassword && !oldPassword) {
      throw new AppError(
        'Old password must be provided to change the password',
        400,
      );
    }

    if (newPassword && oldPassword) {
      const passwordChecked = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );
      if (!passwordChecked) {
        throw new AppError('Wrong password', 400);
      }
      user.password = await this.hashProvider.generateHash(newPassword);
    }

    await this.usersRepository.save(user);

    return user;
  }
}
