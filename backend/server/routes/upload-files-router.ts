import { Router } from 'express';
import { uploadFilesController } from '@controllers/upload-files-controller';
import { AppRoute } from '@utils/const';

const uploadFilesRouter = (router: Router) => {
  /**
   * @swagger
   * /upload-files:
   *   get:
   *     tags: [Upload Files]
   *     summary: Get the uploaded image files.
   *     description: Get the list information of the uploaded image files.
   *     responses:
   *       200:
   *         description: A message of upload files
   */
  router.get(AppRoute.uploadFiles, uploadFilesController.getListFiles);

  /**
   * @swagger
   * /upload-files:
   *   post:
   *     tags: [Upload Files]
   *     summary: Upload image files.
   *     description: Upload one or several image files to the server.
   *     responses:
   *       200:
   *         description: A message of upload files
   */
  router.post(AppRoute.uploadFiles, uploadFilesController.uploadFiles);
  return router;
};

export default uploadFilesRouter;
