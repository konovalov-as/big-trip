import { ApiError } from '@exceptions/api-error';
import {OfferModel, OfferTypeModel} from '@models/offer-model';
import type {IOfferBlock} from '@custom-types/offer';
import {IOfferType} from '@custom-types/offer';

class OffersService {
  async getAllOfferTypes(): Promise<IOfferType[]> {
    return OfferTypeModel.find();
  }
  async getOneOfferType(id: string): Promise<IOfferType> {
    const oneOfferType: IOfferType | null = await OfferTypeModel.findById(id);

    if (!oneOfferType) {
      throw ApiError.BadRequest('Offer type is not found');
    }
    return oneOfferType;
  }
  async createOneOfferType(oneOfferType: IOfferType): Promise<IOfferType> {
    // const candidate: IOfferType | null = await OfferModel.findOne({type: oneOfferType.type});
    // if (candidate) {
    //   throw ApiError.BadRequest(`This offer type ${oneOfferType.type} has already been added`)
    // }
    // return await OfferTypeModel.create(oneOfferType);
    const offerType: IOfferType = await OfferTypeModel.create(oneOfferType);
    return offerType;
  }
  async updateOneOfferType(id: string, updateOfferType: IOfferType): Promise<IOfferType> {
    await OfferTypeModel.findByIdAndUpdate(id, updateOfferType);
    return await this.getOneOfferType(id);
  }
  async deleteOneOfferType(id: string): Promise<IOfferType | null> {
    return OfferTypeModel.findByIdAndDelete(id);
  }

  async getAllOffers(): Promise<IOfferBlock[]> {
    return OfferModel.find();
  };
  async getOneOffer(id: string): Promise<IOfferBlock> {
    const offer: IOfferBlock | null = await OfferModel.findById(id);
    
    if (!offer) {
      throw ApiError.BadRequest('Offer is not found');
    }
    return offer;
  };
  async createOneOffer(oneOffer: IOfferBlock): Promise<IOfferBlock> {
    const createdOneOffer: IOfferBlock = await OfferModel.create(oneOffer);
    return createdOneOffer;
  };
  async updateOneOffer(id: string, updateOffer: IOfferBlock): Promise<IOfferBlock> {
    await OfferModel.findByIdAndUpdate(id, updateOffer);
    return await this.getOneOffer(id);
  };
  async deleteOneOffer(id: string): Promise<IOfferBlock | null> {
    return OfferModel.findByIdAndDelete(id);
  };
}

const offersService: OffersService = new OffersService();

export {
  offersService,
};
