import { Schema, model } from 'mongoose';
import { IPoint } from '@custom-types/point';
import { transformResponsePlugin } from './transform-response';

const PointSchema = new Schema<IPoint>({
  base_price: {
    type: Number,
    trim: true,
    required: [true, 'You should provide a base price'],
  },
  date_from: {
    type: String,
    trim: true,
    required: [true, 'You should provide a date from'],
  },
  date_to: {
    type: String,
    trim: true,
    required: [true, 'You should provide a date to'],
  },
  destination: {
    type: String,
    trim: true,
    required: [true, 'You should provide a destination'],
  },
  is_favorite: {
    type: Boolean,
    default: false,
  },
  offers: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    trim: true,
    required: [true, 'You should provide an offer type'],
    minLength: [2, 'Too few an offer type'],
    maxLength: [50, 'Too large an offer type'],
  },
});

PointSchema.plugin(transformResponsePlugin);
const PointModel = model('Point', PointSchema);

export {
  PointModel,
};
