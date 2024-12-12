import { Request, Response, NextFunction } from 'express';
import { offersService } from '@services/offers-service';
import type {IOfferBlock, IOfferType} from '@custom-types/offer';
import { HttpStatusCodes, ResponseStatus } from '@utils/const';

class OffersController {
  async getAllOfferTypes(request: Request, response: Response, next: NextFunction) {
    try {
      const allOfferTypes: IOfferType[] = await offersService.getAllOfferTypes();
      return response.json(allOfferTypes)
    } catch (error) {
      next(error);
    }
  };
  async getOneOfferTypes(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const oneOfferType: IOfferType = await offersService.getOneOfferType(id);
      return response.json(oneOfferType);
    } catch (error) {
      next(error);
    }
  };
  async createOneOfferType(request: Request, response: Response, next: NextFunction){
    try {
      const newOfferType: IOfferType = request.body;
      const createdOfferType: IOfferType = await offersService.createOneOfferType(newOfferType);
      return response.json(createdOfferType);
    } catch (error) {
      next(error);
    }
  };
  async updateOneOfferType(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const updateOfferType: IOfferType = request.body;
      const result: IOfferType = await offersService.updateOneOfferType(id, updateOfferType);
      return response.json(result);
    } catch (error) {
      next(error);
    }
  };
  async deleteOneOfferType(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const deletedOneOfferType: IOfferType | null = await offersService.deleteOneOfferType(id);
      if (deletedOneOfferType) {
        return response.json(deletedOneOfferType);
      }
      return response.status(HttpStatusCodes.NOT_FOUND).json({ status: ResponseStatus.clientError, message: 'Offer type is not found' });
    } catch (error) {
      next(error);
    }
  };
  async getAllOffers(_request: Request, response: Response, next: NextFunction) {
    try {
      const allOffers: IOfferBlock[] = await offersService.getAllOffers();
      return response.json(allOffers);
    } catch (error) {
      next(error);
    }
  };
  async getOneOffer(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const oneOffer: IOfferBlock = await offersService.getOneOffer(id);
      return response.json(oneOffer);
    } catch (error) {
      next(error);
    }
  };
  async createOneOffer(request: Request, response: Response, next: NextFunction) {
    try {
      const newOffer: IOfferBlock = request.body;
      const oneOffer: IOfferBlock = await offersService.createOneOffer(newOffer);
      return response.json(oneOffer);
    } catch (error) {
      next(error);
    }
  };
  async updateOneOffer(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const updateOffer: IOfferBlock = request.body;
      const result: IOfferBlock = await offersService.updateOneOffer(id, updateOffer);
      return response.json(result);
    } catch (error) {
      next(error);
    }
  };
  async deleteOneOffer(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const deletedOneOffer: IOfferBlock | null = await offersService.deleteOneOffer(id);
      if (deletedOneOffer) {
        return response.json(deletedOneOffer);
      }
      return response.status(HttpStatusCodes.NOT_FOUND).json({ status: ResponseStatus.clientError, message: 'Offer is not found' });
    } catch (error) {
      next(error);
    }
  };
}

const offersController: OffersController = new OffersController();

export {
  offersController,
};
