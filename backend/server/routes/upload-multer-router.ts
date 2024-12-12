import { Router } from 'express';
import { uploadMulter } from '@middleware/multer-middleware';
import { uploadMulterController } from '@controllers/upload-multer.controller';
import { AppRoute } from '@utils/const';
import {checkRoleMiddleware} from '@middleware/check-role-middleware';

const uploadMulterRouter = (router: Router) => {
  /**
   * @swagger
   * /upload-multer:
   *   get:
   *     tags: [Upload Files]
   *     summary: Get the uploaded image files.
   *     description: Get the list information of the uploaded image files.
   *     responses:
   *       200:
   *         description: A message of upload files
   */
  router.get(AppRoute.uploadMulter, uploadMulterController.getListFiles);

  /**
   * @swagger
   * /upload-multer:
   *   post:
   *     tags: [Upload Files]
   *     summary: Upload image files.
   *     description: Upload one or several image files to the server.
   *     responses:
   *       200:
   *         description: A message of upload files
   */
  router.post(AppRoute.uploadMulter, uploadMulter.array('files'), uploadMulterController.uploadFiles);

  /**
   * @swagger
   * /upload-multer
   */
  router.delete(`${AppRoute.uploadMulter}/:id`, checkRoleMiddleware(['admin']), uploadMulterController.deleteOneFile);
  return router;
};

export default uploadMulterRouter;
