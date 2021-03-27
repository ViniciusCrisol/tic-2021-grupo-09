import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeAccountsRepository from '../repositories/fakes/FakeAccountsRepository';
import Account from '../infra/typeorm/entities/Account';
import CreateAccountService from './CreateAccountService';
import AuthenticateAccountService from './AuthenticateAccountService';

let fakeHashProvider: FakeHashProvider;
let fakeBackofficeProvider: FakeBackofficeProvider;
let fakeAccountsRepository: FakeAccountsRepository;
let account: Account;
let createAccount: CreateAccountService;
let authenticateAccount: AuthenticateAccountService;

describe('Authenticate Account', () => {
  beforeEach(async () => {
    fakeHashProvider = new FakeHashProvider();
    fakeBackofficeProvider = new FakeBackofficeProvider();
    fakeAccountsRepository = new FakeAccountsRepository();

    createAccount = new CreateAccountService(
      fakeHashProvider,
      fakeBackofficeProvider,
      fakeAccountsRepository,
    );

    authenticateAccount = new AuthenticateAccountService(
      fakeAccountsRepository,
      fakeHashProvider,
    );

    account = await createAccount.execute({
      password: 'password',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
    });
  });

  it('Should be able to authenticate.', async () => {
    const response = await authenticateAccount.execute({
      user_email: 'john@example.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.account).toEqual(account);
  });

  it('Should not be able to authenticate with a wrong email.', async () => {
    await expect(
      authenticateAccount.execute({
        user_email: 'wrongJohn@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with a wrong password.', async () => {
    await expect(
      authenticateAccount.execute({
        user_email: 'john@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
