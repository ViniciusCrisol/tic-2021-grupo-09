import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import {
  emailAlreadyInUse,
  mainThingNotExists,
  businessRoleNotExists,
} from '@shared/errors/messages';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IBackofficeProvider from '@shared/container/providers/BackofficeProvider/models/IBackofficeProvider';
import IBusinessRolesRepository from '@modules/BusinessRoles/repositories/IBusinessRolesRepository';
import IMainThingsRepository from '@modules/MainThings/repositories/IMainThingsRepository';
import IAccountsRepository from '../repositories/IAccountsRepository';
import Account from '../infra/typeorm/entities/Account';

interface IRequest {
  name: string;
  email: string;
  password: string;
  account_name: string;
  account_business_role_id: string;
  account_main_thing_id: string;
}

@injectable()
class CreateAccountService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('BackofficeProvider')
    private backofficeProvider: IBackofficeProvider,

    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('BusinessRolesRepository')
    private businessRolesRepository: IBusinessRolesRepository,

    @inject('MainThingsRepository')
    private mainThingsRepository: IMainThingsRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    account_name,
    account_business_role_id,
    account_main_thing_id,
  }: IRequest): Promise<Account> {
    const checkAccountExists = await this.accountsRepository.findByEmail(email);
    if (checkAccountExists) {
      throw new AppError(emailAlreadyInUse.message);
    }

    const checkMainThingExists = await this.businessRolesRepository.findById(
      account_business_role_id,
    );
    if (!checkMainThingExists) {
      throw new AppError(mainThingNotExists.message);
    }

    const checkBusinessRoleExists = await this.mainThingsRepository.findById(
      account_main_thing_id,
    );
    if (!checkBusinessRoleExists) {
      throw new AppError(businessRoleNotExists.message);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const account = await this.accountsRepository.create({
      name,
      email,
      password_hash: hashedPassword,
      account_name,
      account_business_role_id,
      account_main_thing_id,
    });

    this.backofficeProvider.sendWelcomeMail(account.id);
    return account;
  }
}

export default CreateAccountService;
