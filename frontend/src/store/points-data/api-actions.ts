import {toast } from 'react-toastify';
import {createAsyncThunk, Dispatch} from '@reduxjs/toolkit';
import {TPoint, TPointDTO, TPoints } from '../../types';
import {TThunkApiConfig} from '../../types';
import {APIRoute, NameSpace } from '../../utils';
import {
  createPoint,
  deletePoint,
  setIsPointsEmptyList,
  setIsVisibleNewPoint,
  toggleFavoritePoint,
  updatePoint,
} from '../../store';
import {AxiosInstance} from 'axios';


const getAsyncPoints = createAsyncThunk<TPoints, undefined, TThunkApiConfig>(
  `${NameSpace.Points}/fetchPoints`,
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<TPoints>(APIRoute.Points);
      return data;
    } catch (error) {
      // toast.warn(error.message, { position: toast.POSITION.TOP_CENTER});
      throw new Error();
    }
  },
);

const toggleFavoriteAsyncPoint = createAsyncThunk<TPoint, TPoint, TThunkApiConfig>(
  `${NameSpace.Data}/toggleFavoritePoint`,
  async (onePoint: TPoint, { extra: api, dispatch } : { extra: AxiosInstance, dispatch: Dispatch}) => {
    try {
      const { data } : { data: TPoint} = await api.put<TPoint>(`${APIRoute.Points}/${onePoint.id}`, onePoint);
      dispatch(toggleFavoritePoint(data));
      console.log(data)
      return data;
    } catch (error) {
      toast.warn(`There was an error ${onePoint.is_favorite ? 'adding' : 'removing'} the event ${onePoint.is_favorite ? 'to' : 'from'} favorites. Please refresh the page and try again`, { position: toast.POSITION.TOP_CENTER});
      throw new Error();
    }
  },
);

const updateAsyncPoint = createAsyncThunk<TPoint, TPoint, TThunkApiConfig>(
  `${NameSpace.Data}/updatePoint`,
  async (onePoint, { extra: api, dispatch }) => {
    try {
      const { data } = await api.put<TPoint>(`${APIRoute.Points}/${onePoint.id}`, onePoint);
      toast.success('The point was been successfully updated', {position: toast.POSITION.TOP_CENTER});

      dispatch(updatePoint(data));

      return data;
    } catch (error) {
      toast.warn(`Error of creating the object. Please try again`, {position: toast.POSITION.TOP_CENTER});
      throw new Error();
    }
  },
);

const createAsyncPoint = createAsyncThunk<TPoint, TPointDTO, TThunkApiConfig>(
  `${NameSpace.Data}/createPoint`,
  async (onePoint, { extra: api, dispatch }) => {
    try {
      const { data } = await api.post<TPoint>(`${APIRoute.Points}`, onePoint);
      toast.success('New point was been successfully saved', {position: toast.POSITION.TOP_CENTER});

      dispatch(createPoint(data));
      dispatch(setIsVisibleNewPoint(false));
      dispatch(setIsPointsEmptyList(false));

      return data;
    } catch (error) {
      console.log('error', error)
      toast.warn(`Error of creating the object. Please try again ${error}`, {position: toast.POSITION.TOP_CENTER});
      throw new Error();
    }
  },
);

const deleteAsyncPoint = createAsyncThunk<TPoint, TPoint, TThunkApiConfig>(
  `${NameSpace.Data}/deletePoint`,
  async (onePoint, { extra: api, dispatch}) => {
    try {
      const { data } = await api.delete<TPoint>(`${APIRoute.Points}/${onePoint.id}`);

      dispatch(deletePoint(onePoint));

      return data;
    } catch (error) {
      toast.warn(`Error of deleting the object. Please try again`, {position: toast.POSITION.TOP_CENTER});
      throw new Error();
    }
  },
);

export {
  getAsyncPoints,
  toggleFavoriteAsyncPoint,
  updateAsyncPoint,
  createAsyncPoint,
  deleteAsyncPoint,
};
