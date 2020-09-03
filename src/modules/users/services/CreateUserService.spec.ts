import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  // it é igual o teste() e significa isso ou isto em inglês
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // Declaramos primeiro porque o CreateAppointmentService recebe um constructor como parametro que é a interface
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // Já colocamos o repositorio de appointment no caso eles recebem a IAppointments

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'Jonhdoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id'); // Verificsar se o usuario já tem o id
  });

  /**
   * SEGUNDO TESTE que é verificar o se tem usuario com email repetido
   */

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // Declaramos primeiro porque o CreateAppointmentService recebe um constructor como parametro que é a interface

    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // Já colocamos o repositorio de appointment no caso eles recebem a IAppointments

    await createUser.execute({
      name: 'John Doe',
      email: 'Jonhdoe@example.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'Jonhdoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError); // Verificsar se o usuario já tem o id
  });
});
