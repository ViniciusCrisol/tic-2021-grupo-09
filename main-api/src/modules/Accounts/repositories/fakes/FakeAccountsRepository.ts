import { uuid } from 'uuidv4';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';
import ICreateAccountDTO from '@modules/Accounts/dtos/ICreateAccountDTO';
import Account from '../../infra/typeorm/entities/Account';

class FakeAccountsRepository implements IAccountsRepository {
  private accounts: Account[] = [];

  public async create(data: ICreateAccountDTO): Promise<Account> {
    const account = new Account();
    Object.assign(account, { id: uuid(), ...data });

    this.accounts.push(account);
    return account;
  }

  public async findById(id: string): Promise<Account | undefined> {
    const response = this.accounts.find(account => account.id === id);
    return response;
  }

  public async findByEmail(user_email: string): Promise<Account | undefined> {
    const response = this.accounts.find(
      account => account.user_email === user_email,
    );
    return response;
  }
}

export default FakeAccountsRepository;
