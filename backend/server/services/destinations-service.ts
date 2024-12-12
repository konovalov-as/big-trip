import {CityModel, DestinationModel} from '@models/destination-model';
import type {ICities, ICity, IDestination} from '@custom-types/destination';
import { ApiError } from '@exceptions/api-error';

class DestinationsService {
  async getAllCities(): Promise<ICities> {
    return await CityModel.find();
  };
  async getOneCity(id: string): Promise<ICity> {
    const city: ICity | null = await CityModel.findById(id);
    if (!city) {
      throw ApiError.BadRequest('City is not found');
    }
    return city;
  };
  async createOneCity(oneCity: ICity): Promise<ICity> {
    return await CityModel.create(oneCity);
  };
  async updateOneCity(id: string, updateCity: ICity): Promise<ICity> {
    await CityModel.findByIdAndUpdate(id, updateCity);
    return await this.getOneCity(id);
  };
  async deleteOneCity(id: string): Promise<ICity | null> {
    return CityModel.findByIdAndDelete(id);
  };
  async getAllDestinations(): Promise<IDestination[]> {
    return await DestinationModel.find();
  };
  async getOneDestination(id: string): Promise<IDestination> {
    const destination: IDestination | null = await DestinationModel.findById(id);
    if (!destination) {
      throw ApiError.BadRequest('Destination is not found');
    }
    return destination;
  };
  async createOneDestination(oneDestination: IDestination): Promise<IDestination> {
    const destination: IDestination = await DestinationModel.create(oneDestination);
    return destination;
  };
  async updateOneDestination(id: string, updateDestination: IDestination): Promise<IDestination> {
    await DestinationModel.findByIdAndUpdate(id, updateDestination);
    return await this.getOneDestination(id);
  };
  async deleteOneDestination(id: string): Promise<IDestination | null> {
    return await DestinationModel.findByIdAndDelete(id);
  };
}

const destinationsService: DestinationsService = new DestinationsService();

export {
  destinationsService,
};
