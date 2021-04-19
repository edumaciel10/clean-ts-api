import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    const accountData = {
      id: 'valid_id',
      email: account.email,
      password: account.password,
      name: account.name
    }
    return await new Promise(resolve => resolve(accountData))
  }
}
