import {toast} from 'react-toastify';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {TCities, TCity, TDestinations, TDestination} from '../../types';
import {TThunkApiConfig} from '../../types';
import {
  createCity,
  createDestination,
  deleteCity,
  deleteDestination,
  setFilesCount,
  updateCity,
  updateDestination
} from '../../store';
import {APIRoute, NameSpace,} from '../../utils';

const getAsyncCities = createAsyncThunk<TCities, undefined, TThunkApiConfig>(
  `${NameSpace.Destinations}/fetchCities`,
  async (_arg, {extra: api}): Promise<TCities> => {
    const { data} = await api.get<TCities>(APIRoute.Cities);
    return data;
  },
);

const createAsyncCity = createAsyncThunk<TCity, TCity, TThunkApiConfig>(
  `${NameSpace.Destinations}/createCity`,
  async (oneCity: TCity, {extra: api, dispatch}): Promise<TCity> => {
    const {data} = await api.post<TCity>(`${APIRoute.Cities}`, oneCity);
    dispatch(createCity(data));
    toast.success('New city was been successfully created', {position: toast.POSITION.TOP_CENTER});
    return data;
  },
);

const updateAsyncCity = createAsyncThunk<TCity, TCity, TThunkApiConfig>(
  `${NameSpace.Destinations}/updateCity`,
  async (updateOneCity: TCity, {extra: api, dispatch}): Promise<TCity> => {
    const {data} = await api.put<TCity>(`${APIRoute.Cities}/${updateOneCity.id}`, updateOneCity);
    dispatch(updateCity(data));
    toast.success('The city type was been successfully updated', {position: toast.POSITION.TOP_CENTER});
    return data;
  },
);

const deleteAsyncCity = createAsyncThunk<TCity, string, TThunkApiConfig>(
  `${NameSpace.Destinations}/deleteCity`,
  async (cityId: string, {extra: api, dispatch}): Promise<TCity> => {
    const {data} = await api.delete<TCity>(`${APIRoute.Cities}/${cityId}`);
    dispatch(deleteCity(data));
    toast.success('The city was been successfully deleted', {position: toast.POSITION.TOP_CENTER});
    return data;
  },
);

const getAsyncDestinations = createAsyncThunk<TDestinations, undefined, TThunkApiConfig>(
  `${NameSpace.Destinations}/fetchDestinations`,
  async (_arg, { extra: api }): Promise<TDestinations> => {
    const { data } = await api.get<TDestinations>(APIRoute.Destinations);
    return data;
  },
);

const createAsyncDestination = createAsyncThunk<TDestination | undefined, TDestination, TThunkApiConfig>(
  `${NameSpace.Destinations}/createDestination`,
  async (oneDestination: TDestination, {extra: api, dispatch}): Promise<TDestination | undefined> => {
    const {data} = await api.post<TDestination>(APIRoute.Destinations, oneDestination);
    dispatch(createDestination(data));
    toast.success('New destination was been successfully created', {position: toast.POSITION.TOP_CENTER});
    dispatch(setFilesCount(0));
    return data;
  }
);

const updateAsyncDestination = createAsyncThunk<TDestination, TDestination, TThunkApiConfig>(
  `${NameSpace.Destinations}/updateDestination`,
  async (updateOneDestination: TDestination, {extra: api, dispatch}): Promise<TDestination> => {
    const { data} = await api.put<TDestination>(`${APIRoute.Destinations}/${updateOneDestination.id}`, updateOneDestination);
    dispatch(updateDestination(data));
    toast.success('Destination was been successfully updated', {position: toast.POSITION.TOP_CENTER});
    return data;
  },
);

const deleteAsyncDestination = createAsyncThunk<TDestination, string, TThunkApiConfig>(
  `${NameSpace.Destinations}/deleteDestination`,
  async (destinationId: string, {extra: api, dispatch}): Promise<TDestination> => {
    const {data} = await api.delete<TDestination>(`${APIRoute.Destinations}/${destinationId}`);
    dispatch(deleteDestination(data));
    toast.success('The destination has been successfully deleted', {position: toast.POSITION.TOP_CENTER});
    return data;
  },
);

export {
  getAsyncCities,
  createAsyncCity,
  updateAsyncCity,
  deleteAsyncCity,
  getAsyncDestinations,
  createAsyncDestination,
  updateAsyncDestination,
  deleteAsyncDestination,
};
