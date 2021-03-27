import { getRepository, Repository } from 'typeorm';
import ICreateAccountDTO from '@modules/Accounts/dtos/ICreateAccountDTO';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';
import Account from '../entities/Account';

class AccountsRepository implements IAccountsRepository {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = getRepository(Account);
  }

  public async create(data: ICreateAccountDTO): Promise<Account> {
    const account = this.ormRepository.create(data);
    await this.ormRepository.save(account);

    return account;
  }

  public async findById(id: string): Promise<Account | undefined> {
    const response = await this.ormRepository.findOne(id);
    return response;
  }

  public async findByEmail(user_email: string): Promise<Account | undefined> {
    const response = await this.ormRepository.findOne({
      where: { user_email },
    });
    return response;
  }
}

export default AccountsRepository;
