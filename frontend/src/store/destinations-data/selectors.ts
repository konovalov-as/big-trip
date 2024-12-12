import {NameSpace} from '../../utils/const.ts';
import {TState} from '../../types';

const selectCities = (state: Pick<TState, NameSpace.Destinations>) => state[NameSpace.Destinations].cities;
const selectEditCityId = (state: Pick<TState, NameSpace.Destinations>) => state[NameSpace.Destinations].editCityId;
const selectIsCitiesLoading = (state: Pick<TState, NameSpace.Destinations>) => state[NameSpace.Destinations].isCitiesLoading;
const selectDestinations = (state: Pick<TState, NameSpace.Destinations>) => state[NameSpace.Destinations].destinations;
const selectEditDestinationId = (state: Pick<TState, NameSpace.Destinations>) => state[NameSpace.Destinations].editDestinationId;
const selectIsDestinationLoading = (state: Pick<TState, NameSpace.Destinations>) => state[NameSpace.Destinations].isDestinationsLoading;

export {
  selectCities,
  selectEditCityId,
  selectIsCitiesLoading,
  selectDestinations,
  selectEditDestinationId,
  selectIsDestinationLoading,
};
