import type { Router } from 'express';
import { uploadMulter } from '@middleware/multer-middleware';
import { checkRoleMiddleware } from '@middleware/check-role-middleware';
import { destinationsController } from '@controllers/destinations-controller';
import { AppRoute } from '@utils/const';

/**
 * @swagger
 * components:
 *   schemas:
 *     NewPicture:
 *       type: object
 *       properties:
 *         src:
 *           type: string
 *           description: The path of the image's city
 *           example: /uploads/images/beautiful-picture.png
 *         description:
 *           type: string
 *           description: The description of the image's city
 *     Picture:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The image ID.
 *               example: 65bb6935260f3a769ad8be18
 *         - $ref: '#/components/schemas/NewPicture'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewDestination:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: The detailed description of the destination.
 *           example: This city is very amazing
 *         name:
 *           type: string
 *           description: The city name.
 *           example: Moscow
 *         picture:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Picture'
 *     Destination:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The destination ID.
 *               example: 65b8c2e56419648a1788d894
 *         - $ref: '#/components/schemas/NewDestination'
 */

const destinationsRouter = (router: Router) => {
  router.get(AppRoute.cities, destinationsController.getAllCities);
  router.get(`${AppRoute.cities}/:id`, destinationsController.getOneCity);
  router.post(AppRoute.cities, checkRoleMiddleware(['admin']), destinationsController.createOneCity);
  router.put(`${AppRoute.cities}/:id`, checkRoleMiddleware(['admin']), destinationsController.updateOneCity);
  router.delete(`${AppRoute.cities}/:id`, checkRoleMiddleware(['admin']), destinationsController.deleteOneCity);
  /**
   * @swagger
   * /destinations:
   *   get:
   *     tags: [Destinations]
   *     summary: Retrieve a list of destinations.
   *     description: Retrieve a list of destinations from this server. Contains detailed information of the each point.
   *     responses:
   *       200:
   *         description: A list of destinations.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Destination'
   */
  router.get(AppRoute.destination, destinationsController.getAllDestinations);
  router.get(`${AppRoute.destination}/:id`, destinationsController.getOneDestination);
  router.post(AppRoute.destination, checkRoleMiddleware(['admin']), uploadMulter.array('files'), destinationsController.createOneDestination);
  router.put(`${AppRoute.destination}/:id`, checkRoleMiddleware(['admin']), uploadMulter.array('files'), destinationsController.updateOneDestination);
  router.delete(`${AppRoute.destination}/:id`, checkRoleMiddleware(['admin']), destinationsController.deleteOneDestination);
    
  return router;
};

export default destinationsRouter;
