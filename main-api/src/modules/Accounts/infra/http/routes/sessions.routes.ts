import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

const sessionsRoutes = Router();
const accountSessionsController = new SessionsController();

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  accountSessionsController.create,
);

export default sessionsRoutes;
