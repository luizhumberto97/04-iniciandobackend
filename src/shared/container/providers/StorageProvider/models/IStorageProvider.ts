export default interface IStorageProvider {
  // aqui vamos ter a função de salvar e deletar apenas
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
