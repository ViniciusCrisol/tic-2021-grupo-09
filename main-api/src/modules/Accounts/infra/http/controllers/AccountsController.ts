import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';

export default class AccountsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createAccount = container.resolve(CreateAccountService);
    const { id, user_email } = await createAccount.execute(request.body);
    return response.json({ id, user_email });
  }
}
