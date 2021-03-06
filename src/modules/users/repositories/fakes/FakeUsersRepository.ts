import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, data);
    this.users.push(user);
    return user;
  }

  async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(userItem => userItem.id === user.id);
    if (userIndex === -1) {
      this.users.push(user);
    } else {
      this.users[userIndex] = user;
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(user_id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === user_id);
  }
}

export default FakeUsersRepository;
