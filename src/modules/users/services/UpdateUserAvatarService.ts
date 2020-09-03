// Subir a imagem do usuario e deletar a antiga
// Validar se o usuario autenticado existe

import path from 'path';
import fs from 'fs';
// Importar o upload
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  // Vai receber o id e o nome do arquivo
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    // Verificar que o id está recebendo se é valido
    const user = await this.usersRepository.findById(user_id);

    // Se não encontrou
    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    // Se o avatar ja existe
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar); // deleta o anterior, antes de salvar o novo
    }

    // o novo avatar
    const filename = await this.storageProvider.saveFile(avatarFilename);

    // Atualizar o usuario
    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
