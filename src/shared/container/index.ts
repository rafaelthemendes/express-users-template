import '@modules/users/providers';
import UsersRepository from '@modules/users/repositories/implementations/TypeOrmUsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
