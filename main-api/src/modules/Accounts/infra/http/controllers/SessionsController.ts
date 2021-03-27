import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateAccountService from '@modules/Accounts/services/AuthenticateAccountService';

export default class AccountSessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_email, password } = request.body;

    const authenticateAccount = container.resolve(AuthenticateAccountService);
    const { account, token } = await authenticateAccount.execute({
      user_email,
      password,
    });

    const { id } = account;
    return response.json({ account: { id, user_email }, token });
  }
}
