import { hash, compare } from 'bcryptjs';
import IHashProvider from '../IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}
