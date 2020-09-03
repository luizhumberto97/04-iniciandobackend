import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  // it é igual o teste() e significa isso ou isto em inglês
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // Declaramos primeiro porque o CreateAppointmentService recebe um constructor como parametro que é a interface
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    ); // Já colocamos o repositorio de appointment no caso eles recebem a IAppointments

    // Criamos usuario usando o fakeUsersRepository create
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg'); // Verificsar se o usuario já tem o id
  });

  /**
   * SEGUNDO TESTE que é verificar o se tem usuario com email repetido
   */
});
