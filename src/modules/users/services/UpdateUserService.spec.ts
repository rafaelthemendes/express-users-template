import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let updateUserService: UpdateUserService;

describe('UpdateUserService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    updateUserService = new UpdateUserService(usersRepository, hashProvider);
  });

  it('should be able to update a user', async () => {
    const user = await usersRepository.create({
      name: 'Mendes',
      email: 'mendes@experiencia.com',
      password: 'abcd1234',
    });

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      name: 'Mendez',
      email: 'mendez@experiencia.com',
    });

    expect(updatedUser.name).toBe('Mendez');
    expect(updatedUser.email).toBe('mendez@experiencia.com');
  });

  it('should not be able to update a user that does not exist', async () => {
    await expect(
      updateUserService.execute({
        user_id: 'invalidUserId',
        name: 'Mendez',
        email: 'mendez@experiencia.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an email that belongs to another user', async () => {
    const user = await usersRepository.create({
      name: 'Mendes',
      email: 'mendes@experiencia.com',
      password: 'abcd1234',
    });

    const anotherUser = await usersRepository.create({
      name: 'Mendez',
      email: 'mendez@experiencia.com',
      password: 'abcd1234',
    });

    await expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'Mendez',
        email: anotherUser.email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change a user password when a new password and the old password are provided', async () => {
    const generateHashSpy = jest.spyOn(hashProvider, 'generateHash');

    const user = await usersRepository.create({
      name: 'Mendes',
      email: 'mendes@experiencia.com',
      password: 'abcd1234',
    });

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      name: user.name,
      email: user.email,
      oldPassword: user.password,
      newPassword: 'newPassword',
    });

    const newHashedPassword = await hashProvider.generateHash('newPassword');

    expect(generateHashSpy).toHaveBeenCalledWith('newPassword');
    expect(updatedUser.password).toBe(newHashedPassword);
  });

  it('should not be able to change a user password when the old password is not provided', async () => {
    const user = await usersRepository.create({
      name: 'Mendes',
      email: 'mendes@experiencia.com',
      password: 'abcd1234',
    });

    await expect(
      updateUserService.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        newPassword: 'newPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change a user password when the old password is wrong', async () => {
    const user = await usersRepository.create({
      name: 'Mendes',
      email: 'mendes@experiencia.com',
      password: 'abcd1234',
    });

    await expect(
      updateUserService.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        oldPassword: 'wrongOldPassword',
        newPassword: 'newPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
