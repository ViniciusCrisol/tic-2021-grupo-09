import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AccountSessionsController from '../controllers/AccountSessionsController';

const accountSessionsRoutes = Router();
const accountSessionsController = new AccountSessionsController();

accountSessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  accountSessionsController.create,
);

export default accountSessionsRoutes;
