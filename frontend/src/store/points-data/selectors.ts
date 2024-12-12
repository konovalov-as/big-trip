import {NameSpace} from '../../utils';
import {TState} from '../../types';

const selectPoints = (state: Pick<TState, NameSpace.Points>) => state[NameSpace.Points].points;

const selectIsPointsLoading = (state: Pick<TState, NameSpace.Points>) => state[NameSpace.Points].isPointsLoading;

const selectIsVisibleNewPoint = (state: Pick<TState, NameSpace.Points>) => state[NameSpace.Points].isVisibleNewPoint;

const selectOpenPointId = (state: Pick<TState, NameSpace.Points>) => state[NameSpace.Points].openPointId;

const selectFilteredPoints = (state: Pick<TState, NameSpace.Points>) => state[NameSpace.Points].filteredPoints;

const selectFilteredAndSortedPoints = (state: Pick<TState, NameSpace.Points>) => state[NameSpace.Points].filteredAndSortedPoints;

const selectIsNetworkError = (state: Pick<TState, NameSpace.Points>) => state[NameSpace.Points].isNetworkError;

const selectIsPointsEmptyList = (state: Pick<TState, NameSpace.Points>) => state[NameSpace.Points].isPointsEmptyList;

const selectCurrentSortingType = (state: Pick<TState, NameSpace.Points>) => state[NameSpace.Points].currentSortingType;

const selectCurrentFilterType = (state: Pick<TState, NameSpace.Points>) => state[NameSpace.Points].currentFilterType;

export {
  selectPoints,
  selectIsPointsLoading,
  selectIsVisibleNewPoint,
  selectOpenPointId,
  selectFilteredPoints,
  selectFilteredAndSortedPoints,
  selectIsNetworkError,
  selectIsPointsEmptyList,
  selectCurrentFilterType,
  selectCurrentSortingType,
};
