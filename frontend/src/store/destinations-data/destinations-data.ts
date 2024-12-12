import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  TCity,
  TCities,
  TDestination,
  TDestinations,
} from '../../types';
import {NameSpace} from '../../utils';
import {getAsyncCities, getAsyncDestinations} from '../../store';

type TDestinationsData = {
  cities: TCities,
  editCityId: number | null,
  isCitiesLoading: boolean,
  destinations: TDestinations;
  editDestinationId: number | null,
  isDestinationsLoading: boolean;
};

const initialState: TDestinationsData = {
  cities: [],
  editDestinationId: null,
  isCitiesLoading: false,
  destinations: [],
  editCityId: null,
  isDestinationsLoading: false,
};

const destinationsData = createSlice({
  name: NameSpace.Destinations,
  initialState,
  reducers: {
    createCity: (state, action: PayloadAction<TCity>): void => {
      const index: number = state.cities.findIndex((oneCity: TCity): boolean => oneCity.name.toLowerCase() === action.payload.name.toLowerCase());
      if (index === -1) {
        state.cities.push(action.payload);
      }
    },
    updateCity: (state, action: PayloadAction<TCity>): void => {
      const index: number = state.cities.findIndex((oneCity: TCity): boolean => oneCity.id === action.payload.id);
      if (index !== -1) {
        state.cities[index] = action.payload;
      }
    },
    deleteCity: (state, action: PayloadAction<TCity>): void => {
      state.cities = state.cities.filter((oneCity): boolean => oneCity.id !== action.payload.id);
    },
    setEditCityId: (state, action: PayloadAction<number | null>): void => {
      state.editCityId = action.payload;
    },
    createDestination: (state, action: PayloadAction<TDestination>): void => {
      state.destinations.push(action.payload);
    },
    updateDestination: (state, action: PayloadAction<TDestination>): void => {
      const index: number = state.destinations.findIndex((oneDestination): boolean => oneDestination.id === action.payload.id);
      if (index !== -1) {
        state.destinations[index] = action.payload;
      }
    },
    deleteDestination: (state: TDestinationsData, action: PayloadAction<TDestination>): void => {
      state.destinations = state.destinations.filter((oneDestination: TDestination): boolean => oneDestination.id !== action.payload.id);
    },
    setEditDestinationId: (state: TDestinationsData, action: PayloadAction<number | null>): void => {
      state.editDestinationId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAsyncDestinations.pending, (state): void => {
        state.isDestinationsLoading = true;
      })
      .addCase(getAsyncDestinations.rejected, (state): void => {
        state.isDestinationsLoading = false;
      })
      .addCase(getAsyncDestinations.fulfilled, (state, action: PayloadAction<TDestinations>): void => {
        state.isDestinationsLoading = false;
        state.destinations = action.payload;
      })
      .addCase(getAsyncCities.pending, (state): void => {
        state.isCitiesLoading = true;
      })
      .addCase(getAsyncCities.rejected, (state): void => {
        state.isCitiesLoading = false;
      })
      .addCase(getAsyncCities.fulfilled, (state, action: PayloadAction<TCities>): void => {
        state.isCitiesLoading = false;
        state.cities = action.payload;
      })
  }});

const {
  createCity,
  deleteCity,
  updateCity,
  setEditDestinationId,
  createDestination,
  updateDestination,
  deleteDestination,
  setEditCityId,
} = destinationsData.actions;

export {
  type TDestinationsData,
  destinationsData,
  createCity,
  updateCity,
  deleteCity,
  setEditCityId,
  createDestination,
  updateDestination,
  deleteDestination,
  setEditDestinationId,
};
