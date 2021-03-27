import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AccountsController from '../controllers/AccountsController';

const accountsRoutes = Router();
const accountsController = new AccountsController();

accountsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_name: Joi.string().required(),
      user_email: Joi.string().email().required(),
      account_name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  accountsController.create,
);

export default accountsRoutes;
