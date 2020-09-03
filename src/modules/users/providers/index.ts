import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

// toda vez com injeção de Hash provider -> retorna o BCrypteHashProvider
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
