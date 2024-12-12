import {NameSpace} from '../../utils';
import {TState} from '../../types';

const selectOffersTypes = (state: Pick<TState, NameSpace.Offers>) => state[NameSpace.Offers].offersTypes;
const selectEditOfferTypeId = (state: Pick<TState, NameSpace.Offers>) => state[NameSpace.Offers].editOfferTypeId;
const selectIsOffersTypesLoading = (state: Pick<TState, NameSpace.Offers>) => state[NameSpace.Offers].isOffersTypesLoading;
const selectOffers = (state: Pick<TState, NameSpace.Offers>) => state[NameSpace.Offers].offers;
const selectIsOffersLoading = (state: Pick<TState, NameSpace.Offers>) => state[NameSpace.Offers].isOffersLoading;
const selectEditOfferId = (state: Pick<TState, NameSpace.Offers>) => state[NameSpace.Offers].editOfferId;

export {
  selectOffersTypes,
  selectEditOfferTypeId,
  selectIsOffersTypesLoading,
  selectOffers,
  selectIsOffersLoading,
  selectEditOfferId,
};
