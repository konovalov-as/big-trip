import type { Router } from 'express';
import { checkRoleMiddleware } from '@middleware/check-role-middleware';
import { offersController } from '@controllers/offers-controller';
import { AppRoute } from '@utils/const';
import { body } from 'express-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     NewOfferItem:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The offer name
 *           example: Upgrade to premium
 *         price:
 *           type: string
 *           description: The offer price
 *           example: 666
 *     OfferItem:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The offer item ID.
 *               example: 65b8c2e56419648a1788d895
 *         - $ref: '#/components/schemas/NewOfferItem'
 *     DetailOffer:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: The offer name.
 *           example: airplane
 *         offers:
 *           type: array
 *           items:
 *             properties:
 *               title:
 *                 type: string
 *                 description: The offer name
 *                 example: Upgrade to premium
 *               price:
 *                 type: string
 *                 description: The offer price
 *                 example: 666
 *     NewDetailOffer:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The detail offer item ID.
 *               example: 65b8c2e56419648a1788d895
 *         - $ref: '#/components/schemas/DetailOffer'
 *     Offer:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The offer ID.
 *               example: 65b8c2e56419648a1788d894
 *         - $ref: '#/components/schemas/NewDetailOffer'
 */

const offersRouter = (router: Router) => {
  /**
   * @swagger
   * /offer-types:
   *   get:
   *     tags: [Offers]
   *     summary: Retrieve a list of offer types.
   *     description: Retrieve a list of offer types from this server.
   */
  router.get(AppRoute.offerTypes, offersController.getAllOfferTypes);
  router.get(`${AppRoute.offerTypes}/:id`, offersController.getOneOfferTypes);
  router.post(AppRoute.offerTypes, checkRoleMiddleware(['admin']), offersController.createOneOfferType);
  router.put(`${AppRoute.offerTypes}/:id`, checkRoleMiddleware(['admin']), offersController.updateOneOfferType);
  router.delete(`${AppRoute.offerTypes}/:id`, checkRoleMiddleware(['admin']), offersController.deleteOneOfferType);

  router.get(AppRoute.offers, offersController.getAllOffers);
  router.get(`${AppRoute.offers}/:id`, offersController.getOneOffer);

  /**
   * @swagger
   * /offers:
   *   get:
   *     tags: [Offers]
   *     summary: Retrieve a list of offers.
   *     description: Retrieve a list of offers from this server. Contains detailed information of each point.
   *     responses:
   *       200:
   *         description: A list of offers.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Offer'
   */
  router.post(AppRoute.offers, checkRoleMiddleware(['admin']), offersController.createOneOffer);
  router.put(`${AppRoute.offers}/:id`, checkRoleMiddleware(['admin']), offersController.updateOneOffer);
  router.delete(`${AppRoute.offers}/:id`, checkRoleMiddleware(['admin']), offersController.deleteOneOffer);

  return router;
};

export default offersRouter;
