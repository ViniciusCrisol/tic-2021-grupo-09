import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeBusinessRolesRepository from '@modules/BusinessRoles/repositories/fakes/FakeBusinessRolesRepository';
import FakeMainThingsRepository from '@modules/MainThings/repositories/fakes/FakeMainThingsRepository';
import FakeAccountsRepository from '../repositories/fakes/FakeAccountsRepository';
import MainThing from '@modules/MainThings/infra/typeorm/entities/MainThing';
import BusinessRole from '@modules/BusinessRoles/infra/typeorm/entities/BusinessRole';
import Account from '../infra/typeorm/entities/Account';
import CreateAccountService from './CreateAccountService';
import AuthenticateAccountService from './AuthenticateAccountService';

let fakeHashProvider: FakeHashProvider;
let fakeBackofficeProvider: FakeBackofficeProvider;
let fakeAccountsRepository: FakeAccountsRepository;
let fakeBusinessRolesRepository: FakeBusinessRolesRepository;
let fakeMainThingsRepository: FakeMainThingsRepository;
let mainThing: MainThing;
let businessRole: BusinessRole;
let account: Account;
let createAccount: CreateAccountService;
let authenticateAccount: AuthenticateAccountService;

describe('Authenticate Account', () => {
  beforeEach(async () => {
    fakeHashProvider = new FakeHashProvider();
    fakeBackofficeProvider = new FakeBackofficeProvider();
    fakeAccountsRepository = new FakeAccountsRepository();
    fakeBusinessRolesRepository = new FakeBusinessRolesRepository();
    fakeMainThingsRepository = new FakeMainThingsRepository();

    createAccount = new CreateAccountService(
      fakeHashProvider,
      fakeBackofficeProvider,
      fakeAccountsRepository,
      fakeBusinessRolesRepository,
      fakeMainThingsRepository,
    );

    authenticateAccount = new AuthenticateAccountService(
      fakeAccountsRepository,
      fakeHashProvider,
    );

    businessRole = await fakeBusinessRolesRepository.create({
      business_role: 'Marketing',
    });

    mainThing = await fakeMainThingsRepository.create({
      main_thing: 'Professional',
    });

    account = await createAccount.execute({
      name: 'John Doe',
      password: 'password',
      email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      account_business_role_id: businessRole.id,
      account_main_thing_id: mainThing.id,
    });
  });

  it('Should be able to authenticate.', async () => {
    const response = await authenticateAccount.execute({
      email: 'john@example.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.account).toEqual(account);
  });

  it('Should not be able to authenticate with a wrong email.', async () => {
    await expect(
      authenticateAccount.execute({
        email: 'wrongJohn@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with a wrong password.', async () => {
    await expect(
      authenticateAccount.execute({
        email: 'john@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
