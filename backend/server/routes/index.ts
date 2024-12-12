import express, { NextFunction, Request, Response } from 'express';
import { AppRoute, ResponseStatus } from '@utils/const';

// Import individual route profiles from controllers
// import uploadFilesRouter from '@routes/upload-files-router';
import uploadMulterRouter from '@routes/upload-multer-router';
import pointsRouter from '@routes/points-router';
import destinationsRouter from '@routes/destinations-router';
import offersRouter from '@routes/offers-router';
import userRouter from '@routes/user-router';

const router = express.Router();

// Pass our router instance to controllers
// router.use(AppRoute.uploadFiles, uploadFilesRouter(router));
router.use(AppRoute.uploadMulter, uploadMulterRouter(router));
router.use(AppRoute.points, pointsRouter(router));
router.use(AppRoute.destination, destinationsRouter(router));
router.use(AppRoute.offers, offersRouter(router));
router.use(AppRoute.user, userRouter(router));

/**
 * @swagger
 * /health-check:
 *   get:
 *     tags: [Health Check]
 *     summary: Check the app
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: Success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 * 
 */
router.get(AppRoute.healthCheck, async (request: Request, response: Response, next: NextFunction) => {
  try {
    response.json({ status: ResponseStatus.success, message: 'It works!' })
  } catch (error) {
    next(error);
  }
});

export default router;
