import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(usersRepository, hashProvider);
    authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = await createUserService.execute({
      name: 'Mendes',
      email: 'mendes@experiencia',
      password: 'abcd1234',
    });

    const response = await authenticateUserService.execute({
      email: user.email,
      password: 'abcd1234',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
  });

  it('should not be able to authenticate a user that does not exist', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'mendes@experiencia.com',
        password: 'abcd1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with a wrong password', async () => {
    const user = await usersRepository.create({
      name: 'Mendes',
      email: 'mendes@experiencia',
      password: 'abcd1234',
    });

    await expect(
      authenticateUserService.execute({
        email: user.email,
        password: 'a wrong password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
