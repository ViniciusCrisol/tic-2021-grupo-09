import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateAccountService from '@modules/Accounts/services/AuthenticateAccountService';

export default class AccountSessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateAccount = container.resolve(AuthenticateAccountService);
    const { account, token } = await authenticateAccount.execute({
      email,
      password,
    });

    const { id, name } = account;
    return response.json({ account: { id, name, email }, token });
  }
}
