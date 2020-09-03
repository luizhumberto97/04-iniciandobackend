import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

// Index, show, create , update ,delete

// update é apenas para atualizar todas as informações do perfil,
// o avatar não que é apenas o avatar porque aqui vamos utilizar mudar nome, email e senha

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    // Pegar o id do usuario porque o middleware de autenticação seta
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
