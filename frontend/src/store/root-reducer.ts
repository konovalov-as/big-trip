import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../utils';
import {
  pointsData,
  destinationsData,
  offersData,
  userProcess,
  uploadFilesData,
} from '../store';

const rootReducer = combineReducers({
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Points]: pointsData.reducer,
  [NameSpace.Destinations]: destinationsData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.UploadFiles]: uploadFilesData.reducer,
});

export {
  rootReducer,
};
