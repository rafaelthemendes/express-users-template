import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(usersRepository, hashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      email: 'mendes@experiencia.com',
      name: 'Mendes',
      password: 'abcd1234',
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await usersRepository.create({
      email: 'mendes@experiencia.com',
      name: 'Mendes',
      password: 'abcd1234',
    });

    await expect(
      createUserService.execute({
        email: 'mendes@experiencia.com',
        name: 'Mendes',
        password: 'abcd1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
