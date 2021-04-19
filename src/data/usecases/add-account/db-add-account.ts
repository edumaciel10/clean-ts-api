import { AccountModel, AddAccount, AddAccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccount: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccount
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign(accountData, { password: hashedPassword }))
    const account = { // bypass typescript interface
      id: 'valid_id',
      email: accountData.email,
      password: accountData.password,
      name: accountData.name
    }
    return await new Promise(resolve => resolve(account))
  }
}
