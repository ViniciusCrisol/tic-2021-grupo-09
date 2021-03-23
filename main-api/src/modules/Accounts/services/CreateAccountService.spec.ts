import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeBusinessRolesRepository from '@modules/BusinessRoles/repositories/fakes/FakeBusinessRolesRepository';
import FakeMainThingsRepository from '@modules/MainThings/repositories/fakes/FakeMainThingsRepository';
import FakeAccountsRepository from '../repositories/fakes/FakeAccountsRepository';
import MainThing from '@modules/MainThings/infra/typeorm/entities/MainThing';
import BusinessRole from '@modules/BusinessRoles/infra/typeorm/entities/BusinessRole';
import CreateAccountService from './CreateAccountService';

let fakeHashProvider: FakeHashProvider;
let fakeBackofficeProvider: FakeBackofficeProvider;
let fakeBusinessRolesRepository: FakeBusinessRolesRepository;
let fakeMainThingsRepository: FakeMainThingsRepository;
let fakeAccountsRepository: FakeAccountsRepository;
let mainThing: MainThing;
let businessRole: BusinessRole;
let createAccount: CreateAccountService;

describe('Create Account', () => {
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

    businessRole = await fakeBusinessRolesRepository.create({
      business_role: 'Marketing',
    });

    mainThing = await fakeMainThingsRepository.create({
      main_thing: 'Professional',
    });
  });

  it('Should be able to create a new account.', async () => {
    const account = await createAccount.execute({
      name: 'John Doe',
      password: 'password',
      email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      account_business_role_id: businessRole.id,
      account_main_thing_id: mainThing.id,
    });

    expect(account).toHaveProperty('id');
  });

  it('Should not be able to create a new account with same e-mail from another.', async () => {
    await createAccount.execute({
      name: 'John Doe',
      password: 'password',
      email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      account_business_role_id: businessRole.id,
      account_main_thing_id: mainThing.id,
    });

    await expect(
      createAccount.execute({
        name: 'John Doe',
        password: 'password',
        email: 'john@example.com',
        account_name: 'JohnDoeAccount',
        account_business_role_id: businessRole.id,
        account_main_thing_id: mainThing.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new account with a non existing business role.', async () => {
    await expect(
      createAccount.execute({
        name: 'John Doe',
        password: 'password',
        email: 'john@example.com',
        account_name: 'JohnDoeAccount',
        account_business_role_id: '402b0578-1514-41df-99b9-2434361ef100',
        account_main_thing_id: mainThing.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new account with a non existing main thing.', async () => {
    await expect(
      createAccount.execute({
        name: 'John Doe',
        password: 'password',
        email: 'john@example.com',
        account_name: 'JohnDoeAccount',
        account_business_role_id: businessRole.id,
        account_main_thing_id: 'ebfdb2dd-555d-4730-8541-16aa58d1029d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
