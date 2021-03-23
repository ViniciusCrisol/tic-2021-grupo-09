import { Router } from 'express';

import backofficeRouter from './backoffice.routes';
import accountsRouter from '@modules/Accounts/infra/http/routes/accounts.routes';
import accountSessionsRouter from '@modules/Accounts/infra/http/routes/account.sessions.routes';

const routes = Router();

routes.use('/', backofficeRouter);
routes.use('/accounts', accountsRouter);
routes.use('/accounts/session', accountSessionsRouter);

export default routes;
