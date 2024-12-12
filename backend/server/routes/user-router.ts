import {request, response, Router} from 'express';
import { body } from 'express-validator';
import { userController } from '@controllers/user-controller';
import { AppRoute, MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '@utils/const';
import {gReCaptchaMiddleware} from '@middleware/grecaptcha-api-middleware';
import {checkRoleMiddleware} from "@middleware/check-role-middleware";

const userRouter = (router: Router) => {
  /**
   * @swagger
   * /registration:
   *   post:
   *     tags: [User]
   *     summary: Registration.
   *     description: Registration new user.
   *     responses:
   *       200:
   *         description: A message of success registration of user
   */

  router.post(AppRoute.registration,
    gReCaptchaMiddleware,
    body('email')
      .trim()
      .notEmpty().withMessage('You must type an valid email')
      .isEmail().withMessage('You must type an valid email'),
    body('password')
      .trim()
      .exists({checkFalsy: true}).withMessage('You must type a password')
      .isLength({ min: MIN_LENGTH_PASSWORD }).withMessage(`Password must contain at least ${MIN_LENGTH_PASSWORD} characters`)
      .isLength({ max: MAX_LENGTH_PASSWORD }).withMessage(`Password can contain max ${MAX_LENGTH_PASSWORD} characters`),
    body('confirmedPassword')
      .trim()
      .exists({checkFalsy: true}).withMessage('You must type a confirmation password')
      .custom((value, {req}) => value === req.body.password).withMessage(`The passwords do not match`),
    userController.registration,
  );
  router.post(AppRoute.login,
    gReCaptchaMiddleware,
    body('email')
      .trim()
      .notEmpty().withMessage('You must type an valid email')
      .isEmail().withMessage('You must type an valid email'),
    body('password')
      .trim()
      .notEmpty().withMessage('You must type a password'),
    userController.login,
  );
  router.post(AppRoute.logout, userController.logout);
  router.get(`${AppRoute.activation}/:link`, userController.activate);
  router.get(AppRoute.refresh, userController.refresh);
  router.post(AppRoute.recoveryPassword,
    gReCaptchaMiddleware,
    body('email')
      .trim()
      .notEmpty().withMessage('You must type an valid email')
      .isEmail().withMessage('You must type an valid email'),
    userController.recoveryPassword);
  router.post(AppRoute.setNewPassword,
    gReCaptchaMiddleware,
    body('resetLink')
      .trim()
      .notEmpty().withMessage('You must provide a reset link'),
    body('password')
      .trim()
      .exists({checkFalsy: true}).withMessage('You must type a password')
      .isLength({ min: MIN_LENGTH_PASSWORD }).withMessage(`Password must contain at least ${MIN_LENGTH_PASSWORD} characters`)
      .isLength({ max: MAX_LENGTH_PASSWORD }).withMessage(`Password can contain max ${MAX_LENGTH_PASSWORD} characters`),
    body('confirmedPassword')
      .trim()
      .exists({checkFalsy: true}).withMessage('You must type a confirmation password')
      .custom((value, {req}) => value === req.body.password).withMessage(`The passwords do not match`),
    
    userController.setNewPassword);

  router.get(AppRoute.users, userController.getAllUsers);
  router.put(`${AppRoute.lockUser}/:id`, checkRoleMiddleware(['admin']), userController.lockOneUser);

  return router;
};

export default userRouter;
