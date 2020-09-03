// IMportando o modelo do Hash
import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload; // Aqui no teste não precisa de senha criptografada
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed; // AQui comparamos se são iguais (Não precisa de senha criptografada)
  }
}

export default FakeHashProvider;
