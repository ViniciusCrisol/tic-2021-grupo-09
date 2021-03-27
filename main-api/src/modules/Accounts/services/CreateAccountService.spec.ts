import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeAccountsRepository from '../repositories/fakes/FakeAccountsRepository';
import CreateAccountService from './CreateAccountService';

let fakeHashProvider: FakeHashProvider;
let fakeBackofficeProvider: FakeBackofficeProvider;
let fakeAccountsRepository: FakeAccountsRepository;
let createAccount: CreateAccountService;

describe('Create Account', () => {
  beforeEach(async () => {
    fakeHashProvider = new FakeHashProvider();
    fakeBackofficeProvider = new FakeBackofficeProvider();
    fakeAccountsRepository = new FakeAccountsRepository();

    createAccount = new CreateAccountService(
      fakeHashProvider,
      fakeBackofficeProvider,
      fakeAccountsRepository,
    );
  });

  it('Should be able to create a new account.', async () => {
    const account = await createAccount.execute({
      password: 'password',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
    });

    expect(account).toHaveProperty('id');
  });

  it('Should not be able to create a new account with same e-mail from another.', async () => {
    await createAccount.execute({
      password: 'password',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
    });

    await expect(
      createAccount.execute({
        password: 'password',
        user_name: 'John Doe',
        user_email: 'john@example.com',
        account_name: 'JohnDoeAccount',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
