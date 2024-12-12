import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TPoint, TPoints} from '../../types';
import {FilterTypes, NameSpace, SortingTypes} from '../../utils';
import {getAsyncPoints } from '../../store';

type TPointsData = {
  points: TPoints;
  filteredPoints: TPoints;
  filteredAndSortedPoints: TPoints;
  isPointsLoading: boolean;
  isVisibleNewPoint: boolean;
  isNetworkError: boolean;
  isPointsEmptyList: boolean;
  openPointId: number | null;
  currentFilterType: string;
  currentSortingType: string;
};

const initialState: TPointsData = {
  points: [],
  filteredPoints: [],
  filteredAndSortedPoints: [],
  isPointsLoading: false,
  isVisibleNewPoint: false,
  isNetworkError: false,
  isPointsEmptyList: false,
  openPointId: null,
  currentFilterType: FilterTypes.Everything.toLocaleLowerCase(),
  currentSortingType: SortingTypes.DAY,
};

const pointsData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    toggleFavoritePoint: (state, action: PayloadAction<TPoint>) => {
      if (state.currentFilterType.toLowerCase() === FilterTypes.Favorite.toLowerCase()) {
        const updatedPoints: TPoints = state.filteredAndSortedPoints.map((point: TPoint) =>
          point.id === action.payload.id ? { ...point, is_favorite: !point.is_favorite } : point
        )
          .filter((point: TPoint) => point.is_favorite || point.id !== action.payload.id)

        state.filteredAndSortedPoints = updatedPoints;
      }

      state.filteredAndSortedPoints.find((point: TPoint) => {
        if (point.id === action.payload.id) {
          point.is_favorite = action.payload.is_favorite;
        }
      });

      state.filteredPoints.find((point) => {
        if (point.id === action.payload.id) {
          point.is_favorite = action.payload.is_favorite;
        }
      });

      state.points.find((point) => {
        if (point.id === action.payload.id) {
          point.is_favorite = action.payload.is_favorite;
        }
      });
    },
    updatePoint: (state, action: PayloadAction<TPoint>) => {
      const index = state.filteredAndSortedPoints.findIndex((point) => point.id === action.payload.id);

      if (index === -1) {
        throw new Error('The point does not exist');
      }

      const updatedPoints = [
        ...state.filteredAndSortedPoints.slice(0, index),
        action.payload,
        ...state.filteredAndSortedPoints.slice(index + 1),
      ]
        .filter((point: TPoint): boolean => Date.parse(point.date_to) < Date.now());
      state.filteredAndSortedPoints = updatedPoints;

      const indexWithoutFilter = state.points.findIndex((point) => point.id === action.payload.id);

      if (indexWithoutFilter === -1) {
        throw new Error('The point does not exist');
      }

      state.points = [
        ...state.points.slice(0, indexWithoutFilter),
        action.payload,
        ...state.points.slice(indexWithoutFilter + 1),
      ];
    },
    createPoint: (state, action: PayloadAction<TPoint>) => {
      state.filteredAndSortedPoints.push(action.payload);

      state.points.push(action.payload);
    },
    deletePoint: (state, action: PayloadAction<TPoint>) => {
      state.filteredAndSortedPoints = state.filteredAndSortedPoints.filter((point) => point.id !== action.payload.id);

      state.points = state.points.filter((point) => point.id !== action.payload.id);
    },
    setIsVisibleNewPoint: (state, action: PayloadAction<boolean>) => {
      state.isVisibleNewPoint = action.payload;
    },
    setPointId: (state, action: PayloadAction<number | null>) => {
      state.openPointId = action.payload;
    },
    filterPoints: (state, action: PayloadAction<TPoints>) => {
      state.filteredPoints = action.payload;
      state.filteredAndSortedPoints = action.payload;
    },
    filterAndSortPoints: (state, action: PayloadAction<TPoints>) => {
      state.filteredPoints = action.payload;
      state.filteredAndSortedPoints = action.payload;
    },
    setCurrentFilterType: (state, action: PayloadAction<string>) => {
      state.currentFilterType = action.payload;
    },
    setCurrentSortingType: (state, action: PayloadAction<string>) => {
      state.currentSortingType = action.payload;
    },
    setIsPointsEmptyList: (state, action: PayloadAction<boolean>) => {
      state.isPointsEmptyList = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAsyncPoints.pending, (state) => {
        state.isPointsLoading = true;
      })
      .addCase(getAsyncPoints.rejected, (state) => {
        state.isPointsLoading = false;
        state.isNetworkError = true;
      })
      .addCase(getAsyncPoints.fulfilled, (state, action) => {
        state.isPointsLoading = false;
        state.points = action.payload;
        state.filteredPoints = action.payload;
        state.filteredAndSortedPoints = action.payload;

        if (state.filteredAndSortedPoints.length === 0) {
          state.isPointsEmptyList = true;
          return;
        }
        state.isPointsEmptyList = false;
      })
  }
});

const {
  toggleFavoritePoint,
  updatePoint,
  createPoint,
  deletePoint,
  setIsVisibleNewPoint,
  setPointId,
  filterPoints,
  filterAndSortPoints,
  setCurrentFilterType,
  setCurrentSortingType,
  setIsPointsEmptyList,
} = pointsData.actions;

export {
  pointsData,
  toggleFavoritePoint,
  updatePoint,
  createPoint,
  deletePoint,
  setIsVisibleNewPoint,
  setPointId,
  filterPoints,
  filterAndSortPoints,
  setCurrentSortingType,
  setCurrentFilterType,
  setIsPointsEmptyList,
  type TPointsData,
};
