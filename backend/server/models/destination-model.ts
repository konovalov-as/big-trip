import { Schema, model } from 'mongoose';
import type {ICity, IDestination, IPicture} from '@custom-types/destination';
import { transformResponsePlugin } from './transform-response';

const CitySchema = new Schema<ICity>({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'You should provide a city'],
    minlength: [2, 'Too few a city'],
    maxlength: [50, 'Too large a city'],
  },
});
CitySchema.plugin(transformResponsePlugin);

const CityModel = model<ICity>('CityModel', CitySchema);

const PictureSchema = new Schema<IPicture>({
  src: {
    type: String,
    trim: true,
    required: [true, 'You should provide a city src picture'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'You should provide a city picture description'],
    minLength: [2, 'Too few a city picture description'],
    maxLength: [500, 'Too large a city picture description'],
  },
});
PictureSchema.plugin(transformResponsePlugin);

const DestinationSchema = new Schema<IDestination>({
  name: {
    type: String,
    trim: true,
    required: [true, 'You should provide a city name'],
    minLength: [2, 'Too few a city name'],
    maxLength: [50, 'Too large a city name'],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'You should provide a city description'],
    minLength: [2, 'Too few a city description'],
    maxLength: [500, 'Too large a city description'],
  },
  pictures: {
    type: [PictureSchema],
    required: [true, 'You should provide city pictures'],
  },
});
DestinationSchema.plugin(transformResponsePlugin);

const DestinationModel = model<IDestination>('Destination', DestinationSchema);

export {
  CityModel,
  DestinationModel,
};
