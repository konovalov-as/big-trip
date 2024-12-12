import { Model, Types } from 'mongoose';

interface IOfferType {
  type: string;
}

// Sub-document definition
interface IOfferItem {
  // id?: string;
  // _id: Types.ObjectId;
  title: string;
  price: number;
}

// Document definition
interface IOfferBlock {
  type: string;
  offers: IOfferItem[];
}

// TMethodsAndOverrides
type OfferDocumentProps = {
  offers: Types.DocumentArray<IOfferItem>;
};
type OfferModelType = Model<IOfferBlock, {}, OfferDocumentProps>;

type TOffers = IOfferItem[];

export {
  type IOfferType,
  type IOfferItem,
  type IOfferBlock,
  type OfferModelType,
  type TOffers,
};
