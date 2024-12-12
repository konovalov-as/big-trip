import type { Router } from 'express';
import { pointsController } from '@controllers/points-controller';
import { AppRoute } from '@utils/const';

/**
 * @swagger
 * components:
 *   schemas:
 *     NewPoint:
 *       type: object
 *       properties:
 *         base_price:
 *           type: number
 *           description: The pont's base price.
 *           example: 666
 *         date_from:
 *           type: string
 *           description: Date of starting of the event.
 *           example: 2024-02-19T06:53:16.851Z
 *         date_to:
 *           type: string
 *           description: Date of ending of the event.
 *           example: 2024-02-19T06:53:16.851Z
 *         destination:
 *           type: string
 *           description: The destination ID.
 *           example: 65bb6935260f3a769ad8be17
 *         is_favorite:
 *           type: boolean
 *           description: Favorite point.
 *           example: false
 *         offers:
 *           type: array
 *           description: A list of offers.
 *           example: [65c66718858c3f144dcc297f, 65c6673fc40beb055873cf13, 65c66758c40beb055873cf17]
 *         type:
 *           type: string
 *           description: The type of event.
 *           example: airplane
 *     Point:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The point ID.
 *               example: 65b8c2e56419648a1788d894
 *         - $ref: '#/components/schemas/NewPoint'
 */

const pointsRouter = (router: Router) => {
  /**
   * @swagger
   * /points:
   *   get:
   *     tags: [Points]
   *     summary: Retrieve a list of points.
   *     description: Retrieve a list of points from this server. Contains detailed information of the each point.
   *     responses:
   *       200:
   *         description: A list of points.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Point'
   */
  router.get(AppRoute.points, pointsController.getAllPoints);

  /**
   * @swagger
   * /points/{id}:
   *   get:
   *     tags: [Points]
   *     summary: Retrieve a single point.
   *     description: Retrieve a single point from this server. Contains detailed information about the point.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: String ID of the point to retrieve.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: A single point.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Point'
   */
  router.get(`${AppRoute.points}/:id`, pointsController.getOnePoint);
  
  /**
   * @swagger
   * /points:
   *   post:
   *     tags: [Points]
   *     summary: Create a new point.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewPoint'
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Point'
  */
  router.post(AppRoute.points, pointsController.createOnePoint);


  /**
   * @swagger
   * /points/{id}:
   *   put:
   *     tags: [Points]
   *     summary: Update a exist point.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: String ID of the point to update.
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewPoint'
   *     responses:
   *       201:
   *         description: Updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Point'
  */
  router.put(`${AppRoute.points}/:id`, pointsController.updateOnePoint);

  /**
   * @swagger
   * /points/{id}:
   *   delete:
   *     tags: [Points]
   *     summary: Delete a single point.
   *     description: Delete a single point from the database.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: String ID of the point to retrieve.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: A single point.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Point'
   */
  router.delete(`${AppRoute.points}/:id`, pointsController.deleteOnePoint);

  return router;
};

export default pointsRouter;