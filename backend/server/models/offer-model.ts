import {  Schema, model } from 'mongoose';
import { transformResponsePlugin } from './transform-response';
import type {
  IOfferType,
  IOfferBlock,
  IOfferItem,
  OfferModelType,
} from '@custom-types/offer';

const OfferTypeSchema = new Schema<IOfferType>({
  type: {
    type: String,
    trim: true,
    required: [true, 'You should provide an offer type'],
    minLength: [2, 'Too few an offer type'],
    maxLength: [50, 'Too large an offer type'],
    lowercase: true,
    unique: true,
  },
});
OfferTypeSchema.plugin(transformResponsePlugin);
const OfferTypeModel = model<IOfferType>('OfferType', OfferTypeSchema);

const OfferItemSchema = new Schema<IOfferItem>({
  price: {
    type: Number,
    trim: true,
    required: [true, 'You should provide an offer price'],
    min: [0, 'Too few an offer price'],
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'You should provide an offer title'],
    minLength: [2, 'Too few an offer title'],
    maxLength: [50, 'Too large an offer title'],
  },
});
OfferItemSchema.plugin(transformResponsePlugin);

const OfferSchema = new Schema<IOfferBlock, OfferModelType>({
  type: {
    type: String,
    trim: true,
    required: [true, 'You should provide an offer type'],
    minLength: [2, 'Too few an offer type'],
    maxLength: [50, 'Too large an offer type'],
    unique: true,
  },
  offers: {
    type: [OfferItemSchema],
    required: true,
    validate: {
      validator: function (offers: IOfferItem[]) {
        return offers.length > 0;
      },
      message: 'The offers array must not be empty',
    },
  },
})

OfferSchema.plugin(transformResponsePlugin);

// Create model
const OfferModel = model<IOfferBlock, OfferModelType>('Offer', OfferSchema);

export {
  OfferTypeModel,
  OfferModel,
};
