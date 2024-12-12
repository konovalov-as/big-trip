import { ApiError } from '@exceptions/api-error';
import { PointModel } from '@models/point-model';
import type { IPoint, TPoints } from '@custom-types/point';

class PointsService {
  async getAllPoints(): Promise<TPoints> {
    return await PointModel.find();
  };
  async getOnePoint(id: string): Promise<IPoint> {
    const point: IPoint | null = await PointModel.findById(id);

    if (!point) {
      throw ApiError.BadRequest('Point is not found');
    }
    return point;
  };
  async createOnePoint(onePoint: IPoint): Promise<IPoint> {
    const point: IPoint = await PointModel.create(onePoint);
    return point;
  };
  async updateOnePoint(id: string, updatedPoint: IPoint): Promise<IPoint> {
    await PointModel.findByIdAndUpdate(id, updatedPoint);
    return await this.getOnePoint(id);
  };
  async deleteOnePoint(id: string): Promise<IPoint | null> {
    return await PointModel.findByIdAndDelete(id);
  };
}

const pointsService = new PointsService();

export {
  pointsService,
};
