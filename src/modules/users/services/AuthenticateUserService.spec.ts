import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // Já colocamos o repositorio de appointment no caso eles recebem a IAppointments

    // Criando o usuario
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    // AUthenticando o ousuario
    const response = await authenticateUser.execute({
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token'); // Verificar se o usuario já tem o id
    expect(response.user).toEqual(user);
  });

  /**
   * SEGUNDO TESTE -> Não authenticar -> Usuario que não tem conta ( Não existe)
   */

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // Já colocamos o repositorio de appointment no caso eles recebem a IAppointments

    expect(
      authenticateUser.execute({
        email: 'jonhdoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  /**
   * TERCEIRO TESTE -> NÃO AUTENTICAR USUARIO COM SENHA ERRADA
   */
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // Já colocamos o repositorio de appointment no caso eles recebem a IAppointments

    // Criando o usuario
    await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'jonhdoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
