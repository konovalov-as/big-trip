import { IPoint, TPoints } from '@custom-types/point';
import { pointsService } from '@services/points-service';
import { HttpStatusCodes, ResponseStatus } from '@utils/const';
import { Request, Response, NextFunction } from 'express';

class PointsController {
  public async getAllPoints(request: Request, response: Response, next: NextFunction) {
    try {
      const points: TPoints = await pointsService.getAllPoints();
      return response.json(points);
    } catch (error) {
      next(error);
    }
  };
  async getOnePoint(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const onePoint: IPoint = await pointsService.getOnePoint(id);
      response.json(onePoint);
    } catch (error) {
      next(error);
    }
  };
  async createOnePoint(request: Request, response: Response, next: NextFunction) {
    try {
      const onePoint: IPoint = request.body;
      const createdPoint: IPoint = await pointsService.createOnePoint(onePoint);
      response.json(createdPoint);
    } catch (error) {
      next(error);
    }
  };
  async updateOnePoint(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const updateOffer: IPoint = request.body;
      const updatedOnePoint: IPoint | null = await pointsService.updateOnePoint(id, updateOffer);
      return response.json(updatedOnePoint);
    } catch (error) {
      next(error);
    }
  };
  async deleteOnePoint(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const deletedPoint: IPoint | null = await pointsService.deleteOnePoint(id);
      if (deletedPoint) {
        return response.json(deletedPoint);
      }
      return response.status(HttpStatusCodes.NOT_FOUND).json(({ status: ResponseStatus.clientError, message: 'Point is not found', }))
    } catch (error) {
      next(error);
    }
  };
}

const pointsController = new PointsController();

export {
  pointsController,  
};
