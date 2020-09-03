import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      // o rename aqui é para mover de local as imagens
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    // para verificar se existe, tem que dar um try
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // Se encontrou o arquivo deletar
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
