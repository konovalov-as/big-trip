import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TOfferType, TOffers, TOffersTypes, TOffer} from '../../types';
import {createAsyncOfferType, getAsyncOffers, getAsyncOffersTypes} from '../../store';
import {NameSpace} from '../../utils';

type TOffersData = {
  offersTypes: TOffersTypes,
  editOfferTypeId: number | null;
  isOffersTypesLoading: boolean,
  offers: TOffers;
  editOfferId: number | null;
  isOffersLoading: boolean;
};

const initialState: TOffersData = {
  offersTypes: [],
  editOfferTypeId: null,
  isOffersTypesLoading: false,
  offers: [],
  editOfferId: null,
  isOffersLoading: false,
};

const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    createOfferType: (state, action: PayloadAction<TOfferType>) => {
      state.offersTypes.push(action.payload);
    },
    updateOfferType: (state, action) => {
      const index: number = state.offersTypes.findIndex((oneType) => oneType.id === action.payload.id);
      if (index !== -1) {
        state.offersTypes[index] = action.payload;
      }
    },
    deleteOfferType: (state, action) => {
      state.offersTypes = state.offersTypes.filter((oneType) => oneType.id !== action.payload);
    },
    setEditOfferTypeId: (state, action) => {
      state.editOfferTypeId = action.payload;
    },
    createOffer: (state, action: PayloadAction<TOffer>) => {
      state.offers.push(action.payload);
    },
    updateOffer: (state, action: PayloadAction<TOffer>) => {
      const index: number = state.offers.findIndex((oneOffer) => oneOffer.id === action.payload.id);
      if (index !== -1) {
        state.offers[index] = action.payload;
      }
    },
    deleteOffer: (state, action: PayloadAction<TOffer>) => {
      state.offers = state.offers.filter((offer: TOffer) => offer.id !== action.payload.id);
    },
    setEditOfferId: (state, action) => {
      state.editOfferId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAsyncOffersTypes.pending, (state) => {
        state.isOffersTypesLoading = true;
      })
      .addCase(getAsyncOffersTypes.rejected, (state) => {
        state.isOffersTypesLoading = false;
      })
      .addCase(getAsyncOffersTypes.fulfilled, (state, action) => {
        state.isOffersTypesLoading = false;
        state.offersTypes = action.payload;
      })
      .addCase(createAsyncOfferType.pending, (state) => {
        state.isOffersTypesLoading = true;
      })
      .addCase(createAsyncOfferType.rejected, (state) => {
        state.isOffersTypesLoading = false;
      })
      .addCase(createAsyncOfferType.fulfilled, (state) => {
        state.isOffersTypesLoading = false;
      })
    builder
      .addCase(getAsyncOffers.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(getAsyncOffers.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(getAsyncOffers.fulfilled , (state, action) => {
        state.isOffersLoading = false;
        state.offers = action.payload;
      });
  }
});

const {
  createOfferType,
  updateOfferType,
  deleteOfferType,
  setEditOfferTypeId,

  createOffer,
  updateOffer,
  deleteOffer,
  setEditOfferId,
} = offersData.actions;

export {
  createOfferType,
  updateOfferType,
  deleteOfferType,
  setEditOfferTypeId,

  createOffer,
  updateOffer,
  deleteOffer,
  setEditOfferId,

  offersData,
  type TOffersData,
};
