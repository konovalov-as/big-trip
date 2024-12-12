import type { Request, Response, NextFunction } from 'express';
import type {ICities, ICity, IDestination} from '@custom-types/destination';
import { destinationsService } from '@services/destinations-service';
import { HttpStatusCodes, ResponseStatus } from '@utils/const';

class DestinationsController {
  async getAllCities(_request: Request, response: Response, next: NextFunction) {
    try {
      const allCities: ICities = await destinationsService.getAllCities();
      return response.json(allCities);
    } catch (error) {
      next(error);
    }
  };
  async getOneCity(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const oneCity: ICity = await destinationsService.getOneCity(id);
      return response.json(oneCity);
    } catch (error) {
      next(error);
    }
  };
  async createOneCity(request: Request, response: Response, next: NextFunction) {
    try {
      const newCity: ICity = request.body;
      const createdCity: ICity = await destinationsService.createOneCity(newCity);
      return response.json(createdCity);
    } catch (error) {
      next(error);
    }
  };
  async updateOneCity(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const updateCity: ICity = request.body;
      const result: ICity = await destinationsService.updateOneCity(id, updateCity);
      return response.json(result);
    } catch (error) {
      next(error);
    }
  };
  async deleteOneCity(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const deletedOneCity: ICity | null = await destinationsService.deleteOneCity(id);
      if (deletedOneCity) {
        return response.json(deletedOneCity);
      }
      return response.status(HttpStatusCodes.NOT_FOUND).json({status: ResponseStatus.clientError, message: 'City is not found'})
    } catch (error) {
      next(error);
    }
  };
  async getAllDestinations(_request: Request, response: Response, next: NextFunction) {
    try {
      const allDestinations: IDestination[] = await destinationsService.getAllDestinations();
      return response.json(allDestinations);
    } catch (error) {
      next(error);
    }
  };
  async getOneDestination(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const oneDestination: IDestination = await destinationsService.getOneDestination(id);
      return response.json(oneDestination);
    } catch (error) {
      next(error);
    }
  };
  async createOneDestination(request: Request, response: Response, next: NextFunction) {
    try {
      const newDestination: IDestination = request.body;
      const createdDestination: IDestination = await destinationsService.createOneDestination(newDestination);
      return response.json(createdDestination);
    } catch (error) {
      next(error);
    }
  };
  async updateOneDestination(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const updateDestination: IDestination = request.body;
      const result: IDestination = await destinationsService.updateOneDestination(id, updateDestination);
      return response.json(result);
    } catch (error) {
      next(error);
    }
  };
  async deleteOneDestination(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const deletedOneDestination: IDestination | null = await destinationsService.deleteOneDestination(id);
      if (deletedOneDestination) {
        return response.json(deletedOneDestination);
      }
      return response.status(HttpStatusCodes.BAD_REQUEST).json({ status: ResponseStatus.clientError, message: 'Destination is not found' });
    } catch (error) {
      next(error);
    }
  };
}

const destinationsController = new DestinationsController();

export {
  destinationsController,
};
