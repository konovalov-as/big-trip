import {toast} from 'react-toastify';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  TThunkApiConfig,
  TOfferTypeId,
  TOfferType,
  TOffer,
  TOffers,
  TOffersTypes,
} from '../../types';
import {
  createOfferType,
  updateOfferType,
  deleteOfferType,
  updateOffer,
  createOffer,
  deleteOffer,
} from '../../store';
import {
  APIRoute,
  // ClientErrorCode,
  NameSpace,
} from '../../utils';

const getAsyncOffersTypes = createAsyncThunk<TOffersTypes, undefined, TThunkApiConfig>(
  `${NameSpace.Offers}/fetchOffersTypes`,
  async (_arg, { extra: api}) => {
    try {
      const { data } = await api.get<TOffersTypes>(APIRoute.OfferTypes);
      return data;
    } catch (error) {
      console.log(error)
      toast.warn(`Error of loading offers types. Please try again ${error}`, {position: toast.POSITION.TOP_CENTER});
      throw error;
    }
  },
);

const getAsyncOneOfferType = createAsyncThunk<TOfferType, undefined, TThunkApiConfig>(
  `${NameSpace.Offers}/fetchOneOfferType`,
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<TOfferType>(APIRoute.OfferTypes)
      return data;
    } catch (error) {
      toast.warn(`Error of loading one offer type. Please try again ${error}`, {position: toast.POSITION.TOP_CENTER});
      throw error;
    }
  },
);

const createAsyncOfferType = createAsyncThunk<TOfferType, TOfferType, TThunkApiConfig>(
  `${NameSpace.Offers}/createOfferType`,
  async (oneOfferType, { extra: api, dispatch }) => {
    const { data } = await api.post<TOfferType>(`${APIRoute.OfferTypes}`, oneOfferType);
    dispatch(createOfferType(data));
    toast.success('New offer type was been successfully created', {position: toast.POSITION.TOP_CENTER});
    return data;
  },
);

const updateAsyncOfferType = createAsyncThunk<TOfferType, TOfferType, TThunkApiConfig>(
  `${NameSpace.Offers}/updateOfferType`,
  async (updateOneOfferType, { extra: api, dispatch })=> {
    const { data } = await api.put<TOfferType>(`${APIRoute.OfferTypes}/${updateOneOfferType.id}`, updateOneOfferType);
    dispatch(updateOfferType(data));
    toast.success('The offer type was been successfully updated', {position: toast.POSITION.TOP_CENTER});
    return data;
  },
);

const deleteAsyncOfferType = createAsyncThunk<TOfferType, TOfferTypeId, TThunkApiConfig>(
  `${NameSpace.Offers}/deleteOfferType`,
  async (offerTypeId: TOfferTypeId, { extra: api, dispatch}) => {
    try {
      const { data } = await api.delete<TOfferType>(`${APIRoute.OfferTypes}/${offerTypeId}`);
      dispatch(deleteOfferType(offerTypeId));
      toast.success('The offer type was been successfully deleted', {position: toast.POSITION.TOP_CENTER});
      return data;
    } catch (error) {
      toast.warn(`Error of deleting the object. Please try again ${error}`, {position: toast.POSITION.TOP_CENTER});
      throw error;
    }
  },
);


const getAsyncOffers = createAsyncThunk<TOffers, undefined, TThunkApiConfig>(
  `${NameSpace.Offers}/fetchOffers`,
  async (_arg, {extra: api}) => {
    try {
      const { data } = await api.get<TOffers>(APIRoute.Offers);
      return data;
    } catch (error) {
      toast.warn(`Error of loading the offers`, {position: toast.POSITION.TOP_CENTER});
      throw error;
    }
  },
);

const getAsyncOneOffer = createAsyncThunk<TOffer, undefined, TThunkApiConfig>(
  `${NameSpace.Offers}/fetchOneOffer`,
  async (_arg, { extra: api}) => {
    const { data } = await api.get<TOffer>(APIRoute.Offers);
    return data;
  }
);

const createAsyncOneOffer = createAsyncThunk<TOffer, TOffer, TThunkApiConfig>(
  `${NameSpace.Offers}/createOneOffer`,
  async (oneNewOffer: TOffer, { extra: api, dispatch}) => {
    const { data } = await api.post<TOffer>(APIRoute.Offers, oneNewOffer);
    dispatch(createOffer(data));
    toast.success('New offer has been successfully created', {position: toast.POSITION.TOP_CENTER});
    return data;
  }
)

const updateAsyncOneOffer = createAsyncThunk<TOffer, TOffer, TThunkApiConfig>(
  `${NameSpace.Offers}/updateOneOffer`,
  async (oneUpdateOffer: TOffer, { extra: api, dispatch}) => {
    const { data } = await api.put<TOffer>(`${APIRoute.Offers}/${oneUpdateOffer.id}`, oneUpdateOffer);
    dispatch(updateOffer(data));
    toast.success('The offer has been successfully updated', {position: toast.POSITION.TOP_CENTER});
    return data;
  }
)

const deleteAsyncOneOffer = createAsyncThunk<TOffer, TOffer, TThunkApiConfig>(
  `${NameSpace.Offers}/deleteOneOffer`,
  async (oneOffer: TOffer, { extra: api, dispatch}) => {
    try {
      const { data } = await api.delete<TOffer>(`${APIRoute.Offers}/${oneOffer.id}`);
      dispatch(deleteOffer(data));
      toast.success('The offer has been successfully deleted', {position: toast.POSITION.TOP_CENTER});
      return data;
    } catch (error) {
      toast.warn(`Error of deleting the offer`, {position: toast.POSITION.TOP_CENTER});
      throw error;
    }
  }
)

export {
  getAsyncOffersTypes,
  getAsyncOneOfferType,
  createAsyncOfferType,
  updateAsyncOfferType,
  deleteAsyncOfferType,
  getAsyncOffers,
  getAsyncOneOffer,
  createAsyncOneOffer,
  updateAsyncOneOffer,
  deleteAsyncOneOffer,
};
