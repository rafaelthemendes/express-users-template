import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../entities/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
