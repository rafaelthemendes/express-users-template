import IHashProvider from '../IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }

  async generateHash(payload: string): Promise<string> {
    return payload;
  }
}
