import {SortingTypes} from './const';
import {TPoint, TPoints} from '../types';

function sortByPriceInDescOrder(a: TPoint, b: TPoint): number {
  return b.base_price - a.base_price;
}

function sortByDurationTimeInDescOrder(a: TPoint, b: TPoint): number {
  const timeA: number = Date.parse(a.date_to) - Date.parse(a.date_from);
  const timeB: number = Date.parse(b.date_to) - Date.parse(b.date_from);
  return timeB - timeA;
}

function sortByDaysInAscOrder(a: TPoint, b: TPoint): number {
  return Date.parse(a.date_from) - Date.parse(b.date_from);
}

function sortPoints (sortingType: string, points: TPoints): TPoints {
  switch (sortingType) {
    case SortingTypes.DAY: {
      const filteredPoints = points.sort(sortByDaysInAscOrder);
      return filteredPoints;
    }
    case SortingTypes.TIME: {
      const filteredPoints = points.sort(sortByDurationTimeInDescOrder);
      return filteredPoints;
    }
    case SortingTypes.PRICE: {
      const filteredPoints = points.sort(sortByPriceInDescOrder);
      return filteredPoints;
    }
    default: {
      return points;
    }
  }
}

export {
  sortPoints,
};
