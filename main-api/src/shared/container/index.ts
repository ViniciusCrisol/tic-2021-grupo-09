import { container } from 'tsyringe';
import './providers';

import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';

import IBusinessRolesRepository from '@modules/BusinessRoles/repositories/IBusinessRolesRepository';
import BusinessRolesRepository from '@modules/BusinessRoles/infra/typeorm/repositories/BusinessRolesRepository';

import IMainThingsRepository from '@modules/MainThings/repositories/IMainThingsRepository';
import MainThingsRepository from '@modules/MainThings/infra/typeorm/repositories/MainThingsRepository';

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);

container.registerSingleton<IBusinessRolesRepository>(
  'BusinessRolesRepository',
  BusinessRolesRepository,
);

container.registerSingleton<IMainThingsRepository>(
  'MainThingsRepository',
  MainThingsRepository,
);
