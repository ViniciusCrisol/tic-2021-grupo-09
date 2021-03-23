import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { authenticationFail } from '@shared/errors/messages';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IAccountsRepository from '../repositories/IAccountsRepository';
import Account from '../infra/typeorm/entities/Account';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  account: Account;
  token: string;
}

@injectable()
class AuthenticateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const account = await this.accountsRepository.findByEmail(email);
    if (!account) {
      throw new AppError(authenticationFail.message, authenticationFail.status);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      account.password_hash,
    );

    if (!passwordMatched) {
      throw new AppError(authenticationFail.message, authenticationFail.status);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, { subject: account.id, expiresIn });
    return { account, token };
  }
}

export default AuthenticateAccountService;
