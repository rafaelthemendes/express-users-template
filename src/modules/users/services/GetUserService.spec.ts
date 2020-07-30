import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import GetUserService from './GetUserService';

let usersRepository: FakeUsersRepository;
let getUserService: GetUserService;

describe('GetUserService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    getUserService = new GetUserService(usersRepository);
  });

  it('should be able to get the user details', async () => {
    const user = await usersRepository.create({
      name: 'Mendes',
      email: 'mendes@experiencia.com',
      password: 'abcd1234',
    });

    const sameUser = await getUserService.execute({
      user_id: user.id,
    });

    expect(sameUser.name).toBe('Mendes');
    expect(sameUser.email).toBe('mendes@experiencia.com');
  });

  it('should not be able to get details of a user that does not exist', async () => {
    await expect(
      getUserService.execute({
        user_id: 'invalidUserId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
